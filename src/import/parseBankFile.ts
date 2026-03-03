import { readFileSync } from 'node:fs';

import type { Transaction, TypOperacji, Waluta } from '../model.js';

/**
 * Import wyciągów bankowych z plików CSV.
 *
 * Format pliku (eksport z systemu transakcyjnego):
 *
 * ```
 * # okres=2026-08-01..2026-08-31
 * # suma_kontrolna_grosze=1322594456
 * id;nr_rachunku;kwota;waluta;typ;data_ksiegowania;data_waluty;tytul
 * OP-2026-08-0001;89000048016279458747470461;48714.85;PLN;WN;...
 * ```
 *
 * Linie zaczynające się od `#` to nagłówek techniczny, z którego bierzemy sumę
 * kontrolną. Pierwszy wiersz danych to nazwy kolumn.
 */

const SEPARATOR = ';';
const ZNACZNIK_KOMENTARZA = '#';
const KLUCZ_SUMY_KONTROLNEJ = 'suma_kontrolna_grosze';
const LICZBA_KOLUMN = 8;
const BOM = '﻿';

export interface ParsedBankFile {
  /** Suma kwot wszystkich operacji w groszach, zadeklarowana w nagłówku pliku. */
  sumaKontrolnaGrosze: number | null;
  transactions: Transaction[];
  /** Numery wierszy (liczone od 1), których nie udało się odczytać. */
  pominieteWiersze: number[];
}

/** Wczytuje wyciąg z dysku. Pliki z banku przychodzą w UTF-8, czasem z BOM-em. */
export function readBankFile(sciezka: string): ParsedBankFile {
  return parseBankFile(readFileSync(sciezka, 'utf8'));
}

export function parseBankFile(zawartosc: string): ParsedBankFile {
  const linie = usunBom(zawartosc).split(/\r\n|\n|\r/);

  let sumaKontrolnaGrosze: number | null = null;
  const transactions: Transaction[] = [];
  const pominieteWiersze: number[] = [];

  for (let indeks = 0; indeks < linie.length; indeks++) {
    const linia = linie[indeks] ?? '';

    if (linia.trim() === '') {
      continue;
    }

    if (linia.startsWith(ZNACZNIK_KOMENTARZA)) {
      const suma = odczytajSumeKontrolna(linia);
      if (suma !== null) {
        sumaKontrolnaGrosze = suma;
      }
      continue;
    }

    if (jestNaglowkiemKolumn(linia)) {
      continue;
    }

    const transakcja = parsujWiersz(linia);
    if (transakcja === null) {
      pominieteWiersze.push(indeks + 1);
      continue;
    }

    transactions.push(transakcja);
  }

  return { sumaKontrolnaGrosze, transactions, pominieteWiersze };
}

function parsujWiersz(linia: string): Transaction | null {
  const pola = linia.split(SEPARATOR).map((pole) => pole.trim());
  if (pola.length !== LICZBA_KOLUMN) {
    return null;
  }

  const [
    id = '',
    nrRachunku = '',
    surowaKwota = '',
    surowaWaluta = '',
    surowyTyp = '',
    surowaKsiegowanie = '',
    surowaDataWaluty = '',
    tytul = '',
  ] = pola;

  if (id === '' || nrRachunku === '') {
    return null;
  }

  const kwotaZl = parsujKwote(surowaKwota);
  if (kwotaZl === null) {
    return null;
  }

  const waluta = parsujWalute(surowaWaluta);
  if (waluta === null) {
    return null;
  }

  const typ = ustalTyp(surowyTyp, kwotaZl);
  if (typ === null) {
    return null;
  }

  const bookedAt = parsujZnacznikCzasu(surowaKsiegowanie);
  if (bookedAt === null) {
    return null;
  }

  const dataWaluty = parsujDate(surowaDataWaluty);
  if (dataWaluty === null) {
    return null;
  }

  return {
    id,
    nrRachunku,
    kwotaGrosze: naGrosze(Math.abs(kwotaZl)),
    waluta,
    typ,
    bookedAt,
    dataWaluty,
    tytul,
  };
}

