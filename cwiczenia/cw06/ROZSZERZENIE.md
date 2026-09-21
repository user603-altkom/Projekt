> Materiał dodatkowy ze wcześniejszej wersji. Aktualną kolejność i podstawę określa README w tym katalogu.

# Ćw. 6 — Testy dla modułu bez testów


> Franek: „Testy były zielone. Tylko nie pytały o to, o co pytał operator”.

**Zakres:** Podstawa: trzy różne scenariusze i niezależnie ustalony wynik. Czerwony test z potwierdzonym oczekiwaniem zabierasz do ćw. 07; tutaj jeszcze nie naprawiasz modułu. Nie naprawiaj produkcyjnego kodu tylko po to, żeby dopasować go do wygenerowanego oczekiwania.

Pracujesz na jednej gałęzi `warsztat/franek` przez całe szkolenie. Rezultat i dowód zapisz w `portfolio/`.

Pracujesz w IDE, na otwartym repozytorium — asystent w panelu obok plików.

**Start:** Copilot Chat → Agent, nowa rozmowa. Najpierw uzgodnij trzy scenariusze, dopiero potem pozwól utworzyć testy. Komendy uruchamiaj z głównego katalogu repo.

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
> i celowo różnorodny — potraktujcie go jako próbkę, nie dowód pokrycia wszystkich
> wariantów z systemu źródłowego.

## Kroki

1. **Zapisz stan wyjściowy:** uruchom `npm test` i zanotuj już istniejące błędy. Dołącz `tests/transactions/validate.test.ts` jako wzór, `src/import/parseBankFile.ts`, `src/model.ts` oraz `dane/wyciag_probka.csv` jako kontekst.
2. **Wybierz trzy różne scenariusze:** poprawna kwota z separatorem dziesiętnym, nietypowy format kwoty oraz wiersz z brakującymi kolumnami. Dla każdego sam ustal oczekiwany wynik. Przykład: zapis `12,34` oznacza **1234 grosze** — oczekiwania nie wyliczaj tą samą funkcją, którą testujesz.
3. **Zleć testy w `tests/import/parseBankFile.test.ts`.** Jeśli plik już istnieje, uzupełnij go. Nie zmieniaj oryginalnego CSV: znaki BOM i zakończenia linii też należą do danych testowych.
4. **Uruchom `npm test -- tests/import/parseBankFile.test.ts`, potem `npm test`.** Przy nowym czerwonym teście sprawdź oczekiwanie ręcznie. Nie dopasowuj go do aktualnego wyniku tylko po to, żeby test przeszedł. Jeśli problem jest w module, zapisz go do ćw. 07.
5. **Zrób mapę próbka → scenariusze.** W `portfolio/cw06-testy.md` zapisz trzy sprawdzone scenariusze, wyniki komend i pozostałe luki. W podstawie nie musisz dopisać testu dla każdego wiersza; to rozszerzenie.

**Prompt startowy — po dołączeniu plików:**

```text
Dopisz trzy testy parseBankFile w tests/import/parseBankFile.test.ts,
zgodnie ze stylem załączonego validate.test.ts. Najpierw pokaż tabelę:
wejście → oczekiwany wynik → uzasadnienie niezależne od implementacji.
Użyj małych danych wejściowych i sprawdź je też wobec próbki CSV.
Nie zmieniaj src/ ani oryginalnej próbki. Jeśli test nie przejdzie,
pokaż expected/actual i oddziel błąd testu od podejrzenia błędu parsera.
```

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
> Przeczytaj deklarowaną regułę w komentarzu funkcji i tabelę `SWIETA_STALE`.
> Przykład: sobota `2026-08-15` i `n = 0` — jaki wynik obiecuje komentarz?
> Ustal go przed uruchomieniem. To kontrakt ćwiczeniowego modułu, nie kompletny
> kalendarz bankowy. Zapisz rozbieżność kod–komentarz; nie naprawiaj teraz drugiego modułu.

W wariancie bez kodowania wystarcza tabela trzech scenariuszy, oczekiwań i luk sprawdzona przez partnera; nie musisz tworzyć pliku testowego.

## Gotowe, gdy

- [ ] w `tests/import/` są nowe testy; ewentualny czerwony test ma niezależnie potwierdzone oczekiwanie i opis znalezionej usterki
- [ ] masz trzy różne scenariusze z niezależnie ustalonymi oczekiwaniami oraz listę pozostałych luk
- [ ] partner potrafi z samych nazw twoich testów odtworzyć, co moduł ma robić z plikiem

## Na koniec ćwiczenia

Zapisz wyniki, także czerwone testy, w `portfolio/cw06-testy.md`. To punkt startowy ćw. 07, nie powód do usuwania testów. Jeśli powstał kod testów, przejrzyj go i zapisz lokalnie:

```bash
git status --short
git diff
git add tests/import/parseBankFile.test.ts
git diff --cached
git commit -m "Testy importu i rozpoznane przypadki brzegowe"
```

Przy czerwonym teście opisz w notatce potwierdzone oczekiwanie i aktualny błąd. Ten commit jest zapisem pracy warsztatowej, nie deklaracją gotowości do wdrożenia.
