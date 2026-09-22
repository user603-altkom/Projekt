# Pokaz Copilot CLI i Claude Code

Wszystkie polecenia wykonujemy w głównym folderze repo. Ten pokaz można śledzić bez instalacji CLI na stanowisku uczestnika. Oba narzędzia uruchamiają lokalną sesję agenta; wybór modelu w Copilot Chat nie uruchamia Claude Code.

```sh
copilot --version
copilot --help
claude --version
claude --help
```

Uruchom `copilot`, zaloguj się, jeśli klient tego wymaga, i wybierz planowanie (`--plan`, jeśli bieżąca pomoc je udostępnia). Dla drugiej próby uruchom `claude --permission-mode plan`. Nie włączaj pomijania potwierdzeń. W obu sesjach użyj tego samego zadania:

```text
Przeczytaj laboratorium/limity/BRIEF.md, KONTRAKT.md i src/ocena.mjs
z tego laboratorium. Zaplanuj pierwszy mały krok obsługi aktywnej zgody.
Podaj test, plik do zmiany i punkt zatrzymania. Nie edytuj plików.
```

Porównaj odczytane pliki, pytania i proponowany zakres. Sprawdź `git status --short` i diff przed/po. Sam tekst „nic nie zmieniłem” nie wystarcza.

Nie pokazujemy tu agenta działającego w chmurze GitHuba. GitHub PR i zadania chmurowe mają odrębny kontekst i uprawnienia.

Źródła: [Copilot CLI](https://docs.github.com/en/copilot/get-started/cli-quickstart), [Claude CLI](https://code.claude.com/docs/en/cli-reference). Polecenia i dostępność sprawdź przez pomoc zainstalowanej wersji.
