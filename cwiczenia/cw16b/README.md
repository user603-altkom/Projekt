# cw16b — Agent zostaje testerem Twojej aplikacji

**Ćwiczenie dodatkowe · 75–90 min · Copilot Agent lub Claude Code**

**Efekt:** agent obsługuje przeglądarkę, sprawdza Twój ekran i zapisuje trzy powtarzalne testy. Oglądasz raport oraz zapis przebiegu. Na koniec celowo psujesz jedną funkcję, aby sprawdzić, czy test naprawdę coś wykrywa.

Nie musisz ukończyć wcześniejszych ćwiczeń. Potrzebujesz Node, dostępu do npm oraz działającej lokalnej aplikacji. Wszystkie komendy poniżej wpisujesz w terminalu; działają w PowerShell i Git Bash. Nie instalujesz rozszerzenia do Chrome.

## 1. Wybierz aplikację i ustal oczekiwania — 10 min

**Masz ekran z dnia 1:** uruchom go dotychczasową komendą. Otwórz w zwykłej przeglądarce i zapisz pełny adres, np. `http://127.0.0.1:5173`. Wybierz trzy istniejące funkcje do sprawdzenia: wyszukiwanie, filtrowanie, formularz, szczegóły albo powrót do widoku początkowego. Dla każdej zapisz czynność i konkretny oczekiwany wynik. Nie zlecaj agentowi wymyślania oczekiwań wyłącznie z obecnego zachowania aplikacji.

**Nie masz działającego ekranu:** w terminalu głównego katalogu repo ćwiczeń uruchom dołączone [demo](demo/index.html):

```sh
node cwiczenia/cw16b/demo/serwer.mjs
```

Otwórz **http://127.0.0.1:4186**. Zostaw terminal działający. Przy zajętym porcie uruchom `node cwiczenia/cw16b/demo/serwer.mjs 4188` i używaj portu 4188 w całym ćwiczeniu.

Wymagania demo, niezależne od jego implementacji:

| Czynność | Oczekiwany wynik |
| --- | --- |
| Otwórz ekran | Alfa, Beta, Gamma; przekroczenia odpowiednio 10,00 zł, 0,00 zł i 50,00 zł |
| Zaznacz „Tylko przekroczenia” | Zostają Alfa i Gamma; licznik wynosi 2 |
| Wpisz „Beta” przy zaznaczonym filtrze | Brak wierszy danych, „Brak wyników”, licznik 0 |
| Kliknij „Wyczyść filtry” | Puste wyszukiwanie, odznaczony filtr, wszystkie 3 pozycje |

## 2. Przygotuj osobny projekt testowy — 10 min

Serwer aplikacji pozostaje w pierwszym terminalu. W **drugim terminalu, w folderze nadrzędnym wobec repo**, utwórz nowy katalog:

```sh
mkdir proba-playwright
cd proba-playwright
npm init -y
npm install -D @playwright/test
npx playwright install chromium
```

Jeśli katalog już istnieje, wybierz inną nową nazwę. Otwórz **ten nowy folder** w osobnym oknie VS Code. Tu powstają testy i konfiguracja MCP; nie dodajesz ich do testów Vitest wcześniejszego repo.

Utwórz `playwright.config.mjs` z treścią poniżej. Zastąp `baseURL` adresem swojej aplikacji, jeśli używasz własnego ekranu:

```js
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4186',
    browserName: 'chromium',
    trace: 'on',
    screenshot: 'only-on-failure'
  }
});
```

W tym samym folderze utwórz `kryteria.md` i zapisz wybrane oczekiwania z kroku 1 oraz URL. To Twój dokument do przekazania agentowi; nie jest dostarczonym wcześniej plikiem.

## 3. Podłącz przeglądarkę do agenta — 10 min

Wybierz **jeden** klient. Konfiguracja poniżej używa zainstalowanego na Windows **Microsoft Edge** w osobnej sesji, bez rozszerzeń. Testy z kroku 5 używają pobranego Chromium — to dwa osobne sposoby uruchamiania przeglądarki.

**Copilot w VS Code:** w nowym projekcie testowym utwórz `.vscode/mcp.json`:

```json
{
  "servers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest", "--browser", "msedge", "--isolated"]
    }
  }
}
```

Jeśli plik już istnieje, dodaj tylko wpis `playwright` do `servers`, zachowując inne wpisy. Użyj polecenia **MCP: List Servers** z palety `Ctrl+Shift+P`, wybierz serwer i uruchom go. Potwierdź zaufanie po sprawdzeniu konfiguracji. W Copilot Chat wybierz Agent i sprawdź, czy narzędzia Playwright są dostępne.

**Claude Code:** w terminalu projektu testowego wykonaj:

```sh
claude mcp add --transport stdio --scope local playwright -- npx -y @playwright/mcp@latest --browser msedge --isolated
```

