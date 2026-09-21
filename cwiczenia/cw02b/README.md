# Ćw. 02b — Pierwsza zmiana kodu: filtr operatora

**Dzień 1 · 20 min · Copilot Agent w VS Code**

> Franek: „Frontend prawie gotowy. To prawie jest teraz wasze”.

W ćw. 01 porównałeś demo z niepodłączonym raportem. Teraz zrobisz pierwszą małą zmianę: **filtr na wspólnym ekranie demonstracyjnym**. Nie zmieniasz projektu wygenerowanego w Claude Design ani nie podłączasz jeszcze obliczeń limitów.

## 1. Odtwórz problem — 3 min

Jeśli serwer nie działa, uruchom `npm run operator` zgodnie z [START.md](../../START.md). Otwórz `http://127.0.0.1:4173` i wybierz źródło **„Przykład do projektowania”**. Powinny być trzy wiersze.

Zaznacz **„Tylko przekroczenia”**. W starterze nadal widzisz trzy wiersze — to problem do naprawienia. Zapisz ten wynik lub zrób zrzut. Jeśli filtr już działa, sprawdź `git diff` i historię: być może masz wcześniejszą poprawkę. Nie psuj jej dla samego ćwiczenia; przejdź przez kontrolę i opisz istniejącą zmianę.

## 2. Poproś najpierw o plan — 4 min

Otwórz nowy czat, wybierz **Agent** i dołącz `operator/app.js`. Wklej:

```text
Przejmuję ekran operatora po Franku. W źródle „Przykład do projektowania”
checkbox „Tylko przekroczenia” nie filtruje tabeli.
W operator/app.js znajdź funkcję visibleRows(rows, onlyExceeded).
Gdy onlyExceeded jest true, chcę tylko wiersze ze statusem 'przekroczenie'.
Gdy jest false, chcę wszystkie wiersze. Zachowaj ich kolejność.
Nie zmieniaj wejściowej tablicy ani wartości raportu. Zakres to tylko ta
funkcja: bez zmian danych, backendu, zależności ani wyglądu.
Najpierw opisz plan w maksymalnie trzech punktach i sposób sprawdzenia.
Na tym etapie nie edytuj plików.
```

Przeczytaj plan. Jeśli dodaje inne zmiany, poproś o ograniczenie zakresu. Następnie napisz: **„Wprowadź uzgodnioną zmianę tylko w visibleRows. Pokaż diff i opisz, co faktycznie sprawdziłeś”**.

**Jeśli Agent jest niedostępny:** użyj Ask lub dostępnego trybu rozmowy bez edycji. Dołącz `operator/app.js`, wklej powyższy prompt, a po sprawdzeniu planu poproś o treść funkcji `visibleRows(rows, onlyExceeded)` do ręcznego wstawienia.

1. W VS Code naciśnij **Ctrl+P**, wpisz `operator/app.js` i otwórz plik.
2. Znajdź funkcję `visibleRows(rows, onlyExceeded)` blisko początku pliku. W starterze jej ciało zawiera tylko `return rows;`.
3. Zastąp **tylko tę instrukcję wewnątrz funkcji** kodem proponowanego filtrowania. Zachowaj deklarację funkcji i jej klamry; nie wklejaj drugiej funkcji o tej samej nazwie ani znaczników bloku Markdown.
4. Zapisz **Ctrl+S** i przejdź do tej samej kontroli diffu i ekranu z kroku 3 poniżej.

Nie zmieniaj polityk VM, żeby odblokować tryb. Ręczna edycja ma ten sam zakres i kryteria odbioru.

## 3. Sprawdź kod i ekran — 8 min

Przeczytaj różnicę w panelu zmian VS Code albo w drugim terminalu:

```sh
git diff -- operator/app.js
```

Odśwież przeglądarkę. Sprawdź:

| Czynność | Oczekiwany wynik |
|---|---|
| Filtr wyłączony | FR-001, FR-002, FR-003 — 3 wiersze |
| Filtr włączony | FR-002, FR-003 — 2 wiersze |
| Ponowne wyłączenie | Znowu 3 wiersze w tej samej kolejności |
| „Pokaż” przy FR-002 | Szczegóły tej operacji; wykorzystanie 110 PLN |

Przy FR-002 nadal ma być kwota 50 PLN i przekroczenie 10 PLN. Filtrowanie nie zmienia obliczeń. `npm test` sprawdza istniejący zestaw testów, ale nie zastępuje tej próby w przeglądarce.

**Jeśli nie działa:** upewnij się, że wybrano demo, plik zapisano, a stronę odświeżono. Pokaż Copilotowi konkretną obserwację i aktualny diff, zamiast pisać tylko „nie działa”.

## 4. Zapisz zmianę — 5 min

W `portfolio/cw02b-filtr.md` zanotuj objaw przed poprawką, wynik 3 → 2 → 3 i jednozdaniowe wyjaśnienie zmiany. Następnie:

```sh
git status --short
git diff -- operator/app.js
git add operator/app.js
git diff --cached
git commit -m "Operator: filtr tylko przekroczenia"
```

Przed commitem upewnij się, że lista zawiera tylko uzgodnioną zmianę. Jeśli Git prosi o tożsamość, zobacz [START.md](../../START.md). Zostajesz na `warsztat/franek`; nie wypychasz własnego rozwiązania na wspólne `main`.

**Gotowe:** filtr działa, potrafisz wyjaśnić diff, dane wejściowe są nietknięte, masz zapisany commit i wynik kontroli.

**Rozszerzenie:** sprawdź funkcję na pustej tablicy i na przykładzie bez przekroczeń, bez edycji wspólnych danych demo. Ekran ma już miejsce na komunikat „Brak wierszy spełniających warunki.”; oceń jego czytelność. Nie podłączaj jeszcze adaptera finałowego.
