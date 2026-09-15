-- =============================================================================
-- Dialekt: Oracle Database (SQL, składnia zgodna z Oracle 19c+).
--
-- Ten skrypt NIE jest uruchamiany w środowisku szkoleniowym — nie ma tu
-- instancji bazy danych. Plik służy wyłącznie do czytania, wyjaśniania
-- i analizy przez model AI.
-- =============================================================================
--
-- Raport dobowy z rejestru transakcji (tabela TRANSAKCJE, patrz
-- 001_init_transakcje.sql).
--
-- Moduł uzgodnień pracuje w groszach — stąd konwersja SUMA_GROSZY w obu
-- zapytaniach. Suma kontrolna z nagłówka wyciągu źródłowego jest jedną
-- liczbą obejmującą wszystkie waluty łącznie, więc zapytanie 2. daje
-- rozbicie, a nie gotową wartość do porównania (patrz komentarz przy nim).
--
-- Parametry (bind variables, ustawiane przez harmonogram wywołujący raport):
--   :data_od, :data_do   — zakres dat księgowania raportu, granice włącznie
--   :plik_zrodlowy       — nazwa pliku wyciągu, dla którego liczone jest
--                          uzgodnienie (patrz 2. poniżej)


-- 1. Rozbicie dobowe: liczba operacji i obroty per dzień księgowania i waluta.

SELECT
    TRUNC(t.data_ksiegowania)          AS dzien_ksiegowania,
    t.waluta,
    COUNT(*)                           AS liczba_operacji,
    SUM(TRUNC(t.kwota * 100))          AS suma_groszy,
    ROUND(SUM(t.kwota), 2)             AS suma_zlotych
FROM transakcje t
WHERE t.data_ksiegowania >= TRUNC(:data_od)
  AND t.data_ksiegowania <  TRUNC(:data_do) + 1
GROUP BY TRUNC(t.data_ksiegowania), t.waluta
ORDER BY dzien_ksiegowania, t.waluta;


-- 2. Rozbicie całego wyciągu na waluty: po jednym wierszu na walutę
--    występującą w pliku, z liczbą operacji i sumą kwot w groszach.
--    Uwaga przy uzgodnieniach: `suma_kontrolna_grosze` z nagłówka pliku
--    źródłowego to POJEDYNCZA liczba obejmująca wszystkie waluty łącznie,
--    więc nie da się jej porównać z żadnym pojedynczym wierszem tego
--    wyniku — zestawia się ją z sumą SUMA_GROSZY po wszystkich zwróconych
--    wierszach. Rozbicie per waluta służy do wskazania, w której walucie
--    siedzi ewentualna różnica.

SELECT
    t.waluta,
    COUNT(*)                           AS liczba_operacji,
    SUM(TRUNC(t.kwota * 100))          AS suma_groszy
FROM transakcje t
WHERE t.plik_zrodlowy = :plik_zrodlowy
GROUP BY t.waluta
ORDER BY t.waluta;
