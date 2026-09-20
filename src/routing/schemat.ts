import type { TypOperacji, Waluta } from '../model.js';

/**
 * Schemat księgowania — reguły przypisujące operację do konta księgowego.
 *
 * Rejestr rozliczeń nie decyduje sam, na które konto trafia operacja. Decyduje
 * o tym tablica reguł uzgodniona z Departamentem Rachunkowości i zmieniana
 * aneksami, dlatego każda reguła ma własne okno obowiązywania. Reguły są
 * uporządkowane malejąco po priorytecie i dopasowywane do skutku — pierwsza,
 * której warunek jest spełniony w całości, wyznacza konto.
 *
 * Moduł jest wyłącznie opisem. Dopasowaniem zajmuje się `silnik.ts`,
 * składaniem numeru konta `kontoKsiegowe.ts`.
 */

/** Rodzaj rachunku, wyprowadzany z numeru NRB. */
export type Produkt = 'BIEZACY' | 'OSZCZEDNOSCIOWE' | 'POWIERNICZY' | 'WALUTOWY';

/** Kanał, którym operacja trafiła do rejestru. */
export type Kanal =
  | 'PRZELEW_KRAJOWY'
  | 'SEPA'
  | 'SWIFT'
  | 'KARTA'
  | 'WEWNETRZNY'
  | 'KASA'
  | 'NIEROZPOZNANY';

/** Dodatkowe oznaczenie operacji, rozpoznawane po tytule. */
export type Flaga = 'STORNO' | 'KOREKTA' | 'PROWIZJA' | 'MASOWA';

/**
 * Warunek reguły. Pola pominięte nie zawężają dopasowania — reguła bez
 * żadnego pola pasuje do wszystkiego.
 */
export interface Warunek {
  produkt?: readonly Produkt[];
  waluta?: readonly Waluta[];
  typ?: TypOperacji;
  kanal?: readonly Kanal[];
  /** Dolna granica kwoty w groszach, włącznie. */
  odGroszy?: number;
  /** Górna granica kwoty w groszach, włącznie. */
  doGroszy?: number;
  flaga?: Flaga;
  /** Pierwszy dzień obowiązywania reguły, `YYYY-MM-DD`. */
  obowiazujeOd?: string;
  /** Ostatni dzień obowiązywania reguły, `YYYY-MM-DD`. */
  obowiazujeDo?: string;
}

export interface RegulaKsiegowania {
  kod: string;
  opis: string;
  /** Wyższa wartość znaczy wcześniejsze dopasowanie. */
  priorytet: number;
  warunek: Warunek;
  /** Dwucyfrowy segment zespołu kont. */
  segmentZespolu: string;
  /** Trzycyfrowy segment rodzaju operacji. */
  segmentRodzaju: string;
  /** Czy zaksięgowanie wymaga akceptacji drugiej osoby. */
  wymagaAkceptacji: boolean;
}

/**
 * Rozpoznanie kanału po tytule operacji.
 *
 * Systemy źródłowe nie przekazują kanału w osobnym polu, więc wyprowadzamy go
 * z tytułu. Wzorce sprawdzane są po kolei, pierwszy pasujący wygrywa.
 */
export const WZORCE_KANALU: readonly (readonly [RegExp, Kanal])[] = [
  [/\bmt103\b|\bswift\b|polecenie wyp[łl]aty/i, 'SWIFT'],
  [/\bsepa\b|\bsct\b/i, 'SEPA'],
  [/wp[łl]ata got[óo]wkowa|wyp[łl]ata w kasie|wp[łl]atomat/i, 'KASA'],
  [/p[łl]atno[śs][ćc] kart[ąa]|\bblik\b/i, 'KARTA'],
  [/przelew|zap[łl]ata za faktur|sk[łl]adka zus|zaliczka na podatek/i, 'PRZELEW_KRAJOWY'],
  [/przelew w[łl]asny|mi[ęe]dzy rachunkami|wewn[ęe]trzn/i, 'WEWNETRZNY'],
  [/wynagrodzenie|lista p[łl]ac/i, 'PRZELEW_KRAJOWY'],
  [/rata kredytu|zwrot nadp[łl]aty/i, 'PRZELEW_KRAJOWY'],
];

/** Rozpoznanie flagi po tytule operacji. Pierwszy pasujący wzorzec wygrywa. */
export const WZORCE_FLAGI: readonly (readonly [RegExp, Flaga])[] = [
  [/\bstorno\b/i, 'STORNO'],
  [/\bkorekta\b|korekta ksi[ęe]gowania/i, 'KOREKTA'],
  [/op[łl]ata za prowadzenie|op[łl]ata abonamentowa|rozliczenie prowizji|prowizja/i, 'PROWIZJA'],
  [/wynagrodzenie|lista p[łl]ac|przelew zbiorczy/i, 'MASOWA'],
];

