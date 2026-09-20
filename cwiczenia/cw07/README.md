# Ćw. 7 — Debugging

**Czas w nowej ścieżce:** D2 · 13:05–13:55 · 50 min · Każdy u siebie, odbiór w parze

> Franek: „Brakuje 23 groszy. To nie napiwek dla systemu”.

**Zakres:** Podstawa: przyczyna, lista ID, suma przed/po i regresja. Rozszerzenie: druga niezależna diagnoza; porównanie narzędzi jest obowiązkowe dopiero dnia 3.

Pracujesz na jednej gałęzi `warsztat/franek` przez całe szkolenie. Rezultat i dowód zapisz w `portfolio/`.

Pracujesz w IDE, na otwartym repozytorium — asystent w panelu obok plików.

## Cel

Umieć doprowadzić zgłoszenie do przyczyny, zweryfikować ją liczbą zamiast wzrokiem, i rozpoznać, o czym model milczy — również wtedy, gdy odpowiedź brzmi przekonująco.

Uprzedzenie, żeby cię nie zmyliło: **przyczynę znajdziesz szybko, prawdopodobnie w kilka minut.**
To nie jest koniec ćwiczenia, tylko jego pierwszy krok. Ciężar leży w krokach 4 i 5.

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

1. **Zreprodukuj.** `npm run raport`
2. **Postaw hipotezę, zanim zapytasz model.** Zapisz ją — wrócisz do niej na końcu.
3. **Zawęź kontekst do plików, które podejrzewasz, i zleć modelowi znalezienie przyczyny oraz listy operacji, których dotyczy.** Nie wklejaj wyciągu — to czterysta wierszy. Zwróć uwagę, czy model listę policzył, czy oszacował: słowo „najpewniej" przy liczbie znaczy, że zgadł.
4. **Sprawdź diagnozę na niezależnym dowodzie.** Zleć skryptowi policzenie ID i sum, a potem sprawdź ręcznie dwie wskazane operacje. Drugi model jest rozszerzeniem; użyj osobnej kopii sprzed poprawki, bez cofania pracy w bieżącym repo.
5. **Zweryfikuj poprawkę liczbą, nie wzrokiem.** `npm run raport` po zmianie, `npm test` po nim. Potem odpowiedz na drugie pytanie: ten zestaw testów był zielony przez cały czas, kiedy raport się nie zgadzał. Który test powinien był to złapać i dlaczego nie złapał? Jeśli pracujesz na klonie z historią, sprawdź też `git log -p` na pliku z tym testem. W paczce ZIP nie ma historii: porównaj asercje testu z wymaganiem i niezależnym wynikiem.

> **Jeśli utknąłeś po 15 minutach**
> Porównaj sumę zadeklarowaną w nagłówku pliku z sumą policzoną po imporcie —
> najpierw dla całego pliku, potem dla pojedynczych wierszy. Na którym wierszu
> przestają być równe i co ten wiersz ma w sobie takiego, czego nie mają sąsiednie?

> **Pracujesz z bazą, nie z TypeScriptem**
> `sql/raport_dzienny.sql` liczy to samo po stronie bazy i pokazuje ten sam objaw.
> Ten skrypt PostgreSQL czytasz jako materiał; lokalny wariant SQLite ma osobne polecenia w `sql/lokalnie/README.md`.
> Każ modelowi wyjaśnić je linia po linii, ustal dokładnie, co dzieje się z kwotą,
> zanim trafi do sumy, i zaproponuj poprawkę razem z zapytaniem kontrolnym, które
> pokazałoby różnicę przed nią i po niej. Sprawdź przy tym, jakiego typu jest
> kolumna `kwota` w `sql/001_init_transakcje.sql` - i czy odpowiedź modelu
> nadal się broni, kiedy już to wiesz. Sprawdź diagnozę niezależnym zapytaniem kontrolnym.

> **Skończyłeś wcześniej**
> Napisz test, który złapałby to przed wdrożeniem, i uruchom go na kodzie sprzed
> poprawki. Potem sprawdź jeszcze jedno miejsce: czy ta sama konwersja nie
> powtarza się gdzieś poza `src/`. Jeśli powtarza, to twoja poprawka niczego
> tam nie naprawiła.
>
> Zostało ci jeszcze czasu? Każ modelowi zbudować podgląd tych danych. Jeden
> plik `.html`, otwierany podwójnym kliknięciem, bez zależności i bez
> internetu: wiersze, które wnoszą odchylenie, i suma narastająca. Wynik ma
> policzyć z pliku, nie dostać od ciebie. Inaczej dostaniesz ekran, który
> ładnie pokazuje to, co sam podyktowałeś. Dowodem jest zgodność z
> `npm run raport` co do grosza. Plik zostaw poza `src/`.

## Gotowe, gdy

- [ ] umiesz wskazać linię i wyjaśnić mechanizm własnymi słowami, nie cytatem z modelu
- [ ] masz policzoną listę identyfikatorów dla audytu oraz przebieg `npm run raport` sprzed poprawki i po niej - i umiesz wytłumaczyć obie liczby co do grosza
- [ ] umiesz powiedzieć, czego nie potwierdziła sama diagnoza modelu i jak uzupełniłeś brakujące dowody

## Na koniec ćwiczenia

Po kontroli diffu dodaj nowe pliki osobno (`git add ścieżka/do/pliku`). `git add -u` dodaje tylko zmiany już śledzonych plików. Pozostań na wspólnej gałęzi.

```
git status --short
git diff
git add -u
git commit -m "Warsztat: zakończony etap"
```
