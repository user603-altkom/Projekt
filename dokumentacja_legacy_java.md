# Referencja techniczna: `legacy-java`

## Przeznaczenie

Katalog [`legacy-java/`](legacy-java/) jest materiałem szkoleniowym wyłącznie do czytania. Zawiera starszą implementację naliczania odsetek, która służy do analizy obcego kodu oraz porównania wersji algorytmu napisanych w Java i TypeScript.

Katalog nie jest modułem uruchamianym przez to repozytorium. Nie zawiera `pom.xml`, `build.gradle` ani konfiguracji JDK. Pliku Java nie należy kompilować, uruchamiać ani włączać do procesu budowania. Aktualna implementacja w aplikacji znajduje się w [src/interest/accrue.ts](src/interest/accrue.ts).

## Zawartość

| Plik | Rola |
| --- | --- |
| [legacy-java/README.md](legacy-java/README.md) | Określa status katalogu i jego zastosowanie dydaktyczne. |
| [legacy-java/OdsetkiCalculator.java](legacy-java/OdsetkiCalculator.java) | Zawiera kalkulator odsetek, modele danych i interfejs dostępu do rachunku. |

Klasy pomocnicze i interfejs zostały umieszczone w jednym pliku na potrzeby materiału szkoleniowego. Nie jest to informacja o strukturze produkcyjnego projektu źródłowego.

## Główny kontrakt

Klasa `OdsetkiCalculator` wymaga w konstruktorze implementacji `RachunekRepository`. Udostępnia metodę:

```java
WynikOdsetek naliczOdsetki(
    String nrRachunku,
    Date okresOd,
    Date okresDo,
    ParametryNaliczenia parametry
)
```

Metoda pobiera dane rachunku i pozycje okresu przez repozytorium, nalicza odsetki dla kolejnych segmentów miesięcznych, a następnie zwraca `WynikOdsetek`.

### Wejścia

| Parametr | Znaczenie wynikające z kodu |
| --- | --- |
| `nrRachunku` | Identyfikator rachunku przekazywany do obu metod repozytorium. Wartość `null` powoduje `IllegalArgumentException`. |
| `okresOd` | Początek okresu, włącznie. Wartość `null` powoduje `IllegalArgumentException`. |
| `okresDo` | Koniec okresu, włącznie. Wartość `null` powoduje `IllegalArgumentException`. |
| `parametry` | Flagi promocji i trybu zgodności oraz stawki stosowane dla kredytu odnawialnego. Kod odczytuje go bez walidacji `null`. |

`RachunekRepository` udostępnia operacje `znajdzRachunek` i `pobierzPozycje`. Brak rachunku powoduje `IllegalArgumentException`. Implementacja zakłada, że pozycje są przekazane w kolejności umożliwiającej sekwencyjne księgowanie według `dataWaluty`; kod sam ich nie sortuje.

### Wynik

`WynikOdsetek` zawiera:

| Pole | Zawartość |
| --- | --- |
| `nrRachunku` | Numer rachunku z obiektu `Rachunek`. |
| `saldoZamknieciaGrosze` | Saldo po przetworzeniu operacji i kapitalizacji. |
| `odsetkiBruttoGrosze` | Suma skapitalizowanych odsetek brutto. |
| `podatekGrosze` | Suma naliczonego podatku. |
| `odsetkiNettoGrosze` | Różnica brutto i podatku. |
| `kapitalizacje` | Lista pozycji kapitalizacji z datą, kwotami i saldem po kapitalizacji. |
| `ostrzezenia` | Komunikaty dotyczące ujemnego salda lub przekroczenia limitu. |

Pola kwotowe mają w nazwach końcówkę `Grosze`, a ich typem jest `BigDecimal`. Dokumentacja nie zakłada dodatkowego przelicznika poza tym, co wynika z nazw i komentarzy w kodzie.

## Dane rachunku i parametry

`Rachunek` przechowuje numer, produkt, walutę, saldo otwarcia, limit odnawialny, stawki, cykl kapitalizacji oraz opcjonalną datę zerwania lokaty. Kod rozpoznaje trzy wartości pola `produkt`:

