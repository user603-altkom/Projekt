package pl.bank.odsetki;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

/**
 * Kalkulator odsetek dla rachunków oszczędnościowych, lokat terminowych
 * i kredytów odnawialnych. Warstwa serwisowa: dane rachunku i historię
 * operacji pobiera przez {@link RachunekRepository}, wynik zwraca jako
 * {@link WynikOdsetek}.
 */
public class OdsetkiCalculator {

    private static final BigDecimal PROG_1 = new BigDecimal("500000"); //   5 000,00
    private static final BigDecimal PROG_2 = new BigDecimal("5000000"); // 50 000,00
    private static final BigDecimal PROG_3 = new BigDecimal("20000000"); // 200 000,00
    private static final BigDecimal PODATEK_BELKI = new BigDecimal("0.19");
    private static final int KARNE_BP_DOMYSLNE = 400;
    private static final int SKALA_OBLICZEN = 10;

    private final RachunekRepository rachunekRepository;

    public OdsetkiCalculator(RachunekRepository rachunekRepository) {
        this.rachunekRepository = rachunekRepository;
    }

    /**
     * Nalicza odsetki za wskazany okres rozliczeniowy.
     * <p>
     * Wersja 3.6, z dnia 15.05.2023.
     * Algorytm zgodny z Instrukcją Produktową IP-04/2019, rozdz. 7
     * („Podstawa naliczenia odsetek”):
     * <p>
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
     *     podstawą jest wykorzystana część limitu, a nadwyżka ponad limit
     *     obciążana jest dodatkowo stawką karną.
     *  4. Kwoty pośrednie utrzymywane są w groszach. Zaokrąglenie do pełnego
     *     grosza następuje raz, na koniec każdego okresu kapitalizacji; reszta
     *     poniżej grosza przechodzi na okres następny.
     *  5. Podatek zryczałtowany potrącany jest przy każdej kapitalizacji,
     *     odrębnie dla każdej kwoty, i nie dotyczy kredytu odnawialnego.
     * <p>
     * Tryb zgodności z IP-04/2019 zachowuje dawną regułę zaokrągleń (odsetki
     * w dół do pełnego grosza, podatek w górę) i jest wymagany przy
     * przeliczeniach reklamacyjnych dla umów sprzed 2020 roku.
     *
     * @param nrRachunku numer rachunku, dla którego liczone jest naliczenie
     * @param okresOd pierwszy dzień okresu rozliczeniowego (włącznie)
     * @param okresDo ostatni dzień okresu rozliczeniowego (włącznie)
     * @param parametry parametry dodatkowe naliczenia (promocje, tryb zgodności, marże)
     * @return wynik naliczenia: kwoty, lista kapitalizacji i ewentualne ostrzeżenia
     */
    public WynikOdsetek naliczOdsetki(String nrRachunku, Date okresOd, Date okresDo, ParametryNaliczenia parametry) {
        if (nrRachunku == null || okresOd == null || okresDo == null) {
            throw new IllegalArgumentException("Numer rachunku i granice okresu rozliczeniowego są wymagane");
        }

        Rachunek rachunek = rachunekRepository.znajdzRachunek(nrRachunku);
        if (rachunek == null) {
            throw new IllegalArgumentException("Nie znaleziono rachunku " + nrRachunku);
        }
        List<PozycjaRachunku> pozycje = rachunekRepository.pobierzPozycje(nrRachunku, okresOd, okresDo);

        int bazaDni = "PLN".equals(rachunek.waluta) ? 365 : 360;

        BigDecimal saldo = rachunek.saldoOtwarcia;
        BigDecimal narosle = BigDecimal.ZERO; // odsetki naliczone, jeszcze niezakapitalizowane
        BigDecimal bruttoSuma = BigDecimal.ZERO;
        BigDecimal podatekSuma = BigDecimal.ZERO;
        List<PozycjaKapitalizacji> kapitalizacje = new ArrayList<PozycjaKapitalizacji>();
        List<String> ostrzezenia = new ArrayList<String>();
        boolean saldoUjemneZglaszane = false;
        boolean limitPrzekroczonyZglaszany = false;
        int indeksPozycji = 0;

        Calendar poczatekMiesiaca = new GregorianCalendar();
        poczatekMiesiaca.setTime(okresOd);
        zerujGodziny(poczatekMiesiaca);

        boolean toOstatniSegment = false;
        while (!toOstatniSegment) {
            // Ostatni dzień kalendarzowy bieżącego miesiąca, przycięty do końca okresu.
            Calendar koniecMiesiacaKal = (Calendar) poczatekMiesiaca.clone();
            koniecMiesiacaKal.set(Calendar.DAY_OF_MONTH, koniecMiesiacaKal.getActualMaximum(Calendar.DAY_OF_MONTH));
            Date prawdziwyKoniecMiesiaca = koniecMiesiacaKal.getTime();
            Date koniecSegmentu = prawdziwyKoniecMiesiaca.after(okresDo) ? okresDo : prawdziwyKoniecMiesiaca;
            toOstatniSegment = !koniecSegmentu.before(okresDo);
            boolean pelnyMiesiac = koniecSegmentu.equals(prawdziwyKoniecMiesiaca);

            // Księgowanie operacji z datą waluty przypadającą w tym miesiącu (do końca segmentu).
            while (indeksPozycji < pozycje.size() && !pozycje.get(indeksPozycji).dataWaluty.after(koniecSegmentu)) {
                PozycjaRachunku pozycja = pozycje.get(indeksPozycji);
                if ("UZNANIE".equals(pozycja.typ)) {
                    saldo = saldo.add(pozycja.kwota);
                } else {
                    saldo = saldo.subtract(pozycja.kwota);
                }
                indeksPozycji++;
            }

            // Saldo na koniec miesiąca — jedyna podstawa naliczenia dla całego miesiąca.
            BigDecimal saldoKoncaMiesiaca = saldo;
            int dniSegmentu = liczbaDni(poczatekMiesiaca.getTime(), koniecSegmentu);
            BigDecimal odsetkiMiesiaca = BigDecimal.ZERO;

            if ("OSZCZEDNOSCIOWE".equals(rachunek.produkt)) {
                if (saldoKoncaMiesiaca.signum() <= 0) {
                    if (saldoKoncaMiesiaca.signum() < 0 && !saldoUjemneZglaszane) {
                        ostrzezenia.add("saldo ujemne na rachunku oszczędnościowym");
                        saldoUjemneZglaszane = true;
                    }
                } else if (saldoKoncaMiesiaca.compareTo(PROG_1) < 0) {
                    int bp = 50;
                    if (parametry.promocjaNowySrodek) bp = bp + 25;
                    odsetkiMiesiaca = naliczWgStawki(saldoKoncaMiesiaca, bp, dniSegmentu, bazaDni);
                } else if (saldoKoncaMiesiaca.compareTo(PROG_2) < 0) {
                    int bp = 200;
                    if (parametry.promocjaNowySrodek) bp = bp + 50;
                    odsetkiMiesiaca = naliczWgStawki(saldoKoncaMiesiaca, bp, dniSegmentu, bazaDni);
                } else if (saldoKoncaMiesiaca.compareTo(PROG_3) < 0) {
                    odsetkiMiesiaca = naliczWgStawki(saldoKoncaMiesiaca, 325, dniSegmentu, bazaDni);
                } else {
                    // Nadwyżka ponad próg trzeci wraca na stawkę podstawową.
                    BigDecimal nadwyzka = saldoKoncaMiesiaca.subtract(PROG_3);
                    BigDecimal odProgu = naliczWgStawki(PROG_3, 325, dniSegmentu, bazaDni);
                    BigDecimal odNadwyzki = naliczWgStawki(nadwyzka, 100, dniSegmentu, bazaDni);
                    odsetkiMiesiaca = odProgu.add(odNadwyzki);
                }
            } else if ("LOKATA".equals(rachunek.produkt)) {
                int bp = rachunek.oprocentowanieBp;
                if (rachunek.zerwanaDnia != null && !koniecSegmentu.before(rachunek.zerwanaDnia)) bp = 50;
                if (saldoKoncaMiesiaca.signum() > 0 && bp > 0) {
                    odsetkiMiesiaca = naliczWgStawki(saldoKoncaMiesiaca, bp, dniSegmentu, bazaDni);
                } else if (saldoKoncaMiesiaca.signum() < 0 && !saldoUjemneZglaszane) {
                    ostrzezenia.add("saldo ujemne na lokacie");
                    saldoUjemneZglaszane = true;
                }
            } else if ("KREDYT_ODNAWIALNY".equals(rachunek.produkt)) {
                BigDecimal wykorzystanie = saldoKoncaMiesiaca.signum() < 0 ? saldoKoncaMiesiaca.negate() : BigDecimal.ZERO;
                if (wykorzystanie.signum() > 0) {
                    int bp = parametry.stopaBazowaBp + rachunek.marzaBp;
                    if (rachunek.limitOdnawialny.signum() > 0 && wykorzystanie.compareTo(rachunek.limitOdnawialny) > 0) {
                        BigDecimal nadwyzka = wykorzystanie.subtract(rachunek.limitOdnawialny);
                        int bpKarne = bp + (parametry.karneBp > 0 ? parametry.karneBp : KARNE_BP_DOMYSLNE);
                        BigDecimal odLimitu = naliczWgStawki(rachunek.limitOdnawialny, bp, dniSegmentu, bazaDni);
                        BigDecimal odNadwyzki = naliczWgStawki(nadwyzka, bpKarne, dniSegmentu, bazaDni);
                        odsetkiMiesiaca = odLimitu.add(odNadwyzki);
                        if (!limitPrzekroczonyZglaszany) {
                            ostrzezenia.add("przekroczenie przyznanego limitu");
                            limitPrzekroczonyZglaszany = true;
                        }
                    } else {
                        odsetkiMiesiaca = naliczWgStawki(wykorzystanie, bp, dniSegmentu, bazaDni);
                    }
                }
            } else {
                throw new IllegalArgumentException("Nieobsługiwany typ produktu: " + rachunek.produkt);
            }

            narosle = narosle.add(odsetkiMiesiaca);

            boolean kapitalizuj;
            if ("DZIENNA".equals(rachunek.kapitalizacja)) {
                kapitalizuj = true;
            } else if ("KWARTALNA".equals(rachunek.kapitalizacja)) {
                int miesiac = poczatekMiesiaca.get(Calendar.MONTH); // 0 = styczeń
                kapitalizuj = pelnyMiesiac && (miesiac == 2 || miesiac == 5 || miesiac == 8 || miesiac == 11);
            } else {
                kapitalizuj = pelnyMiesiac; // MIESIECZNA — domyślny cykl
            }
            // Ostatni miesiąc okresu zamyka naliczenie niezależnie od cyklu kapitalizacji.
            if (toOstatniSegment) kapitalizuj = true;
            if (rachunek.zerwanaDnia != null && !koniecSegmentu.before(rachunek.zerwanaDnia) && !toOstatniSegment) {
                // Po zerwaniu lokaty odsetki rozlicza się jednorazowo, przy zamknięciu.
                kapitalizuj = false;
            }

            if (kapitalizuj && narosle.compareTo(BigDecimal.ONE) >= 0) {
                boolean tryb2019 = parametry.trybZgodnosciZ2019;
                BigDecimal kwotaBrutto = tryb2019
                        ? narosle.setScale(0, RoundingMode.FLOOR)
                        : narosle.setScale(0, RoundingMode.HALF_UP);
                if (kwotaBrutto.signum() > 0) {
                    BigDecimal kwotaPodatku = BigDecimal.ZERO;
                    if (!"KREDYT_ODNAWIALNY".equals(rachunek.produkt)) {
                        BigDecimal podatekDokladny = kwotaBrutto.multiply(PODATEK_BELKI);
                        kwotaPodatku = tryb2019
                                ? podatekDokladny.setScale(0, RoundingMode.CEILING)
                                : podatekDokladny.setScale(0, RoundingMode.HALF_UP);
                    }
                    BigDecimal kwotaNetto = kwotaBrutto.subtract(kwotaPodatku);
                    if ("KREDYT_ODNAWIALNY".equals(rachunek.produkt)) {
                        saldo = saldo.subtract(kwotaBrutto);
                    } else {
                        saldo = saldo.add(kwotaNetto);
                    }
                    bruttoSuma = bruttoSuma.add(kwotaBrutto);
                    podatekSuma = podatekSuma.add(kwotaPodatku);
                    kapitalizacje.add(new PozycjaKapitalizacji(koniecSegmentu, kwotaBrutto, kwotaPodatku, kwotaNetto, saldo));
                    narosle = narosle.subtract(kwotaBrutto);
                }
            }

            poczatekMiesiaca.add(Calendar.MONTH, 1);
            poczatekMiesiaca.set(Calendar.DAY_OF_MONTH, 1);
        }

        WynikOdsetek wynik = new WynikOdsetek();
        wynik.nrRachunku = rachunek.nrRachunku;
        wynik.saldoZamknieciaGrosze = saldo;
        wynik.odsetkiBruttoGrosze = bruttoSuma;
        wynik.podatekGrosze = podatekSuma;
        wynik.odsetkiNettoGrosze = bruttoSuma.subtract(podatekSuma);
        wynik.kapitalizacje = kapitalizacje;
        wynik.ostrzezenia = ostrzezenia;
        return wynik;
    }

