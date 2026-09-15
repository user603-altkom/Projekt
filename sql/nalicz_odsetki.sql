-- =============================================================================
-- Dialekt: Oracle Database (PL/SQL, składnia zgodna z Oracle 19c+).
--
-- Ten skrypt NIE jest uruchamiany w środowisku szkoleniowym — nie ma tu
-- instancji bazy danych. Plik służy wyłącznie do czytania, wyjaśniania
-- i analizy przez model AI.
-- =============================================================================
--
-- Naliczanie odsetek dla rachunku oszczędnościowego — odpowiednik
-- `src/interest/accrue.ts` po stronie bazy danych, ograniczony do jednego
-- typu produktu. Lokaty i kredyt odnawialny rozlicza osobny moduł.
--
-- Naliczenie obejmuje jedną walutę rachunku — wskazuje ją parametr
-- `p_waluta` (domyślnie PLN). Rachunek wielowalutowy prowadzi odrębne
-- saldo dla każdej waluty; zsumowanie operacji PLN, EUR i USD do jednego
-- salda dałoby liczbę bez sensu ekonomicznego i rozjechałoby progi
-- kwotowe, które są wyrażone w jednostkach waluty naliczenia.
--
-- Odsetki liczone są dziennie od salda rachunku po zaksięgowaniu operacji
-- danego dnia, z kapitalizacją na koniec każdego miesiąca kalendarzowego
-- i na koniec okresu naliczenia. Przy każdej kapitalizacji potrącany jest
-- zryczałtowany podatek od dochodów kapitałowych.
--
-- Przykład wywołania:
--
-- DECLARE
--     v_odsetki NUMBER;
-- BEGIN
--     nalicz_odsetki(
--         p_nr_rachunku    => '89000048016279458747470461',
--         p_waluta         => 'PLN',
--         p_data_od        => DATE '2026-08-01',
--         p_data_do        => DATE '2026-08-31',
--         p_saldo_otwarcia => 12500.00,
--         p_odsetki_netto  => v_odsetki
--     );
--     DBMS_OUTPUT.PUT_LINE('Odsetki netto: ' || TO_CHAR(v_odsetki, 'FM999G999G990D00'));
-- END;
-- /

CREATE OR REPLACE PROCEDURE nalicz_odsetki (
    p_nr_rachunku    IN  transakcje.nr_rachunku%TYPE,
    p_waluta         IN  transakcje.waluta%TYPE DEFAULT 'PLN',
    p_data_od        IN  DATE,
    p_data_do        IN  DATE,
    p_saldo_otwarcia IN  NUMBER,
    p_odsetki_netto  OUT NUMBER
)
AS
    -- Progi kwotowe i stawki rachunku oszczędnościowego, w jednostkach
    -- waluty naliczenia (p_waluta).
    c_prog_1        CONSTANT NUMBER := 5000;
    c_prog_2        CONSTANT NUMBER := 50000;
    c_stawka_1      CONSTANT NUMBER := 0.005;   -- 0,50%
    c_stawka_2      CONSTANT NUMBER := 0.02;    -- 2,00%
    c_stawka_3      CONSTANT NUMBER := 0.0325;  -- 3,25%
    c_podatek_belki CONSTANT NUMBER := 0.19;

    -- Baza dni w roku: PLN 365, waluty obce 360 (konwencja rozliczeń
    -- dewizowych) — jak bazaDni() w src/interest/accrue.ts.
    c_baza_dni      CONSTANT NUMBER := CASE WHEN p_waluta = 'PLN' THEN 365 ELSE 360 END;

    -- Zmiana netto salda w danym dniu (suma uznań minus suma obciążeń),
    -- zaindeksowana kluczem YYYYMMDD — odpowiednik mapy dzień -> operacje
    -- z accrue.ts, tylko już zwiniętej do jednej liczby na dzień.
    TYPE t_zmiany_dnia IS TABLE OF NUMBER INDEX BY VARCHAR2(8);
    v_zmiany            t_zmiany_dnia;
    v_klucz             VARCHAR2(8);

    v_saldo             NUMBER := p_saldo_otwarcia;
    v_odsetki_narosle   NUMBER := 0;
    v_odsetki_brutto    NUMBER := 0;
    v_podatek           NUMBER := 0;
    v_dzien             DATE;
    v_liczba_dni_z_ruch PLS_INTEGER := 0;

    FUNCTION stawka_dla_salda(p_saldo NUMBER) RETURN NUMBER IS
    BEGIN
        IF p_saldo <= 0 THEN
            RETURN 0;
        ELSIF p_saldo < c_prog_1 THEN
            RETURN c_stawka_1;
        ELSIF p_saldo < c_prog_2 THEN
            RETURN c_stawka_2;
        ELSE
            RETURN c_stawka_3;
        END IF;
    END stawka_dla_salda;

