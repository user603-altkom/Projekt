# Skille agentowe (`.github/skills/`)

Materiał do Ćw. 13. Skill to **procedura zapisana raz i doładowywana wtedy, gdy staje się potrzebna** - instrukcje projektowe są natomiast dołączane zgodnie z zakresem danej konfiguracji.

Każdy skill to osobny katalog z plikiem `SKILL.md`. Nazwa katalogu musi zgadzać się z polem `name`.

```
.github/skills/
  uzgodnienie/
    SKILL.md
```

## Format `SKILL.md`

```markdown
---
name: uzgodnienie
description: >-
  Diagnozuje różnicę między raportem dziennym a sumą kontrolną wyciągu.
  Użyj przy zgłoszeniu niezgodności sum albo podejrzeniu utraty precyzji kwot.
---

1. Odtwórz objaw komendą `npm run raport` i zapisz liczby.
2. Prześledź przepływ kwoty od parsera do raportu.
3. Przed edycją przedstaw przyczynę popartą kodem i reprodukcją.
```

Pola wymagane: `name` (małe litery i myślniki) oraz `description` (do 1024 znaków). Katalog może zawierać także skrypty i szablony. Odwołaj się do nich w `SKILL.md`; dodatkowe zasoby są odczytywane według potrzeb, nie automatycznie wszystkie naraz.

## `description` jest najważniejszym polem

To po nim model decyduje, czy skill w ogóle załadować. „Pomaga programować" jest bezużyteczne. Dobry opis mówi **co skill robi i kiedy go użyć**, najlepiej frazami, które padną w zapytaniu.

## Kto uruchamia skill

Domyślnie jedno i drugie: skill jest w menu ukośnikowym i model może go wybrać sam na podstawie `description`. Zmieniają to dwa opcjonalne pola:

- `user-invocable: false` — ukrywa skill w menu `/`, pozostawiając automatyczne dobieranie,
- `disable-model-invocation: true` - wyłącznie ręcznie, komendą `/nazwa`.

## Czego skill NIE robi

Nie ogranicza uprawnień. Skill to treść doładowana do agenta, który już działa i ma te narzędzia, które miał. Dobór narzędzi i ustawienia uprawnień kontrolujesz w konfiguracji środowiska i agenta - patrz `.github/agents/README.md`.

Źródło: [Agent Skills w VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills).
