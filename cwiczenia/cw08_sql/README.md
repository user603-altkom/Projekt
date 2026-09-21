# Ćw. 8 (ścieżka SQL) — Bezpieczna optymalizacja

**Czas w nowej ścieżce:** D2 · 14:45–15:30 · 45 min · Każdy u siebie, odbiór w parze

> Franek: „Raport jest poprawny, ale kawa stygnie, zanim się policzy”.

**Zakres:** Alternatywa dla cw08, nie dodatkowy obowiązek. Lokalny SQLite jest dostępny; bez instalowania Dockera na sali.

Pracujesz na jednej gałęzi `warsztat/franek` przez całe szkolenie. Rezultat i dowód zapisz w `portfolio/`.

Bierzesz tę kartę zamiast Ćw. 8, jeśli na co dzień pracujesz z bazą, a nie z TypeScriptem. Materiał jest ten sam: zmieniasz cudzy kod i musisz udowodnić, że wynik się nie zmienił.

**Start:** Copilot Chat → Agent, nowa rozmowa. Najpierw zachowanie wzorca i diagnoza, potem jedna zmiana. Dołącz zapytanie, schemat oraz skrypt kontroli z kroków poniżej.

## Cel

Umieć przyspieszyć cudze zapytanie bez zmiany jego wyniku i pokazać dowód, że wynik się nie zmienił - zamiast zapewnienia, że nie powinien.

## Zgłoszenie

> Od: Utrzymanie Systemów Raportowych
> Temat: raport obrotów nie mieści się w oknie nocnym
>
> Dzień dobry,
>
> zadanie `raport_obrotow_oddzialy` chodzi co noc po zamknięciu dnia księgowego.
> Do stycznia mieściło się w kilku sekundach. Od dołożenia kolumny z obrotem
> rocznym oddziału czas rośnie z każdym miesiącem danych i dziś raport bywa
> gotowy po starcie porannej sesji.
>
> Zapytanie jest w `sql/lokalnie/raport_obrotow.sql`.
>
> Prosimy o przyspieszenie. Warunek: **raport ma być szybszy, nie inny**.
> Liczby idą do uzgodnień dziennych i ktoś je porównuje z rejestrem, więc
> zmiana choćby jednego wiersza będzie widoczna następnego dnia rano.

## Kroki

1. **Zbuduj bazę i zobacz stan wyjściowy.** W terminalu głównego katalogu repo: `npm run sql:setup`, potem `npm run sql:raport`. Potrzebny jest Node 24 (`npm run doctor`). `sql:setup` odtwarza bazę od zera — nie uruchamiaj go między pomiarami. Przekroczenie budżetu **500 ms** w starterze jest objawem do optymalizacji, nie błędem instalacji.
2. **Zachowaj wynik przed edycją.** Skopiuj zapytanie do `portfolio/cw08-raport-przed.sql`. Poproś agenta o lokalny skrypt porównujący pełne wyniki tej kopii i bieżącego SQL na tej samej bazie: wszystkie wiersze, kolumny, wartości i kolejność. Na starcie mają być identyczne. Skrypt zapisz w `portfolio/`; niech wypisze liczbę różnic i kończy się błędem, gdy je znajdzie.
3. **Postaw hipotezę, zanim zapytasz model.** Które miejsce w tym zapytaniu wykonuje się raz, a które raz na wiersz wyniku? Zapisz odpowiedź.
4. **Daj modelowi zapytanie i poproś o wskazanie kosztownych miejsc.** Nie proś od razu o gotową poprawkę. Najpierw lista miejsc razem z uzasadnieniem, potem dopiero zmiana.
5. **Poprawiaj po jednej rzeczy naraz.** Przed zmianą i po niej wykonaj po trzy pomiary `npm run sql:raport` na tej samej VM; zapisz medianę (środkowy wynik po uporządkowaniu czasów) w `portfolio/cw08-sql.md`. Po każdej zmianie uruchom też porównanie pełnych wyników. Gdy czasy mocno się wahają, nie przypisuj różnicy automatycznie poprawce.
6. **Sprawdź granice kontroli.** `scripts/sql-raport.mjs` kontroluje sumy, liczby operacji i obrót roczny, ale nie sprawdza każdej kolumny, np. średniej kroczącej. Dlatego potrzebujesz także porównania pełnych wyników. Zachowaj znaczenie `ROWS BETWEEN 90 PRECEDING AND CURRENT ROW`: 90 poprzednich wierszy i bieżący, nie automatycznie 90 dni kalendarzowych.

**Prompt do kroku 2:**

