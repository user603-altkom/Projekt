# Finał — Franek może naprawdę odejść

**Dzień 3 · 10 min przygotowania przed przerwą + 55 min realizacji · Copilot**

Podłącz fragment ekranu zaprojektowanego pierwszego dnia do liczb wyliczonych z repo. Punkt startowy już zawiera UI, moduł limitów i dane. Nie budujemy całej aplikacji.

## Podstawa TypeScript

1. Przeczytaj `historia/brief_operatora.md`, swoje kryteria i review z ćw. 10.
2. Zaplanuj małą zmianę w `src/operator/limitRows.ts`; wykorzystaj istniejący moduł limitów tam, gdzie spełnia uzgodnione reguły. Sprawdź kolejność i narastanie wykorzystania. Nie kopiuj gotowych wartości z demo.
3. Zaimplementuj adapter z Copilotem. Nie dodawaj frameworka ani bazy. Uruchom `npm test`, `npm run typecheck`, **`npm run odbior`**.
4. Uruchom ponownie `npm run operator`, wybierz **„Wynik z repo”**. Pokaż FR-002: kwota 50 PLN, wykorzystanie 110 PLN, limit 100 PLN, przekroczenie 10 PLN. Sprawdź filtr i szczegóły. Jeśli nie masz filtra z dnia 1, dopisz go teraz.
5. Przeczytaj diff i przygotuj `portfolio/handoff.md`: cel, komendy, wynik sprawdzeń, ograniczenia i następne zadanie.

## Równorzędna ścieżka SQL

Zamiast adaptera TS uzupełnij `sql/franek-limity.sql` zgodnie z kontraktem. Tabele wejściowe i eksport obsługuje `src/operator/sqlReport.ts`, nie instalujesz serwera. Uruchom `npm run operator:sql`, następnie **`npm run odbior -- --sql`**. Na ekranie wybierz „Plik JSON (SQL)” i wczytaj `wyniki/raport-operatora-sql.json`. Zrób te same kontrole FR-002, filtra i źródła. `npm run odbior` bez flagi nadal sprawdza adapter TS — wybierz właściwą ścieżkę.

## Gotowe, gdy

- wynik pochodzi z danych repo, jest obliczony i ma uzasadnienie;
- kontrola odbioru przechodzi także dla zmienionych kwot wejściowych;
- partner rozumie przekroczenie FR-002 i umie uruchomić wynik z handoffu;
- potrafisz oddzielić działający zakres od decyzji, których jeszcze nie podjęto.

**Rozszerzenie:** wybierz jedno — brak limitu vs zero, druga waluta, test uzasadnienia, przeniesienie fragmentu własnego wyglądu. Nie łącz wszystkich. Pozostałe pliki z numerami 01–03 w tym katalogu to dawne, opcjonalne zadania; nie są finałem nowej ścieżki.

**Gdy zostało 15 minut:** zrezygnuj ze stylowania i rozszerzeń. Skup się na trzech wierszach, odbiorze i demonstracji. Jeśli potrzebujesz pomocy, pokaż konkretny błąd komendy i aktualny diff. Nie zamieniaj „gotowe” na ręcznie wpisane liczby.
