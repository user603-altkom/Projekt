# Dokumentacja API — moduły rozliczeniowe

**Wersja 1.2 · 12 sierpnia 2025**

Opis publicznego API modułów importu, rejestru transakcji, walidacji, naliczania
odsetek i raportu dziennego. Dokument nie opisuje szczegółów implementacji —
tylko sygnatury i kontrakty, na których mogą polegać moduły wywołujące.

## Import wyciągów bankowych

Punktem wejścia modułu importu jest funkcja:

```ts
function parseStatement(sciezkaPliku: string): WynikImportu
```

`parseStatement` otwiera wskazany plik CSV, rozpoznaje nagłówek techniczny
(`#`) i wiersz z nazwami kolumn, po czym zwraca:

```ts
interface WynikImportu {
  operacje: Transaction[];
  sumaKontrolna: number;   // suma z nagłówka pliku, w złotych
  liczbaBledow: number;    // liczba wierszy odrzuconych podczas parsowania
}
```

Wiersze, których nie da się rozpoznać (zła liczba kolumn, nierozpoznany
format kwoty lub daty), są liczone w `liczbaBledow` i pomijane w `operacje`.

Kwota operacji w zwracanych obiektach `Transaction` (pole `kwotaBrutto`) jest
liczbą w złotych, z dokładnością do dwóch miejsc po przecinku — tak samo,
jak w pliku źródłowym. Znak kwoty niesie kierunek operacji: wartość ujemna
oznacza obciążenie rachunku, dodatnia — uznanie. Kolumna `typ` w pliku wejściowym
(`MA`/`WN`) służy wyłącznie do kontroli spójności ze znakiem kwoty i nie jest
osobno przenoszona do modelu.

## Rejestr transakcji

`TransactionRegister` przechowuje operacje jednego okresu rozliczeniowego
w pamięci i udostępnia `add`, `addAll`, `all`, `forAccount`, `accounts` oraz
właściwość `size`.

Sumowanie obrotów wykonuje `sumTransactions(transakcje): number` — zwraca sumę
pola `kwotaBrutto` w złotych. Ponieważ operacje w rejestrze mają już
rozstrzygnięty znak (obciążenia ujemne, uznania dodatnie), `sumTransactions`
jest jednocześnie saldem netto okresu; osobna funkcja do salda netto nie jest
potrzebna.

## Walidacja transakcji

```ts
function validateTransaction(transakcja: Transaction): ValidationResult
```

Sprawdzane są m.in.: obecność identyfikatora, format numeru rachunku (NRB,
26 cyfr), zgodność waluty i typu operacji ze słownikiem, poprawność dat oraz
**kwota operacji**. Wartość zerowa **i wartość ujemna** są traktowane jako
błąd danych i odrzucane z komunikatem `Kwota operacji musi być dodatnia`
— rejestr nie przyjmuje operacji, która miałaby zmienić saldo rachunku
o kwotę mniejszą lub równą zeru. `validateTransactions` (liczba mnoga)
stosuje tę samą regułę do całej paczki i prefiksuje komunikaty
identyfikatorem operacji.

## Naliczanie odsetek

```ts
function accrueInterest(
  rachunek: DaneRachunku,
  okres: OkresRozliczeniowy,
  opcje?: OpcjeNaliczania,
): WynikOdsetek
```

Trzeci, opcjonalny parametr `opcje` pozwala nadpisać sposób zaokrąglania
naliczonych odsetek przy kapitalizacji:

```ts
interface OpcjeNaliczania {
  /** @default 'bankowe' */
  zaokraglenie: 'w-gore' | 'w-dol' | 'bankowe';
}
```

`'bankowe'` zaokrągla do pełnego grosza według zwykłych reguł arytmetycznych,
`'w-dol'` obcina, `'w-gore'` zawsze zaokrągla w górę — ten wariant stosuje się
przy przeliczeniach reklamacyjnych. Funkcja oblicza odsetki dziennie od salda
rachunku, sumuje je do najbliższej kapitalizacji (dzienna / miesięczna /
kwartalna, zależnie od produktu) i potrąca podatek Belki, poza kredytem
odnawialnym.

## Raport dzienny

```ts
function generateDailyReport(sciezkaPliku: string): string
```

Jedna funkcja: wczytuje wyciąg, sumuje obroty, porównuje z sumą kontrolną
z nagłówka pliku i zwraca gotowy do wypisania tekst raportu — łącznie
z sekcją różnicy, jeśli suma policzona nie zgadza się z sumą kontrolną.
Uruchomienie z linii poleceń: `npm run raport`.
