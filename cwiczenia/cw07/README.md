# Ćw. 7 — Debugging

**Czas w nowej ścieżce:** D2 · 13:05–13:55 · 50 min · Każdy u siebie, odbiór w parze

> Franek: „Brakuje 23 groszy. To nie napiwek dla systemu”.

**Zakres:** Podstawa: przyczyna, lista ID, suma przed/po i regresja. Rozszerzenie: druga niezależna diagnoza; porównanie narzędzi jest obowiązkowe dopiero dnia 3.

Pracujesz na jednej gałęzi `warsztat/franek` przez całe szkolenie. Rezultat i dowód zapisz w `portfolio/`.

Pracujesz w IDE, na otwartym repozytorium — asystent w panelu obok plików.

**Start:** Copilot Chat → Agent, nowa rozmowa. Najpierw zleć diagnozę bez edycji; po sprawdzeniu dowodów przejdź do poprawki. Komendy uruchamiaj z głównego katalogu repo.

## Cel

Umieć doprowadzić zgłoszenie do przyczyny, zweryfikować ją liczbą zamiast wzrokiem, i rozpoznać, o czym model milczy — również wtedy, gdy odpowiedź brzmi przekonująco.

Znalezienie podejrzanej linii to początek. Najważniejsze są niezależne wyliczenie skutków i test, który powstrzyma powrót błędu.

## Zgłoszenie

> Od: Zespół Uzgodnień Dziennych
> Temat: raport dzienny nie zgadza się z wyciągiem
>
> Dzień dobry,
>
> raport dzienny drugi miesiąc z rzędu pokazuje inną sumę niż wyciąg, który
> dostajemy z systemu źródłowego. Różnica jest niewielka, kilkadziesiąt groszy,
> ale jest za każdym razem i zawsze w tę samą stronę — u nas wychodzi mniej.
> W lipcu było to samo, tylko o innej kwocie.
>
> Uzgodnienie zamykamy ręcznie i dopisujemy to jako korektę techniczną, ale audyt
> wewnętrzny pytał już, skąd bierze się ta pozycja. Chcielibyśmy to zamknąć,
> zanim zapyta drugi raz.
>
> Audyt prosi konkretnie o **listę operacji, których to dotyczyło** - identyfikatory
> z wyciągu, żeby dało się je zestawić z naszą korektą. Samo wyjaśnienie, skąd bierze
> się różnica, im nie wystarczy; pytają, które pozycje mamy poprawić.
>
> Wklejam, co wychodzi u nas:
>
> ```
> Raport dzienny — dane/wyciag_2026_08.csv
>
> Operacji zaimportowanych: 400
> Wierszy pominiętych:      0
> Rachunków:                24
>
> Suma obrotów (policzona): 13 225 944,33 zł
> Suma kontrolna (z pliku): 13 225 944,56 zł
> RÓŻNICA:                  -0,23 zł
>
> NIEZGODNOŚĆ SUMY KONTROLNEJ: policzone obroty różnią się od wyciągu o -0,23 zł.
> ```
>
> Plik wyciągu jest ten sam, który Państwo dostali. Nic w nim nie zmienialiśmy.

## Kroki

1. **Zreprodukuj:** `npm run raport`. Zachowaj wynik w `portfolio/cw07-diagnoza.md`, obok czerwonych testów z ćw. 06. Jeśli poprawiłeś parser wcześniej, użyj własnego zapisu sprzed zmiany; nie cofaj bieżącej pracy. Bez takiego zapisu poproś prowadzącego o kopię startera do reprodukcji.
2. **Postaw hipotezę, zanim zapytasz model.** Zapisz ją — wrócisz do niej na końcu.
3. **Dołącz `src/import/parseBankFile.ts` i `src/reports/dailyReport.ts`.** Poproś o prześledzenie kwoty i znalezienie dotkniętych ID. Agent może przeczytać `dane/wyciag_2026_08.csv` narzędziem; nie trzeba wklejać 400 wierszy do czatu. Żądaj polecenia lub skryptu i jego wyniku: samo pewne brzmienie odpowiedzi nie dowodzi, że model coś policzył.
4. **Sprawdź diagnozę niezależnie.** Poproś o skrypt porównujący kwoty z tekstu CSV z wynikiem parsera. Wartość odniesienia ma powstawać z części całkowitej i dwóch cyfr groszy, bez kopiowania podejrzanej konwersji. Zapisz ID, obie wartości i różnicę w groszach. Sprawdź ręcznie dwie wskazane operacje; suma odchyleń ma wyjaśniać całe −23 grosze ze zgłoszenia.
5. **Dodaj regresję, potem zleć minimalną poprawkę.** Użyj potwierdzonego testu z ćw. 06 albo dopisz mały przykład odtwarzający stratę grosza. Zobacz czerwony wynik przed zmianą i zielony po. Nie zmieniaj wejściowego CSV ani oczekiwania, żeby ukryć różnicę.
6. **Sprawdź rezultat:** `npm run raport`, `npm test`, `npm run typecheck`. Zapisz sumy przed/po oraz rzeczy, których nie sprawdziłeś. Jeśli masz inne czerwone testy z ćw. 06, opisz je oddzielnie. Dlaczego testy startera nie wykryły tej usterki?

