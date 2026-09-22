# cw18b — Pogoda w Warszawie: skill, skrypt, klucz API i hook

**20–30 min · Copilot Agent w VS Code · Node 24**

**Efekt:** na żądanie Copilot uruchamia skrypt i podaje pogodę. Potem dodajesz hook, który pobiera te same dane przy pierwszej wiadomości nowej sesji. Zobaczysz, gdzie kończą się instrukcje dla modelu, a zaczyna wykonywany kod.

| Element | Za co odpowiada? |
| --- | --- |
| Skill | Opisuje procedurę, wskazuje skrypt i sposób przedstawienia wyniku |
| Skrypt Node | Odczytuje klucz, wywołuje API i zwraca wybrane dane |
| Lokalny plik `.env` | Dostarcza wartość credentiala do procesu skryptu |
| Hook `SessionStart` | Uruchamia skrypt przy pierwszym prompcie nowej sesji i przekazuje wynik do kontekstu |

Sam skill nie uruchamia się automatycznie przy otwarciu czatu. Hook nie musi też ładować skilla: w tym przykładzie **skill i hook korzystają z tego samego skryptu**. Pobranie danych jest wykonaniem kodu, natomiast wypowiedzenie powitania przez model nadal zależy od jego odpowiedzi.

## 1. Skopiuj gotowy skill

Utwórz obok repo **nowy folder** `pogoda-demo`, otwórz go w VS Code i utwórz w nim `.github/skills`. Skopiuj cały dostarczony [folder pogoda-warszawa](pogoda-warszawa/) do `.github/skills/` nowego projektu. Zachowaj folder `scripts` w środku.

Docelowo masz:

```text
pogoda-demo/
  .github/
    skills/
      pogoda-warszawa/
        SKILL.md
        scripts/
          pogoda.mjs
```

Wszystkie następne komendy uruchamiaj z głównego folderu **pogoda-demo**. Nie potrzebujesz `npm install`.

Sprawdź skrypt bez konta i bez sieci:

```sh
node .github/skills/pogoda-warszawa/scripts/pogoda.mjs --demo
```

Dostajesz JSON z `demo: true`. To dane demonstracyjne, nie aktualny pomiar. Otwórz [SKILL.md](pogoda-warszawa/SKILL.md) i [skrypt](pogoda-warszawa/scripts/pogoda.mjs): znajdź moment wykonania HTTP oraz odczyt `process.env.WEATHER_API_KEY`.

## 2. Dodaj credential lokalnie

