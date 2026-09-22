-- Zadanie końcowe SQL. Tabele: operacje, limity kredytowe (schemat w docs/kontrakt-operatora.md).
-- Zwróć pola kontraktu; jedna operacja ma odpowiadać jednemu wierszowi.
-- Szkielet celowo nie zwraca wyników. Nie wpisuj kwot z demo na stałe.
SELECT id, nrRachunku, dataWaluty, waluta, kwotaGrosze,
       NULL AS limitGrosze, 0 AS wykorzystanieGrosze,
       0 AS przekroczenieGrosze, 'brak_limitu' AS status,
       'Niepodłączone' AS powod
FROM operacje WHERE 0;
