# cw14b — MCP, CLI i hook: trzy różne potrzeby

**15 min pokazu + 30 min ćwiczenia · w parach**

**Cel:** dobrać mechanizm do potrzeby i zobaczyć różnicę między tekstową zasadą a wykonaniem kodu przy zdarzeniu agenta.

## 1. Dokumentacja i test lokalny

Chcesz dodać przypadki do testów korzystających z `node:test`. Znajdź w [dokumentacji Node 24](https://nodejs.org/docs/latest-v24.x/api/test.html) sposób uruchomienia pojedynczego pliku testowego. Jeśli prowadzący ma skonfigurowany Context7, poproś przez niego o ten sam fragment dokumentacji i sprawdź źródło oraz wersję. [Instrukcja Context7 dla VS Code](https://context7.com/docs/clients/vscode).

Nie instaluj MCP tylko po to, by ukończyć zadanie. Bez przygotowanego połączenia korzystasz z oficjalnej strony. Nie opisuj zwykłego odczytu strony jako wywołania MCP.

Następnie uruchom w terminalu:

```sh
node --test laboratorium/limity/test/ocena.node.mjs
```

Zapisz, co potwierdza dokumentacja, a co potwierdza wykonanie polecenia. Samo pobranie dokumentacji nie uruchamia testów.

## 2. Hook na jednej kontrolowanej próbie

Otwórz [pełną instrukcję hooka](../../materialy/sdlc/HOOK.md). Jest w tym repo wraz ze skryptem. Prowadzący pokazuje próbę w osobnym folderze. Jeśli Twoja VM obsługuje hooki i chcesz ją powtórzyć, wykonaj dokładnie tę instrukcję, łącznie z wyłączeniem hooka po próbie.

Porównaj z cw05a: słowny zakaz, prośba o zgodę, zablokowane wywołanie narzędzia. To różne obserwacje. Hook nie jest pełną izolacją systemu.

## 3. Wybór mechanizmu

W parze rozstrzygnij:

- Skąd pobierzesz dokumentację wersji biblioteki?
- Czym wykonasz lokalny test?
- Jak sprawdzisz kontrolę przed uruchomieniem narzędzia?
- Jak pobierzesz opis i diff MR z GitLaba? Wróć do [komend integracji](../../materialy/sdlc/INTEGRACJE.md).

Zapisz odpowiedzi w **nowym pliku** `laboratorium/limity/dokumenty/08-narzedzia.md`.

**Gotowe:** dla każdego wyboru podajesz potrzebny dostęp oraz obserwowalny wynik. CLI i MCP mogą udostępniać podobne możliwości; wybór zależy od środowiska.

**Dla szybszych:** opisz, które kontrole muszą pozostać w testach lub CI, nawet jeśli masz hook i skill odbioru.


[Spis ćwiczeń i kolejność](../../CWICZENIA.md) · [Start laboratorium](../../laboratorium/limity/README.md)
