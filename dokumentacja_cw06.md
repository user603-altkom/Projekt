# cw06 - Test importu przed poprawką

## Przeznaczenie
Ustalenie oczekiwań importu niezależnie od implementacji parsera.

## Wejścia i rezultat
Wykorzystywane są `src/import/parseBankFile.ts`, próbka CSV i istniejące testy. Powstają trzy scenariusze testowe oraz `portfolio/cw06-testy.md`.

## Kontrole
Uruchom `npm test -- tests/import/parseBankFile.test.ts`; oczekiwania zapisuj w całkowitych groszach, nie obliczaj ich parserem. Poprawny czerwony test jest prawidłowym wynikiem.