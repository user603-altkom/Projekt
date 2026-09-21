# D3-06 — Czy gotowa metoda pomaga?

**50 min: pokaz, krótka próba i porównanie · Claude Code, potem transfer do Copilota**

Własny proces już masz: pytania → plan → mały krok → kontrola. Teraz zobaczysz, jak Superpowers organizuje podobną pracę. To zestaw skilli i sposobu prowadzenia zadań, nie serwer MCP.

1. **Obserwuj pokaz.** Prowadzący w przygotowanym Claude Code zleca małe rozszerzenie: porównanie bazowego i symulowanego limitu. Zapisz, kiedy agent pyta, kiedy proponuje projekt i gdzie zatrzymuje się po decyzję. Nie instaluj pakietu podczas demonstracji.
2. **Krótka próba w parze.** Na przygotowanym stanowisku użyj tej samej metody do jednego małego celu we własnym projekcie. Jeśli funkcja już istnieje, wybierz z prowadzącym obsługę klawiaturą lub etykietę stanu. Zacznij od wyjaśnienia celu i uzgodnij kryterium. W podstawie wystarcza sprawdzony projekt i plan; nie trzeba kończyć pełnego cyklu wszystkich skilli.
3. **Porównaj z wtorkiem.** Co metoda zrobiła konkretnie: zadała brakujące pytanie, zmniejszyła krok, przypomniała test? Co było zbędne? W `portfolio/superpowers.md` zapisz przykład oraz jedną praktykę do zastosowania w Copilocie bez instalowania frameworka.

**Gotowe:** potrafisz pokazać etap, na którym metoda pomogła albo dodała koszt bez korzyści. Długość odpowiedzi nie jest miarą.

**Pomoc:** jeśli instalacja/logowanie nie działa, po 5 minutach pracuj na stanowisku trenera lub analizuj jego rzeczywisty przebieg. Potem wykonaj wybrany krok w Copilocie. Nazwij ten wariant uczciwie; nie zgłaszaj użycia skilla, którego nie załadowano.

**Dla szybszych:** zrealizuj pierwszy zatwierdzony krok i wykonaj kontrolę. Nie uruchamiaj kilku agentów do tej samej małej zmiany tylko dlatego, że pakiet to umożliwia.

[Repo i instrukcje instalacji](https://github.com/obra/superpowers). Sposób instalacji zależy od harnessu; konfiguracja Copilot CLI nie oznacza automatycznie konfiguracji VS Code.

## Przygotowanie przed blokiem — tylko jeśli wskazuje prowadzący

W przygotowanej sesji Claude Code użyj `/plugin`, by sprawdzić, czy Superpowers jest już zainstalowany. Jeśli nie, oficjalna instrukcja podaje `/plugin install superpowers@claude-plugins-official`. Po instalacji zacznij nową sesję i sprawdź faktyczne użycie skilla. Nie instaluj drugiej kopii ani wariantu dla innego harnessu. Przy braku dostępu użyj ścieżki z sekcji Pomoc.
