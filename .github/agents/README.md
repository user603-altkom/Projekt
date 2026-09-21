# Właśni agenci (`.github/agents/`)

Rozszerzenie ćw. 13. Własny agent definiuje rolę i zestaw dostępnych narzędzi. Dla recenzenta dobierz narzędzia do odczytu. Sama treść „nie zmieniaj plików” nie jest techniczną blokadą zapisu.

Plik `.github/agents/recenzent.agent.md` zawiera YAML i instrukcję:

```markdown
---
name: recenzent
description: Przegląda kod i wypisuje zastrzeżenia z dowodami.
tools: ['search/codebase', 'search/usages']
---

Dla każdego zastrzeżenia podaj plik i linię oraz sposób sprawdzenia.
Oddziel potwierdzone błędy od hipotez. Jeśli nie znajdujesz błędu,
powiedz to wprost. Nie edytuj plików.
```

Zapisz plik i wybierz **recenzent** z listy agentów w panelu czatu. Sprawdź, jakie narzędzia faktycznie są dostępne w Twojej wersji VS Code. Jeśli nazwa narzędzia nie jest rozpoznana, użyj edytora konfiguracji i wybierz dostępne narzędzia odczytu/wyszukiwania.

Nie pomijaj świadomie pola `tools`, licząc, że sam opis ograniczy możliwości. Nie dodawaj terminala do roli „tylko odczyt”: komenda powłoki może zmieniać pliki. Sprawdź również narzędzia MCP i możliwość delegowania, jeśli włączasz je do roli.

**Próba w osobnej kopii:** poproś o review, a następnie o zapis pliku. Obejrzyj dostępne narzędzia i wynik w `git status --short`. Odmowa modelu to obserwacja; brak narzędzi zapisu to osobna właściwość konfiguracji. Taki agent nie jest izolacją całego systemu operacyjnego.

Źródło: [Custom agents w VS Code](https://code.visualstudio.com/docs/agent-customization/custom-agents).
