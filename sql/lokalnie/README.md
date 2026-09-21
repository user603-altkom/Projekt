# sql/lokalnie/ — część, która naprawdę się uruchamia

Starsze `sql/001_init_transakcje.sql` i `sql/raport_dzienny.sql` są w dialekcie Oracle i służą do czytania. Osobne `sql/franek-limity.sql` to SQLite na finał. Tutaj jest
SQLite, który działa od razu: baza powstaje z modułu `node:sqlite` wbudowanego
w Node, bez instalacji, bez serwera, bez Dockera i bez połączenia z siecią.

## Pliki

- **`001_schemat.sql`** — tabele `oddzialy` i `transakcje`. Odpowiednik
  `Transaction` z `src/model.ts` po stronie bazy, z tą samą zasadą: kwota
  zawsze dodatnia, kierunek niesie `typ_operacji`, grosze jako liczba całkowita.
- **`raport_obrotow.sql`** — nocny raport obrotów per oddział ze średnią
  kroczącą z 90 poprzednich wierszy i bieżącego (okno `ROWS`, nie 90 dni kalendarzowych). To zapytanie jest materiałem Ćw. 8 w ścieżce SQL.

## Komendy

```
npm run sql:setup     # buduje bazę w dane/lokalna-baza/rozliczenia.db
npm run sql:raport    # uruchamia raport, mierzy czas, sprawdza liczby
```

Dane są generowane z ustalonego ziarna, więc każdy dostaje identyczną bazę
ale czasy zależą od sprzętu i obciążenia; porównuj warianty na tej samej maszynie. Baza nie jest w repozytorium — buduje się ją u siebie,
a `npm run sql:setup` można uruchamiać wielokrotnie, za każdym razem od zera.

## Co sprawdza `npm run sql:raport`

Dwie rzeczy osobno, i obie muszą wyjść:

1. **Liczby.** Sumy dzienne, liczby operacji i obrót roczny są przeliczane
   niezależnie, w JavaScripcie, prosto z tabeli `transakcje` — nie tym samym
   zapytaniem, które sprawdzają. To kontrola wybranych wartości, nie wszystkich
   kolumn: nie obejmuje np. średniej kroczącej. W ćw. 08 SQL porównujesz także
   pełne wyniki przed zmianą i po niej.
2. **Czas.** Budżet ćwiczeniowy wynosi 500 ms. Przekroczenie go w starterze jest
   oczekiwanym punktem wyjścia do optymalizacji, nie błędem instalacji.

Skrypt kończy się kodem `1`, gdy którakolwiek z tych rzeczy nie wyjdzie —
więc nadaje się do potoku CI tak samo jak `npm test`.

## Wymagania

Node 24 (plik `.nvmrc` wskazuje tę wersję). `npm run doctor` sprawdza, czy
moduł `node:sqlite` jest dostępny na Twojej maszynie.
