import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { accrueInterest } from '../../src/interest/accrue.js';

// Testy charakteryzujące utrwalają zachowanie modułu takie, jakie jest dzisiaj,
// a nie takie, jakie być powinno — jeżeli `accrue.ts` opiera się na błędnym
// wyniku `addBusinessDays`, migawka utrwali również ten błąd.

const PLIK = new URL('../../dane/odsetki_przypadki.json', import.meta.url);
const zestaw: any = JSON.parse(readFileSync(PLIK, 'utf8'));

/** Zwraca wejścia o podanych identyfikatorach, w kolejności z pliku. */
function przypadki(...ids: string[]): any[] {
  return zestaw.przypadki.filter((p: any) => ids.indexOf(p.id) >= 0);
}

describe('accrueInterest — utrwalone wyniki dla zestawu przypadków', () => {
  it('nalicza odsetki dla rachunków oszczędnościowych z kapitalizacją miesięczną', () => {
    for (const p of przypadki('p01', 'p03', 'p18')) {
      expect(accrueInterest(p.wejscie)).toMatchSnapshot(p.id);
    }
  });

  it('nalicza odsetki dla lokaty terminowej rozliczanej na koniec okresu', () => {
    const p = przypadki('p08')[0];
    expect(accrueInterest(p.wejscie)).toMatchSnapshot();
  });

  it('zachowuje kształt wyniku dla rachunku z operacjami w trakcie miesiąca', () => {
    const p = przypadki('p06')[0];
    const wynik = accrueInterest(p.wejscie);
    expect(Object.keys(wynik).sort()).toMatchSnapshot();
    expect(wynik).toMatchSnapshot();
  });

  it('utrwala sumę odsetek brutto dla rachunków oszczędnościowych i lokat', () => {
    const suma = przypadki('p01', 'p03', 'p08', 'p09', 'p18')
      .map((p: any) => accrueInterest(p.wejscie).odsetkiBruttoGrosze)
      .reduce((a: number, b: number) => a + b, 0);
    expect(suma).toMatchSnapshot();
  });
});
