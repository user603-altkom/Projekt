# Ćw. 8 (ścieżka SQL) — Bezpieczna optymalizacja

**Czas:** 50 min · **Praca w parach** · Klawiaturę ma osoba, która czuje się mniej pewnie

Bierzesz tę kartę zamiast Ćw. 8, jeśli na co dzień pracujesz z bazą, a nie z TypeScriptem. Materiał jest ten sam: zmieniasz cudzy kod i musisz udowodnić, że wynik się nie zmienił.

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

1. **Zbuduj bazę i zobacz stan wyjściowy.** `npm run sql:setup`, potem `npm run sql:raport`
2. **Postaw hipotezę, zanim zapytasz model.** Które miejsce w tym zapytaniu wykonuje się raz, a które raz na wiersz wyniku? Zapisz odpowiedź.
3. **Daj modelowi zapytanie i poproś o wskazanie kosztownych miejsc.** Nie proś od razu o gotową poprawkę. Najpierw lista miejsc razem z uzasadnieniem, potem dopiero zmiana.
4. **Poprawiaj po jednej rzeczy naraz.** Po każdej zmianie `npm run sql:raport`. Zapisuj czas po każdym kroku. Licz się z tym, że nie każda poprawka coś da - i wtedy odpowiedz sobie na pytanie, dlaczego mimo to ją zostawiasz.
5. **Sprawdź, czy model nie kupił czasu za wynik.** Zapytaj go wprost, czy jego wersja może zwrócić inne wiersze niż oryginał i w jakiej sytuacji.

> **Jeśli utknąłeś po 15 minutach**
> Policz, ile wierszy zwraca raport, a potem policz, ile razy przy takim wyniku
> musi wykonać się każda część zapytania. Która część potrzebuje całej tabeli
> `transakcje` za każdym razem, choć jej wynik dla danego oddziału jest zawsze
> ten sam?

> **Nie masz doświadczenia z oknami i CTE**
> Zacznij od przeczytania zapytania modelowi na głos, blok po bloku: każ mu
> wyjaśnić, co robi każdy `WITH` i co dokładnie robi `OVER (PARTITION BY ...)`.
> Potem poproś o wersję bez średniej kroczącej i sprawdź `npm run sql:raport` -
> zobaczysz, ile kosztuje samo okno, a ile reszta. Do właściwej poprawki wracasz
> z tą wiedzą, a nie z domysłem.

> **Skończyłeś wcześniej**
> Popsuj wynik celowo: usuń warunek `WHERE t.waluta = 'PLN'` i uruchom raport.
> Zobacz, co wypisuje sprawdzenie liczb, i odpowiedz na pytanie, dlaczego nie
> wystarczyłoby porównanie samego czasu wykonania. Potem odtwórz tę samą
> kontrolę na kartce dla `sql/raport_dzienny.sql` w dialekcie Oracle: co
> musiałbyś policzyć niezależnie, żeby wychwycić taką zmianę na produkcji?

## Gotowe, gdy

- [ ] `npm run sql:raport` mieści się w budżecie i kończy się komunikatem, że liczby zgadzają się co do grosza
- [ ] umiesz wskazać w oryginalnym zapytaniu każdą zmienioną rzecz i powiedzieć, ile czasu zdjęła - z zapisanymi pomiarami, nie z pamięci
- [ ] umiesz powiedzieć drugiej osobie, co sprawdza kontrola liczb w `scripts/sql-raport.mjs` i jakiej zmiany w zapytaniu **nie** złapałaby

## Na koniec ćwiczenia

```
git switch -c imie/cw08sql && git add -A && git commit -m "cw08 sql" --allow-empty && git switch main
```