    /** Odsetki = saldo × punkty bazowe × liczba dni / (10000 × baza roczna). */
    private BigDecimal naliczWgStawki(BigDecimal saldo, int punktyBazowe, int dni, int bazaDni) {
        return saldo.multiply(BigDecimal.valueOf(punktyBazowe))
                .multiply(BigDecimal.valueOf(dni))
                .divide(BigDecimal.valueOf(10000L * bazaDni), SKALA_OBLICZEN, RoundingMode.HALF_UP);
    }

    /** Liczba dni kalendarzowych między datami, obie granice włącznie. */
    private int liczbaDni(Date od, Date doDnia) {
        long milisekundy = doDnia.getTime() - od.getTime();
        return (int) (milisekundy / (24L * 60 * 60 * 1000)) + 1;
    }

    private void zerujGodziny(Calendar kalendarz) {
        kalendarz.set(Calendar.HOUR_OF_DAY, 0);
        kalendarz.set(Calendar.MINUTE, 0);
        kalendarz.set(Calendar.SECOND, 0);
        kalendarz.set(Calendar.MILLISECOND, 0);
    }
}

// Klasy poniżej i interfejs repozytorium miały w oryginale osobne pliki w tym pakiecie;
// tu są zebrane razem, żeby całość dało się przeczytać z jednego pliku.

