# Jak wynik trafia na ekran

## Wspólny zakres

Jedna partia, jeden rachunek, jedna data, PLN i dodatnie obciążenia w kolejności wejścia. Kwoty wewnętrzne są całkowitymi groszami. Szczegóły i przykłady: [brief](brief_operatora.md).

```text
dane/franek/operacje-final.json + limity-final.json
    ↓ loadOperatorInputs — src/operator/report.ts
    ↓ buildLimitRows — src/operator/limitRows.ts (zadanie uczestnika)
    ↓ buildOperatorReport — src/operator/report.ts
    ├─ GET /api/raport — scripts/operator-server.ts
    └─ npm run operator:eksport → wyniki/raport-operatora.json
         ↓ własny ekran albo operator/app.js
```

`/api/demo` czyta gotowy `demo-design.json`. Te liczby pomagają projektować, ale nie są obliczane przez adapter. `buildLimitRows` w starterze zwraca stan `niepodlaczone` i pustą listę.

## Format, którego oczekuje ekran

`buildLimitRows` zwraca `{ stan, wiersze }`. Każdy wiersz ma `id`, `nrRachunku`, `dataWaluty`, `waluta`, `kwotaGrosze`, `limitGrosze`, `wykorzystanieGrosze`, `przekroczenieGrosze`, `status`, `powod`. Typy są w `src/operator/limitRows.ts`. Pełny raport dodaje `wersja`, `tryb`, `zrodlo`, `liczbaOperacji`.

## Własny ekran z Claude Design

Zachowaj komponenty i wygląd. Zastąp przykładową tablicę danymi powyższego formatu; obliczenia pozostają w jednym module. Wybierz jedno połączenie:

- **API:** własny serwer developerski przekazuje `/api/raport` do http://127.0.0.1:4173 przez proxy. Starter obsługuje tylko swoje statyczne pliki, więc samo skopiowanie Reacta do `operator/` nie uruchomi Reacta. Różne porty to różne originy; względne `/api/raport` bez proxy trafi do serwera UI.
- **Eksport JSON:** `npm run operator:eksport`, potem import/wczytanie świeżego `wyniki/raport-operatora.json` we własnym ekranie. Po zmianie danych lub obliczeń wykonaj eksport ponownie. Oznacz źródło jako plik; nie sugeruj odświeżania na żywo.

Po zmianie TypeScript restartuj `npm run operator`. Przy eksporcie uruchom polecenie ponownie. Zmiana HTML/JS/CSS wymaga odświeżenia. `npm run odbior` bada wspólny adapter, a własny ekran odbierasz osobno z partnerem.
