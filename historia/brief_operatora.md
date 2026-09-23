# Brief: ekran wyjątków operatora

## Co oznacza limit kredytowy w tym zadaniu?

**Limit kredytowy jest przypisany do rachunku klienta.** W aplikacji Franka używamy uproszczonego modelu: porównujemy go z sumą obciążeń w jednej partii rozliczeniowej. Zaczynamy od wykorzystania zero i uwzględniamy każdą kolejną operację, również tę, która przekroczyła limit kredytowy.

Przykład: limit kredytowy 100 zł, pierwsze obciążenie 60 zł, drugie 50 zł. Po drugiej operacji wykorzystanie wynosi 110 zł, a przekroczenie **10 zł**. Sama kwota operacji 50 zł nie jest kwotą przekroczenia.

To umowa demonstratora na warsztat. Nie modelujemy pełnego salda dostępnego, odnawiania kredytu po wpływie środków ani blokowania przelewów. Nie jest to limit pojedynczego przelewu ani limit użycia AI.

Operator chce wiedzieć: **która operacja przekracza limit kredytowy, o ile i dlaczego**. Ekran pokazuje identyfikator, rachunek, kwotę, walutę, wykorzystanie narastająco, limit kredytowy, przekroczenie i uzasadnienie. Filtr „Tylko przekroczenia” i szczegóły muszą mieć jednoznaczny sens. Nie używaj logotypów ani rzeczywistych danych banku.

## Przykład do projektu

Jeden rachunek, jedna partia, PLN, limit kredytowy 100,00 zł. Identyfikatory FR-001–FR-003 oznaczają trzy operacje rozpatrywane w poniższej kolejności. Wszystkie są obciążeniami.

| Operacja | Kwota PLN | Wykorzystanie narastająco PLN | Limit kredytowy PLN | Przekroczenie PLN |
|---|---:|---:|---:|---:|
| FR-001 | 60,00 | 60,00 | 100,00 | 0,00 |
| FR-002 | 50,00 | 110,00 | 100,00 | 10,00 |
| FR-003 | 20,00 | 130,00 | 100,00 | 30,00 |

Kwota operacji i kwota przekroczenia to różne kolumny. Filtr „Tylko przekroczenia” pokazuje FR-002 i FR-003; wyłączenie filtra przywraca wszystkie trzy wiersze bez zmiany kwot. Liczby są przykładami do projektu i kryteriów, a nie dowodem działania kodu.

## Umowa na finał — podstawa

Źródła: `dane/franek/operacje-final.json` i `dane/franek/limity-final.json`. Wartości pieniężne są całkowitymi groszami. Zachowaj kolejność wejścia. W tym zakresie jest jedna data waluty, jeden rachunek, jedna waluta i dodatnie obciążenia. Każda operacja, także przekraczająca limit kredytowy, powiększa wykorzystanie. Nie implementujemy blokowania księgowania ani decyzji kredytowej.

Wynik ma trzy wiersze zgodne z `src/operator/limitRows.ts`. Po zmianie wejścia wynik ma się przeliczyć; nie przepisujemy `demo-design.json`. UI oznacza źródło wyniku. Finał zalicza `npm run odbior` oraz pokazanie wyniku z repo partnerowi. To demonstrator dydaktyczny, nie cała realizacja `zgloszenie_limity.md`.

## Rozszerzenia do uzgodnienia przed implementacją

Brak limitu kredytowego różni się od limitu kredytowego zero. Nie sumujemy PLN z EUR. Co robimy z uznaniami, wieloma datami, błędną konfiguracją i nieaktywnym limitem kredytowym? Dopisz regułę, przykład i test dla **jednego** rozszerzenia. Sam model nie wybiera polityki produktu.
