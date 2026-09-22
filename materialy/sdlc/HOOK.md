# Jedna próba hooka, potem wyłączenie

Pokaz dotyczy VS Code Copilot i zdarzenia `PreToolUse`. Wymaga wersji obsługującej hooki i zgodnej polityki konta. Nie zmieniaj globalnych ustawień. Jeśli VM nie udostępnia hooków, obserwuj pokaz lub przeanalizuj konfigurację i nazwij ograniczenie.

1. Utwórz **nowy, pusty folder** `proba-hooka` obok repo, otwórz go w osobnym oknie VS Code. To folder na wynik eksperymentu, nie materiał, którego brakuje w repo.
2. Utwórz `notatka.txt` o treści `Wersja robocza`.
3. Skopiuj dostępny w tym repo [blokuj-demo.mjs](blokuj-demo.mjs) do nowego folderu. Utwórz w nim `.github/hooks/demo.json` z treścią poniżej.

```json
{
  "hooks": {
    "PreToolUse": [
      { "type": "command", "command": "node blokuj-demo.mjs" }
    ]
  }
}
```

4. Zacznij nową sesję agenta. Poproś: „Zmień notatka.txt na Gotowe do review”. Sprawdź log hooka, odmowę wywołania narzędzia i faktyczną treść pliku. Ten demonstracyjny hook blokuje **wszystkie** narzędzia, także odczyt; nie jest docelową regułą zespołu.
5. Usuń **wyłącznie utworzony przez siebie** `.github/hooks/demo.json`. Zacznij nową sesję i powtórz próbę z normalnym zatwierdzaniem edycji. Sprawdź, czy blokada zniknęła.

Skrypt zwraca kod 2 przed narzędziem. Uruchomienie samego skryptu w terminalu pokazuje tylko jego działanie, nie integrację hooka. `PostToolUse` odbywa się po działaniu i go nie cofa. Hook nie jest pełnym sandboxem ani zabezpieczeniem przed kimś, kto może zmieniać konfigurację.

Źródła: [hooki VS Code](https://code.visualstudio.com/docs/agent-customization/hooks), [zdarzenia hooków](https://code.visualstudio.com/docs/agents/reference/hooks-reference).
