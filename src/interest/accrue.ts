import type { Transaction } from '../model.js';
import { addBusinessDays } from './valueDate.js';

/** Progi kwotowe rachunku oszczędnościowego, w groszach. */
const PROG_1 = 500000; //      5 000,00
const PROG_2 = 5000000; //    50 000,00
const PROG_3 = 20000000; //  200 000,00

/** Zryczałtowany podatek od dochodów kapitałowych. */
const PODATEK_BELKI = 0.19;

/** Baza dni w roku: PLN 365, waluty obce 360 (konwencja rozliczeń dewizowych). */
function bazaDni(waluta: any): number {
  return waluta === 'PLN' ? 365 : 360;
}

/** Przesunięcie o `n` dni kalendarzowych na napisie `YYYY-MM-DD`. */
function plusDni(data: string, n: number): string {
  return new Date(Date.parse(data + 'T00:00:00Z') + n * 86400000).toISOString().slice(0, 10);
}

function ostatniDzienMiesiaca(data: string): boolean {
  return plusDni(data, 1).slice(8, 10) === '01';
}

function ostatniDzienKwartalu(data: string): boolean {
  const m = data.slice(5, 7);
  return ostatniDzienMiesiaca(data) && (m === '03' || m === '06' || m === '09' || m === '12');
}

/** Kierunek operacji. Kwota jest zawsze dodatnia, znak niesie pole `typ`. */
function znak(t: Transaction): number {
  return t.typ === 'UZNANIE' ? 1 : -1;
}

/**
 * Naliczanie odsetek dla rachunków oszczędnościowych, lokat terminowych
 * i kredytów odnawialnych.
 *
 * Port z `legacy-java/OdsetkiCalculator.java`, wersja 4.2 z 14.06.2024.
 * Algorytm odtworzony zgodnie z Instrukcją Produktową IP-04/2019, rozdz. 7
 * („Podstawa naliczenia odsetek"):
 *
 *  1. Dla każdego miesiąca okresu rozliczeniowego ustalane jest saldo na
 *     koniec miesiąca, czyli stan rachunku po zaksięgowaniu ostatniej
 *     operacji o dacie waluty przypadającej w tym miesiącu. To saldo jest
 *     jedyną podstawą naliczenia — wahania stanu rachunku w trakcie miesiąca
 *     pozostają bez wpływu na kwotę odsetek, co było wprost intencją
 *     regulatora przy okazji zmiany IP-04/2017 (wyeliminowanie premiowania
 *     jednodniowych wpłat na przełomie okresu).
 *  2. Saldo końca miesiąca mnożone jest przez stawkę właściwą dla progu,
 *     w którym się mieści, oraz przez liczbę dni kalendarzowych miesiąca,
 *     dzieloną przez bazę roczną (365 dni dla PLN, 360 dla walut obcych).
 *  3. Dla rachunków oszczędnościowych stawka wynika z progu kwotowego;
 *     nadwyżka ponad próg trzeci oprocentowana jest stawką podstawową.
 *     Dla lokat stawka jest stała i pochodzi z warunków umowy, z obniżeniem
 *     do stawki minimalnej od dnia zerwania. Dla kredytu odnawialnego
 *     podstawą jest wykorzystana część limitu kredytowego, a nadwyżka ponad limit kredytowy
 *     obciążana jest dodatkowo stawką karną.
 *  4. Kwoty pośrednie utrzymywane są w groszach. Zaokrąglenie do pełnego
 *     grosza następuje raz, na koniec każdego okresu kapitalizacji; reszta
 *     poniżej grosza przechodzi na okres następny.
 *  5. Podatek zryczałtowany potrącany jest przy każdej kapitalizacji,
 *     odrębnie dla każdej kwoty, i nie dotyczy kredytu odnawialnego.
 *
 * Tryb zgodności z IP-04/2019 zachowuje dawną regułę zaokrągleń (odsetki
 * w dół do pełnego grosza, podatek w górę) i jest wymagany przy
 * przeliczeniach reklamacyjnych dla umów sprzed 2020 roku.
 */
