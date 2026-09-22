# Ćw. 5 — Wejście w nieznany kod

**Czas w nowej ścieżce:** D2 · 9:10–9:40 · 30 min · Każdy u siebie, odbiór w parze

> Franek: „Odsetki? Zostawiłem komentarze. Nie wszystkie aktualne”.

**Zakres:** Podstawa: mapa wejście–funkcja–wynik i trzy dowody. Rozszerzenie: rozbieżność kodu i komentarza. To osobny moduł tego samego produktu, nie zależność ekranu limitów kredytowych.

Pracujesz na jednej gałęzi `warsztat/franek` przez całe szkolenie. Rezultat i dowód zapisz w `portfolio/`.

Pracujesz w IDE, na otwartym repozytorium — asystent w panelu obok plików.

**Start:** Copilot Chat → Ask, nowa rozmowa. Dołącz wskazane pliki przez Add Context / Dodaj kontekst. W podstawie czytasz kod i zapisujesz notatkę.

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
2. **Zleć modelowi streszczenie modułu:** co liczy, od czego zależy, co zwraca. Powiedz mu wprost, żeby nie generował przy tym kodu. Kod w odpowiedzi na tym etapie przeszkadza: zaczynasz go czytać, zamiast rozumieć moduł.
3. **Poproś o źródła twierdzeń.** Model ma wskazać plik i linię oraz oddzielić kod, komentarze i domysły. Sprawdzisz trzy wybrane twierdzenia, nie każde zdanie rozbudowanej odpowiedzi.
4. **Wybierz trzy twierdzenia i sprawdź je sam w plikach.** Zapisz w `portfolio/cw05-mapa.md`: wejście → funkcja → wynik, zależności oraz tabelę „twierdzenie / plik i linia / potwierdzenie albo niewiadoma”. Wystarczy jeden moduł, nie dokumentacja całego systemu.
5. **Wymieńcie się notatkami.** Partner ma znaleźć wskazane miejsca bez pytania autora. Dopisz jedną rzecz, której nadal nie da się ustalić z kodu.

**Rozszerzenie — wybierz jedno:** porównaj `accrue.ts` z `legacy-java/OdsetkiCalculator.java` albo zestaw `src/transactions/validate.ts` z kontraktem w `src/model.ts`. Przy różnicach Java/TypeScript oddziel obserwację od historii zmiany: sam kod nie dowodzi, kiedy i dlaczego dodano funkcję.

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
> Wybierz jeden moduł z `src/` i zbuduj jego dokumentację as-is:
> co wystawia na zewnątrz, co przyjmuje, co zwraca, czego wymaga od danych
> wejściowych. Potem otwórz `docs/api.md`, który leży w repozytorium, i zestaw
> obie wersje punkt po punkcie. Przy każdej różnicy zapisz, na czym opierasz
> swoje ustalenie: która linia którego pliku. Na końcu rozstrzygnij, którą
> wersję dostałby do ręki ktoś, kto pisze integrację z tym API.

> **Skończyłeś wcześniej**
> Napisz notatkę dla osoby, która przejmie moduł po tobie: co robi, czego nie
> wolno w nim ruszyć bez testu, które zdania twojego opisu nie mają oparcia
> w kodzie. Potem daj tę notatkę modelowi i każ mu ją podważyć: co da się z niej
> wykreślić, bo nie da się tego sprawdzić w repozytorium?
>
> Potem wróć do listy różnic między wersją w TypeScripcie a tą w Javie i wybierz jedną,
> przy której nie umiałeś rozstrzygnąć, czy to inny algorytm, czy funkcja dorobiona
> później. Porównaj zachowanie na konkretnych liczbach; nie zgaduj historii zmiany. `dane/odsetki_przypadki.json` ma wejścia z opisami,
> a `tests/interest/accrue.test.ts` pokazuje, które z nich są uruchamiane. Samo
> `npm test` nie sprawdza wszystkich wejść z JSON-a: dla wybranego przypadku
> wskaż istniejący test albo dopisz własne wywołanie. Która wersja liczy zgodnie
> z opisem, a która tylko wygląda na zgodną?
>
> Jeśli i to masz za sobą: znajdź w module miejsce, w którym nazwa obiecuje co innego
> niż robi ciało funkcji. Jest przynajmniej jedno. Jak byś to wykrył, gdyby nikt ci nie
> powiedział, że tam jest?

## Gotowe, gdy

- [ ] przy trzech wybranych twierdzeniach umiesz wskazać linię w analizowanym kodzie — albo powiedzieć wprost, że takiej linii nie ma
- [ ] masz wypisane zależności modułu: co importuje i czego wymaga od danych wejściowych
- [ ] partner potwierdził trzy twierdzenia na podstawie kodu; wskazujesz też jedną niewiadomą

## Na koniec ćwiczenia

Zachowaj `portfolio/cw05-mapa.md` na omówienie. `portfolio/` jest lokalne i ignorowane przez Git. W podstawie nie zmieniasz kodu, więc nie potrzebujesz commita.
