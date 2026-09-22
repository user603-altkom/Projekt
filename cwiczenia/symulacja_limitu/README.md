> **Materiał wcześniejszej ścieżki.** Na aktualnych zajęciach otwórz [cw06b](../cw06b/README.md) oraz [spis ćwiczeń](../../CWICZENIA.md).

# D3-01/02 — Nowe wymaganie operatora

**45 min wymagania + 30 min projekt + 90 min implementacja · Copilot**

> Operator: „Chcę zobaczyć przekroczenia przy innym limicie kredytowym i wrócić do obecnego widoku. Nie zmieniajcie limitu kredytowego zapisanego w danych”.

**Po co:** przejdziesz od niepełnego zgłoszenia do sprawdzonej zmiany swojego ekranu. Punktem startowym jest integracja z wtorku. Bez niej użyj z prowadzącym działającego wariantu awaryjnego w osobnym katalogu.

## A. Wymaganie — zanim zapytasz agenta

1. Zapisz trzy pytania, których odpowiedź zmieni zachowanie: zero, puste pole, separator, zakres symulacji, powrót. Prowadzący gra operatora; zadaj mu pytania. Agent może pomóc znaleźć luki, lecz nie podejmuje decyzji biznesowych.
2. W `portfolio/symulacja.md` zapisz maksymalnie pięć kryteriów typu wejście → czynność → wynik. Użyj FR-001–003 z briefu. Np. przy limicie kredytowym 80 zł przekroczenia wynoszą 0/30/50 zł. To oczekiwanie sprawdzisz w teście i UI.
3. Pokaż partnerowi kryteria. Czy potrafi odróżnić brak limitu kredytowego od zera i wskazać, co ma zostać po powrocie? Brak odpowiedzi zapisuj jako pytanie, nie domysł.

## B. Projekt i plan

Dołącz uzgodnione kryteria, `src/operator/limitRows.ts`, `src/operator/report.ts` i pliki własnego ekranu. Poproś o dwa małe warianty: wspólne obliczenia wywoływane przez UI albo wywołanie serwera przy symulacji. Wybierz jeden, uzasadnij i zapisz pliki, małe kroki oraz kontrole. Nie twórz drugiego algorytmu obliczeń tylko dla formularza. Zewnętrzny zapis danych i nowy framework pozostają poza zakresem.

## C. Implementacja po akceptacji planu

1. **Test i obliczenia.** Ustal z kryteriów wyniki dla 80, 100, 130 i 0 zł; testuj grosze. Dodaj test niezmieniania wejścia. Jeśli trzeba wydzielić funkcję, najpierw zabezpiecz dotychczasowy wynik i pokaż osobny diff tej refaktoryzacji.
2. **Formularz.** Dodaj pole, akcję symulacji, oznaczenie aktywnej symulacji i powrót. Obsłuż uzgodnione błędne wejście. Zatrzymaj agenta po każdym kroku, przeczytaj zmiany i wyniki kontroli.
3. **Odbiór.** Uruchom własne testy, `npm test`, `npm run typecheck`, bazowy `npm run odbior`. Partner przechodzi scenariusze w UI i porównuje z kryteriami. Bazowy odbiór nie sprawdza nowej symulacji.

**Gotowe:** funkcja działa, wynik ma źródło, dane bazowe pozostały niezmienione, powrót odtwarza bazę; jest test istotnych przypadków i zapis kontroli. Zapisz commit implementacji według zasad warsztatu.

**Prompt pomocniczy:** „Najpierw wskaż luki wymagania, nie rozstrzygaj ich za operatora. Po moich odpowiedziach przygotuj mały plan. Implementuj tylko zatwierdzony krok i zatrzymaj się z diffem oraz wynikiem kontroli”.

**Pomoc:** jeden formularz, jedna partia, bez nowej stylistyki. Jeśli obliczenia są już dobrze wydzielone, pomiń refaktoryzację i przejdź do formularza.

**Dla szybszych:** porównanie bazowego i symulowanego limitu kredytowego albo obsługa klawiaturą. Kryterium dodatkowej funkcji ustal przed kodowaniem.
