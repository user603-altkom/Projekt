> **Materiał rezerwowy dnia 3.** Główna ścieżka: [cw19b](../cw19b/README.md), [plan dnia](../../DZIEN-3.md).

# cw15b — Superpowers: porównanie z własnym procesem

**50 min · pokaz i krótka próba · Claude Code lub przygotowany Copilot**

**Cel:** porównać własny przebieg SDLC z gotową metodą. Superpowers to zestaw skilli i sposób prowadzenia pracy, nie serwer MCP.

## 1. Wybierz małe rozszerzenie

W podglądzie laboratorium operator chce widzieć **ID wniosku, z którego wynika czasowy limit**. Wynik funkcji już ma `wniosekId`; UI jeszcze go nie pokazuje. Gdy obowiązuje baza, ekran ma wyświetlać „Brak aktywnego wniosku”. Nie zmieniamy obliczeń ani kontraktu.

Wejście: [serwer i UI](../../laboratorium/limity/serwer.mjs), [kontrakt](../../laboratorium/limity/KONTRAKT.md), [dane](../../laboratorium/limity/dane/scenariusze.json). Jeśli Twoja funkcja jeszcze nie obsługuje zgody, zaplanuj zmianę i sprawdzenie na jawnie opisanej próbce wyniku. Nie zgłaszaj wtedy pełnej integracji.

## 2. Obserwuj lub uruchom metodę

Źródło i instalacja: [obra/superpowers](https://github.com/obra/superpowers). W przygotowanym Claude Code sprawdź `/plugin`; jeśli pakietu brak, instrukcja autora podaje `/plugin install superpowers@claude-plugins-official`. Zacznij nową sesję. Nie instaluj drugiej kopii. W innym harnessie użyj instrukcji autora dla tego konkretnego klienta.

```text
Chcę w ekranie laboratorium/limity pokazać ID aktywnego wniosku.
Gdy źródłem limitu jest baza, wyświetl „Brak aktywnego wniosku”.
Użyj dostępnego procesu Superpowers. Zacznij od wyjaśnienia celu,
zaproponuj mały projekt i sprawdzenie. Poczekaj na decyzję przed kodowaniem.
Nie zmieniaj algorytmu oceny ani kontraktu. Nie commituj i nie publikuj.
```

Jeśli instalacja nie działa, swój krok wykonaj w Copilocie z własnym planem. Zapisz ten wariant. Nie nazywaj go użyciem skilla, którego nie załadowano.

## 3. Porównaj i odbierz

Zapisz jedną różnicę względem własnego procesu: pytanie, wielkość kroku, sprawdzenie albo zbędny koszt. Jeśli wdrażasz zmianę, przejrzyj diff, uruchom testy laboratorium i sprawdź dwa stany w przeglądarce. Zapisz wynik w **nowym pliku** `laboratorium/limity/dokumenty/09-superpowers.md`.

**Gotowe:** masz ocenę na podstawie przebiegu i wyniku, a nie liczby wygenerowanych dokumentów. Potrafisz wskazać jedną praktykę, którą zastosujesz w Copilocie także bez pakietu.

**Dla szybszych:** podłącz uzgodniony wynik do własnego ekranu z dnia 1, zachowując jeden moduł obliczeń. Zapisz osobny plan integracji.


[Spis ćwiczeń i kolejność](../../CWICZENIA.md) · [Start laboratorium](../../laboratorium/limity/README.md)
