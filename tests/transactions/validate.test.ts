import { describe, expect, it } from 'vitest';

import type { Transaction, TypOperacji, Waluta } from '../../src/model.js';
import { validateTransaction, validateTransactions } from '../../src/transactions/validate.js';

/**
 * Buduje poprawną transakcję i nadpisuje w niej tylko to, czego dotyczy test.
 * Dzięki temu w każdym teście widać wyłącznie pole, które go interesuje.
 */
function transakcja(zmiany: Partial<Transaction> = {}): Transaction {
  return {
    id: 'OP-2026-08-0001',
    nrRachunku: '42000011870000452317094432',
    kwotaGrosze: 123456,
    waluta: 'PLN',
    typ: 'UZNANIE',
    bookedAt: '2026-08-03T09:12:41',
    dataWaluty: '2026-08-03',
    tytul: 'Zapłata za fakturę FV/2026/08/0031',
    ...zmiany,
  };
}

// Dane z systemów zewnętrznych nie znają naszych typów — w testach odporności
// podstawiamy wartości spoza kontraktu wprost.
const NIEZNANA_WALUTA = 'GBP' as unknown as Waluta;
const NIEZNANY_TYP = 'STORNO' as unknown as TypOperacji;

describe('validateTransaction', () => {
  it('przyjmuje poprawną transakcję', () => {
    const wynik = validateTransaction(transakcja());

    expect(wynik.ok).toBe(true);
    expect(wynik.bledy).toEqual([]);
  });

  it('odrzuca transakcję bez identyfikatora operacji', () => {
    const wynik = validateTransaction(transakcja({ id: '   ' }));

    expect(wynik.ok).toBe(false);
    expect(wynik.bledy).toContain('Brak identyfikatora operacji');
  });

  it('odrzuca transakcję bez numeru rachunku', () => {
    const wynik = validateTransaction(transakcja({ nrRachunku: '' }));

    expect(wynik.ok).toBe(false);
    expect(wynik.bledy).toContain('Numer rachunku musi być 26-cyfrowym numerem NRB');
  });

  it('odrzuca numer rachunku o innej długości niż 26 cyfr', () => {
    const wynik = validateTransaction(transakcja({ nrRachunku: '4200001187000045231709' }));

    expect(wynik.ok).toBe(false);
    expect(wynik.bledy).toContain('Numer rachunku musi być 26-cyfrowym numerem NRB');
  });

  it('odrzuca numer rachunku zapisany ze spacjami', () => {
    const wynik = validateTransaction(
      transakcja({ nrRachunku: '42 0000 1187 0000 4523 1709 4432' }),
    );

    expect(wynik.ok).toBe(false);
    expect(wynik.bledy).toContain('Numer rachunku musi być 26-cyfrowym numerem NRB');
  });

  it('odrzuca kwotę zerową', () => {
    const wynik = validateTransaction(transakcja({ kwotaGrosze: 0 }));

    expect(wynik.ok).toBe(false);
    expect(wynik.bledy).toContain('Kwota operacji nie może być zerowa');
  });

  it('odrzuca kwotę z ułamkową częścią grosza', () => {
    const wynik = validateTransaction(transakcja({ kwotaGrosze: 1234.5 }));

    expect(wynik.ok).toBe(false);
    expect(wynik.bledy).toContain('Kwota operacji musi być podana w pełnych groszach');
  });

  it('odrzuca nieobsługiwaną walutę', () => {
    const wynik = validateTransaction(transakcja({ waluta: NIEZNANA_WALUTA }));

    expect(wynik.ok).toBe(false);
    expect(wynik.bledy).toContain('Nieobsługiwana waluta operacji');
  });

  it('przyjmuje każdą z obsługiwanych walut', () => {
    for (const waluta of ['PLN', 'EUR', 'USD'] as const) {
      expect(validateTransaction(transakcja({ waluta })).ok).toBe(true);
    }
  });

  it('odrzuca nieznany typ operacji', () => {
    const wynik = validateTransaction(transakcja({ typ: NIEZNANY_TYP }));

    expect(wynik.ok).toBe(false);
    expect(wynik.bledy).toContain('Nieznany typ operacji');
  });

  it('odrzuca datę księgowania, która nie jest datą ISO 8601', () => {
    const wynik = validateTransaction(transakcja({ bookedAt: '03.08.2026 09:12' }));

    expect(wynik.ok).toBe(false);
    expect(wynik.bledy).toContain('Data księgowania nie jest poprawną datą ISO 8601');
  });

  it('odrzuca datę waluty w formacie dd.MM.yyyy', () => {
    const wynik = validateTransaction(transakcja({ dataWaluty: '03.08.2026' }));

    expect(wynik.ok).toBe(false);
    expect(wynik.bledy).toContain('Data waluty musi być poprawną datą w formacie YYYY-MM-DD');
  });

  it('odrzuca datę waluty, której nie ma w kalendarzu', () => {
    const wynik = validateTransaction(transakcja({ dataWaluty: '2026-02-30' }));

    expect(wynik.ok).toBe(false);
    expect(wynik.bledy).toContain('Data waluty musi być poprawną datą w formacie YYYY-MM-DD');
  });

  it('odrzuca pusty tytuł operacji', () => {
    const wynik = validateTransaction(transakcja({ tytul: '  ' }));

    expect(wynik.ok).toBe(false);
    expect(wynik.bledy).toContain('Tytuł operacji nie może być pusty');
  });

  it('odrzuca tytuł dłuższy niż 140 znaków', () => {
    const wynik = validateTransaction(transakcja({ tytul: 'ą'.repeat(141) }));

    expect(wynik.ok).toBe(false);
    expect(wynik.bledy).toContain('Tytuł operacji nie może być dłuższy niż 140 znaków');
  });

  it('przyjmuje tytuł z polskimi znakami diakrytycznymi', () => {
    const wynik = validateTransaction(
      transakcja({ tytul: 'Zwrot nadpłaty — ŚWIAT PAPIERU, Żółkiewskiego 3' }),
    );

    expect(wynik.ok).toBe(true);
  });

  it('zbiera wszystkie błędy jednej transakcji, a nie tylko pierwszy', () => {
    const wynik = validateTransaction(
      transakcja({ nrRachunku: 'X', kwotaGrosze: 0, tytul: '' }),
    );

    expect(wynik.ok).toBe(false);
    expect(wynik.bledy).toHaveLength(3);
  });
});

describe('validateTransactions', () => {
  it('przyjmuje pustą listę', () => {
    const wynik = validateTransactions([]);

    expect(wynik.ok).toBe(true);
    expect(wynik.bledy).toEqual([]);
  });

  it('przyjmuje listę samych poprawnych transakcji', () => {
    const wynik = validateTransactions([
      transakcja({ id: 'OP-2026-08-0001' }),
      transakcja({ id: 'OP-2026-08-0002', typ: 'OBCIAZENIE' }),
    ]);

    expect(wynik.ok).toBe(true);
  });

  it('poprzedza każdy błąd identyfikatorem operacji', () => {
    const wynik = validateTransactions([
      transakcja({ id: 'OP-2026-08-0001' }),
      transakcja({ id: 'OP-2026-08-0002', tytul: '' }),
    ]);

    expect(wynik.ok).toBe(false);
    expect(wynik.bledy).toEqual(['OP-2026-08-0002: Tytuł operacji nie może być pusty']);
  });
});
