import { describe, expect, it } from 'vitest';

import type { CreditLimit } from '../../src/limits/creditLimit.js';
import {
  checkCreditLimit,
  checkCreditLimits,
  creditLimitUsage,
  findCreditLimit,
  loadCreditLimits,
  parseCreditLimits,
} from '../../src/limits/creditLimit.js';
import type { Transaction } from '../../src/model.js';

const RACHUNEK = '20000089180903978540630428';
const INNY_RACHUNEK = '27000091286200793830739251';

/**
 * Buduje operację i nadpisuje w niej tylko to, czego dotyczy test — tak samo jak
 * w testach walidacji, żeby w każdym teście widać było wyłącznie istotne pole.
 */
function transakcja(zmiany: Partial<Transaction> = {}): Transaction {
  return {
    id: 'OP-2026-08-0101',
    nrRachunku: RACHUNEK,
    kwotaGrosze: 100000,
    waluta: 'PLN',
    typ: 'OBCIAZENIE',
    bookedAt: '2026-08-12T11:03:07',
    dataWaluty: '2026-08-12',
    tytul: 'Przelew do kontrahenta',
    ...zmiany,
  };
}

function limit(zmiany: Partial<CreditLimit> = {}): CreditLimit {
  return {
    nrRachunku: RACHUNEK,
    limitGrosze: 500000,
    waluta: 'PLN',
    effectiveFrom: '2026-01-01',
    ...zmiany,
  };
}

describe('creditLimitUsage', () => {
  it('zwraca zero dla pustej listy', () => {
    expect(creditLimitUsage([])).toBe(0);
  });

  it('sumuje obciążenia', () => {
    const wykorzystanie = creditLimitUsage([
      transakcja({ id: 'OP-1', kwotaGrosze: 120000 }),
      transakcja({ id: 'OP-2', kwotaGrosze: 80000 }),
    ]);

    expect(wykorzystanie).toBe(200000);
  });

  it('nie wlicza uznań do wykorzystania limitu kredytowego', () => {
    const wykorzystanie = creditLimitUsage([
      transakcja({ id: 'OP-1', kwotaGrosze: 120000 }),
      transakcja({ id: 'OP-2', kwotaGrosze: 900000, typ: 'UZNANIE' }),
    ]);

    expect(wykorzystanie).toBe(120000);
  });
});

describe('checkCreditLimit', () => {
  it('przepuszcza obciążenie mieszczące się w limicie kredytowym', () => {
    const wynik = checkCreditLimit(limit(), transakcja({ kwotaGrosze: 499999 }));

    expect(wynik.ok).toBe(true);
    expect(wynik.przekroczenieGrosze).toBe(0);
    expect(wynik.bledy).toEqual([]);
  });

  it('przepuszcza obciążenie równe limitowi kredytowemu', () => {
    const wynik = checkCreditLimit(limit(), transakcja({ kwotaGrosze: 500000 }));

    expect(wynik.ok).toBe(true);
  });

  it('odrzuca obciążenie przekraczające limit kredytowy choćby o grosz', () => {
    const wynik = checkCreditLimit(limit(), transakcja({ kwotaGrosze: 500001 }));

    expect(wynik.ok).toBe(false);
    expect(wynik.przekroczenieGrosze).toBe(1);
  });

  it('podaje w komunikacie kwotę przekroczenia i kwotę limitu kredytowego', () => {
    const wynik = checkCreditLimit(limit(), transakcja({ kwotaGrosze: 750000 }));

    expect(wynik.bledy).toHaveLength(1);
    expect(wynik.bledy[0]).toContain('OP-2026-08-0101');
    expect(wynik.bledy[0]).toContain('2 500,00 PLN');
    expect(wynik.bledy[0]).toContain('5 000,00 PLN');
  });

  it('przepuszcza uznanie, nawet gdy jego kwota jest wyższa niż limit kredytowy', () => {
    const wynik = checkCreditLimit(
      limit(),
      transakcja({ kwotaGrosze: 9900000, typ: 'UZNANIE' }),
    );

    expect(wynik.ok).toBe(true);
    expect(wynik.bledy).toEqual([]);
  });

  it('dolicza do limitu kredytowego wcześniejsze obciążenia rachunku', () => {
    const wynik = checkCreditLimit(limit(), transakcja({ id: 'OP-3', kwotaGrosze: 200000 }), [
      transakcja({ id: 'OP-1', kwotaGrosze: 200000 }),
      transakcja({ id: 'OP-2', kwotaGrosze: 150000 }),
    ]);

    expect(wynik.ok).toBe(false);
    expect(wynik.przekroczenieGrosze).toBe(50000);
  });

  it('nie odrzuca operacji, gdy wcześniejsze obciążenia mieszczą się razem z nią w limicie kredytowym', () => {
    const wynik = checkCreditLimit(limit(), transakcja({ id: 'OP-3', kwotaGrosze: 100000 }), [
      transakcja({ id: 'OP-1', kwotaGrosze: 200000 }),
      transakcja({ id: 'OP-2', kwotaGrosze: 150000 }),
    ]);

    expect(wynik.ok).toBe(true);
  });

  it('limit kredytowy zerowy blokuje każde obciążenie', () => {
    const wynik = checkCreditLimit(limit({ limitGrosze: 0 }), transakcja({ kwotaGrosze: 1 }));

    expect(wynik.ok).toBe(false);
    expect(wynik.przekroczenieGrosze).toBe(1);
  });
});

