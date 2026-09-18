# sql/ — ścieżka SQL/Oracle

Materiał dla uczestników, którzy deklarują SQL/PL-SQL zamiast TypeScriptu —
ten sam obszar biznesowy (transakcje, odsetki, raport dzienny), wyrażony
w dialekcie, na którym pracuje bank, zamiast w TypeScripcie.

**Dialekt: Oracle Database (SQL + PL/SQL, składnia zgodna z Oracle 19c+).**
Nie DB2, nie PostgreSQL, nie T-SQL.

**Tych plików nikt nie uruchamia.** Instancji Oracle tu nie ma — są materiałem
do czytania, wyjaśniania i analizy przez model AI, nie do wykonania. Nie próbuj
`sqlplus` ani żadnego klienta Oracle na tych plikach, nie ma do czego się
podłączyć.

Wyjątkiem jest podkatalog **`lokalnie/`** — tam jest SQLite, który działa od
razu, bez instalacji i bez serwera (`npm run sql:setup`, `npm run sql:raport`).
Opis w `lokalnie/README.md`.

## Pliki

- **`001_init_transakcje.sql`** — migracja tworząca tabelę `TRANSAKCJE`,
  odpowiednik `Transaction` z `src/model.ts` po stronie bazy danych.
  Indeksy, ograniczenia, komentarze do kolumn.
- **`raport_dzienny.sql`** — zapytanie raportowe: obroty per dzień
  księgowania i per waluta, plus suma całego wyciągu do uzgodnienia z sumą
  kontrolną z nagłówka pliku źródłowego. Odpowiednik raportu generowanego
  przez `src/reports/dailyReport.ts` po stronie bazy danych.
- **`nalicz_odsetki.sql`** — procedura PL/SQL naliczająca odsetki dla
  rachunku oszczędnościowego, odpowiednik `src/interest/accrue.ts`.
  Materiał uzupełniający — pierwszy do pominięcia, gdyby zabrakło czasu.

## Jak z tego korzystać

Daj model wybrany plik i poproś o wyjaśnienie: co robi zapytanie albo
procedura, jakie są przyjęte założenia. Traktuj to jako materiał do
czytania i dyskusji, nie do uruchamiania.
