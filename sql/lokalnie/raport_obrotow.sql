-- =============================================================================
-- Raport obrotow per oddzial, ze srednia kroczaca z 90 dni.
-- Dialekt: SQLite. Uruchamiany przez: npm run sql:raport
--
-- Zrodlo: zadanie wsadowe `raport_obrotow_oddzialy`, harmonogram nocny.
--
-- Historia zmian:
--   2025-09-14  wersja pierwsza, liczyla sie ponizej sekundy
--   2025-11-03  dolozona srednia kroczaca 90-dniowa (wniosek z audytu)
--   2026-01-20  dolozona kolumna z obrotem rocznym oddzialu
--   2026-08-30  zgloszenie z utrzymania: raport nie miesci sie w oknie nocnym
-- =============================================================================

WITH obroty_dzienne AS (
    SELECT
        t.kod_oddzialu,
        CAST(substr(t.data_waluty, 6, 2) AS INTEGER) AS miesiac,
        t.data_waluty,
        SUM(t.kwota_grosze) AS suma_grosze,
        COUNT(*)            AS liczba_operacji
    FROM transakcje t
    WHERE t.waluta = 'PLN'
    GROUP BY
        t.kod_oddzialu,
        CAST(substr(t.data_waluty, 6, 2) AS INTEGER),
        t.data_waluty
),

srednia_kroczaca AS (
    SELECT
        o.kod_oddzialu,
        o.miesiac,
        o.data_waluty,
        o.suma_grosze,
        o.liczba_operacji,
        AVG(o.suma_grosze) OVER (
            PARTITION BY o.kod_oddzialu
            ORDER BY o.data_waluty
            ROWS BETWEEN 90 PRECEDING AND CURRENT ROW
        ) AS srednia_90d
    FROM obroty_dzienne o
)

SELECT DISTINCT
    s.kod_oddzialu,
    d.nazwa  AS nazwa_oddzialu,
    d.miasto,
    s.miesiac,
    s.data_waluty,
    s.suma_grosze,
    s.liczba_operacji,
    CAST(s.srednia_90d AS INTEGER) AS srednia_90d_grosze,
    (
        SELECT SUM(t2.kwota_grosze)
        FROM transakcje t2
        WHERE t2.kod_oddzialu = s.kod_oddzialu
          AND t2.waluta = 'PLN'
    ) AS obrot_roczny_grosze
FROM srednia_kroczaca s
JOIN oddzialy d
    ON d.kod_oddzialu = s.kod_oddzialu
ORDER BY s.kod_oddzialu, s.data_waluty;
