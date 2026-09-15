# Instrukcje zawężone do ścieżek (`.github/instructions/`)

Materiał do wariantu rozszerzonego Ćw. 9. `.github/copilot-instructions.md` obowiązuje w całym repozytorium. Pliki w tym katalogu (`NAME.instructions.md`) pozwalają dać Copilotowi instrukcje, które obowiązują tylko dla wybranych plików - to właśnie ogranicza pole widzenia agenta, o którym mowa w decyzjach dotyczących struktury repo.

## Jak to działa

Każdy plik `NAME.instructions.md` zaczyna się od bloku frontmatter (YAML między `---`), a poniżej idzie zwykła treść instrukcji w Markdown - dokładnie jak w `copilot-instructions.md`.

```markdown
---
applyTo: "src/interest/**/*.ts"
---

Ten moduł liczy odsetki. Zmiany w logice naliczania wymagają odniesienia
się do `docs/api.md` i sprawdzenia zgodności z `odsetki_przypadki.json`.
```

### `applyTo` - do których plików instrukcja się stosuje

- Wartość to wzorzec glob, np. `"src/**/*.ts"` albo `"app/models/**/*.rb"`.
- Można podać kilka wzorców naraz, rozdzielonych przecinkami: `"**/*.ts,**/*.tsx"`.
- `applyTo: "**"` oznacza „wszystkie pliki” - używane zwykle w połączeniu z `excludeAgent` (patrz niżej), żeby precyzyjnie wykluczyć jednego konkretnego agenta zamiast zawężać pliki.

### `excludeAgent` - dla których agentów instrukcja NIE obowiązuje

Opcjonalne pole. Wyklucza dany plik instrukcji dla konkretnego agenta Copilota:

- `excludeAgent: "code-review"` - instrukcja nie będzie używana przez Copilot code review.
- `excludeAgent: "cloud-agent"` - instrukcja nie będzie używana przez Copilot cloud agent.

Jeśli `excludeAgent` nie jest podane, instrukcja obowiązuje dla obu.

```markdown
---
applyTo: "**"
excludeAgent: "code-review"
---
```

## Przykład dla tego repozytorium

Sensowny podział na potrzeby Ćw. 9 (wariant rozszerzony):

- `src/interest/**/*.ts` - jak sprawdzać zgodność z `legacy-java/`, żeby nie zgubić kontekstu przy refaktoryzacji.
- `dane/**` - ostrzeżenie, że dane są syntetyczne (nie prawdziwe dane osobowe ani rachunki) - nie „naprawiać” ich jako danych wejściowych.
- `tests/**` - konwencja nazw testów po polsku (patrz zasady w głównym `AGENTS.md`).

Zawężanie w ten sposób jest tańsze niż pisanie jednej, bardzo długiej instrukcji ogólnej - i to jest właśnie temat do przećwiczenia.