/**
 * Tablica reguł, w kolejności dopasowywania.
 *
 * Kolejność odpowiada priorytetom nadanym przez Departament Rachunkowości.
 * Zmiana kolejności wymaga uzgodnienia — numery reguł są cytowane
 * w instrukcji służbowej i w raportach dla audytu.
 */
export const REGULY: readonly RegulaKsiegowania[] = [
  {
    kod: 'R01',
    opis: 'Storno dowolnej operacji wraca na konto techniczne stornowań.',
    priorytet: 100,
    warunek: { flaga: 'STORNO' },
    segmentZespolu: '49',
    segmentRodzaju: '900',
    wymagaAkceptacji: true,
  },
  {
    kod: 'R02',
    opis: 'Korekta księgowania po zamknięciu dnia — konto korekt.',
    priorytet: 95,
    warunek: { flaga: 'KOREKTA' },
    segmentZespolu: '49',
    segmentRodzaju: '910',
    wymagaAkceptacji: true,
  },
  {
    kod: 'R03',
    opis: 'Prowizje i opłaty niezależnie od produktu i kanału.',
    priorytet: 90,
    warunek: { flaga: 'PROWIZJA' },
    segmentZespolu: '75',
    segmentRodzaju: '110',
    wymagaAkceptacji: false,
  },
  {
    kod: 'R04',
    opis: 'Obciążenia rachunków oszczędnościowych — konto wypłat z oszczędności.',
    priorytet: 80,
    warunek: { produkt: ['OSZCZEDNOSCIOWE'], typ: 'OBCIAZENIE' },
    segmentZespolu: '24',
    segmentRodzaju: '310',
    wymagaAkceptacji: false,
  },
  {
    kod: 'R05',
    opis: 'Uznania rachunków oszczędnościowych.',
    priorytet: 80,
    warunek: { produkt: ['OSZCZEDNOSCIOWE'], typ: 'UZNANIE' },
    segmentZespolu: '24',
    segmentRodzaju: '300',
    wymagaAkceptacji: false,
  },
  {
    kod: 'R06',
    opis: 'Rachunki powiernicze — wszystkie operacje na osobnym zespole kont.',
    priorytet: 78,
    warunek: { produkt: ['POWIERNICZY'] },
    segmentZespolu: '13',
    segmentRodzaju: '500',
    wymagaAkceptacji: true,
  },
  {
    kod: 'R07',
    opis: 'Przelewy zagraniczne od 50 000 zł włącznie — kontrola wzmożona.',
    priorytet: 70,
    warunek: { kanal: ['SWIFT'], odGroszy: 5000000 },
    segmentZespolu: '21',
    segmentRodzaju: '620',
    wymagaAkceptacji: true,
  },
  {
    kod: 'R08',
    opis: 'Pozostałe przelewy zagraniczne, w tym SEPA.',
    priorytet: 65,
    warunek: { kanal: ['SWIFT', 'SEPA'] },
    segmentZespolu: '21',
    segmentRodzaju: '600',
    wymagaAkceptacji: false,
  },
  {
    kod: 'R09',
    opis: 'Wypłaty dewizowe z oszczędności od 10 000 zł włącznie — wymóg z aneksu 2026/04.',
    priorytet: 68,
    warunek: {
      produkt: ['OSZCZEDNOSCIOWE'],
      typ: 'OBCIAZENIE',
      kanal: ['SWIFT'],
      odGroszy: 1000000,
    },
    segmentZespolu: '24',
    segmentRodzaju: '315',
    wymagaAkceptacji: true,
  },
  {
    kod: 'R10',
    opis: 'Operacje kartowe na rachunkach bieżących.',
    priorytet: 60,
    warunek: { produkt: ['BIEZACY'], kanal: ['KARTA'] },
    segmentZespolu: '22',
    segmentRodzaju: '410',
    wymagaAkceptacji: false,
  },
  {
    kod: 'R11',
    opis: 'Operacje walutowe na rachunkach walutowych, od wejścia aneksu 2026/07.',
    priorytet: 55,
    warunek: {
      produkt: ['WALUTOWY'],
      waluta: ['EUR', 'USD'],
      obowiazujeOd: '2026-07-01',
    },
    segmentZespolu: '23',
    segmentRodzaju: '700',
    wymagaAkceptacji: false,
  },
  {
    kod: 'R12',
    opis: 'Reguła domyślna — rachunki bieżące i wszystko, czego nie objęły poprzednie.',
    priorytet: 10,
    warunek: {},
    segmentZespolu: '22',
    segmentRodzaju: '100',
    wymagaAkceptacji: false,
  },
];
