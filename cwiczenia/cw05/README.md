# Ćw. 5 — Wejście w nieznany kod

**Czas:** 40 min · **Praca w parach** · Klawiaturę ma osoba, która czuje się mniej pewnie

Pracujesz w IDE, na otwartym repozytorium — asystent w panelu obok plików.

## Cel

Umieć oddzielić to, co model wyczytał z kodu, od tego, co dopowiedział z komentarza, z nazwy funkcji albo z własnej wiedzy o bankowości — i sprawdzić to, zanim oprzesz na tym decyzję.

## Zgłoszenie

> Od: Marcin (kierownik zespołu)
> Temat: moduł odsetek — przejęcie
>
> Przejmujecie moduł odsetek. Autor odszedł w maju, dokumentacji do niego nie ma
> żadnej poza tym, co siedzi w kodzie. W przyszłym kwartale wchodzą nowe stawki
> i ktoś z Was będzie musiał je tam wprowadzić.
>
> Na poniedziałek potrzebuję trzech rzeczy na piśmie: co ten moduł liczy, od czego
> zależy i gdzie widzicie ryzyko. Nie musi być ładnie, ma być prawdziwe — idzie
> do oceny wpływu zmiany, nie do szuflady.
>
> Plik główny: `src/interest/accrue.ts`. Starsza wersja tego samego wyliczenia leży
> w `legacy-java/OdsetkiCalculator.java` — nikt tego nie kompiluje, ale da się
> porównać. Przy okazji przejrzyjcie `src/transactions/validate.ts`, bo idzie
> z tym samym wdrożeniem.

## Kroki

1. **Przeczytaj `src/interest/accrue.ts` sam, zanim otworzysz czat.** Nie całość — wejście funkcji, kształt wyniku i miejsca, w których kod się rozgałęzia.
2. **Zleć modelowi streszczenie modułu:** co liczy, od czego zależy, co zwraca.
3. **Podłóż pod każde zdanie streszczenia linię z kodu.** Które zdania da się podpisać numerem linii, a pod które linii nie ma?
4. **Zestaw z wersją w Javie.** `legacy-java/OdsetkiCalculator.java` liczy to samo, rok wcześniej. Wypisz różnice i przy każdej rozstrzygnij: inny algorytm czy funkcja dorobiona później?
5. **Przejdź `src/transactions/validate.ts` pod kątem tego, co przez niego przechodzi.** Kontrakt pól stoi w `src/model.ts`. Szukasz danych, które kod przepuszcza, mimo że kontrakt ich zabrania.

> **Jeśli utknąłeś po 10 minutach**
> Dołącz `src/interest/accrue.ts` do kontekstu (w VS Code: `#` i nazwa pliku)
> i napisz:
>
> ```
> Prowadzisz mnie po module, którego nie znam. Odpowiadasz wyłącznie na
> podstawie załączonego pliku.
>
> 1. Co funkcja przyjmuje na wejściu i co zwraca — wypisz pola wejścia,
>    których faktycznie używa, i pola wyniku. Przy każdym podaj numer linii,
>    w której powstaje.
> 2. Jakie warianty przebiegu ma ta funkcja. Wypisz je jako listę
>    „jeżeli ... to ...", w kolejności, w jakiej sprawdza je kod, z numerami
>    linii.
> 3. Od czego moduł zależy: importy, pola wejścia, wartości domyślne
>    podstawiane wtedy, gdy pola brakuje.
> 4. Które zdania swojej odpowiedzi opierasz na czymś innym niż linia kodu —
>    na komentarzu, nazwie zmiennej, konwencji albo własnej wiedzy o produktach
>    bankowych. Wypisz je osobno i przy każdym podaj, na czym je opierasz.
>
> Jeśli czegoś nie da się ustalić z tego pliku, napisz „nie wynika z kodu"
> zamiast zgadywać.
> ```
>
> Odpowiedź z punktu 4 jest ważniejsza niż trzy pierwsze. Sprawdź ją w pliku.

> **Wolisz opisać system, niż czytać jego kod**
> Zbuduj dokumentację as-is prosto z kodu `src/` — po jednej sekcji na moduł:
> co wystawia na zewnątrz, co przyjmuje, co zwraca, czego wymaga od danych
> wejściowych. Potem otwórz `docs/api.md`, który leży w repozytorium, i zestaw
> obie wersje punkt po punkcie. Przy każdej różnicy zapisz, na czym opierasz
> swoje ustalenie: która linia którego pliku. Na końcu rozstrzygnij, którą
> wersję dostałby do ręki ktoś, kto pisze integrację z tym API.

> **Skończyłeś wcześniej**
> Napisz notatkę dla osoby, która przejmie moduł po tobie: co robi, czego nie
> wolno w nim ruszyć bez testu, które zdania twojego opisu nie mają oparcia
> w kodzie. Potem daj tę notatkę modelowi i każ mu ją podważyć — co da się z niej
> wykreślić, bo nie da się tego sprawdzić w repozytorium?

## Gotowe, gdy

- [ ] przy każdym zdaniu swojego opisu modułu umiesz wskazać linię w `src/interest/accrue.ts` — albo powiedzieć wprost, że takiej linii nie ma
- [ ] masz wypisane zależności modułu: co importuje i czego wymaga od danych wejściowych
- [ ] pokazujesz drugiej osobie konkretną linię w `src/transactions/validate.ts` i mówisz, jakie dane przez nią przejdą, mimo że przejść nie powinny

## Na koniec ćwiczenia

```
git switch -c imie/cw05 && git add -A && git commit -m "cw05" --allow-empty && git switch main
```
