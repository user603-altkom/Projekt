# Hooki agenta (`.github/hooks/`)

Materiał do Ćw. 13. Hook to **polecenie uruchamiane w określonym punkcie cyklu życia sesji, niezależnie od tego, czy model o nim pamięta**. Instrukcja prosi. Hook wymusza.

## Uwaga: dwa różne formaty pod tą samą ścieżką

Ten katalog czytają dwa różne produkty i **mają inny schemat**:

- **VS Code Agent hooks** - nazwy zdarzeń w PascalCase, klucz `command`. Tego używamy tutaj.
- **Copilot CLI i agent chmurowy** - nazwy zdarzeń w camelCase (`preToolUse`), klucze `bash` i `powershell`.

Skopiowanie przykładu z niewłaściwej dokumentacji to najczęstszy powód, dla którego hook „nie działa".

## Format (VS Code)

```json
{
  "hooks": {
    "PreToolUse": [
      { "type": "command", "command": "node scripts/straznik-danych.mjs" }
    ]
  }
}
```

Zdarzenia: `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `PreCompact`, `SubagentStart`, `SubagentStop`, `Stop`.

## Kody wyjścia decydują o wszystkim

- `0` - w porządku, sesja idzie dalej.
- `2` - **blokada**. To, co hook wypisze na stderr, trafia do modelu jako uzasadnienie.
- inne - ostrzeżenie, ale **bez blokady**.

Stąd wniosek, który warto sprawdzić samemu: hook, który pada z błędem składni, zwróci kod inny niż 2 i **przepuści operację**. Bramka, która przepuszcza przy własnej awarii, nie jest bramką, dopóki tego nie wiesz.

## Czego hook nie załatwi

Agent, który może edytować plik hooka, może zmienić własną kontrolę. Uprawnienia systemu plików i reguły CI to osobna warstwa - plik JSON jej nie zastąpi.