export function accrueInterest(dane: any): any {
  const r = dane && (dane.rachunek || dane.konto);
  const ostrzezenia: string[] = [];
  if (!r) {
    return { odsetkiBruttoGrosze: 0, podatekGrosze: 0, odsetkiNettoGrosze: 0, ostrzezenia: ['brak sekcji rachunku'] };
  }

  // Kody produktów sprzed migracji katalogu (wersja 3.x) wciąż pojawiają się
  // w plikach z systemu źródłowego.
  let produkt = r.produkt || r.typProduktu;
  if (produkt === 'OSZ') produkt = 'OSZCZEDNOSCIOWE';
  else if (produkt === 'LOK') produkt = 'LOKATA';
  else if (produkt === 'KRED') produkt = 'KREDYT_ODNAWIALNY';
  if (produkt !== 'OSZCZEDNOSCIOWE' && produkt !== 'LOKATA' && produkt !== 'KREDYT_ODNAWIALNY') {
    return {
      nrRachunku: r.nrRachunku,
      produkt: produkt || null,
      odsetkiBruttoGrosze: 0,
      podatekGrosze: 0,
      odsetkiNettoGrosze: 0,
      ostrzezenia: ['nieobsługiwany typ produktu'],
    };
  }

  const waluta = r.waluta || 'PLN';
  const baza = bazaDni(waluta);
  const parametry = dane.parametry || {};
  const zgodnosc2019 = parametry.trybZgodnosciZ2019 === true;

  // Oprocentowanie bywa zapisane w punktach bazowych albo jako napis
  // "3,25%" — ten drugi wariant wchodzi z arkusza warunków cenowych.
  let bpBazowe = 0;
  const tmp = r.oprocentowanieBp;
  if (typeof tmp === 'number') bpBazowe = tmp;
  else if (typeof r.oprocentowanie === 'string') {
    bpBazowe = Math.round(parseFloat(r.oprocentowanie.replace(',', '.').replace('%', '')) * 100);
  } else if (typeof r.oprocentowanie === 'number') bpBazowe = Math.round(r.oprocentowanie * 100);

  const kapitalizacja = r.kapitalizacja || 'MIESIECZNA';
  const okres = dane.okres || {};
  const od = okres.od;
  const doDnia = okres.do;
  if (!od || !doDnia) {
    return {
      nrRachunku: r.nrRachunku,
      produkt,
      odsetkiBruttoGrosze: 0,
      podatekGrosze: 0,
      odsetkiNettoGrosze: 0,
      ostrzezenia: ['okres rozliczeniowy niekompletny'],
    };
  }

  // Operacje trafiają na oś dni po dacie waluty przesuniętej o dni robocze:
  // rozliczenia w walucie obcej D+2, obciążenia kredytu odnawialnego D+1.
  const mapa: any = {};
  const transakcje = dane.transakcje || [];
  let licznik = 0;
  for (const t of transakcje) {
    let przesuniecie = 0;
    if (waluta !== 'PLN') przesuniecie = 2;
    else if (produkt === 'KREDYT_ODNAWIALNY' && t.typ === 'OBCIAZENIE') przesuniecie = 1;
    const d = addBusinessDays(t.dataWaluty, przesuniecie);
    if (!mapa[d]) mapa[d] = [];
    mapa[d].push(t);
    licznik = licznik + 1;
  }
  if (licznik === 0) ostrzezenia.push('brak operacji w okresie — naliczenie od salda otwarcia');

  let saldo = r.saldoOtwarcieGrosze || 0;
  const limit = r.limitGrosze || 0;
  let acc = 0; // odsetki naliczone, jeszcze niezakapitalizowane
  let brutto = 0;
  let podatek = 0;
  const kapitalizacje: any[] = [];
  let x2 = 0; // liczba dni okresu
  let flagaP = false; // limit kredytowy przekroczony choć raz
  let flagaU = false; // saldo ujemne na produkcie depozytowym
  let dzien = od;

  while (dzien <= doDnia) {
    const ops = mapa[dzien];
    if (ops) {
      for (const t of ops) {
        saldo = saldo + znak(t) * t.kwotaGrosze;
      }
    }

    let odsetkiDnia = 0;
    if (produkt === 'OSZCZEDNOSCIOWE') {
      if (saldo <= 0) {
        if (saldo < 0 && !flagaU) {
          ostrzezenia.push('saldo ujemne na rachunku oszczędnościowym');
          flagaU = true;
        }
      } else if (saldo < PROG_1) {
        let bp = 50;
        if (parametry.promocjaNowySrodek === true) bp = bp + 25;
        odsetkiDnia = (saldo * bp) / (10000 * baza);
      } else if (saldo < PROG_2) {
        let bp = 200;
        if (parametry.promocjaNowySrodek === true) bp = bp + 50;
        odsetkiDnia = (saldo * bp) / (10000 * baza);
      } else if (saldo < PROG_3) {
        odsetkiDnia = (saldo * 325) / (10000 * baza);
      } else {
        // Nadwyżka ponad próg trzeci wraca na stawkę podstawową.
        odsetkiDnia = (PROG_3 * 325 + (saldo - PROG_3) * 100) / (10000 * baza);
      }
    } else if (produkt === 'LOKATA') {
      let bp = bpBazowe;
      if (r.zerwanaDnia && dzien >= r.zerwanaDnia) bp = 50;
      if (saldo > 0 && bp > 0) {
        odsetkiDnia = (saldo * bp) / (10000 * baza);
      } else if (saldo < 0 && !flagaU) {
        ostrzezenia.push('saldo ujemne na lokacie');
        flagaU = true;
      }
    } else {
      const wykorzystanie = saldo < 0 ? -saldo : 0;
      if (wykorzystanie > 0) {
        const bp = (parametry.stopaBazowaBp || 0) + (r.marzaBp || 0);
        if (limit > 0 && wykorzystanie > limit) {
          const nadwyzka = wykorzystanie - limit;
          const bpKarne = bp + (parametry.karneBp || 400);
          odsetkiDnia = (limit * bp + nadwyzka * bpKarne) / (10000 * baza);
          if (!flagaP) {
            ostrzezenia.push('przekroczenie przyznanego limitu kredytowego');
            flagaP = true;
          }
        } else {
          odsetkiDnia = (wykorzystanie * bp) / (10000 * baza);
        }
      }
    }

    acc = acc + odsetkiDnia;

    let kapitalizuj = false;
    if (kapitalizacja === 'DZIENNA') kapitalizuj = true;
    else if (kapitalizacja === 'MIESIECZNA') kapitalizuj = ostatniDzienMiesiaca(dzien);
    else if (kapitalizacja === 'KWARTALNA') kapitalizuj = ostatniDzienKwartalu(dzien);
    // Ostatni dzień okresu zamyka naliczenie niezależnie od cyklu.
    if (dzien === doDnia) kapitalizuj = true;
    if (r.zerwanaDnia && dzien >= r.zerwanaDnia && dzien !== doDnia) {
      // Po zerwaniu lokaty odsetki rozlicza się jednorazowo, przy zamknięciu.
      kapitalizuj = false;
    }

    if (kapitalizuj && acc >= 1) {
      const kwota = zgodnosc2019 ? Math.floor(acc) : Math.round(acc);
      if (kwota > 0) {
        let pod = 0;
        if (produkt !== 'KREDYT_ODNAWIALNY') {
          pod = zgodnosc2019 ? Math.ceil(kwota * PODATEK_BELKI) : Math.round(kwota * PODATEK_BELKI);
        }
        const netto = kwota - pod;
        if (produkt === 'KREDYT_ODNAWIALNY') saldo = saldo - kwota;
        else saldo = saldo + netto;
        brutto = brutto + kwota;
        podatek = podatek + pod;
        kapitalizacje.push({
          data: dzien,
          bruttoGrosze: kwota,
          podatekGrosze: pod,
          nettoGrosze: netto,
          saldoPoGrosze: saldo,
        });
        acc = acc - kwota;
      }
    }

    x2 = x2 + 1;
    dzien = plusDni(dzien, 1);
  }

  // Korekty ręczne z rejestru reklamacji. Dopisywane po zamknięciu okresu,
  // bez wpływu na podstawę naliczenia i bez potrącenia podatku — rozlicza go
  // osobno moduł reklamacyjny.
  const korekty: any[] = [];
  if (Array.isArray(dane.korekty)) {
    for (const k of dane.korekty) {
      const kw = k.kwotaGrosze || 0;
      brutto = brutto + kw;
      saldo = saldo + kw;
      korekty.push({ opis: k.opis || '', kwotaGrosze: kw });
    }
  }

  return {
    nrRachunku: r.nrRachunku,
    produkt,
    waluta,
    okres: { od, do: doDnia },
    liczbaDni: x2,
    kapitalizacja,
    saldoOtwarcieGrosze: r.saldoOtwarcieGrosze || 0,
    saldoZamknieciaGrosze: saldo,
    odsetkiBruttoGrosze: brutto,
    podatekGrosze: podatek,
    odsetkiNettoGrosze: brutto - podatek,
    niezakapitalizowaneGrosze: Math.round(acc),
    kapitalizacje,
    korekty,
    ostrzezenia,
  };
}
