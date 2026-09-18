-- =============================================================================
-- Dialekt: SQLite (modul `node:sqlite`, wbudowany w Node 24).
--
-- To jest jedyny schemat w tym repozytorium, ktory naprawde sie uruchamia.
-- Pliki w katalogu `sql/` obok sa w dialekcie Oracle i sluza do czytania.
--
-- Baza powstaje komenda: npm run sql:setup
-- =============================================================================

CREATE TABLE oddzialy (
    kod_oddzialu   TEXT NOT NULL PRIMARY KEY,
    nazwa          TEXT NOT NULL,
    miasto         TEXT NOT NULL
);

CREATE TABLE transakcje (
    id_operacji        TEXT    NOT NULL PRIMARY KEY,
    nr_rachunku        TEXT    NOT NULL,
    kod_oddzialu       TEXT    NOT NULL,

    -- Kwota zawsze dodatnia, kierunek niesie `typ_operacji` - tak samo jak
    -- w `src/model.ts`. Grosze jako liczba calkowita, zeby sumowanie bylo
    -- dokladne.
    kwota_grosze       INTEGER NOT NULL CHECK (kwota_grosze > 0),

    waluta             TEXT    NOT NULL CHECK (waluta IN ('PLN', 'EUR', 'USD')),
    typ_operacji       TEXT    NOT NULL CHECK (typ_operacji IN ('UZNANIE', 'OBCIAZENIE')),

    -- Moment zaksiegowania, ISO 8601. Data waluty osobno, bo od niej licza
    -- sie odsetki i bywa pozniejsza niz ksiegowanie.
    data_ksiegowania   TEXT    NOT NULL,
    data_waluty        TEXT    NOT NULL,

    tytul              TEXT    NOT NULL,

    FOREIGN KEY (kod_oddzialu) REFERENCES oddzialy (kod_oddzialu)
);

CREATE INDEX idx_transakcje_data_waluty  ON transakcje (data_waluty);
CREATE INDEX idx_transakcje_oddzial      ON transakcje (kod_oddzialu);