- `OSZCZEDNOSCIOWE`;
- `LOKATA`;
- `KREDYT_ODNAWIALNY`.

Inna wartość powoduje `IllegalArgumentException`. `PozycjaRachunku` przenosi dodatnią kwotę, datę waluty i kierunek operacji: `UZNANIE` zwiększa saldo, a każda inna wartość pola `typ` jest traktowana przez kod jako obciążenie.

`ParametryNaliczenia` umożliwia włączenie promocji dla nowych środków, trybu zgodności z 2019 r., podanie stopy bazowej oraz karnej stawki dla kredytu. Wartość `karneBp` równa zero uruchamia domyślną premię karną `400` punktów bazowych.

## Naliczanie i kapitalizacja

Kalkulator przetwarza okres w segmentach kończących się na końcu miesiąca albo na `okresDo`. Pozycje o dacie waluty nie późniejszej niż koniec segmentu aktualizują saldo. To saldo jest następnie podstawą naliczenia dla segmentu.

Podstawa roczna wynosi `365` dni dla waluty `PLN` i `360` dla pozostałych walut. Metoda pomocnicza stosuje wzór:

$$
odsetki = \frac{saldo \times punkty\ bazowe \times liczba\ dni}{10000 \times baza\ roczna}
$$

Obliczenie pośrednie ma skalę dziesięciu miejsc i zaokrąglenie `HALF_UP`.

### Rachunek oszczędnościowy

Dla dodatniego salda stosowane są progi `500000`, `5000000` i `20000000`. Kod używa stawek 50, 200 i 325 punktów bazowych, z opcjonalnym zwiększeniem dwóch pierwszych stawek przy `promocjaNowySrodek`. Ponad trzeci próg część nadwyżkowa jest liczona stawką 100 punktów bazowych. Ujemne saldo nie nalicza odsetek i dodaje pojedyncze ostrzeżenie.

### Lokata

Stawka pochodzi z pola `oprocentowanieBp`. Od segmentu przypadającego w dniu zerwania lub później kod stosuje 50 punktów bazowych. Dodatnie saldo i dodatnia stawka są warunkiem naliczenia; ujemne saldo powoduje ostrzeżenie.

### Kredyt odnawialny

Podstawą jest bezwzględna wartość ujemnego salda. Stawka zwykła to suma `stopaBazowaBp` i `marzaBp`. Przy dodatnim limicie oraz wykorzystaniu większym od limitu kalkulator dzieli odsetki na część do limitu i nadwyżkę; nadwyżka dostaje stawkę powiększoną o `karneBp` albo domyślne 400 punktów bazowych. Pierwsze takie zdarzenie dodaje ostrzeżenie o przekroczeniu limitu.

### Kapitalizacja i podatek

Cykl `DZIENNA` kapitalizuje w każdym segmencie. `KWARTALNA` kapitalizuje po pełnych miesiącach kończących kwartał. Inna wartość pola `kapitalizacja` jest traktowana jak cykl miesięczny. Ostatni segment okresu jest zamykany niezależnie od cyklu.

Kapitalizacja występuje, gdy narosłe odsetki wynoszą co najmniej jeden. Tryb `trybZgodnosciZ2019` zaokrągla kwotę brutto w dół i podatek w górę; w przeciwnym razie kod używa `HALF_UP` dla obu wartości. Podatek 19% jest naliczany dla rachunku oszczędnościowego i lokaty, lecz nie dla kredytu odnawialnego. Dla kredytu kwota brutto zmniejsza saldo, a dla pozostałych produktów saldo zwiększa kwota netto.

## Ograniczenia użycia

- Kod jest punktem odniesienia do czytania i porównywania, nie kontraktem aktualnie wykonywanego modułu TypeScript.
- Komentarze w pliku opisują wersje instrukcji produktowych i intencje historyczne; sam katalog nie dostarcza niezależnego potwierdzenia ich aktualności.
- Brak konfiguracji budowania oznacza, że zachowanie nie jest weryfikowane przez testy lub kompilację tego repozytorium.
- Wnioski o zgodności z [src/interest/accrue.ts](src/interest/accrue.ts) wymagają osobnego porównania konkretnych scenariuszy i testów.