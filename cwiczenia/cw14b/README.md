# cw14b — MCP, CLI i hook: trzy różne potrzeby

**45 min · w parach**

**Cel:** dobrać mechanizm do potrzeby i zobaczyć różnicę między tekstową zasadą a wykonaniem kodu przy zdarzeniu agenta.

## 1. Dokumentacja i test lokalny

Chcesz dodać przypadki do testów korzystających z `node:test`. Znajdź w [dokumentacji Node 24](https://nodejs.org/docs/latest-v24.x/api/test.html) sposób uruchomienia pojedynczego pliku testowego. Jeśli masz skonfigurowany Context7, poproś agenta przez ten serwer o ten sam fragment dokumentacji i sprawdź źródło oraz wersję. [Instrukcja Context7 dla VS Code](https://context7.com/docs/clients/vscode).

Nie instaluj MCP tylko po to, by ukończyć zadanie. Bez przygotowanego połączenia korzystasz z oficjalnej strony. Nie opisuj zwykłego odczytu strony jako wywołania MCP.

Następnie uruchom w terminalu:

```sh
node --test laboratorium/limity/test/ocena.node.mjs
```

Zapisz, co potwierdza dokumentacja, a co potwierdza wykonanie polecenia. Samo pobranie dokumentacji nie uruchamia testów.

## 2. Hook na jednej kontrolowanej próbie

Wykonaj próbę w **nowym, pustym folderze** `proba-hooka`, który sam utworzysz obok repo i otworzysz w osobnym oknie VS Code. Nie zmieniaj globalnych ustawień ani konfiguracji repo ćwiczeń.

1. Utwórz plik `notatka.txt` o treści `Wersja robocza`.
2. Utwórz plik `blokuj-demo.mjs` w tym nowym folderze:

```js
console.error('DEMO: PreToolUse zatrzymuje to wywolanie. Wylacz demo.json po probie.');
process.exit(2);
```

3. Utwórz `.github/hooks/demo.json` w folderze `proba-hooka`:

```json
{
  "hooks": {
    "PreToolUse": [
      { "type": "command", "command": "node blokuj-demo.mjs" }
    ]
  }
}
```

4. Zacznij nową sesję Copilot Agent i poproś: „Zmień notatka.txt na Gotowe do review”. Sprawdź log hooka, odmowę wywołania narzędzia oraz treść pliku. Ten demonstracyjny hook blokuje **wszystkie** narzędzia, także odczyt.
5. Usuń **wyłącznie utworzony przez siebie** `.github/hooks/demo.json`. Zacznij nową sesję i powtórz próbę ze zwykłym zatwierdzaniem edycji. Sprawdź, czy blokada zniknęła.

Próba wymaga wersji VS Code i polityki konta obsługującej hooki. Jeśli hook się nie uruchamia, sprawdź [dokumentację hooków VS Code](https://code.visualstudio.com/docs/agent-customization/hooks). Przy braku obsługi przeanalizuj konfigurację i zapisz „integracja hooka niewykonana”. Uruchomienie samego skryptu w terminalu nie potwierdza działania hooka.

`PreToolUse` działa przed wywołaniem narzędzia; `PostToolUse` nie cofa wykonanej operacji. Porównaj z cw05a: słowny zakaz, prośba o zgodę i zablokowane wywołanie to różne obserwacje. Hook nie jest pełną izolacją systemu.

## 3. Wybór mechanizmu

W parze rozstrzygnij:

- Skąd pobierzesz dokumentację wersji biblioteki?
- Czym wykonasz lokalny test?
- Jak sprawdzisz kontrolę przed uruchomieniem narzędzia?
- Jak pobierzesz opis i diff MR z GitLaba? W repo ćwiczeń służą do tego `glab mr view 1` i `glab mr diff 1 --raw`; wymagają zainstalowanego `glab` oraz dostępu do GitLaba. Bez CLI możesz otworzyć [MR w przeglądarce](https://gitlab.com/agentGreg/szkolenie-ai-rejestr-rozliczen/-/merge_requests/1).

Zapisz odpowiedzi w **nowym pliku** `laboratorium/limity/dokumenty/08-narzedzia.md`.

**Gotowe:** dla każdego wyboru podajesz potrzebny dostęp oraz obserwowalny wynik. CLI i MCP mogą udostępniać podobne możliwości; wybór zależy od środowiska.

**Dla szybszych:** opisz, które kontrole muszą pozostać w testach lub CI, nawet jeśli masz hook i skill odbioru.


[Spis ćwiczeń i kolejność](../../CWICZENIA.md) · [Start laboratorium](../../laboratorium/limity/README.md)