Wejdź na [WeatherAPI.com](https://www.weatherapi.com/), utwórz własne konto, jeśli go nie masz, i pobierz swój klucz z [panelu konta](https://www.weatherapi.com/my/). Do bieżącej pogody wystarczy dostępny [plan Free](https://www.weatherapi.com/pricing.aspx); sprawdź jego aktualne limity. Jeśli nie chcesz zakładać konta podczas zajęć, przejdź do wariantu demonstracyjnego opisanego niżej.

W głównym folderze projektu utwórz `.gitignore` i wpisz:

```gitignore
.env.pogoda.local
```

Następnie skopiuj [env.example](env.example) do głównego folderu projektu **pod nową nazwą `.env.pogoda.local`**. Samodzielnie, w edytorze, uzupełnij:

```dotenv
WEATHER_API_KEY=TU_WPISZ_SWÓJ_KLUCZ
```

Zamknij ten plik przed rozmową z agentem. Nie dołączaj go do czatu, nie wpisuj klucza w prompt ani polecenie terminala. Do repo nadaje się wyłącznie pusty przykład, nigdy Twój klucz. Jeśli projekt jest już repo Git, sprawdź ignorowanie przez `git check-ignore .env.pogoda.local`.

**Co dzieje się technicznie:** `loadEnvFile` z Node odczytuje plik bez dodatkowego pakietu dotenv. Kod pobiera klucz z `process.env` i używa go w żądaniu HTTPS do WeatherAPI. Do stdout trafiają tylko wybrane pola pogody. Zmienna ustawiona wcześniej w środowisku procesu ma pierwszeństwo przed wartością z pliku. Odczyt `.env` w samym skrypcie eliminuje potrzebę restartowania VS Code po ustawieniu klucza.

`.gitignore` zapobiega dodaniu pliku przez zwykłe `git add`; **nie blokuje dostępu agenta do pliku**. Ten przykład pokazuje kontrolę przepływu danych, nie sejf na sekrety. Agent ma uruchomić skrypt, a nie odczytywać wartość credentiala.

## 3. Uruchom skrypt, potem skill

Najpierw w terminalu:

```sh
node .github/skills/pogoda-warszawa/scripts/pogoda.mjs
```

Oczekujesz `ok: true`, temperatury, opisu, czasu pomiaru i źródła. Przy błędzie klucza lub sieci skrypt zwraca krótki komunikat bez wypisywania adresu żądania, który zawiera sekret.

W nowej rozmowie Copilot Agent wywołaj `/pogoda-warszawa`, jeśli jest dostępne na liście `/`, albo napisz:

```text
Użyj skilla pogoda-warszawa. Uruchom dołączony skrypt i powiedz,
jaka jest pogoda w Warszawie. Nie odczytuj pliku z kluczem.
```

Sprawdź odczyt SKILL.md, rzeczywistą komendę i wynik narzędzia. Samo zdanie „użyłem skilla” nie jest dowodem. Jeśli skill nie został wykryty, sprawdź strukturę folderów i rozpocznij nową sesję. Ręczne dołączenie SKILL.md jest wariantem awaryjnym, który należy nazwać.

**Bez konta/API:** poproś „Użyj skilla pogoda-warszawa w trybie demonstracyjnym --demo. Wyraźnie nazwij wynik próbką”. Ten wariant pokazuje uruchomienie skryptu, ale nie sprawdza uwierzytelnienia w zewnętrznym API.

## 4. Dodaj pogodę na początku nowej sesji

Hooki w VS Code są funkcją Preview i mogą być wyłączone przez politykę konta. W tym ćwiczeniu konfigurujesz je tylko w projekcie `pogoda-demo`.

Utwórz `.github/hooks/` i skopiuj [session-start.json.example](session-start.json.example) do tego katalogu **pod nazwą `pogoda.json`**. Konfiguracja wskazuje:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "type": "command",
        "command": "node .github/skills/pogoda-warszawa/scripts/pogoda.mjs --hook"
      }
    ]
  }
}
```

**Bez konta:** do powyższej komendy dopisz `--demo`, po `--hook`. Powitanie musi wtedy mówić o demonstracji, nie o aktualnej pogodzie.

Najpierw uruchom tę komendę ręcznie w terminalu. Wynik powinien zawierać `hookSpecificOutput`, `hookEventName: SessionStart` oraz `additionalContext`. To sprawdza format danych, ale jeszcze nie działanie hooka.

Następnie:

1. Rozpocznij **nową sesję Copilot Agent** w tym projekcie.
2. Wyślij pierwszy prompt: „Przywitaj mnie i zaproponuj jedno małe zadanie programistyczne”.
3. Sprawdź logi hooka w panelu Output → GitHub Copilot Chat Hooks lub przez **Developer: Show Agent Debug Logs**. Oczekujesz uruchomienia skryptu oraz informacji pogodowej w odpowiedzi.
4. Wyślij drugą wiadomość w tej samej sesji. `SessionStart` nie powinien ponownie odpalać skryptu tylko dlatego, że napisałeś kolejną wiadomość.
5. Rozpocznij następną nową sesję i powtórz próbę.

**Ważne rozróżnienie:** zdarzeniem jest wysłanie pierwszego promptu, nie samo otwarcie pustego panelu ani start VS Code. Wynik trafia do kontekstu modelu; nie jest automatycznym toastem ani osobną wiadomością UI.

Jeśli skrypt zadziałał, a model pominął pogodę, nazwij obie obserwacje osobno. Jeśli hooki nie są dostępne na VM, pozostań przy ręcznym wywołaniu skilla — nie przedstawiaj tego jako działającej automatyzacji.

Po demonstracji usuń **tylko utworzony przez siebie** `.github/hooks/pogoda.json`, jeśli nie chcesz pobierania pogody w kolejnych sesjach. Skill może pozostać do używania na żądanie. Usunięcie klucza z lokalnego pliku nie unieważnia go u dostawcy.

**Gotowe:** potrafisz pokazać osobno instrukcję skilla, wykonanie skryptu, ładowanie credentiala bez ujawniania go w czacie oraz wynik próby hooka. Wiesz, które elementy rzeczywiście zadziałały w Twoim środowisku.

Źródła: [skille w VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills), [hooki i SessionStart](https://code.visualstudio.com/docs/agent-customization/hooks), [WeatherAPI — uwierzytelnienie i bieżąca pogoda](https://www.weatherapi.com/docs/), [Node: loadEnvFile](https://nodejs.org/docs/latest-v24.x/api/process.html#processloadenvfilepath).

[Spis ćwiczeń](../../CWICZENIA.md)