Zacznij nową sesję Claude Code w tym folderze. Poleceniem `/mcp` sprawdź połączenie. W natywnym Windows, jeśli log pokazuje problem uruchamiania `npx`, zastosuj wariant z `cmd /c` opisany w [dokumentacji Claude Code](https://code.claude.com/docs/en/mcp#option-3-add-a-local-stdio-server); nie dodawaj drugiego serwera o tej samej nazwie.

**Szybki test połączenia:** poproś agenta „Użyj Playwright MCP, otwórz URL z kryteria.md i odczytaj nagłówek strony. Niczego jeszcze nie testuj ani nie zmieniaj”. Sprawdź rzeczywiste wywołanie narzędzia i otwarte okno.

**Gdy utkniesz:** sprawdź, czy strona otwiera się ręcznie, czy działa `node --version` i `npx --version`, oraz co mówi log MCP. Jeśli Edge nie jest zainstalowany albo polityka VM blokuje MCP, po 5 minutach przejdź do wariantu bez MCP: sam przejdź scenariusze w przeglądarce, zapisz obserwacje, a agentowi zleć napisanie i uruchomienie testów w kroku 5. Jeśli pobranie Chromium jest zablokowane, ale Edge działa, dodaj `channel: 'msedge'` w `use` konfiguracji testów. Przy braku obu przeglądarek wykonaj próbę w parze na działającej VM. Nie wyłączaj zabezpieczeń VM.

## 4. Zaplanuj badanie, potem pozwól agentowi klikać — 15 min

Dołącz `kryteria.md` i wklej:

```text
Zaplanuj badanie aplikacji wskazanej w kryteria.md.
Wybierz trzy scenariusze z podanych wymagań oraz jeden przypadek graniczny.
Dla każdego podaj kroki i oczekiwany wynik. Na razie nie uruchamiaj
przeglądarki i nie pisz testów. Nie zmieniaj aplikacji. Poczekaj na decyzję.
```

Jeśli masz grill-me, użyj go do podważenia tego planu: jakie błędy przepuści? Czy oczekiwania są wystarczająco konkretne? Odpowiedz na 2–3 pytania i wybierz zakres. Bez skilla omów te pytania z partnerem.

Następnie:

```text
Wykonaj zaakceptowane scenariusze przez Playwright MCP.
Zapisz w obserwacje.md: krok, oczekiwanie, wynik i dowód obserwacji.
Oddziel potwierdzony błąd od nieustalonego wymagania i sugestii wyglądu.
Nie edytuj aplikacji. Nie wymyślaj błędów, jeśli scenariusze przechodzą.
Po badaniu zatrzymaj się przed tworzeniem testów.
```

W wariancie bez MCP przechodzisz scenariusze samodzielnie i zapisujesz wyniki. Nie opisuj tego jako eksploracji wykonanej przez agenta.

## 5. Zamień badanie w trzy testy — 20 min

```text
Na podstawie kryteria.md i obserwacje.md przygotuj trzy niezależne testy
Playwright Test w e2e/ekran.spec.js. Korzystaj z playwright.config.mjs.
Każdy test zaczyna od page.goto('/'). Co najmniej jeden sprawdza wynik
po interakcji, np. konkretne wiersze i ich liczbę, a nie sam przycisk.
Preferuj getByRole i getByLabel. Nie stosuj sztywnych opóźnień.
Nie zmieniaj aplikacji ani oczekiwań, żeby test przeszedł.
Uruchom testy i pokaż faktyczny wynik. Przy błędzie zatrzymaj się z diagnozą.
```

Dla demo wybierz: **dane początkowe**, **filtr przekroczeń**, **wyszukiwanie bez wyników i wyczyszczenie filtrów**. Każdy test ustawia swój stan od nowa. Obejrzyj oczekiwania w kodzie: czy test rzeczywiście sprawdza wartości z tabeli?

W terminalu projektu testowego:

```sh
npx playwright test --headed
npx playwright show-report
```

Raport otwiera się w przeglądarce. Wejdź w wynik testu i otwórz **Trace**: sprawdź akcje, stan strony i moment weryfikacji. To zapis przebiegu testu, nie nagranie wcześniejszej rozmowy z MCP. Polecenie `show-report` zatrzymasz przez `Ctrl+C`.

## 6. Sprawdź, czy test potrafi wykryć usterkę — 15 min

Zapisz kopię pliku, który będziesz zmieniać, albo pracuj w osobnej kopii aplikacji. Wybierz **jedną odwracalną zmianę**: np. filtr „Tylko przekroczenia” zaczyna przepuszczać wszystkich. Nie zmieniaj testu.

Dla dołączonego demo otwórz `cwiczenia/cw16b/demo/index.html` w repo ćwiczeń. W funkcji `render` zamień fragment `(!exceeded.checked || r.wykorzystanie > r.limit)` na `true`. Zapisz plik. Serwer odczytuje go przy każdym wejściu, więc nie wymaga restartu.

1. Uruchom ponownie testy w projekcie `proba-playwright`. Co najmniej jeden powinien wykryć zmianę zachowania.
2. W raporcie wskaż oczekiwanie, które zawiodło. Błąd połączenia lub składni nie dowodzi wykrycia usterki filtra.
3. Przywróć **tylko własną zmianę** i uruchom testy ponownie. Nie wykonuj resetu całego repo.
4. Jeśli test pozostał zielony mimo usterki, popraw jego sprawdzenie według kryteriów i powtórz próbę.

**Gotowe:** trzy testy, raport z trace oraz sekwencja „poprawna aplikacja: zielono → zepsuta funkcja: czerwono → przywrócona funkcja: zielono”. Pokaż partnerowi, czego testy nadal nie sprawdzają.

**Dla szybszych — kolejne 20–30 min:** dodaj test przy szerokości 390 px, przejście formularza klawiaturą albo weryfikację komunikatu błędu. Możesz też stworzyć agenta recenzującego testy: ma szukać fałszywego poczucia pewności, a nie dopisywać losowe przypadki.

Źródła: [Playwright MCP](https://github.com/microsoft/playwright-mcp), [MCP w VS Code](https://code.visualstudio.com/docs/agent-customization/mcp-servers), [instalacja Playwright Test](https://playwright.dev/docs/intro), [Trace Viewer](https://playwright.dev/docs/trace-viewer-intro).

[Spis ćwiczeń](../../CWICZENIA.md) · [Drugie ćwiczenie ratunkowe: centrum dowodzenia](../cw17b/README.md)
