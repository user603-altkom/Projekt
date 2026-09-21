# Finał — Franek może naprawdę odejść

**Dzień 3 · 10 min przygotowania przed przerwą + 55 min realizacji · Copilot**

Podłącz fragment ekranu zaprojektowanego pierwszego dnia do liczb wyliczonych z repo. Punkt startowy już zawiera UI, moduł limitów i dane. Nie budujemy całej aplikacji.

## Przygotowanie — 10 min przed przerwą

Wybierz **jedną ścieżkę: TypeScript albo SQL**. Wróć do sekcji „Demonstrator” w `portfolio/kryteria-limitow.md`, notatki `portfolio/cw10-review.md` i projektu z dnia 1. Jeśli czegoś nie masz, obowiązuje zakres z `historia/brief_operatora.md`; własny projekt graficzny nie jest warunkiem startu.

Otwórz `dane/franek/operacje-final.json`, `dane/franek/limity-final.json`, `src/operator/limitRows.ts` (kontrakt wyniku) i `src/operator/report.ts` (połączenie z ekranem). Kwoty w JSON-ach są w **groszach**, na ekranie w PLN. Plan zapisz przed zleceniem implementacji.

Uruchom `npm run odbior` dla TS lub `npm run odbior -- --sql` dla SQL. W starterze ta kontrola ma być czerwona: adapter/zapytanie nie są jeszcze podłączone. To zadanie na finał, nie powód do reinstalacji środowiska.

## Podstawa TypeScript

1. Przeczytaj `historia/brief_operatora.md`, swoje kryteria i review z ćw. 10.
2. Zaplanuj małą zmianę w `src/operator/limitRows.ts`; wykorzystaj istniejący moduł limitów tam, gdzie spełnia uzgodnione reguły. Sprawdź kolejność i narastanie wykorzystania. Nie kopiuj gotowych wartości z demo.
3. Zaimplementuj adapter z Copilotem. Nie dodawaj frameworka ani bazy. Uruchom `npm test`, `npm run typecheck`, **`npm run odbior`**.
4. Uruchom ponownie `npm run operator`, wybierz **„Wynik z repozytorium”**. Pokaż FR-002: kwota 50 PLN, wykorzystanie 110 PLN, limit 100 PLN, przekroczenie 10 PLN. Sprawdź filtr i szczegóły. Jeśli nie masz filtra z dnia 1, dopisz go teraz.
5. Przeczytaj diff i przygotuj `portfolio/handoff.md`: cel, komendy, wynik sprawdzeń, ograniczenia i następne zadanie.

## Równorzędna ścieżka SQL

Zamiast adaptera TS uzupełnij `sql/franek-limity.sql` zgodnie z kontraktem. Tabele wejściowe i eksport obsługuje `src/operator/sqlReport.ts`, nie instalujesz serwera. Uruchom `npm run operator:sql`, następnie **`npm run odbior -- --sql`**. Uruchom `npm run operator`; na ekranie wybierz **„Własny plik JSON (SQL)”** i wczytaj `wyniki/raport-operatora-sql.json`. Po każdej zmianie SQL ponownie wykonaj `npm run operator:sql` i wczytaj świeży JSON — ekran nie przelicza zapytania sam. Zrób te same kontrole FR-002, filtra i źródła. Uruchom też `npm test` i `npm run typecheck`. `npm run odbior` bez flagi nadal sprawdza adapter TS — wybierz właściwą ścieżkę.

## Odbiór w parze

Dla danych startowych pokaż wszystkie trzy wiersze:

| ID | Kwota PLN | Wykorzystanie PLN | Limit PLN | Przekroczenie PLN |
|---|---:|---:|---:|---:|
| FR-001 | 60 | 60 | 100 | 0 |
| FR-002 | 50 | 110 | 100 | 10 |
| FR-003 | 20 | 130 | 100 | 30 |

Filtr „Tylko przekroczenia” pozostawia FR-002 i FR-003. Sprawdź uzasadnienie w szczegółach oraz etykietę rzeczywistego źródła wyniku. Samo oglądanie **demo** nie zalicza finału.

`npm run odbior` (lub wariant `--sql`) sprawdza również obliczenia dla innych kwot. Nie zmieniaj skryptu odbioru ani danych, żeby obejść wymagania. Jeśli pozostały czerwone testy z wcześniejszych ćwiczeń, opisz je oddzielnie w handoffie; nie pomijaj ich po cichu.

## Gotowe, gdy

- wynik pochodzi z danych repo, jest obliczony i ma uzasadnienie;
- kontrola odbioru przechodzi także dla zmienionych kwot wejściowych;
- partner rozumie przekroczenie FR-002 i umie uruchomić wynik z handoffu;
- potrafisz oddzielić działający zakres od decyzji, których jeszcze nie podjęto.

**Rozszerzenie:** wybierz jedno — brak limitu vs zero, druga waluta, test uzasadnienia, przeniesienie fragmentu własnego wyglądu. Nie łącz wszystkich. Pozostałe pliki z numerami 01–03 w tym katalogu to dawne, opcjonalne zadania; nie są finałem nowej ścieżki.

**Gdy zostało 15 minut:** zrezygnuj ze stylowania i rozszerzeń. Skup się na trzech wierszach, odbiorze i demonstracji. Jeśli potrzebujesz pomocy, pokaż konkretny błąd komendy i aktualny diff. Nie zamieniaj „gotowe” na ręcznie wpisane liczby.

## Zapisz działający etap

W `portfolio/handoff.md` podaj wybraną ścieżkę, zmienione pliki, komendy uruchomienia i odbioru, ich rzeczywiste wyniki oraz ograniczenia. Partner powinien wykonać te kroki bez dodatkowej instrukcji ustnej.

Przejrzyj `git status --short` i `git diff`. Dodaj przez `git add` tylko pliki swojej implementacji i testów, sprawdź `git diff --cached`, następnie `git commit -m "Ekran przekroczen z danymi repozytorium"`. `portfolio/` i wygenerowane `wyniki/` pozostają lokalne.