describe('findCreditLimit', () => {
  const limity = [
    limit({ limitGrosze: 500000, effectiveFrom: '2026-01-01' }),
    limit({ limitGrosze: 900000, effectiveFrom: '2026-07-01' }),
    limit({ nrRachunku: INNY_RACHUNEK, limitGrosze: 100000, effectiveFrom: '2026-01-01' }),
  ];

  it('zwraca null dla rachunku bez skonfigurowanego limitu kredytowego', () => {
    expect(findCreditLimit(limity, '99000044170000456123789045', '2026-08-12')).toBeNull();
  });

  it('zwraca limit kredytowy obowiązujący na wskazany dzień', () => {
    expect(findCreditLimit(limity, RACHUNEK, '2026-08-12')?.limitGrosze).toBe(900000);
  });

  it('pomija limit kredytowy, który jeszcze nie wszedł w życie', () => {
    expect(findCreditLimit(limity, RACHUNEK, '2026-06-30')?.limitGrosze).toBe(500000);
  });

  it('zwraca null, gdy żaden limit kredytowy rachunku nie wszedł jeszcze w życie', () => {
    expect(findCreditLimit(limity, RACHUNEK, '2025-12-31')).toBeNull();
  });

  it('nie miesza limitów kredytowych różnych rachunków', () => {
    expect(findCreditLimit(limity, INNY_RACHUNEK, '2026-08-12')?.limitGrosze).toBe(100000);
  });
});

describe('parseCreditLimits', () => {
  it('czyta wpisy z pola limity kredytowe', () => {
    const limity = parseCreditLimits(
      JSON.stringify({
        limity: [
          { nrRachunku: RACHUNEK, limitGrosze: 500000, waluta: 'PLN', obowiazujeOd: '2026-01-01' },
        ],
      }),
    );

    expect(limity).toHaveLength(1);
    expect(limity[0]?.effectiveFrom).toBe('2026-01-01');
  });

  it('czyta konfigurację zapisaną jako goła tablica', () => {
    const limity = parseCreditLimits(
      JSON.stringify([
        { nrRachunku: RACHUNEK, limitGrosze: 500000, waluta: 'PLN', obowiazujeOd: '2026-01-01' },
      ]),
    );

    expect(limity).toHaveLength(1);
  });

  it('pomija wpisy bez kompletu pól i te z niepoprawnymi wartościami', () => {
    const limity = parseCreditLimits(
      JSON.stringify({
        limity: [
          { nrRachunku: RACHUNEK, limitGrosze: 500000, waluta: 'PLN', obowiazujeOd: '2026-01-01' },
          { nrRachunku: RACHUNEK, limitGrosze: 500000, waluta: 'PLN' },
          { nrRachunku: '123', limitGrosze: 500000, waluta: 'PLN', obowiazujeOd: '2026-01-01' },
          { nrRachunku: RACHUNEK, limitGrosze: -1, waluta: 'PLN', obowiazujeOd: '2026-01-01' },
          { nrRachunku: RACHUNEK, limitGrosze: 1234.5, waluta: 'PLN', obowiazujeOd: '2026-01-01' },
          { nrRachunku: RACHUNEK, limitGrosze: 500000, waluta: 'GBP', obowiazujeOd: '2026-01-01' },
          { nrRachunku: RACHUNEK, limitGrosze: 500000, waluta: 'PLN', obowiazujeOd: '01.01.2026' },
        ],
      }),
    );

    expect(limity).toHaveLength(1);
  });

  it('zwraca pustą listę dla konfiguracji bez wpisów', () => {
    expect(parseCreditLimits('{}')).toEqual([]);
  });
});

