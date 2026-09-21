# D3-08 — MCP, CLI i hook w konkretnym zadaniu

**20 min · dwa krótkie pokazy i wybór w parach**

Nie instalujemy kolejnej platformy. Dobieramy narzędzie do czynności.

1. **Dokumentacja i wykonanie.** Prowadzący sprawdza `npm ls vitest --depth=0`, pyta przygotowany Context7 o `test.each`, pokazuje źródło i uruchamia mały test. Pobranie dokumentacji i wykonanie kodu to dwa różne dowody. Bez MCP korzystamy z [dokumentacji Vitest](https://vitest.dev/api/test#test-each); wersja strony nie musi odpowiadać lokalnej bibliotece.
2. **Hook.** Na osobnej kopii prowadzący pokazuje hook przed narzędziem oraz jego skutek. `PreToolUse` może zatrzymać wywołanie w obsługiwanym harnessie. `PostToolUse` nie cofa już wykonanej operacji. Format i dostępność zależą od narzędzia; plik JSON sam nie dowodzi działania.
3. **W parze wybierz mechanizm.** Aktualna składnia biblioteki; test lokalnego projektu; kontrola przed wywołaniem narzędzia. Dla każdego wskaż narzędzie, wymagany dostęp i dowód wyniku. Nie musisz wybierać MCP do wszystkiego: CLI i MCP mogą udostępniać podobne możliwości.

**Gotowe:** trzy uzasadnienia w `portfolio/narzedzia.md`. Np. „`npm test` wykonuje nasze testy; odpowiedź Context7 ich nie uruchomiła”.

**Dla szybszych / po szkoleniu:** [pełna próba Context7](ROZSZERZENIE.md) oraz [.github/hooks](../../.github/hooks/README.md). Konfiguracji nie włączamy globalnie na wszystkich stanowiskach.

Źródła: [Context7](https://context7.com/docs/clients/vscode), [hooki VS Code](https://code.visualstudio.com/docs/agent-customization/hooks).
