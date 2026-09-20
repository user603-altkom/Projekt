import { pathToFileURL } from 'node:url';

import { readBankFile } from '../import/parseBankFile.js';
import type { Transaction } from '../model.js';
import { maSegmentZastepczy, wyznaczProdukt, zbudujKonto } from './kontoKsiegowe.js';
import type { Flaga, Kanal, Produkt, RegulaKsiegowania, Warunek } from './schemat.js';
import { REGULY, WZORCE_FLAGI, WZORCE_KANALU } from './schemat.js';

/**
 * Silnik księgowania — dopasowuje operacje do reguł i składa numery kont.
 *
 * Wejściem jest wyciąg w tej samej postaci, z której korzysta raport dzienny.
 * Wyjściem jest zestawienie zbiorcze: ile operacji poszło na którą regułę i którym
 * kanałem, ile kont dostało segment zastępczy i ile pozycji czeka na akceptację
 * drugiej osoby. Numerów kont ani identyfikatorów operacji zestawienie nie wypisuje.
 *
 * Uruchomienie:
 *
 * ```
 * npm run ksiegowanie
 * tsx src/routing/silnik.ts dane/wyciag_2026_08.csv
 * ```
 */

/** Wszystko, co reguła może sprawdzić w pojedynczej operacji. */
export interface KontekstOperacji {
  transakcja: Transaction;
  produkt: Produkt;
  kanal: Kanal;
  flaga: Flaga | undefined;
}

export interface WynikKsiegowania {
  id: string;
  konto: string;
  kodReguly: string;
  produkt: Produkt;
  kanal: Kanal;
  flaga: Flaga | undefined;
  wymagaAkceptacji: boolean;
  segmentZastepczy: boolean;
}

/** Rozpoznaje kanał po tytule operacji. */
export function rozpoznajKanal(tytul: string): Kanal {
  for (const [wzorzec, kanal] of WZORCE_KANALU) {
    if (wzorzec.test(tytul)) {
      return kanal;
    }
  }
  return 'NIEROZPOZNANY';
}

/** Rozpoznaje flagę po tytule operacji. Brak dopasowania znaczy brak flagi. */
export function rozpoznajFlage(tytul: string): Flaga | undefined {
  for (const [wzorzec, flaga] of WZORCE_FLAGI) {
    if (wzorzec.test(tytul)) {
      return flaga;
    }
  }
  return undefined;
}

/** Buduje kontekst, na którym pracują warunki reguł. */
export function zbudujKontekst(transakcja: Transaction): KontekstOperacji {
  return {
    transakcja,
    produkt: wyznaczProdukt(transakcja.nrRachunku),
    kanal: rozpoznajKanal(transakcja.tytul),
    flaga: rozpoznajFlage(transakcja.tytul),
  };
}

/**
 * Czy warunek reguły jest spełniony w całości.
 *
 * Pola pominięte w warunku nie zawężają dopasowania, więc warunek pusty
 * pasuje do każdej operacji.
 */
export function czyWarunekSpelniony(warunek: Warunek, kontekst: KontekstOperacji): boolean {
  const { transakcja } = kontekst;

  if (warunek.produkt !== undefined && !warunek.produkt.includes(kontekst.produkt)) {
    return false;
  }
  if (warunek.waluta !== undefined && !warunek.waluta.includes(transakcja.waluta)) {
    return false;
  }
  if (warunek.typ !== undefined && warunek.typ !== transakcja.typ) {
    return false;
  }
  if (warunek.kanal !== undefined && !warunek.kanal.includes(kontekst.kanal)) {
    return false;
  }
  if (warunek.flaga !== undefined && warunek.flaga !== kontekst.flaga) {
    return false;
  }
  if (warunek.odGroszy !== undefined && transakcja.kwotaGrosze < warunek.odGroszy) {
    return false;
  }
  if (warunek.doGroszy !== undefined && transakcja.kwotaGrosze > warunek.doGroszy) {
    return false;
  }
  if (warunek.obowiazujeOd !== undefined && transakcja.dataWaluty < warunek.obowiazujeOd) {
    return false;
  }
  if (warunek.obowiazujeDo !== undefined && transakcja.dataWaluty > warunek.obowiazujeDo) {
    return false;
  }
  return true;
}

/**
 * Pierwsza reguła, której warunek jest spełniony.
 *
 * Ostatnia reguła w tablicy ma warunek pusty, więc dopasowanie zawsze
 * się powiedzie.
 */
export function dopasujRegule(kontekst: KontekstOperacji): RegulaKsiegowania {
  for (const regula of REGULY) {
    if (czyWarunekSpelniony(regula.warunek, kontekst)) {
      return regula;
    }
  }
  throw new Error('Brak reguły domyślnej w tablicy REGULY');
}

/** Księguje pojedynczą operację. */
export function zaksieguj(transakcja: Transaction): WynikKsiegowania {
  const kontekst = zbudujKontekst(transakcja);
  const regula = dopasujRegule(kontekst);

  const konto = zbudujKonto({
    segmentZespolu: regula.segmentZespolu,
    nrRachunku: transakcja.nrRachunku,
    segmentRodzaju: regula.segmentRodzaju,
    waluta: transakcja.waluta,
    typ: transakcja.typ,
    dataWaluty: transakcja.dataWaluty,
  });

  return {
    id: transakcja.id,
    konto,
    kodReguly: regula.kod,
    produkt: kontekst.produkt,
    kanal: kontekst.kanal,
    flaga: kontekst.flaga,
    wymagaAkceptacji: regula.wymagaAkceptacji,
    segmentZastepczy: maSegmentZastepczy(konto),
  };
}

