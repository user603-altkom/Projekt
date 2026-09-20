# Hook: krótki pokaz prowadzącego

Hook uruchamia kod przy zdarzeniu agenta. Przykład demonstracyjny VS Code, wyłączony w starterze:

```json
{"hooks":{"PreToolUse":[{"type":"command","command":"node scripts/hook-demo.mjs"}]}}
```

Nie zapisuj tego jako aktywnego JSON podczas samodzielnych ćwiczeń: przykład blokuje **wszystkie** narzędzia. Prowadzący używa oddzielnej kopii projektu, włącza go na jedną próbę i usuwa konfigurację po pokazie.

Skrypt kończy się kodem 2. Przy `PreToolUse` oznacza to zatrzymanie wywołania przed wykonaniem. `PostToolUse` następuje po operacji — nie cofa jej. Inny kod błędu może dać tylko ostrzeżenie. Sprawdź log debugowania agenta, faktyczne zdarzenie i efekt, nie samą obecność pliku.

Format, dostępność i polityki zależą od wersji i harnessu. Hook nie jest pełnym sandboxem. Możliwość zmiany jego konfiguracji i wykonania innych narzędzi to osobne kwestie.

Źródła, sprawdzone 20.09.2026: [VS Code hooks](https://code.visualstudio.com/docs/agent-customization/hooks), [referencja zdarzeń](https://code.visualstudio.com/docs/agents/reference/hooks-reference).