/** Dane rachunku potrzebne do naliczenia odsetek. */
class Rachunek {
    public final String nrRachunku, produkt, waluta, kapitalizacja;
    public final BigDecimal saldoOtwarcia, limitOdnawialny;
    public final int oprocentowanieBp, marzaBp;
    public final Date zerwanaDnia; // null, jeśli lokata nie została zerwana

    public Rachunek(String nrRachunku, String produkt, String waluta, BigDecimal saldoOtwarcia,
            BigDecimal limitOdnawialny, int oprocentowanieBp, int marzaBp, String kapitalizacja, Date zerwanaDnia) {
        this.nrRachunku = nrRachunku;
        this.produkt = produkt;
        this.waluta = waluta;
        this.saldoOtwarcia = saldoOtwarcia;
        this.limitOdnawialny = limitOdnawialny;
        this.oprocentowanieBp = oprocentowanieBp;
        this.marzaBp = marzaBp;
        this.kapitalizacja = kapitalizacja;
        this.zerwanaDnia = zerwanaDnia;
    }
}

/** Pojedyncza operacja na rachunku w okresie rozliczeniowym. */
class PozycjaRachunku {
    public final Date dataWaluty;
    public final String typ; // "UZNANIE" albo "OBCIAZENIE"
    public final BigDecimal kwota; // zawsze dodatnia, kierunek niesie pole typ