export interface ZestawienieKsiegowania {
  sciezka: string;
  liczbaOperacji: number;
  /** Liczba operacji przypisanych do reguły, po kodzie reguły. */
  wgReguly: ReadonlyMap<string, number>;
  /** Kody reguł, które nie dopasowały się ani razu. */
  regulyNieuzyte: readonly string[];
  /** Liczba operacji przypisanych do kanału, po nazwie kanału. */
  wgKanalu: ReadonlyMap<Kanal, number>;
  liczbaDoAkceptacji: number;
  liczbaZSegmentemZastepczym: number;
  /** Liczba operacji, w których nie udało się rozpoznać kanału. */
  liczbaNierozpoznanychKanalow: number;
}

export function buildKsiegowanieReport(sciezka: string): ZestawienieKsiegowania {
  const wyciag = readBankFile(sciezka);

  const wgReguly = new Map<string, number>();
  const wgKanalu = new Map<Kanal, number>();
  let liczbaDoAkceptacji = 0;
  let liczbaZSegmentemZastepczym = 0;
  let liczbaNierozpoznanychKanalow = 0;

  for (const transakcja of wyciag.transactions) {
    const wynik = zaksieguj(transakcja);

    wgReguly.set(wynik.kodReguly, (wgReguly.get(wynik.kodReguly) ?? 0) + 1);
    wgKanalu.set(wynik.kanal, (wgKanalu.get(wynik.kanal) ?? 0) + 1);
    if (wynik.wymagaAkceptacji) {
      liczbaDoAkceptacji += 1;
    }
    if (wynik.segmentZastepczy) {
      liczbaZSegmentemZastepczym += 1;
    }
    if (wynik.kanal === 'NIEROZPOZNANY') {
      liczbaNierozpoznanychKanalow += 1;
    }
  }

  const regulyNieuzyte = REGULY.filter((regula) => !wgReguly.has(regula.kod)).map(
    (regula) => regula.kod,
  );

  return {
    sciezka,
    liczbaOperacji: wyciag.transactions.length,
    wgReguly,
    regulyNieuzyte,
    wgKanalu,
    liczbaDoAkceptacji,
    liczbaZSegmentemZastepczym,
    liczbaNierozpoznanychKanalow,
  };
}

/** Kanały w kolejności, w jakiej pokazuje je zestawienie. */
const WSZYSTKIE_KANALY: readonly Kanal[] = [
  'PRZELEW_KRAJOWY',
  'SEPA',
  'SWIFT',
  'KARTA',
  'WEWNETRZNY',
  'KASA',
  'NIEROZPOZNANY',
];

const SZEROKOSC_ETYKIETY = 30;

export function formatKsiegowanieReport(zestawienie: ZestawienieKsiegowania): string {
  const linie: string[] = [`Zestawienie księgowania — ${zestawienie.sciezka}`, ''];

  linie.push(`${etykieta('Operacji zaksięgowanych:')}${zestawienie.liczbaOperacji}`);
  linie.push(`${etykieta('Do akceptacji:')}${zestawienie.liczbaDoAkceptacji}`);
  linie.push(`${etykieta('Konta z segmentem zastępczym:')}${zestawienie.liczbaZSegmentemZastepczym}`);
  linie.push(`${etykieta('Kanał nierozpoznany:')}${zestawienie.liczbaNierozpoznanychKanalow}`);
  linie.push('', 'Operacje wg reguły:');

  for (const regula of REGULY) {
    const liczba = zestawienie.wgReguly.get(regula.kod) ?? 0;
    linie.push(`  ${regula.kod}  ${String(liczba).padStart(4, ' ')}   ${regula.opis}`);
  }

  linie.push('', 'Operacje wg kanału:');
  for (const kanal of WSZYSTKIE_KANALY) {
    const liczba = zestawienie.wgKanalu.get(kanal) ?? 0;
    linie.push(`  ${kanal.padEnd(16, ' ')}${String(liczba).padStart(4, ' ')}`);
  }

  if (zestawienie.regulyNieuzyte.length > 0) {
    linie.push(
      '',
      `Reguły bez ani jednego dopasowania: ${zestawienie.regulyNieuzyte.join(', ')}`,
    );
  }

  return linie.join('\n');
}

function etykieta(tekst: string): string {
  return tekst.padEnd(SZEROKOSC_ETYKIETY, ' ');
}

function main(): void {
  const sciezka = process.argv[2];

  if (sciezka === undefined) {
    console.error('Użycie: tsx src/routing/silnik.ts <plik-wyciagu.csv>');
    process.exitCode = 1;
    return;
  }

  console.log(formatKsiegowanieReport(buildKsiegowanieReport(sciezka)));
}

const argument = process.argv[1];
if (argument !== undefined && import.meta.url === pathToFileURL(argument).href) {
  main();
}
