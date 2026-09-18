# sql/lokalnie/ — część, która naprawdę się uruchamia

Reszta katalogu `sql/` jest w dialekcie Oracle i służy do czytania. Tutaj jest
SQLite, który działa od razu: baza powstaje z modułu `node:sqlite` wbudowanego
w Node, bez instalacji, bez serwera, bez Dockera i bez połączenia z siecią.

## Pliki

- **`001_schemat.sql`** — tabele `oddzialy` i `transakcje`. Odpowiednik
  `Transaction` z `src/model.ts` po stronie bazy, z tą samą zasadą: kwota
  zawsze dodatnia, kierunek niesie `typ_operacji`, grosze jako liczba całkowita.
- **`raport_obrotow.sql`** — nocny raport obrotów per oddział ze średnią
  kroczącą z 90 dni. To zapytanie jest materiałem Ćw. 8 w ścieżce SQL.

## Komendy

```
npm run sql:setup     # buduje bazę w dane/lokalna-baza/rozliczenia.db
npm run sql:raport    # uruchamia raport, mierzy czas, sprawdza liczby
```

Dane są generowane z ustalonego ziarna, więc każdy dostaje identyczną bazę
i porównywalne czasy. Baza nie jest w repozytorium — buduje się ją u siebie,
a `npm run sql:setup` można uruchamiać wielokrotnie, za każdym razem od zera.

## Co sprawdza `npm run sql:raport`

Dwie rzeczy osobno, i obie muszą wyjść:

1. **Liczby.** Sumy dzienne, liczby operacji i obrót roczny są przeliczane
   niezależnie, w JavaScripcie, prosto z tabeli `transakcje` — nie tym samym
   zapytaniem, które sprawdzają. Dzięki temu nie da się „przyspieszyć" raportu,
   psując wynik.
2. **Czas.** Budżet to odpowiednik okna nocnego przeliczony na skalę tego
   zbioru danych.

Skrypt kończy się kodem `1`, gdy którakolwiek z tych rzeczy nie wyjdzie —
więc nadaje się do potoku CI tak samo jak `npm test`.

## Wymagania

Node 24 (plik `.nvmrc` wskazuje tę wersję). Moduł `node:sqlite` pojawił się
w Node 22 i do Node 24 wymagał flagi. `npm run doctor` mówi wprost, czy ta
ścieżka zadziała na twojej maszynie.
