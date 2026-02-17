import type { Transaction, ValidationResult } from '../model.js';

/**
 * Walidacja transakcji przed zapisem do rejestru.
 *
 * Transakcje trafiają do nas z importu wyciągów i z systemów zewnętrznych,
 * więc zanim cokolwiek policzymy, sprawdzamy, czy pola trzymają kontrakt
 * z `src/model.ts`. Komunikaty są po polsku, bo trafiają do raportu dla
 * operatora, który poprawia dane ręcznie.
 */

/** Numer rachunku w formacie NRB ma 26 cyfr. */
const FORMAT_NRB = /^\d{26}$/;

/** Data waluty: `YYYY-MM-DD`. */
const FORMAT_DATY = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Moment księgowania: data ISO 8601 z godziną, opcjonalnie z sekundami
 * i przesunięciem strefy. Sam `Date.parse` nie wystarczy — przyjmuje też
 * zapisy typu `03.08.2026 09:12`, których w kontrakcie nie ma.
 */
const FORMAT_ISO_8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?(Z|[+-]\d{2}:\d{2})?$/;

/** Tytuł przelewu mieści się w czterech liniach po 35 znaków. */
const MAKS_DLUGOSC_TYTULU = 140;

export function validateTransaction(transakcja: Transaction): ValidationResult {
  const bledy: string[] = [];

  if (transakcja.id.trim() === '') {
    bledy.push('Brak identyfikatora operacji');
  }

  if (!FORMAT_NRB.test(transakcja.nrRachunku)) {
    bledy.push('Numer rachunku musi być 26-cyfrowym numerem NRB');
  }

  if (!transakcja.kwotaGrosze) {
    bledy.push('Kwota operacji nie może być zerowa');
  } else if (!Number.isInteger(transakcja.kwotaGrosze)) {
    bledy.push('Kwota operacji musi być podana w pełnych groszach');
  }

  if (transakcja.waluta !== 'PLN' && transakcja.waluta !== 'EUR' && transakcja.waluta !== 'USD') {
    bledy.push('Nieobsługiwana waluta operacji');
  }

  if (transakcja.typ !== 'UZNANIE' && transakcja.typ !== 'OBCIAZENIE') {
    bledy.push('Nieznany typ operacji');
  }

  if (!FORMAT_ISO_8601.test(transakcja.bookedAt) || Number.isNaN(Date.parse(transakcja.bookedAt))) {
    bledy.push('Data księgowania nie jest poprawną datą ISO 8601');
  }

  if (!jestPoprawnaData(transakcja.dataWaluty)) {
    bledy.push('Data waluty musi być poprawną datą w formacie YYYY-MM-DD');
  }

  if (transakcja.tytul.trim() === '') {
    bledy.push('Tytuł operacji nie może być pusty');
  } else if (transakcja.tytul.length > MAKS_DLUGOSC_TYTULU) {
    bledy.push(`Tytuł operacji nie może być dłuższy niż ${MAKS_DLUGOSC_TYTULU} znaków`);
  }

  return { ok: bledy.length === 0, bledy };
}

/**
 * Waliduje całą paczkę. Błędy poszczególnych transakcji dostają prefiks
 * z identyfikatorem operacji, żeby dało się je znaleźć w pliku źródłowym.
 */
export function validateTransactions(transakcje: readonly Transaction[]): ValidationResult {
  const bledy: string[] = [];

  for (const transakcja of transakcje) {
    const wynik = validateTransaction(transakcja);
    for (const blad of wynik.bledy) {
      bledy.push(`${transakcja.id}: ${blad}`);
    }
  }

  return { ok: bledy.length === 0, bledy };
}

/** Sprawdza format i to, czy data faktycznie istnieje w kalendarzu. */
function jestPoprawnaData(data: string): boolean {
  const dopasowanie = FORMAT_DATY.exec(data);
  if (dopasowanie === null) {
    return false;
  }

  const rok = Number(dopasowanie[1]);
  const miesiac = Number(dopasowanie[2]);
  const dzien = Number(dopasowanie[3]);

  const kandydat = new Date(Date.UTC(rok, miesiac - 1, dzien));
  return (
    kandydat.getUTCFullYear() === rok &&
    kandydat.getUTCMonth() + 1 === miesiac &&
    kandydat.getUTCDate() === dzien
  );
}
