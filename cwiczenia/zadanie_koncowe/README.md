# D2-06 — Wspólne obliczenia, własny ekran

**65 min + odbiór dnia · Copilot Agent · kontynuacja D2-04**

Nazwa katalogu jest historyczna: to teraz integracja we wtorek. Zachowujesz własny ekran z pierwszego dnia. W środę rozszerzysz go o nową funkcję.

**Start:** `portfolio/plan-integracji.md`, [brief](../../historia/brief_operatora.md), [droga danych](../../historia/droga_danych.md). Otwórz `src/operator/limitRows.ts`, `src/operator/report.ts`, `src/limits/creditLimit.ts`, oba JSON-y `dane/franek/*-final.json` i własny komponent UI.

1. **Dokończ obliczenia.** W `buildLimitRows` wykorzystaj istniejący moduł tam, gdzie spełnia nasz zakres. Sprawdź go na małych przykładach. Zachowaj kolejność wejścia, grosze oraz narastające wykorzystanie, także po przekroczeniu. Nie wpisuj wyników z demo na stałe. Dodaj test w `tests/operator/limitRows.test.ts` lub uzupełnij własny.
2. **Podłącz ekran.** Wybierz API przez proxy albo eksport JSON opisany w drodze danych. W starterze użyj `npm run operator` i wybierz „Wynik z repozytorium”. We własnym UI zastąp tablicę demo, zachowaj wygląd. Pokaż prawdziwe źródło i filtr. Restartuj serwer po zmianie TypeScript.
3. **Wykonaj dwie kontrole.** `npm run odbior`, `npm test`, `npm run typecheck` kontrolują kod. Partner osobno sprawdza ekran, filtr i szczegóły. Dla danych startowych oczekujemy:

| ID | Kwota zł | Wykorzystanie zł | Limit zł | Przekroczenie zł |
|---|---:|---:|---:|---:|
| FR-001 | 60 | 60 | 100 | 0 |
| FR-002 | 50 | 110 | 100 | 10 |
| FR-003 | 20 | 130 | 100 | 30 |

**Drugie wejście:** w teście podaj trzy operacje po 1000 groszy przy limicie 10000. Wykorzystanie: 1000/2000/3000; przekroczenia: 0/0/0. Dla UI użyj osobnego testowego JSON albo kontrolowanej kopii wejścia i odtwórz bazę po próbie. Nie zmieniaj kryteriów ani skryptu odbioru, by zaliczyć zadanie.

**Gotowe:** własny ekran pokazuje obliczenia, filtr pozostawia FR-002 i FR-003, partner tłumaczy 110 zł oraz uruchamia kontrole. Sam zielony `odbior` nie sprawdza Twojego Reacta ani źródła jego danych.

**Pomoc:** gdy zostało mało czasu, użyj eksportu lub prostego startera. Nie przebudowuj stylów. Brakujące części nazwij w przekazaniu. Zapisz implementację i testy w lokalnym commicie.

**Dla osób pracujących w SQL:** uzupełnij `sql/franek-limity.sql`; format opisuje `src/operator/sqlReport.ts`. Uruchom `npm run operator:sql`, `npm run odbior -- --sql`, następnie wczytaj świeży `wyniki/raport-operatora-sql.json` w UI. Po zmianach ponów eksport. Nie musisz równolegle kończyć adaptera TS.

**Dalej:** [D2-07 — przekazanie nowej sesji](../cw09/README.md#czesc-b--nowa-sesja-przejmuje-stan-d2-07). Rozszerzenia: jeden przypadek brzegowy lub test interfejsu, dopiero po odbiorze podstawy.