/**
 * Kwoty w pliku są w złotych, a w rejestrze trzymamy grosze. Przeliczamy je od
 * razu przy imporcie, żeby dalej pracować na liczbach całkowitych i nie wozić
 * przez cały system arytmetyki zmiennoprzecinkowej.
 */
function naGrosze(kwotaZl: number): number {
  return Math.trunc(kwotaZl * 100);
}

/**
 * Kwota bywa zapisana po polsku (`1 234,56`) albo po angielsku (`1234.56`),
 * a spacja rozdzielająca tysiące bywa zwykła albo nierozdzielająca.
 */
function parsujKwote(surowa: string): number | null {
  const znormalizowana = surowa.replace(/[\s ]/g, '').replace(',', '.');
  if (!/^-?\d+(\.\d{1,2})?$/.test(znormalizowana)) {
    return null;
  }
  return Number(znormalizowana);
}

function parsujWalute(surowa: string): Waluta | null {
  const kod = surowa.toUpperCase();
  if (kod === 'PLN' || kod === 'EUR' || kod === 'USD') {
    return kod;
  }
  return null;
}

/**
 * Kierunek operacji bierzemy z kolumny `typ` (MA — uznanie, WN — obciążenie).
 * Część eksportów zapisuje obciążenie kwotą ujemną zamiast znacznikiem; wtedy
 * rozstrzyga znak kwoty, bo w rejestrze kwota musi być dodatnia.
 */
function ustalTyp(surowyTyp: string, kwotaZl: number): TypOperacji | null {
  if (kwotaZl < 0) {
    return 'OBCIAZENIE';
  }

  const znacznik = surowyTyp.toUpperCase();
  if (znacznik === 'MA' || znacznik === 'UZNANIE') {
    return 'UZNANIE';
  }
  if (znacznik === 'WN' || znacznik === 'OBCIAZENIE') {
    return 'OBCIAZENIE';
  }
  return null;
}

const DATA_ISO = /^\d{4}-\d{2}-\d{2}$/;
const DATA_PL = /^(\d{2})\.(\d{2})\.(\d{4})$/;
const CZAS_ISO = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/;
const CZAS_PL = /^(\d{2})\.(\d{2})\.(\d{4})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/;

/** Zwraca datę w formacie `YYYY-MM-DD` albo `null`, jeśli formatu nie znamy. */
function parsujDate(surowa: string): string | null {
  if (DATA_ISO.test(surowa)) {
    return surowa;
  }

  const polska = DATA_PL.exec(surowa);
  if (polska !== null) {
    const [, dzien, miesiac, rok] = polska;
    return `${rok}-${miesiac}-${dzien}`;
  }

  return null;
}

/** Zwraca moment księgowania w ISO 8601 albo `null`, jeśli formatu nie znamy. */
function parsujZnacznikCzasu(surowa: string): string | null {
  const iso = CZAS_ISO.exec(surowa);
  if (iso !== null) {
    const [, data, godzina, minuta, sekunda = '00'] = iso;
    return `${data}T${godzina}:${minuta}:${sekunda}`;
  }

  const polski = CZAS_PL.exec(surowa);
  if (polski !== null) {
    const [, dzien, miesiac, rok, godzina, minuta, sekunda = '00'] = polski;
    return `${rok}-${miesiac}-${dzien}T${godzina}:${minuta}:${sekunda}`;
  }

  // Część eksportów podaje samą datę księgowania, bez godziny.
  const data = parsujDate(surowa);
  return data === null ? null : `${data}T00:00:00`;
}

function odczytajSumeKontrolna(linia: string): number | null {
  const szukane = `${KLUCZ_SUMY_KONTROLNEJ}=`;
  const pozycja = linia.indexOf(szukane);
  if (pozycja === -1) {
    return null;
  }

  const wartosc = Number.parseInt(linia.slice(pozycja + szukane.length).trim(), 10);
  return Number.isNaN(wartosc) ? null : wartosc;
}

function jestNaglowkiemKolumn(linia: string): boolean {
  const pierwszaKolumna = linia.split(SEPARATOR)[0] ?? '';
  return pierwszaKolumna.trim().toLowerCase() === 'id';
}

function usunBom(tekst: string): string {
  return tekst.startsWith(BOM) ? tekst.slice(BOM.length) : tekst;
}
