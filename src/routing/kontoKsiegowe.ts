import type { NrRachunku, TypOperacji, Waluta } from '../model.js';
import type { Produkt } from './schemat.js';

/**
 * Składanie numeru konta księgowego z segmentów.
 *
 * Numer ma postać `ZZ-OOO-RRRK-W`:
 *
 * - `ZZ`   zespół kont, z reguły księgowania,
 * - `OOO`  kod oddziału prowadzącego rachunek, z numeru NRB,
 * - `RRR`  rodzaj operacji, z reguły księgowania,
 * - `K`    znacznik kierunku, `U` dla uznania i `O` dla obciążenia,
 * - `W`    cyfra waluty.
 *
 * Numer jest budowany zawsze — również wtedy, gdy któregoś ze składników
 * nie udało się ustalić. Rozliczenie dzienne musi się domknąć tego samego
 * dnia, więc brak odwzorowania nie może zatrzymać księgowania; operacje
 * z segmentem zastępczym wyłapuje potem uzgodnienie międzyoddziałowe.
 */

/** Kody oddziałów po czterocyfrowym kodzie oddziału z numeru NRB. */
const ODDZIALY: Record<string, string> = {
  '1031': '103',
  '1235': '133',
  '1442': '144',
  '2090': '209',
  '2918': '291',
  '4113': '411',
  '4142': '414',
  '4323': '204',
  '4801': '480',
  '5162': '516',
  '5296': '529',
  '5966': '596',
  '6693': '669',
  '7023': '702',
  '7930': '793',
  '7957': '795',
  '8054': '207',
  '8884': '888',
  '8918': '118',
  '9104': '910',
  '9128': '912',
};

/** Segment zastępczy, gdy numeru rozliczeniowego nie ma w odwzorowaniu. */
const ODDZIAL_NIEZNANY = '000';

/** Cyfra waluty w numerze konta. */
const CYFRY_WALUT: Record<string, string> = {
  PLN: '0',
  EUR: '1',
  USD: '2',
};

/** Cyfra zastępcza dla waluty spoza odwzorowania. */
const CYFRA_WALUTY_NIEZNANEJ = '9';

/**
 * Data wejścia nowego planu kont.
 *
 * Operacje z datą waluty wcześniejszą niż ta księgują się w trybie zgodności
 * ze starym systemem, w którym kierunek zapisywano z punktu widzenia banku,
 * a nie klienta. Uznanie rachunku klienta było wtedy obciążeniem banku
 * i odwrotnie, więc znacznik kierunku jest w tym trybie odwracany.
 */
const GRANICA_TRYBU_ZGODNOSCI = '2026-04-01';

/** Cyfra produktu w numerze NRB — pierwsza cyfra części rachunkowej. */
const POZYCJA_CYFRY_PRODUKTU = 10;

/**
 * Czterocyfrowy kod oddziału — druga połowa ośmiocyfrowego numeru
 * rozliczeniowego, czyli znaki o indeksach 6–9 numeru NRB.
 */
const POCZATEK_KODU_ODDZIALU = 6;
const KONIEC_KODU_ODDZIALU = 10;

/**
 * Wyprowadza rodzaj rachunku z numeru NRB.
 *
 * Numery spoza znanych zakresów traktujemy jak rachunek bieżący — tak samo
 * robił system, z którego migrowaliśmy.
 */
export function wyznaczProdukt(nrRachunku: NrRachunku): Produkt {
  const cyfra = nrRachunku.charAt(POZYCJA_CYFRY_PRODUKTU);

  if (cyfra === '3' || cyfra === '4') {
    return 'OSZCZEDNOSCIOWE';
  }
  if (cyfra === '5') {
    return 'POWIERNICZY';
  }
  if (cyfra === '6' || cyfra === '7') {
    return 'WALUTOWY';
  }
  return 'BIEZACY';
}

/** Kod oddziału prowadzącego rachunek. */
export function wyznaczOddzial(nrRachunku: NrRachunku): string {
  const kodOddzialu = nrRachunku.slice(
    POCZATEK_KODU_ODDZIALU,
    KONIEC_KODU_ODDZIALU,
  );
  return ODDZIALY[kodOddzialu] ?? ODDZIAL_NIEZNANY;
}

/** Czy operacja księguje się w trybie zgodności ze starym planem kont. */
export function jestTrybZgodnosci(dataWaluty: string): boolean {
  return dataWaluty < GRANICA_TRYBU_ZGODNOSCI;
}

/**
 * Znacznik kierunku operacji.
 *
 * W trybie zgodności kierunek jest odwracany — patrz komentarz przy
 * `GRANICA_TRYBU_ZGODNOSCI`.
 */
export function znacznikKierunku(typ: TypOperacji, dataWaluty: string): string {
  const znacznik = typ === 'UZNANIE' ? 'U' : 'O';

  if (!jestTrybZgodnosci(dataWaluty)) {
    return znacznik;
  }
  return znacznik === 'U' ? 'O' : 'U';
}

export interface SkladnikiKonta {
  segmentZespolu: string;
  nrRachunku: NrRachunku;
  segmentRodzaju: string;
  waluta: Waluta;
  typ: TypOperacji;
  dataWaluty: string;
}

/** Składa pełny numer konta księgowego. */
export function zbudujKonto(skladniki: SkladnikiKonta): string {
  const oddzial = wyznaczOddzial(skladniki.nrRachunku);
  const kierunek = znacznikKierunku(skladniki.typ, skladniki.dataWaluty);
  const cyfraWaluty = CYFRY_WALUT[skladniki.waluta] ?? CYFRA_WALUTY_NIEZNANEJ;

  return `${skladniki.segmentZespolu}-${oddzial}-${skladniki.segmentRodzaju}${kierunek}-${cyfraWaluty}`;
}

/** Czy numer konta zawiera którykolwiek z segmentów zastępczych. */
export function maSegmentZastepczy(konto: string): boolean {
  const segmenty = konto.split('-');
  const oddzial = segmenty[1];
  const waluta = segmenty[3];

  return oddzial === ODDZIAL_NIEZNANY || waluta === CYFRA_WALUTY_NIEZNANEJ;
}
