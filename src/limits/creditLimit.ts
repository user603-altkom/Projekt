import { readFileSync } from 'node:fs';

import type { NrRachunku, Transaction, Waluta } from '../model.js';

/**
 * Limity kredytowe rachunków.
 *
 * Limit wyznacza, ile rachunek może łącznie obciążyć w ramach jednej partii
 * rozliczeniowej. Konfigurację utrzymuje zespół produktowy w pliku
 * `dane/limity_rachunkow.json` — rejestr transakcji nie ma własnego źródła
 * prawdy o limitach i nie powinien go mieć.
 *
 * Jeden rachunek może mieć w konfiguracji kilka wpisów. Obowiązuje ten
 * o najpóźniejszej dacie wejścia w życie, która nie jest późniejsza niż dzień,
 * na który sprawdzamy.
 */

/** Limit przypisany do jednego rachunku. */
export interface CreditLimit {
  nrRachunku: NrRachunku;

  /** Kwota limitu w groszach — liczba całkowita, nieujemna. */
  limitGrosze: number;

  /** Waluta, w której limit został przyznany. */
  waluta: Waluta;

  /** Dzień wejścia limitu w życie, `YYYY-MM-DD`. */
  effectiveFrom: string;
}

/**
 * Wynik sprawdzenia limitu.
 *
 * Kształt jest taki sam jak w `ValidationResult` z `src/model.ts` — operator
 * dostaje wszystkie komunikaty jedną listą, niezależnie od tego, czy transakcję
 * odrzuciła walidacja formalna, czy limit.
 */
export interface LimitCheckResult {
  ok: boolean;

  /** O ile groszy operacja wychodzi poza limit. `0`, gdy limit nie został przekroczony. */
  przekroczenieGrosze: number;

  bledy: string[];
}

/** Numer rachunku w formacie NRB ma 26 cyfr. */
const FORMAT_NRB = /^\d{26}$/;

/** Data wejścia w życie: `YYYY-MM-DD`. */
const FORMAT_DATY = /^\d{4}-\d{2}-\d{2}$/;

/** Wczytuje konfigurację limitów z dysku. */
export function loadCreditLimits(sciezka: string): CreditLimit[] {
  return parseCreditLimits(readFileSync(sciezka, 'utf8'));
}

/**
 * Parsuje konfigurację limitów.
 *
 * Wpisy niekompletne albo z kwotą, która nie jest pełnymi groszami, są pomijane.
 * Plik jest utrzymywany ręcznie i literówka w jednym wierszu nie może wywrócić
 * całego przebiegu rozliczenia — lepiej stracić jeden limit niż całą partię.
 */
export function parseCreditLimits(zawartosc: string): CreditLimit[] {
  const wiersze = czytajListeWierszy(JSON.parse(zawartosc) as unknown);

  const limity: CreditLimit[] = [];
  for (const wiersz of wiersze) {
    const limit = czytajLimit(wiersz);
    if (limit !== null) {
      limity.push(limit);
    }
  }

  return limity;
}

/**
 * Limit obowiązujący dla rachunku na wskazany dzień (`YYYY-MM-DD`).
 *
 * `null` oznacza rachunek bez przyznanego limitu — to nie to samo co limit
 * zerowy i wołający musi te dwa przypadki rozróżnić.
 */
export function findCreditLimit(
  limity: readonly CreditLimit[],
  nrRachunku: NrRachunku,
  naDzien: string,
): CreditLimit | null {
  let wybrany: CreditLimit | null = null;

  for (const limit of limity) {
    if (limit.nrRachunku !== nrRachunku) {
      continue;
    }

    // Daty w formacie `YYYY-MM-DD` porównują się leksykograficznie tak samo
    // jak chronologicznie, więc nie ma po co budować obiektów Date.
    if (limit.effectiveFrom > naDzien) {
      continue;
    }

    if (wybrany === null || limit.effectiveFrom > wybrany.effectiveFrom) {
      wybrany = limit;
    }
  }

  return wybrany;
}

/**
 * Wykorzystanie limitu przez operacje, które weszły już do rozliczenia — w groszach.
 *
 * Liczą się wyłącznie obciążenia. Uznanie zwiększa saldo rachunku, więc limitu
 * nie zużywa, a jego kwoty nie odejmujemy od wykorzystania: limit dotyczy sumy
 * obciążeń w partii, nie salda rachunku.
 */
export function creditLimitUsage(transakcje: readonly Transaction[]): number {
  let wykorzystanie = 0;

  for (const transakcja of transakcje) {
    if (transakcja.typ === 'OBCIAZENIE') {
      wykorzystanie += transakcja.kwotaGrosze;
    }
  }

  return wykorzystanie;
}

/**
 * Sprawdza, czy pojedyncza operacja mieści się w limicie rachunku.
 *
 * `wczesniejsze` to operacje tego samego rachunku, które trafiły do rozliczenia
 * przed sprawdzaną operacją. Limit dotyczy sumy obciążeń w partii, a nie
 * pojedynczej kwoty — bez historii ta sama operacja przeszłaby nawet wtedy,
 * gdy rachunek wyczerpał limit dziesięcioma wcześniejszymi przelewami.
 */
