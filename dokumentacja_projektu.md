# Referencja techniczna modułów `src`

## Przeznaczenie

Katalog [`src/`](src/) zawiera moduły TypeScript demonstracyjnego systemu rozliczeniowego. System importuje operacje, przechowuje je w rejestrze pamięciowym, waliduje kontrakt danych, buduje raporty, sprawdza limity, nalicza odsetki oraz przypisuje operacje do kont księgowych.

Dokument jest referencją dla osoby analizującej lub zmieniającej moduły. Opisuje publiczne funkcje, format danych oraz rzeczywiste granice integracji. Nie opisuje danych wejściowych z katalogu `dane/` ani nie jest instrukcją wdrożenia.

## Wspólny kontrakt danych

[src/model.ts](src/model.ts) definiuje typy importowane przez pozostałe moduły:

| Element | Kontrakt |
| --- | --- |
| `NrRachunku` | Napis z numerem rachunku; walidator wymaga 26 cyfr. |
| `Waluta` | Jedna z wartości: `PLN`, `EUR`, `USD`. |
| `TypOperacji` | `UZNANIE` albo `OBCIAZENIE`. |
| `Transaction` | Operacja z identyfikatorem, rachunkiem, kwotą w całkowitych groszach, walutą, typem, datą księgowania, datą waluty i tytułem. |
| `ValidationResult` | Wynik z polem `ok` i listą polskojęzycznych komunikatów `bledy`. |

`Transaction.kwotaGrosze` przechowuje wartość dodatnią. Kierunek wartości wynika wyłącznie z `typ`; uznanie zwiększa saldo, a obciążenie je zmniejsza.

## Import, walidacja i rejestr

### Import CSV

[src/import/parseBankFile.ts](src/import/parseBankFile.ts) udostępnia `readBankFile(sciezka)` i `parseBankFile(zawartosc)`. Import rozpoznaje plik CSV rozdzielany średnikiem, opcjonalny BOM UTF-8, komentarze techniczne oraz nagłówek kolumn. Z komentarza odczytuje `suma_kontrolna_grosze`.

Wynik `ParsedBankFile` zawiera zaimportowane `transactions`, opcjonalną sumę kontrolną i numery `pominieteWiersze`. Wiersz jest pomijany, gdy ma inną liczbę kolumn albo nie przechodzi parsowania wymaganych pól. Kwota wejściowa może używać polskiego lub angielskiego separatora dziesiętnego; import zamienia ją na grosze i zapisuje wartość bezwzględną. Ujemna kwota wejściowa oznacza obciążenie.

### Walidacja

[src/transactions/validate.ts](src/transactions/validate.ts) udostępnia `validateTransaction` oraz `validateTransactions`. Walidacja sprawdza między innymi niepusty identyfikator i tytuł, 26-cyfrowy NRB, niezerową całkowitą kwotę w groszach, obsługiwaną walutę, typ operacji, poprawny ISO 8601 dla `bookedAt` i istniejącą datę `dataWaluty` w formacie `YYYY-MM-DD`.

Walidacja paczki dodaje identyfikator operacji jako prefiks każdego komunikatu. Import i walidacja są osobnymi etapami: sam import nie wywołuje `validateTransaction`.

### Rejestr

[src/transactions/register.ts](src/transactions/register.ts) definiuje `TransactionRegister`, pamięciowy rejestr pojedynczego przebiegu. Udostępnia dodawanie operacji, odczyt wszystkich wpisów, filtrowanie po rachunku oraz listę rachunków w kolejności pierwszego wystąpienia.

Funkcja `sumTransactions` sumuje kwoty bez uwzględniania kierunku. `netBalance` zwraca saldo netto, stosując znak zgodny z `typ`.

## Raport dzienny

[src/reports/dailyReport.ts](src/reports/dailyReport.ts) łączy import i rejestr. `buildDailyReport(sciezka)` odczytuje wyciąg, zlicza operacje i rachunki, sumuje obroty oraz porównuje je z sumą kontrolną z nagłówka pliku. Pole `roznicaGrosze` ma wartość `null`, gdy suma kontrolna nie występuje.

`formatDailyReport` tworzy raport tekstowy. Skrypt może działać jako CLI:

```sh
npm run raport
```

## Limity kredytowe i operator

[src/limits/creditLimit.ts](src/limits/creditLimit.ts) definiuje konfigurację `CreditLimit`: rachunek, limit w groszach, walutę oraz dzień wejścia w życie. `parseCreditLimits` przyjmuje tablicę JSON lub obiekt z polem `limity`; błędne wpisy są pomijane. `findCreditLimit` wybiera najpóźniejszy limit obowiązujący nie później niż wskazany dzień.

