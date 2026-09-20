# Brief: ekran wyjątków operatora

Operator chce wiedzieć: **która operacja przekracza limit, o ile i dlaczego**. Ekran pokazuje identyfikator, rachunek, kwotę, walutę, wykorzystanie narastająco, limit, przekroczenie i uzasadnienie. Filtr „Tylko przekroczenia” i szczegóły muszą mieć jednoznaczny sens. Nie używaj logotypów ani rzeczywistych danych banku.

## Przykład do projektu

Jeden rachunek, jedna partia, PLN, limit 100,00 zł. Kolejne obciążenia: 60,00 zł, 50,00 zł, 20,00 zł. Wykorzystanie: 60,00 / 110,00 / 130,00 zł. Przekroczenie: 0,00 / 10,00 / 30,00 zł. Kwota operacji i kwota przekroczenia to różne kolumny. Liczby są przykładami, a nie dowodem działania kodu.

## Umowa na finał — podstawa

Źródła: `dane/franek/operacje-final.json` i `dane/franek/limity-final.json`. Wartości pieniężne są całkowitymi groszami. Zachowaj kolejność wejścia. W tym zakresie jest jedna data waluty, jeden rachunek, jedna waluta i dodatnie obciążenia. Każda operacja, także przekraczająca limit, powiększa wykorzystanie. Nie implementujemy blokowania księgowania ani decyzji kredytowej.

Wynik ma trzy wiersze zgodne z `src/operator/limitRows.ts`. Po zmianie wejścia wynik ma się przeliczyć; nie przepisujemy `demo-design.json`. UI oznacza źródło wyniku. Finał zalicza `npm run odbior` oraz pokazanie wyniku z repo partnerowi. To demonstrator dydaktyczny, nie cała realizacja `zgloszenie_limity.md`.

## Rozszerzenia do uzgodnienia przed implementacją

Brak limitu różni się od limitu zero. Nie sumujemy PLN z EUR. Co robimy z uznaniami, wieloma datami, błędną konfiguracją i nieaktywnym limitem? Dopisz regułę, przykład i test dla **jednego** rozszerzenia. Sam model nie wybiera polityki produktu.