```text
Nie zmieniaj zapytania. Na podstawie scripts/sql-raport.mjs napisz
portfolio/porownaj-raport.mjs, uruchamiany: node portfolio/porownaj-raport.mjs.
Otwórz dane/lokalna-baza/rozliczenia.db tylko do odczytu i wykonaj SELECT-y
z portfolio/cw08-raport-przed.sql oraz sql/lokalnie/raport_obrotow.sql.
Porównaj wszystkie pola i kolejność wierszy, także średnią kroczącą.
Pokaż pierwszą różnicę i zakończ kodem 1 przy niezgodności.
Nie podmieniaj wzorca po optymalizacji. Nie dodawaj zależności.
```

W bieżącym zapytaniu tymczasowo zmień wartość jednej zwracanej kolumny i sprawdź, że porównanie z zachowaną kopią to wykrywa. Cofnij tylko tę zmianę przed optymalizacją; wzorca nie zmieniaj. Zgodność ze wzorcem dowodzi zachowania wyniku na tych danych, nie jego poprawności dla każdego możliwego wejścia.

> **Jeśli utknąłeś po 15 minutach**
> Policz, ile wierszy zwraca raport, a potem policz, ile razy przy takim wyniku
> musi wykonać się każda część zapytania. Która część potrzebuje całej tabeli
> `transakcje` za każdym razem, choć jej wynik dla danego oddziału jest zawsze
> ten sam?

> **Nie masz doświadczenia z oknami i CTE**
> Zacznij od przeczytania zapytania modelowi na głos, blok po bloku: każ mu
> wyjaśnić, co robi każdy `WITH` i co dokładnie robi `OVER (PARTITION BY ...)`.
> Potem na tymczasowej kopii sprawdź wersję bez średniej kroczącej —
> zobaczysz, ile kosztuje samo okno, a ile reszta. Do właściwej poprawki wracasz
> z tą wiedzą, a nie z domysłem.

> **Skończyłeś wcześniej**
> Po zapisaniu działającej wersji wykonaj eksperyment na osobnej kopii; nie commituj uszkodzeń. Popsuj wynik celowo: usuń warunek `WHERE t.waluta = 'PLN'` i uruchom raport.
> Zobacz, co wypisuje sprawdzenie liczb, i odpowiedz na pytanie, dlaczego nie
> wystarczyłoby porównanie samego czasu wykonania. Potem odtwórz tę samą
> kontrolę na kartce dla `sql/raport_dzienny.sql` w dialekcie Oracle: co
> musiałbyś policzyć niezależnie, żeby wychwycić taką zmianę na produkcji?
>
> Potem poszukaj granicy tej kontroli od drugiej strony. Zmień w zapytaniu okno
> `90 PRECEDING` na `30 PRECEDING` i uruchom raport. Przechodzi na zielono? Jeśli
> tak, to raport zwraca teraz inne liczby, a kontrola tego nie widzi. Znajdź jeszcze
> jedną taką zmianę, której nie złapie.
>
> Na koniec dopisz do `scripts/sql-raport.mjs` sprawdzenie, które łapie to, co
> znalazłeś. Potem zdecyduj, czy zostawiłbyś je na produkcji: kosztuje czas przy
> każdym przebiegu, a chroni przed błędem, którego nikt jeszcze nie popełnił.

## Gotowe, gdy

- [ ] pełne wyniki przed/po są zgodne; masz trzy pomiary i medianę, a `npm run sql:raport` potwierdza sprawdzane liczby
- [ ] raport mieści się w 500 ms albo jawnie zapisujesz przekroczenie, pomiary i dalszy krok — nie podnosisz progu tylko po to, by dostać zielony wynik
- [ ] umiesz wskazać w oryginalnym zapytaniu każdą zmienioną rzecz i powiedzieć, jaki efekt zmierzyłeś - z zapisanymi pomiarami, nie z pamięci
- [ ] umiesz powiedzieć drugiej osobie, co sprawdza kontrola liczb w `scripts/sql-raport.mjs` i jakiej zmiany w zapytaniu **nie** złapałaby

## Na koniec ćwiczenia

Zachowaj wzorzec, skrypt porównujący i pomiary w `portfolio/`. Przed commitem sprawdź, czy wróciłeś z eksperymentów do działającej wersji:

```bash
git status --short
git diff
git add sql/lokalnie/raport_obrotow.sql
git diff --cached
git commit -m "Optymalizacja raportu z kontrola wynikow"
```

Jeśli świadomie rozbudowałeś kontrolę w `scripts/sql-raport.mjs`, przejrzyj i dodaj także ten plik.
