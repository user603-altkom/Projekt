import { describe, expect, it } from 'vitest';

import type { Transaction, TypOperacji } from '../../src/model.js';
import {
  netBalance,
  sumTransactions,
  TransactionRegister,
} from '../../src/transactions/register.js';

/**
 * Testy rejestru transakcji.
 *
 * Fixture to fragment wyciągu z 3 sierpnia — jedenaście operacji na dwóch
 * rachunkach. Kwoty zapisujemy w złotych, tak jak stoją w pliku, i przeliczamy
 * je na grosze tak samo, jak robi to import.
 */

const RACHUNEK_A = '42000011870000452317094432';
const RACHUNEK_B = '33000047220981145503762018';

function naGrosze(kwotaZl: number): number {
  return Math.trunc(kwotaZl * 100);
}

const PRZYKLADOWY_WYCIAG: ReadonlyArray<readonly [number, TypOperacji, string]> = [
  [1234.56, 'UZNANIE', RACHUNEK_A],
  [5300.0, 'OBCIAZENIE', RACHUNEK_A],
  [840.25, 'OBCIAZENIE', RACHUNEK_A],
  [74.9, 'OBCIAZENIE', RACHUNEK_A],
  [12000.0, 'UZNANIE', RACHUNEK_A],
  [450.0, 'OBCIAZENIE', RACHUNEK_A],
  [2450.0, 'OBCIAZENIE', RACHUNEK_A],
  [318.0, 'OBCIAZENIE', RACHUNEK_B],
  [9876.0, 'UZNANIE', RACHUNEK_B],
  [627.4, 'UZNANIE', RACHUNEK_B],
  [1507.0, 'OBCIAZENIE', RACHUNEK_B],
];

function przykladoweTransakcje(): Transaction[] {
  return PRZYKLADOWY_WYCIAG.map(
    ([kwotaZl, typ, nrRachunku], indeks): Transaction => ({
      id: `OP-2026-08-${String(indeks + 1).padStart(4, '0')}`,
      nrRachunku,
      kwotaGrosze: naGrosze(kwotaZl),
      waluta: 'PLN',
      typ,
      bookedAt: '2026-08-03T09:12:41',
      dataWaluty: '2026-08-03',
      tytul: `Operacja rozliczeniowa nr ${indeks + 1}`,
    }),
  );
}

function pelnyRejestr(): TransactionRegister {
  const rejestr = new TransactionRegister();
  rejestr.addAll(przykladoweTransakcje());
  return rejestr;
}

describe('TransactionRegister', () => {
  it('zaczyna pusty', () => {
    const rejestr = new TransactionRegister();

    expect(rejestr.size).toBe(0);
    expect(rejestr.all()).toEqual([]);
  });

  it('przyjmuje transakcje pojedynczo i paczkami', () => {
    const rejestr = new TransactionRegister();
    const [pierwsza, ...reszta] = przykladoweTransakcje();

    if (pierwsza !== undefined) {
      rejestr.add(pierwsza);
    }
    rejestr.addAll(reszta);

    expect(rejestr.size).toBe(11);
  });

  it('zwraca transakcje wybranego rachunku', () => {
    const rejestr = pelnyRejestr();

    expect(rejestr.forAccount(RACHUNEK_B)).toHaveLength(4);
    expect(rejestr.forAccount(RACHUNEK_B).every((t) => t.nrRachunku === RACHUNEK_B)).toBe(true);
  });

  it('zwraca pustą listę dla rachunku spoza rejestru', () => {
    const rejestr = pelnyRejestr();

    expect(rejestr.forAccount('19000055020118346670920043')).toEqual([]);
  });

  it('wymienia numery rachunków bez powtórzeń', () => {
    const rejestr = pelnyRejestr();

    expect(rejestr.accounts()).toEqual([RACHUNEK_A, RACHUNEK_B]);
  });
});

describe('sumTransactions', () => {
  it('zwraca zero dla pustej listy', () => {
    expect(sumTransactions([])).toBe(0);
  });

  it('sumuje obroty z przykładowego wyciągu', () => {
    // 1 234,56 + 5 300,00 + 840,25 + ... + 1 507,00 = 34 678,11 zł
    const sumaZl = sumTransactions(przykladoweTransakcje()) / 100;

    expect(sumaZl).toBeCloseTo(34678.11, 2);
  });

  it('sumuje obroty wybranego rachunku', () => {
    const rejestr = pelnyRejestr();

    const sumaZl = sumTransactions(rejestr.forAccount(RACHUNEK_B)) / 100;

    expect(sumaZl).toBeCloseTo(12328.4, 2);
  });
});

describe('netBalance', () => {
  it('zwraca zero dla pustej listy', () => {
    expect(netBalance([])).toBe(0);
  });

  it('odejmuje obciążenia od uznań', () => {
    const saldoZl = netBalance(przykladoweTransakcje()) / 100;

    expect(saldoZl).toBeCloseTo(12797.81, 2);
  });

  it('dla samych uznań równa się sumie obrotów', () => {
    const uznania = przykladoweTransakcje().filter((t) => t.typ === 'UZNANIE');

    expect(netBalance(uznania)).toBe(sumTransactions(uznania));
  });
});
