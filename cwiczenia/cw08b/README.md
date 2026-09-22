# cw08b — Implementacja: jeden krok na raz

**90 min, z przerwą po pierwszym teście · Copilot Agent; CLI jako pokaz**

**Cel:** wdrożyć uzgodniony moduł oceny limitu. Kontrolujesz zakres zmiany i zatrzymujesz agenta po każdym kroku.

## Przygotowanie

Przeczytaj [start laboratorium](../../laboratorium/limity/README.md). Uruchom z głównego folderu repo:

```sh
node --test laboratorium/limity/test/ocena.node.mjs
node laboratorium/limity/raport.mjs
```

Na starcie test bazowy przechodzi, a raport ignoruje wnioski. To oczekiwany punkt początkowy. Wejście: [brief](../../laboratorium/limity/BRIEF.md), [kontrakt](../../laboratorium/limity/KONTRAKT.md), [plan](../../laboratorium/limity/dokumenty/02-projekt.md). Gdy nie masz planu, pierwszy krok to test aktywnej zgody z tabeli w briefie.

## 1. Dodaj instrukcję dla modułu

Przeczytaj [szablon instrukcji](../../materialy/sdlc/limity.instructions.md). Skopiuj go do **nowego pliku** `.github/instructions/limity.instructions.md`. Zawiera zakres `applyTo` dla laboratorium. Zacznij nową sesję Copilota i sprawdź odczyt instrukcji. W Claude Code jawnie dołącz te zasady lub zapisz je w obsługiwanym pliku instrukcji; nie zakładaj odczytu pliku Copilota.

## 2. Najpierw jeden test

```text
Przeczytaj laboratorium/limity/BRIEF.md i KONTRAKT.md.
Dopisz do laboratorium/limity/test/ocena.node.mjs jeden test:
zatwierdzony wniosek 15000 przy bazie 10000 i wykorzystaniu 12000,
w chwili 2026-09-22T09:00:00Z. Oczekiwanie: limit 15000, przekroczenie 0.
Nie zmieniaj implementacji. Uruchom ten plik testowy przez node --test,
pokaż expected/actual i zatrzymaj się. Bez instalowania zależności.
```

Przeczytaj test. Oczekiwanie ma wynikać z briefu, nie z obecnej funkcji. Test powinien teraz wykrywać brak obsługi wniosku. Jeśli nie wykrywa, sprawdź, co faktycznie testuje.

## 3. Zatwierdź małą poprawkę

```text
Zaimplementuj tylko pierwszy zatwierdzony krok w
laboratorium/limity/src/ocena.mjs. Zachowaj kontrakt i testy.
Uruchom node --test laboratorium/limity/test/ocena.node.mjs.
Pokaż diff i rzeczywisty wynik. Zatrzymaj się przed następnym krokiem.
```

Oceń diff. Następnie wykonuj kolejne kroki planu: status i osoba zatwierdzająca, granice czasu, walidacja. Każdy krok kończy się testem i przeglądem zmian. Nie pozwalaj agentowi usuwać niewygodnych testów ani zmieniać danych, żeby uzyskać zielony wynik.

## 4. Sprawdź raport i ekran

```sh
node laboratorium/limity/raport.mjs
node laboratorium/limity/serwer.mjs
```

Otwórz http://127.0.0.1:4179. Dla scenariuszy z pliku danych oczekujesz kolejno przekroczeń **20 zł, 0 zł, 20 zł, 20 zł**. Zwróć uwagę, czy zgoda aktywna ma źródło `czasowy`. Po zmianie modułu zrestartuj serwer.

**Gotowe:** potrafisz wskazać wymaganie, jego test i fragment implementacji. Raport i ekran korzystają z tej samej funkcji. Pozostałe braki testów zapisujesz do cw09b.

**Pokaz CLI prowadzącego:** [komendy i prompty](../../materialy/sdlc/CLI.md). Uczestnik może pozostać w VS Code.

**Dla szybszych:** pokaż dane `/api/raport` we własnym ekranie. Możesz wyeksportować JSON do pliku i wczytać go w swoim projekcie; nie kopiuj algorytmu do UI. Jeśli używasz osobnego serwera UI, samodzielnie ustal proxy lub sposób pobrania danych.


[Spis ćwiczeń i kolejność](../../CWICZENIA.md) · [Start laboratorium](../../laboratorium/limity/README.md)