describe('loadCreditLimits', () => {
  it('wczytuje konfigurację limitów kredytowych z katalogu dane', () => {
    const limity = loadCreditLimits('dane/limity_rachunkow.json');

    expect(limity.length).toBeGreaterThan(0);
    expect(findCreditLimit(limity, RACHUNEK, '2026-08-12')?.limitGrosze).toBe(7500000);
  });
});

describe('checkCreditLimits', () => {
  const limity = [limit({ limitGrosze: 500000 })];

  it('przyjmuje pustą partię', () => {
    const wynik = checkCreditLimits(limity, []);

    expect(wynik.ok).toBe(true);
    expect(wynik.bledy).toEqual([]);
  });

  it('przepuszcza operacje rachunków bez skonfigurowanego limitu kredytowego', () => {
    const wynik = checkCreditLimits(limity, [
      transakcja({ id: 'OP-1', nrRachunku: INNY_RACHUNEK, kwotaGrosze: 9900000 }),
    ]);

    expect(wynik.ok).toBe(true);
  });

  it('sumuje obciążenia narastająco w obrębie jednego rachunku', () => {
    const wynik = checkCreditLimits(limity, [
      transakcja({ id: 'OP-1', kwotaGrosze: 300000 }),
      transakcja({ id: 'OP-2', kwotaGrosze: 300000 }),
    ]);

    expect(wynik.ok).toBe(false);
    expect(wynik.bledy).toHaveLength(1);
    expect(wynik.bledy[0]).toContain('OP-2');
  });

  it('nie miesza wykorzystania limitu kredytowego między rachunkami', () => {
    const wynik = checkCreditLimits(
      [limit({ limitGrosze: 500000 }), limit({ nrRachunku: INNY_RACHUNEK, limitGrosze: 500000 })],
      [
        transakcja({ id: 'OP-1', kwotaGrosze: 400000 }),
        transakcja({ id: 'OP-2', nrRachunku: INNY_RACHUNEK, kwotaGrosze: 400000 }),
      ],
    );

    expect(wynik.ok).toBe(true);
  });

  it('raportuje każdą operację ponad limitem kredytowym, nie tylko pierwszą', () => {
    const wynik = checkCreditLimits(limity, [
      transakcja({ id: 'OP-1', kwotaGrosze: 600000 }),
      transakcja({ id: 'OP-2', kwotaGrosze: 100000 }),
    ]);

    expect(wynik.bledy).toHaveLength(2);
  });

  it('zwraca największe pojedyncze przekroczenie w partii', () => {
    const wynik = checkCreditLimits(limity, [
      transakcja({ id: 'OP-1', kwotaGrosze: 600000 }),
      transakcja({ id: 'OP-2', kwotaGrosze: 100000 }),
    ]);

    expect(wynik.przekroczenieGrosze).toBe(200000);
  });

  it('uwzględnia limit kredytowy obowiązujący na datę waluty operacji', () => {
    const wynik = checkCreditLimits(
      [
        limit({ limitGrosze: 100000, effectiveFrom: '2026-01-01' }),
        limit({ limitGrosze: 900000, effectiveFrom: '2026-09-01' }),
      ],
      [transakcja({ id: 'OP-1', kwotaGrosze: 500000, dataWaluty: '2026-08-12' })],
    );

    expect(wynik.ok).toBe(false);
  });
});
