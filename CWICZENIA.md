# Aktualna ścieżka dni 2–3: SDLC

**Wersja z 22.09.2026. Na zajęciach otwieraj karty z tej tabeli.** Numery na slajdach są takie same. Starsze ćwiczenia bez liter i starsze katalogi opisowe nie określają kolejności. Dzień 1 pozostaje bez zmian.

| Numer | Temat | Co oddajesz? |
|---|---|---|
| [cw05a](cwiczenia/cw05a/README.md) | Instrukcje: AGENTS, @ i zakaz edycji | Trzy wyniki eksperymentów |
| [cw05b](cwiczenia/cw05b/README.md) | Publiczne wzorce Copilota | Jedna własna reguła |
| [cw06b](cwiczenia/cw06b/README.md) | Wymagania z grill-me | MVP i kryteria |
| [cw07b](cwiczenia/cw07b/README.md) | Projekt i agent architekt | Kontrakt i mały plan |
| [cw08b](cwiczenia/cw08b/README.md) | Implementacja z instrukcjami | Moduł, raport i UI |
| [cw09b](cwiczenia/cw09b/README.md) | Testy i przekazanie | Przypadki graniczne i stan pracy |
| [cw10b](cwiczenia/cw10b/README.md) | Review i integracje | Uwaga z dowodem i test |
| [cw11b](cwiczenia/cw11b/README.md) | Wydanie | Wersja, opis i sprawdzenie |
| [cw12b](cwiczenia/cw12b/README.md) | Utrzymanie | Reprodukcja i poprawka |
| [cw13b](cwiczenia/cw13b/README.md) | Własny skill | Procedura odbioru |
| [cw14b](cwiczenia/cw14b/README.md) | MCP, CLI i hook | Kontrolowany eksperyment |
| [cw15b](cwiczenia/cw15b/README.md) | Superpowers | Małe rozszerzenie przez proces |

- **Dzień 2:** cw05a–cw09b. Najpierw instrukcje i skille, potem wymagania, projekt, implementacja i testy.
- **Dzień 3:** cw10b–cw15b. Review, wydanie, utrzymanie i utrwalenie procesu.
- [Plan dnia 2](DZIEN-2.md) · [plan dnia 3](DZIEN-3.md).

## Ćwiczenia dodatkowe — niezależne od głównej ścieżki

Możesz wykonać je w dniu 2 lub 3. Każda karta zawiera komplet instrukcji i wariant dla szybszych.

| Numer | Temat | Czas | Efekt |
| --- | --- | --- | --- |
| [cw16b](cwiczenia/cw16b/README.md) | Agent testuje Twój ekran: Playwright MCP i testy E2E | 75–90 min | Trzy testy, raport, trace i wykryta celowa usterka; dołączone demo, gdy nie masz własnego UI |
| [cw17b](cwiczenia/cw17b/README.md) | Centrum dowodzenia awarią | 90–120 min | Działający symulator, wykres kolejki i obsługa incydentu |

## Co masz mieć lokalnie?

Wszystkie wejścia są w tym repo. Publiczne repozytoria i dokumentacja mają linki internetowe. **Nie potrzebujesz plików prowadzącego ani prezentacji, aby wykonać kartę.**

Do cw05a używasz pustego folderu, do cw05b przeglądarki. Od cw06b wspólnym punktem odniesienia jest [laboratorium limitów](laboratorium/limity/README.md). Własny ekran z dnia 1 zachowujesz; jego stan nie blokuje ćwiczeń. Używamy Node 24, a laboratorium nie wymaga instalacji zależności.

## Pobranie nowej ścieżki bez ryzyka dla własnego ekranu

Jeśli masz niezacommitowane zmiany lub nie chcesz scalać materiałów podczas zajęć, otwórz Git Bash w folderze nadrzędnym i sklonuj repo **pod nową nazwą**:

```sh
git clone https://gitlab.com/agentGreg/szkolenie-ai-rejestr-rozliczen.git szkolenie-sdlc
cd szkolenie-sdlc
git switch -c warsztat/sdlc
git config --local user.name "Uczestnik Warsztatu"
git config --local user.email "uczestnik@example.com"
```

Otwórz ten folder w nowym oknie VS Code. Jeżeli `szkolenie-sdlc` już istnieje, wybierz inną nową nazwę. Nie usuwaj starego projektu, nie wykonuj reset ani clean. Gdy Twoja obecna kopia jest gotowa do scalenia, możesz zamiast nowej kopii użyć [dotychczasowej procedury aktualizacji](PRACA-WARSZTATOWA.md).

Pliki dokumentów w laboratorium są pustymi formularzami do uzupełnienia. Pliki opisane jako **nowe** tworzysz podczas ćwiczenia. Każda karta ma wariant dla szybszych i informację, co zrobić bez opcjonalnego narzędzia.