**Uwaga do starego wydruku:** wyciąg zawiera różne waluty. Suma kontrolna całego pliku jest techniczną sumą wartości, nie bilansem w PLN, mimo etykiety „zł” w raporcie. W tym ćwiczeniu naprawiasz utratę precyzji; rozbicie na waluty jest osobnym zadaniem rezerwowym. To też inny przypadek niż różnica z ćw. 03.

> **Jeśli utknąłeś po 15 minutach**
> Nagłówek ma sumę całego pliku, nie sumy dla pojedynczych wierszy. Dla jednego
> wiersza porównaj dokładną kwotę odczytaną z tekstu z `kwotaGrosze` po imporcie.
> Powtórz dla pozostałych wierszy i zsumuj odchylenia.

> **Pracujesz z bazą, nie z TypeScriptem**
> Przeczytaj `sql/raport_dzienny.sql` i typ `kwota` w `sql/001_init_transakcje.sql`.
> To **Oracle**, materiał do analizy — nie uruchamiaj go w SQLite.
> Prześledź konwersję kwoty, zaproponuj minimalną poprawkę i zapytanie kontrolne.
> Sprawdź rachunek na dwóch kwotach z CSV. Zapisz wyraźnie, że to analiza kodu
> i kontrprzykład liczbowy, a nie wynik uruchomienia na Oracle. Raport obrotów
> w `sql/lokalnie/` to inne zadanie i nie odtwarza tej usterki.

> **Skończyłeś wcześniej**
> Sprawdź jeszcze jedno miejsce: czy ta sama konwersja nie
> powtarza się gdzieś poza `src/`. Jeśli powtarza, to twoja poprawka niczego
> tam nie naprawiła.
>
> Zostało ci jeszcze czasu? Każ modelowi zbudować podgląd tych danych. Jeden
> plik `.html`, otwierany podwójnym kliknięciem, bez zależności i bez
> internetu: wiersze, które wnoszą odchylenie, i suma narastająca. Wynik ma
> policzyć z pliku, nie dostać od ciebie. Inaczej dostaniesz ekran, który
> ładnie pokazuje to, co sam podyktowałeś. Użyj wyboru pliku CSV w przeglądarce. Poprawna suma ma zgadzać się
> z naprawionym `npm run raport`; odchylenia starej konwersji podpisz osobno.
> Plik zostaw w `portfolio/`, poza `src/`.

W ścieżce Oracle zamiast uruchomienia TS pokaż partnerowi kontrprzykład, propozycję SQL i listę niewykonanych kontroli.

## Gotowe, gdy

- [ ] umiesz wskazać linię i wyjaśnić mechanizm własnymi słowami, nie cytatem z modelu
- [ ] masz policzoną listę identyfikatorów dla audytu oraz przebieg `npm run raport` sprzed poprawki i po niej - i umiesz wytłumaczyć obie liczby co do grosza
- [ ] masz test regresji czerwony przed poprawką i zielony po
- [ ] umiesz powiedzieć, czego nie potwierdziła sama diagnoza modelu i jak uzupełniłeś brakujące dowody

## Na koniec ćwiczenia

Zachowaj diagnozę i wyniki w `portfolio/cw07-diagnoza.md`. Przejrzyj `git diff` i `git status --short`. Dodaj przez `git add` wyłącznie poprawiony parser oraz utworzone lub zmienione testy (ich rzeczywiste ścieżki), sprawdź `git diff --cached` i wykonaj `git commit -m "Naprawa precyzji importu z regresja"`. W wariancie analitycznym wystarczy notatka.
