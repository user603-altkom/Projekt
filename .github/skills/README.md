# Skille agentowe (`.github/skills/`)

Materiał do Ćw. 13. Skill to **procedura zapisana raz i doładowywana wtedy, gdy staje się potrzebna** - w odróżnieniu od instrukcji, która towarzyszy każdemu zapytaniu.

Każdy skill to osobny katalog z plikiem `SKILL.md`. Nazwa katalogu musi zgadzać się z polem `name`.

```
.github/skills/
  uzgodnij-raport/
    SKILL.md
```

## Format `SKILL.md`

```markdown
---
name: uzgodnij-raport
description: >-
  Diagnozuje różnicę między raportem dziennym a sumą kontrolną wyciągu.
  Użyj przy zgłoszeniu niezgodności sum albo podejrzeniu utraty precyzji kwot.
---

1. Odtwórz objaw komendą `npm run raport` i zapisz liczby.
2. Prześledź przepływ kwoty od parsera do raportu.
3. Przed edycją przedstaw przyczynę popartą kodem i reprodukcją.
```

Pola wymagane: `name` (małe litery i myślniki) oraz `description` (do 1024 znaków). Poza tym katalog może zawierać skrypty i szablony - agent dostaje je razem z instrukcją.

## `description` jest najważniejszym polem

To po nim model decyduje, czy skill w ogóle załadować. „Pomaga programować" jest bezużyteczne. Dobry opis mówi **co skill robi i kiedy go użyć**, najlepiej frazami, które padną w zapytaniu.

## Kto uruchamia skill

Domyślnie jedno i drugie: skill jest w menu ukośnikowym i model może go wybrać sam na podstawie `description`. Zmieniają to dwa opcjonalne pola:

- `user-invocable: false` - wyłącznie model,
- `disable-model-invocation: true` - wyłącznie ręcznie, komendą `/nazwa`.

## Czego skill NIE robi

Nie ogranicza uprawnień. Skill to treść doładowana do agenta, który już działa i ma te narzędzia, które miał. Ograniczenie uprawnień to zadanie własnego agenta - patrz `.github/agents/README.md`.