`creditLimitUsage` sumuje wyłącznie obciążenia. `checkCreditLimit` uwzględnia bieżącą operację i przekazaną historię tego samego rachunku. `checkCreditLimits` przetwarza partię w kolejności wejściowej, osobno dla każdego rachunku, a operacja przekraczająca limit pozostaje w historii. Brak limitu oznacza brak ograniczenia, nie limit zerowy.

[src/operator/limitRows.ts](src/operator/limitRows.ts) definiuje model wiersza dla ekranu operatora i funkcję `buildLimitRows`. Obecna implementacja celowo zwraca `stan: 'niepodlaczone'` oraz pustą listę, więc raport repozytoryjny nie korzysta jeszcze z logiki limitów.

[src/operator/report.ts](src/operator/report.ts) odczytuje wersjonowane dane demonstracyjne Franka i buduje raport operatora przez `buildLimitRows`; dlatego na obecnym etapie również zwraca stan niepodłączony. [src/operator/sqlReport.ts](src/operator/sqlReport.ts) udostępnia niezależny wariant: ładuje operacje i limity do tymczasowej bazy SQLite, wykonuje [sql/franek-limity.sql](sql/franek-limity.sql) i zwraca gotowe wiersze operatora.

## Odsetki i data waluty

[src/interest/accrue.ts](src/interest/accrue.ts) udostępnia `accrueInterest(dane)`. Funkcja przyjmuje niesformalizowane dane, obsługuje rachunki oszczędnościowe, lokaty oraz kredyty odnawialne i zwraca kwoty brutto, podatku oraz netto w groszach, saldo końcowe, kapitalizacje, korekty i ostrzeżenia.

Naliczanie przetwarza kolejne dni okresu. Dla rachunków oszczędnościowych stosuje progi kwotowe, dla lokaty stawkę rachunku i obniżenie po zerwaniu, a dla kredytu nalicza odsetki od wykorzystania oraz wyższą stawkę nad limitem. Kapitalizacja może być dzienna, miesięczna lub kwartalna; koniec okresu zawsze ją zamyka. Podatek 19% nie jest naliczany dla kredytu odnawialnego.

[src/interest/valueDate.ts](src/interest/valueDate.ts) wystawia `isWeekend`, `isDzienUstawowoWolny` i `addBusinessDays`. Dwie pierwsze funkcje rozpoznają weekend oraz stałe święta. Mimo nazwy i komentarza `addBusinessDays` w bieżącej implementacji przesuwa poprawną datę o `n` dni kalendarzowych i nie pomija dni wolnych; nie należy zakładać, że realizuje pełny kalendarz dni roboczych.

## Routing i księgowanie

[src/routing/schemat.ts](src/routing/schemat.ts) opisuje typy produktów, kanałów, flag, warunków i reguł księgowania. Eksportuje wzorce rozpoznawania kanału i flagi w tytule oraz uporządkowaną tablicę `REGULY`. Reguła pasuje, gdy wszystkie podane pola warunku są spełnione; ostatnia reguła jest domyślna.

[src/routing/kontoKsiegowe.ts](src/routing/kontoKsiegowe.ts) wyprowadza produkt i oddział z numeru rachunku, określa znacznik kierunku zależny od daty waluty oraz składa numer konta w postaci `ZZ-OOO-RRRK-W`. Gdy odwzorowanie oddziału lub waluty nie istnieje, tworzy segment zastępczy, który można wykryć funkcją `maSegmentZastepczy`.

[src/routing/silnik.ts](src/routing/silnik.ts) tworzy kontekst operacji, rozpoznaje kanał i flagę po tytule, dobiera pierwszą pasującą regułę i buduje wynik księgowania. `buildKsiegowanieReport(sciezka)` agreguje liczbę operacji według reguły i kanału, liczy pozycje wymagające akceptacji, segmenty zastępcze oraz nierozpoznane kanały. Uruchomienie CLI:

```sh
npm run ksiegowanie
```

## Punkty uruchomienia i kontrole

Skrypty z [package.json](package.json) udostępniają następujące kontrole i wejścia:

| Polecenie | Działanie |
| --- | --- |
| `npm test` | Uruchamia testy Vitest jednorazowo. |
| `npm run typecheck` | Sprawdza typy bez emisji plików. |
| `npm run raport` | Generuje raport dzienny dla wyciągu zdefiniowanego w skrypcie. |
| `npm run ksiegowanie` | Generuje zestawienie księgowania dla wyciągu zdefiniowanego w skrypcie. |
| `npm run operator` | Uruchamia serwer ekranu operatora przez skrypt pomocniczy. |
| `npm run operator:sql` | Uruchamia wariant operatora korzystający z raportu SQL. |

Najważniejsze granice zmian to kontrakt `Transaction`, całkowite grosze w polach kwotowych oraz rozdzielenie importu, walidacji i reguł biznesowych. Zmiana danych wejściowych w celu uzyskania oczekiwanego wyniku nie zastępuje poprawki modułu ani testu regresji.