    public PozycjaRachunku(Date dataWaluty, String typ, BigDecimal kwota) {
        this.dataWaluty = dataWaluty;
        this.typ = typ;
        this.kwota = kwota;
    }
}

/** Parametry dodatkowe naliczenia, spoza samych danych rachunku. */
class ParametryNaliczenia {
    public boolean promocjaNowySrodek;
    public boolean trybZgodnosciZ2019;
    public int stopaBazowaBp; // dla kredytu odnawialnego
    public int karneBp; // 0 = zastosuj KARNE_BP_DOMYSLNE
}

/** Jedna pozycja w historii kapitalizacji odsetek. */
class PozycjaKapitalizacji {
    public final Date data;
    public final BigDecimal bruttoGrosze, podatekGrosze, nettoGrosze, saldoPoGrosze;

    public PozycjaKapitalizacji(Date data, BigDecimal bruttoGrosze, BigDecimal podatekGrosze,
            BigDecimal nettoGrosze, BigDecimal saldoPoGrosze) {
        this.data = data;
        this.bruttoGrosze = bruttoGrosze;
        this.podatekGrosze = podatekGrosze;
        this.nettoGrosze = nettoGrosze;
        this.saldoPoGrosze = saldoPoGrosze;
    }
}

/** Wynik naliczenia odsetek za okres rozliczeniowy. */
class WynikOdsetek {
    public String nrRachunku;
    public BigDecimal saldoZamknieciaGrosze, odsetkiBruttoGrosze, podatekGrosze, odsetkiNettoGrosze;
    public List<PozycjaKapitalizacji> kapitalizacje;
    public List<String> ostrzezenia;
}

/** Dostęp do danych rachunku i historii operacji — warstwa repozytorium. */
interface RachunekRepository {
    Rachunek znajdzRachunek(String nrRachunku);
    List<PozycjaRachunku> pobierzPozycje(String nrRachunku, Date okresOd, Date okresDo);
}