export function checkCreditLimit(
  limit: CreditLimit,
  operacja: Transaction,
  wczesniejsze: readonly Transaction[] = [],
): LimitCheckResult {
  if (operacja.typ !== 'OBCIAZENIE') {
    return { ok: true, przekroczenieGrosze: 0, bledy: [] };
  }

  const wykorzystaniePoOperacji = creditLimitUsage(wczesniejsze) + operacja.kwotaGrosze;
  const przekroczenieGrosze = wykorzystaniePoOperacji - limit.limitGrosze;

  if (przekroczenieGrosze <= 0) {
    return { ok: true, przekroczenieGrosze: 0, bledy: [] };
  }

  return {
    ok: false,
    przekroczenieGrosze,
    bledy: [
      `${operacja.id}: obciążenie przekracza limit kredytowy rachunku o ` +
        `${formatujKwote(przekroczenieGrosze, limit.waluta)} (limit ` +
        `${formatujKwote(limit.limitGrosze, limit.waluta)}, wykorzystanie po operacji ` +
        `${formatujKwote(wykorzystaniePoOperacji, limit.waluta)})`,
    ],
  };
}

/**
 * Sprawdza całą partię operacji względem konfiguracji limitów.
 *
 * Operacje przetwarzamy w kolejności, w jakiej przyszły z importu — wykorzystanie
 * limitu narasta w obrębie jednego rachunku, rachunki liczą się niezależnie od
 * siebie. Operacja, która limit przekroczyła, i tak wchodzi do wykorzystania:
 * jeżeli rachunek wyjdzie poza limit dwoma przelewami, operator ma zobaczyć oba,
 * a nie tylko pierwszy z nich.
 *
 * Rachunek bez wpisu w konfiguracji przechodzi bez ograniczenia. Brak limitu to
 * rachunek, któremu limitu nie przyznano, a nie limit zerowy — odrzucanie takich
 * operacji zatrzymałoby rozliczenie wszystkim klientom bez produktu kredytowego.
 *
 * `przekroczenieGrosze` w wyniku zbiorczym to największe pojedyncze przekroczenie
 * w partii; sumowanie przekroczeń z różnych rachunków nie dałoby się do niczego użyć.
 */
export function checkCreditLimits(
  limity: readonly CreditLimit[],
  transakcje: readonly Transaction[],
): LimitCheckResult {
  const bledy: string[] = [];
  const historia = new Map<NrRachunku, Transaction[]>();
  let przekroczenieGrosze = 0;

  for (const transakcja of transakcje) {
    const wczesniejsze = historia.get(transakcja.nrRachunku) ?? [];
    const limit = findCreditLimit(limity, transakcja.nrRachunku, transakcja.dataWaluty);

    if (limit !== null) {
      const wynik = checkCreditLimit(limit, transakcja, wczesniejsze);
      if (!wynik.ok) {
        bledy.push(...wynik.bledy);
        przekroczenieGrosze = Math.max(przekroczenieGrosze, wynik.przekroczenieGrosze);
      }
    }

    wczesniejsze.push(transakcja);
    historia.set(transakcja.nrRachunku, wczesniejsze);
  }

  return { ok: bledy.length === 0, przekroczenieGrosze, bledy };
}

/** Konfiguracja może przyjść jako goła tablica albo jako obiekt z polem `limity`. */
function czytajListeWierszy(dane: unknown): unknown[] {
  if (Array.isArray(dane)) {
    return dane;
  }

  if (typeof dane === 'object' && dane !== null) {
    const limity = (dane as Record<string, unknown>)['limity'];
    if (Array.isArray(limity)) {
      return limity;
    }
  }

  return [];
}

function czytajLimit(wiersz: unknown): CreditLimit | null {
  if (typeof wiersz !== 'object' || wiersz === null) {
    return null;
  }

  const rekord = wiersz as Record<string, unknown>;
  const nrRachunku = rekord['nrRachunku'];
  const limitGrosze = rekord['limitGrosze'];
  const waluta = rekord['waluta'];
  const obowiazujeOd = rekord['obowiazujeOd'];

  if (typeof nrRachunku !== 'string' || !FORMAT_NRB.test(nrRachunku)) {
    return null;
  }

  if (typeof limitGrosze !== 'number' || !Number.isInteger(limitGrosze) || limitGrosze < 0) {
    return null;
  }

  if (!jestWaluta(waluta)) {
    return null;
  }

  if (typeof obowiazujeOd !== 'string' || !FORMAT_DATY.test(obowiazujeOd)) {
    return null;
  }

  return { nrRachunku, limitGrosze, waluta, effectiveFrom: obowiazujeOd };
}

function jestWaluta(wartosc: unknown): wartosc is Waluta {
  return wartosc === 'PLN' || wartosc === 'EUR' || wartosc === 'USD';
}

/** Formatuje kwotę w groszach na potrzeby komunikatu, np. `75 000,00 PLN`. */
function formatujKwote(grosze: number, waluta: Waluta): string {
  const znak = grosze < 0 ? '-' : '';
  const wartoscBezwzgledna = Math.abs(grosze);
  const calosci = Math.floor(wartoscBezwzgledna / 100);
  const reszta = wartoscBezwzgledna % 100;

  return `${znak}${grupujTysiace(calosci)},${String(reszta).padStart(2, '0')} ${waluta}`;
}

function grupujTysiace(liczba: number): string {
  return String(liczba).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