BEGIN
    IF p_data_od IS NULL OR p_data_do IS NULL OR p_data_od > p_data_do THEN
        RAISE_APPLICATION_ERROR(-20001, 'Zakres dat naliczenia jest niepoprawny.');
    END IF;

    IF p_waluta IS NULL OR p_waluta NOT IN ('PLN', 'EUR', 'USD') THEN
        RAISE_APPLICATION_ERROR(-20003, 'Nieobslugiwana waluta naliczenia: ' || p_waluta || '.');
    END IF;

    FOR rec IN (
        SELECT t.data_waluty,
               SUM(CASE WHEN t.typ_operacji = 'UZNANIE' THEN t.kwota ELSE -t.kwota END) AS zmiana
        FROM   transakcje t
        WHERE  t.nr_rachunku = p_nr_rachunku
        AND    t.waluta = p_waluta
        AND    t.data_waluty BETWEEN p_data_od AND p_data_do
        GROUP BY t.data_waluty
    ) LOOP
        v_zmiany(TO_CHAR(rec.data_waluty, 'YYYYMMDD')) := rec.zmiana;
        v_liczba_dni_z_ruch := v_liczba_dni_z_ruch + 1;
    END LOOP;

    IF v_liczba_dni_z_ruch = 0 THEN
        RAISE NO_DATA_FOUND;
    END IF;

    v_dzien := p_data_od;
    WHILE v_dzien <= p_data_do LOOP
        v_klucz := TO_CHAR(v_dzien, 'YYYYMMDD');
        IF v_zmiany.EXISTS(v_klucz) THEN
            v_saldo := v_saldo + v_zmiany(v_klucz);
        END IF;

        v_odsetki_narosle := v_odsetki_narosle
            + v_saldo * stawka_dla_salda(v_saldo) / c_baza_dni;

        -- Kapitalizacja: ostatni dzień miesiąca kalendarzowego albo koniec
        -- okresu naliczenia, jeśli wypada wcześniej.
        IF (TRUNC(v_dzien + 1, 'MM') != TRUNC(v_dzien, 'MM') OR v_dzien = p_data_do)
           AND v_odsetki_narosle >= 0.01 THEN
            DECLARE
                v_brutto NUMBER := ROUND(v_odsetki_narosle, 2);
                v_pod    NUMBER := ROUND(v_brutto * c_podatek_belki, 2);
            BEGIN
                v_saldo           := v_saldo + (v_brutto - v_pod);
                v_odsetki_brutto  := v_odsetki_brutto + v_brutto;
                v_podatek         := v_podatek + v_pod;
                v_odsetki_narosle := v_odsetki_narosle - v_brutto;
            END;
        END IF;

        v_dzien := v_dzien + 1;
    END LOOP;

    p_odsetki_netto := v_odsetki_brutto - v_podatek;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20002, 'Brak operacji w walucie ' || p_waluta || ' dla rachunku ' || p_nr_rachunku || ' w podanym okresie.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20099, 'Blad naliczania odsetek dla rachunku ' || p_nr_rachunku || ': ' || SQLERRM);
END nalicz_odsetki;
/
