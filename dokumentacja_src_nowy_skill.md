# Referencja techniczna katalogu `src`

## Przeznaczenie i granice

Katalog [`src/`](src/) zawiera moduły TypeScript demonstracyjnego systemu rozliczeniowego. Ich odpowiedzialności obejmują import operacji, walidację, rejestr pamięciowy, raporty, limity kredytowe, naliczanie odsetek oraz routing księgowy.

Dokument jest przeznaczony dla programisty utrzymującego te moduły. Jest referencją kontraktów i odpowiedzialności, a nie instrukcją wdrożenia, opisem danych demonstracyjnych ani przewodnikiem wykonywania ćwiczeń.

## Wspólny model danych

[src/model.ts](src/model.ts) jest wspólnym kontraktem modułów.

| Element | Znaczenie |
| --- | --- |
| `NrRachunku` | Numer rachunku zapisany jako `string`. Walidator wymaga 26 cyfr. |
| `Waluta` | `PLN`, `EUR` lub `USD`. |
| `TypOperacji` | `UZNANIE` albo `OBCIAZENIE`. |
| `Transaction` | Identyfikator, rachunek, kwota w groszach, waluta, typ, data księgowania, data waluty i tytuł operacji. |
| `ValidationResult` | Pole `ok` oraz lista komunikatów `bledy`. |

`kwotaGrosze` jest dodatnią liczbą całkowitą. Kierunek kwoty jest określany wyłącznie przez `typ`; nie należy kodować obciążenia ujemną kwotą w modelu docelowym.

## Moduły według odpowiedzialności

### Import i walidacja

[src/import/parseBankFile.ts](src/import/parseBankFile.ts) odczytuje CSV z separatorem `;`, usuwa opcjonalny BOM, odczytuje sumę kontrolną z komentarza oraz zwraca `ParsedBankFile`. Eksporty `readBankFile` i `parseBankFile` zwracają operacje oraz numery pominiętych wierszy. Import przyjmuje polski i angielski zapis kwoty, zamienia go na grosze i mapuje ujemną kwotę na obciążenie.

[src/transactions/validate.ts](src/transactions/validate.ts) udostępnia `validateTransaction` oraz `validateTransactions`. Sprawdza format NRB, całkowite i niezerowe grosze, walutę, typ, daty, identyfikator i długość tytułu. Import nie wywołuje walidatora automatycznie.

### Rejestr i raporty

[src/transactions/register.ts](src/transactions/register.ts) zawiera pamięciowy `TransactionRegister`, funkcję `sumTransactions` dla sumy obrotów oraz `netBalance` dla salda z uwzględnieniem kierunku.

[src/reports/dailyReport.ts](src/reports/dailyReport.ts) buduje `DailyReport` przez import pliku i zasilenie rejestru. `buildDailyReport` porównuje policzoną sumę obrotów z sumą kontrolną, a `formatDailyReport` tworzy wynik tekstowy.

### Limity i operator

[src/limits/creditLimit.ts](src/limits/creditLimit.ts) definiuje `CreditLimit` i `LimitCheckResult`. Oferuje ładowanie konfiguracji, wybór limitu obowiązującego w dniu operacji, obliczanie wykorzystania oraz kontrolę jednej operacji i całej partii. Wykorzystanie obejmuje wyłącznie obciążenia; brak wpisu limitu nie oznacza limitu zerowego.

[src/operator/limitRows.ts](src/operator/limitRows.ts) definiuje `OperatorRow`, `LimitRowsResult` i punkt integracji `buildLimitRows`. Aktualna implementacja celowo zwraca `stan: 'niepodlaczone'` i pustą listę, więc nie tworzy wierszy z limitów.

[src/operator/report.ts](src/operator/report.ts) ładuje wersjonowaną próbkę danych i przekazuje ją do `buildLimitRows`. [src/operator/sqlReport.ts](src/operator/sqlReport.ts) tworzy osobny raport operatora na tymczasowej SQLite, wykonując [sql/franek-limity.sql](sql/franek-limity.sql).

### Odsetki i data waluty

[src/interest/accrue.ts](src/interest/accrue.ts) eksportuje `accrueInterest(dane)`. Funkcja obsługuje rachunki oszczędnościowe, lokaty i kredyty odnawialne, kapitalizację dzienną, miesięczną lub kwartalną oraz zwraca kwoty brutto, podatku i netto w groszach, saldo, kapitalizacje, korekty i ostrzeżenia.

