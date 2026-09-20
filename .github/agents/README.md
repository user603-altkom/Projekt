# Właśni agenci (`.github/agents/`)

Materiał do Ćw. 13. Własny agent to **rola plus zamknięta lista narzędzi**. W odróżnieniu od skilla, który dodaje treść, agent **ogranicza to, co wolno zrobić**.

Plik: `NAZWA.agent.md`, frontmatter YAML plus treść w Markdown.

```markdown
---
name: recenzent
description: Przegląda diff i wypisuje zastrzeżenia. Nie zmienia plików.
tools: ['search/codebase', 'search/usages']
---

Jesteś recenzentem. Dla każdego zastrzeżenia podaj plik i linię oraz sposób
sprawdzenia. Oddziel potwierdzone błędy od hipotez. Jeśli nie znajdujesz
błędu, powiedz to wprost.
```

## Pole `tools` jest tym, co czyni agenta bramką

**Pominięcie pola `tools` daje agentowi wszystkie narzędzia**, łącznie z zapisem plików i terminalem. Ograniczenie to biała lista: wpisujesz wyłącznie to, co wolno.

Dokumentacja mówi o tym wprost: przy przepływach wrażliwych na bezpieczeństwo twórz agentów z narzędziami tylko do odczytu, żeby zapobiec niezamierzonym modyfikacjom.

To jest ta sama bramka, o której mówimy przy code review, tyle że wymuszona konfiguracją zamiast dobrą wolą recenzenta.

## Jak go wywołać

Z listy agentów w panelu czatu albo przez `@nazwa`. Uwaga: wywołanie przez `@` działa w trybie agentowym - w zwykłym czacie nie zadziała i łatwo uznać, że agent jest zepsuty.
