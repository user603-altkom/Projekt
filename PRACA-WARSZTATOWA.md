# Jak pracujemy w dniach 2–3

Kontynuuj swój projekt i tę samą gałąź. Copilot jest narzędziem domyślnym; Claude Code możesz użyć, gdy wskazuje to prowadzący lub wymaga tego dostępny limit. Przed zmianą narzędzia sprawdź jego instrukcje. Nie uruchamiaj dwóch agentów zapisujących ten sam katalog równocześnie.

## Aktualizacja bez utraty własnego ekranu

1. W swoim repo wykonaj `git status --short`. Zapisz własną pracę w lokalnym commicie po przejrzeniu diffu; nowe pliki dodaj po nazwie. Nie dodawaj sekretów, `node_modules` ani `portfolio`.
2. Wykonaj `git fetch origin`. To pobiera materiały, nie zmienia Twoich plików.
3. Wykonaj `git merge origin/main`. Jeśli wystąpi konflikt, zatrzymaj się i poproś prowadzącego o pomoc. Nie przyjmuj automatycznie całej obcej wersji. Nie używaj `reset --hard` ani `git clean`.
4. Jeśli nie chcesz scalać w czasie zajęć, otwórz nowe karty w przeglądarce GitLaba albo zrób osobny klon do czytania materiałów. Kod rozwijasz dalej w swoim katalogu.

## W każdym zadaniu

- Terminal otwieraj w katalogu z `package.json`. Na Windows wybierz Git Bash; w PowerShell z blokadą skryptów używaj `npm.cmd`.
- Ask lub plan bez edycji służy analizie. Agent implementuje dopiero uzgodniony krok. Jeśli nazwy trybów są inne, kieruj się faktycznymi narzędziami i uprawnieniami.
- Dołącz wskazane pliki przyciskiem dodawania kontekstu lub przeciągnij je do czatu. Nazwa ścieżki w wiadomości nie dowodzi odczytu.
- `portfolio/` przechowuje lokalne notatki i jest ignorowane przez Git. Wspólne instrukcje i kod zapisuj w repo. W nowej sesji dołącz potrzebną notatkę jawnie.
- Przed i po etapie obejrzyj `git status --short` oraz `git diff`. Sprawdź także nowe pliki: zwykły `git diff` ich nie pokazuje. Potem `git add` z rzeczywistymi ścieżkami, `git diff --cached`, commit.
- Jeśli Git pyta o autora, ustaw lokalnie: `git config --local user.name "Franek"` oraz `git config --local user.email "franek@example.com"`. Nie wypychaj rozwiązań do wspólnego `main`.

## Gdy agent poszedł za daleko

Zatrzymaj wykonanie. Przeczytaj diff. Oddziel uzgodnione zmiany od pozostałych. Przywróć wyłącznie niechciane fragmenty po sprawdzeniu, że nie zawierają Twojej pracy; w razie wątpliwości zachowaj kopię i poproś o pomoc. Zleć następny krok mniejszym zakresem, z warunkiem zatrzymania.

`npm test` i `npm run typecheck` sprawdzają istniejący kod. `npm run odbior` sprawdza bazową integrację limitów kredytowych; w starterze celowo nie przechodzi. Żadne z tych poleceń nie sprawdza automatycznie całego własnego interfejsu.
