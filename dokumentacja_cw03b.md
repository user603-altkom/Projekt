# cw03b - Presidio i anonimizacja

## Przeznaczenie
Porównanie publicznego dema Presidio z lokalnym uruchomieniem automatu anonimizującego.

## Wejścia i rezultat
Wejściem są przykładowe dane oraz repozytorium lokalnego anonimizera. Rezultatem jest `portfolio/cw03b-presidio.md` z porównaniem, adresem serwera i komendą uruchomienia.

## Kontrole
Sprawdzane są e-mail, nazwisko, PESEL i rachunek; żądanie `POST /api/anonymize` ma zwrócić `anonymized_text`. Wykrywanie zależy od użytych modeli i języka.