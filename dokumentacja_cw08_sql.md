# cw08_sql - Bezpieczna optymalizacja SQL

## Przeznaczenie
Optymalizacja zapytania SQL przy zachowaniu pełnej zgodności wyników.

## Wejścia i rezultat
Wejściem jest raport obrotów i skrypt raportujący. Powstają `portfolio/cw08-raport-przed.sql` oraz `portfolio/cw08-sql.md` z pomiarami i różnicami.

## Kontrole
Uruchom `npm run sql:setup`, następnie trzykrotnie `npm run sql:raport`, porównując komplet wyników i medianę czasu. Analiza dotyczy jednego narzędzia SQL.