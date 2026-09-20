# Ćw. 6 — Testy dla modułu bez testów

**Czas w nowej ścieżce:** D2 · 10:55–11:35 · 40 min · Każdy u siebie, odbiór w parze

> Franek: „Testy były zielone. Tylko nie pytały o to, o co pytał operator”.

**Zakres:** Podstawa: trzy różne scenariusze i niezależnie ustalony wynik. Rozszerzenie: pokaż czerwony test przed poprawką i zielony po. Nie naprawiaj produkcyjnego kodu tylko po to, żeby dopasować go do wygenerowanego oczekiwania.

Pracujesz na jednej gałęzi `warsztat/franek` przez całe szkolenie. Rezultat i dowód zapisz w `portfolio/`.

Pracujesz w IDE, na otwartym repozytorium — asystent w panelu obok plików.

## Cel

Umieć powiedzieć, czego wygenerowany zestaw testów nie pokrywa, i sprawdzić to na danych, a nie na słowo modelu.

## Zgłoszenie

> Od: Marcin (kierownik zespołu)
> Temat: import wyciągów — brak testów
>
> Moduł importu wchodzi w listopadzie do rozliczeń dziennych i nie ma pod sobą
> ani jednego testu. Zanim zaczniemy go zmieniać, chcę mieć tam siatkę.
>
> Piszcie to tak, jak są napisane testy w `tests/transactions/` — te same nazwy,
> ten sam układ, ten sam sposób budowania danych wejściowych. Nie chcę drugiego
> stylu w jednym repozytorium, bo za pół roku nikt nie będzie wiedział, który
> jest nasz.
>
> Plik, na którym można się oprzeć: `dane/wyciag_probka.csv`. Jest krótki
> i celowo różnorodny — siedzą w nim wszystkie warianty, jakie przychodzą do nas
> z systemu źródłowego.

## Kroki

1. **Pokaż modelowi konwencję, zanim poprosisz o testy.** Załącz `tests/transactions/validate.test.ts` jako wzór: nazwy testów po polsku, funkcja budująca poprawne dane, jedno pole zmieniane na test.
2. **Zleć testy dla `src/import/parseBankFile.ts`** w oparciu o `dane/wyciag_probka.csv`. Nowe pliki idą do `tests/import/`.
3. **Uruchom `npm test`.** Test, który nie przechodzi, jest informacją, nie porażką — rozstrzygnij, czy błąd siedzi w teście, czy w module.
4. **Przypisz każdy wiersz próbki do testu, który go dotyka.** Rób to w otwartym pliku, wiersz po wierszu, nie z pamięci.
5. **Dopisz testy do wierszy, które zostały bez przypisania.**

> **Jeśli utknąłeś po 10 minutach**
> Nie zaczynaj od modułu, zacznij od pliku. Otwórz `dane/wyciag_probka.csv`
> i wypisz, czym każdy wiersz różni się od poprzedniego. Czego jest tam dokładnie
> jedno wystąpienie? Ta lista jest listą twoich testów.

> **Wolisz opisać, co ma działać, niż to zaprogramować**
> Robisz to samo ćwiczenie bez pisania kodu testu:
>
> 1. Otwórz `dane/wyciag_probka.csv` i opisz, co odróżnia każdy wiersz od reszty:
>    format kwoty, format daty, waluta, kierunek operacji, komplet kolumn, znaki
>    diakrytyczne, wiersze, które nie są danymi.
> 2. Przekuj tę listę w tabelę scenariuszy: wejście — oczekiwany wynik — co ma się
>    stać, kiedy wynik jest inny. Po jednym wierszu na przypadek, bez łączenia dwóch
>    wariantów w jeden.
> 3. Dopisz kryteria akceptacji dla całego pliku: ile operacji ma wejść, co ma się
>    stać z wierszem, którego nie da się odczytać, i co z liczbami zadeklarowanymi
>    w nagłówku technicznym.
> 4. Daj tabelę modelowi i każ mu wskazać przypadki z pliku, których w niej nie ma.
>    Każdy jego punkt sprawdź w pliku — na wierszu, nie na słowo.
>
> Twoja tabela jest materiałem wejściowym dla osoby, która pisze testy obok. Wymieńcie
> się: ona sprawdza, czy jej testy pokrywają twoje scenariusze, ty sprawdzasz, czy
> któregoś scenariusza nie da się z jej testów odtworzyć.

> **Skończyłeś wcześniej**
> Drugi cel na przypadki brzegowe: `addBusinessDays` w `src/interest/valueDate.ts`.
> Napisz testy dla dat wpadających w piątek, w sobotę, w poniedziałek po dniu
> ustawowo wolnym i dla `n` równego zero. Oczekiwany wynik ustalaj w kalendarzu,
> zanim zobaczysz, co zwraca funkcja.

## Gotowe, gdy

- [ ] w `tests/import/` są nowe testy; ewentualny czerwony test ma niezależnie potwierdzone oczekiwanie i opis znalezionej usterki
- [ ] masz mapę próbka → testy; wskazujesz lukę albo dowodzisz pokrycia wszystkich wierszy
- [ ] partner potrafi z samych nazw twoich testów odtworzyć, co moduł ma robić z plikiem

## Na koniec ćwiczenia

Po kontroli diffu dodaj nowe pliki osobno (`git add ścieżka/do/pliku`). `git add -u` dodaje tylko zmiany już śledzonych plików. Pozostań na wspólnej gałęzi.

```
git status --short
git diff
git add -u
git commit -m "Warsztat: zakończony etap"
```
