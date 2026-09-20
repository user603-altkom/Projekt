import { describe, expect, it } from 'vitest';

import type { Transaction } from '../../src/model.js';
import { wyznaczOddzial, wyznaczProdukt, zbudujKonto } from '../../src/routing/kontoKsiegowe.js';
import { rozpoznajFlage, rozpoznajKanal, zaksieguj } from '../../src/routing/silnik.js';

/**
 * Buduje numer NRB o zadanym numerze rozliczeniowym i cyfrze produktu,
 * żeby w teście widać było wyłącznie to, co go interesuje.
 */
function nrb(numerRozliczeniowy: string, cyfraProduktu: string): string {
  return `00${'0000'}${numerRozliczeniowy}${cyfraProduktu}${'0'.repeat(15)}`;
}

function transakcja(zmiany: Partial<Transaction> = {}): Transaction {
  return {
    id: 'OP-2026-08-0001',
    nrRachunku: nrb('8054', '0'),
    kwotaGrosze: 123456,
    waluta: 'PLN',
    typ: 'UZNANIE',
    bookedAt: '2026-08-03T09:12:41',
    dataWaluty: '2026-08-03',
    tytul: 'Zapłata za fakturę FV/2026/08/0031',
    ...zmiany,
  };
}

describe('rozpoznajKanal', () => {
  it('rozpoznaje wpłatę w kasie', () => {
    expect(rozpoznajKanal('Wpłata gotówkowa - wpłatomat nr 0881')).toBe('KASA');
  });

  it('rozpoznaje płatność kartą', () => {
    expect(rozpoznajKanal('Płatność kartą - PIEKARNIA U JĘDRZEJA')).toBe('KARTA');
  });

  it('rozpoznaje przelew przychodzący jako przelew krajowy', () => {
    expect(rozpoznajKanal('Przelew przychodzący od Agencja Ochrony STRAŻNIK')).toBe(
      'PRZELEW_KRAJOWY',
    );
  });

  it('zwraca NIEROZPOZNANY, gdy żaden wzorzec nie pasuje', () => {
    expect(rozpoznajKanal('Czynsz za lokal użytkowy 08/2026')).toBe('NIEROZPOZNANY');
  });
});

describe('rozpoznajFlage', () => {
  it('rozpoznaje prowizję po tytule opłaty', () => {
    expect(rozpoznajFlage('Opłata za prowadzenie rachunku bieżącego')).toBe('PROWIZJA');
  });

  it('nie nadaje flagi zwykłej zapłacie za fakturę', () => {
    expect(rozpoznajFlage('Zapłata za fakturę FV/2026/08/0031')).toBeUndefined();
  });
});

describe('wyznaczProdukt', () => {
  it('czyta rachunek oszczędnościowy z cyfry produktu', () => {
    expect(wyznaczProdukt(nrb('8054', '3'))).toBe('OSZCZEDNOSCIOWE');
  });

  it('traktuje nieznaną cyfrę produktu jak rachunek bieżący', () => {
    expect(wyznaczProdukt(nrb('8054', '9'))).toBe('BIEZACY');
  });
});

describe('wyznaczOddzial', () => {
  it('tłumaczy numer rozliczeniowy na kod oddziału', () => {
    expect(wyznaczOddzial(nrb('8054', '0'))).toBe('207');
  });

  it('zwraca segment zastępczy dla numeru spoza odwzorowania', () => {
    expect(wyznaczOddzial(nrb('5562', '0'))).toBe('000');
  });
});

describe('zbudujKonto', () => {
  it('składa numer konta z segmentów', () => {
    const konto = zbudujKonto({
      segmentZespolu: '24',
      nrRachunku: nrb('8054', '3'),
      segmentRodzaju: '310',
      waluta: 'PLN',
      typ: 'OBCIAZENIE',
      dataWaluty: '2026-08-03',
    });

    expect(konto).toBe('24-207-310O-0');
  });
});

describe('zaksieguj', () => {
  it('kieruje obciążenie rachunku oszczędnościowego na regułę R04', () => {
    const wynik = zaksieguj(
      transakcja({
        nrRachunku: nrb('8054', '3'),
        typ: 'OBCIAZENIE',
        tytul: 'Zapłata za fakturę FV/2026/08/0031',
      }),
    );

    expect(wynik.kodReguly).toBe('R04');
    expect(wynik.produkt).toBe('OSZCZEDNOSCIOWE');
  });

  it('kieruje operację kartową na rachunku bieżącym na regułę R10', () => {
    const wynik = zaksieguj(
      transakcja({
        nrRachunku: nrb('8054', '0'),
        tytul: 'Płatność kartą - DRUKARNIA CYFROWA GRAFPOL',
      }),
    );

    expect(wynik.kodReguly).toBe('R10');
    expect(wynik.kanal).toBe('KARTA');
  });

  it('kieruje opłatę na regułę prowizyjną R03 niezależnie od produktu', () => {
    const wynik = zaksieguj(
      transakcja({ tytul: 'Opłata abonamentowa - usługi telekomunikacyjne' }),
    );

    expect(wynik.kodReguly).toBe('R03');
    expect(wynik.flaga).toBe('PROWIZJA');
  });

  it('oznacza konto z segmentem zastępczym', () => {
    const wynik = zaksieguj(transakcja({ nrRachunku: nrb('3789', '0') }));

    expect(wynik.segmentZastepczy).toBe(true);
  });
});