[src/interest/valueDate.ts](src/interest/valueDate.ts) udostępnia rozpoznawanie weekendów i stałych świąt oraz `addBusinessDays`. W obecnym kodzie `addBusinessDays` przesuwa poprawną datę o dni kalendarzowe i nie pomija dni wolnych, niezależnie od nazwy funkcji i komentarzy.

### Routing i księgowanie

[src/routing/schemat.ts](src/routing/schemat.ts) definiuje typy `Produkt`, `Kanal`, `Flaga`, `Warunek` i `RegulaKsiegowania`, a także wzorce oraz tablicę `REGULY`. Warunek pasuje, gdy spełnione są wszystkie jego podane pola; ostatnia reguła jest domyślna.

[src/routing/kontoKsiegowe.ts](src/routing/kontoKsiegowe.ts) wyprowadza produkt i oddział z numeru rachunku oraz buduje konto w formacie `ZZ-OOO-RRRK-W`. Brak odwzorowania powoduje użycie segmentu zastępczego.

[src/routing/silnik.ts](src/routing/silnik.ts) rozpoznaje kanał i flagę na podstawie tytułu, tworzy kontekst, dopasowuje pierwszą pasującą regułę i buduje `WynikKsiegowania`. Raport zbiorczy zlicza operacje według reguły i kanału, pozycje do akceptacji, segmenty zastępcze oraz nierozpoznane kanały.

## Publiczne API

| Moduł | Eksporty |
| --- | --- |
| `import/parseBankFile` | `ParsedBankFile`, `readBankFile`, `parseBankFile` |
| `transactions/validate` | `validateTransaction`, `validateTransactions` |
| `transactions/register` | `TransactionRegister`, `sumTransactions`, `netBalance` |
| `reports/dailyReport` | `DailyReport`, `buildDailyReport`, `formatDailyReport`, `formatujZlote` |
| `limits/creditLimit` | `CreditLimit`, `LimitCheckResult`, `loadCreditLimits`, `parseCreditLimits`, `findCreditLimit`, `creditLimitUsage`, `checkCreditLimit`, `checkCreditLimits` |
| `operator/limitRows` | `OperatorRow`, `LimitRowsResult`, `buildLimitRows` |
| `operator/report` | `loadOperatorInputs`, `buildOperatorReport` |
| `operator/sqlReport` | `buildSqlReport` |
| `interest/accrue` | `accrueInterest` |
| `interest/valueDate` | `isWeekend`, `isDzienUstawowoWolny`, `addBusinessDays` |
| `routing/kontoKsiegowe` | `wyznaczProdukt`, `wyznaczOddzial`, `jestTrybZgodnosci`, `znacznikKierunku`, `zbudujKonto`, `maSegmentZastepczy` |
| `routing/schemat` | Typy routingu, `WZORCE_KANALU`, `WZORCE_FLAGI`, `REGULY` |
| `routing/silnik` | Kontekst i wynik księgowania oraz funkcje rozpoznania, dopasowania, księgowania i raportowania |

## Przepływy danych i ograniczenia

Podstawowy przepływ raportowy ma postać:

```text
CSV -> parseBankFile/readBankFile -> Transaction[] -> TransactionRegister -> DailyReport
```

Przepływ księgowania korzysta z tego samego importu:

```text
CSV -> readBankFile -> zaksieguj -> REGULY + kontoKsiegowe -> ZestawienieKsiegowania
```

Limity są przetwarzane niezależnie od walidacji formalnej operacji. Raport operatora oparty na TypeScript pozostaje niepodłączony, natomiast wariant SQL buduje gotowe wiersze z zapytania. Zmiana danych wejściowych, aby uzyskać oczekiwany wynik, nie zastępuje poprawki modułu ani testu regresji.

## Punkty uruchomienia i kontrole

[package.json](package.json) definiuje skrypty:

| Polecenie | Zastosowanie |
| --- | --- |
| `npm test` | Jednorazowe uruchomienie testów Vitest. |
| `npm run typecheck` | Sprawdzenie typów TypeScript bez emisji plików. |
| `npm run raport` | Raport dzienny z wyciągu. |
| `npm run ksiegowanie` | Zestawienie księgowania z wyciągu. |
| `npm run operator` | Serwer ekranu operatora. |
| `npm run operator:sql` | Wariant operatora korzystający z raportu SQL. |

Przy zmianach kontraktu należy utrzymać zgodność `Transaction`, przechowywać kwoty jako całkowite grosze i sprawdzić odpowiedni test, typecheck lub raport zależnie od zmienionego modułu.