# Przejmujemy aplikację Franka

Franek odszedł z zespołu. Zostawił działające rozliczenia, kilka skrótów i obietnicę ekranu dla operatorów. Przez trzy dni przejmiesz system i dostarczysz fragment tego ekranu. Franek, wiadomości i wszystkie dane są fikcyjne.

## Zanim zaczniemy

Ćw. 00 wykonujesz w Claude Design i nie wymaga ono jeszcze repo. Poniższe przygotowanie musi być zakończone przed ćw. 01. Jeśli VM jest już przygotowana, sprawdź istniejący folder zamiast klonować drugą kopię.

Jeżeli repo jeszcze nie ma, w Git Bash przejdź do folderu na ćwiczenia i wykonaj:

```sh
git clone https://gitlab.com/agentGreg/szkolenie-ai-rejestr-rozliczen.git szkolenie-ai-pko
cd szkolenie-ai-pko
```

W VS Code wybierz **File → Open Folder / Plik → Otwórz folder** i wskaż folder zawierający `package.json`, `src` oraz `operator`. Nie otwieraj tylko folderu pojedynczego ćwiczenia. Terminal otwieraj w tym samym katalogu głównym; wszystkie komendy poniżej wykonujesz właśnie tam.

Sprawdź Node **24 lub nowszy**, Git i logowanie Copilota w VS Code. SQLite używa wbudowanego modułu Node; nie potrzeba Dockera. GitHub Enterprise i plan Copilota to osobne rzeczy — sprawdź faktyczne uprawnienia konta. Dostęp do [Claude Design](https://claude.ai/design) sprawdzamy osobno w przeglądarce, sama aplikacja Claude nie jest potwierdzeniem dostępu.

W terminalu Git Bash, w katalogu repozytorium (w PowerShell używaj `npm.cmd`, jeśli polityka blokuje `npm.ps1`):

```sh
node scripts/doctor.mjs
npm ci
npm test
npm run typecheck
git switch -c warsztat/franek
git config --local user.name "Uczestnik Warsztatu"
git config --local user.email "uczestnik@example.com"
npm run operator
```

Otwórz **http://127.0.0.1:4173**. Zostaw serwer w jednym terminalu; testy uruchamiaj w drugim. Po zmianie TypeScript zatrzymaj serwer Ctrl+C i uruchom ponownie. Po zmianie HTML/JS/CSS odśwież stronę.

Jeżeli masz ZIP bez `.git`, przed `git switch` wykonaj `git init`, ustaw powyższymi komendami lokalną nazwę i email, następnie wykonaj `git add .` oraz `git commit -m "Punkt startowy"`. To fikcyjna tożsamość do ćwiczeń, ustawiona tylko w tym repo. Jeśli Git później poprosi o tożsamość, ponownie wykonaj obie komendy `git config --local`. Gałąź tworzysz **raz na całe szkolenie**. Jeśli już istnieje, użyj `git switch warsztat/franek`. Nie wracamy między ćwiczeniami na `main`.

## Pierwszy czat i notatki — pomoc na dzień 1

- Otwórz **Copilot Chat w VS Code** w folderze tego repo. W ćw. 01, 02, 03 i 04 pytasz i analizujesz; użyj Ask, jeśli jest dostępny, i nie zlecaj edycji. W ćw. 02b świadomie przechodzisz do Agent. Nazwy trybów mogą zależeć od wersji i polityki konta.
- **Dodaj wskazane pliki do kontekstu:** użyj Add Context / Dodaj kontekst i wybierz pliki albo wpisz `#` i wybierz plik z listy. Możesz też przeciągnąć plik z panelu Explorer do czatu. Sprawdź, czy pojawiło się dołączenie. Sam tekst ścieżki nie jest potwierdzeniem odczytu.
- Gdy nie działa wybór pliku, otwórz go w edytorze i wklej potrzebny fragment z nazwą pliku. Kopiuj tylko materiał wskazany w ćwiczeniu. Jeśli fragment nie wystarcza, oznacz brak kontekstu; nie zgaduj reszty.
- **Nowy czat** oznacza nową rozmowę, nie kolejną wiadomość w tym samym wątku. W porównaniach ponownie dołącz wskazane pliki i zachowaj wybrany model. Bieżące repo i instrukcje mogą nadal dostarczać kontekst — nowy czat nie usuwa konfiguracji projektu.
- Aby otworzyć plik po ścieżce, użyj **Ctrl+P**, wpisz np. `operator/app.js` i wybierz wynik. Zmiany zapisuj **Ctrl+S**.
- W głównym folderze repo utwórz katalog **`portfolio`** i zapisuj w nim pliki `.md` o nazwach podanych w kartach. Markdown to zwykły tekst; wystarczą nagłówki i punkty. Katalog jest ignorowany przez Git, więc notatki nie pojawią się w `git status` — to zamierzone.
- Po ćwiczeniu z samymi notatkami **nie robisz commita**. Po zmianie kodu lub instrukcji karta podaje konkretne pliki do dodania. Nie wypychaj rozwiązań uczestnika do wspólnego `main`.

Dodawanie plików opisuje [oficjalna dokumentacja kontekstu VS Code](https://code.visualstudio.com/docs/chat/copilot-chat-context).

## Mapa trzech dni

| Dzień | Sprawa Franka | Ćwiczenia | Rezultat |
|---|---|---|---|
| 1 | Co operator miał dostać? | 00 → 01 → 02 → 02b; 09 część A; 03 → 04; 09 część B | Prototyp, działający filtr w Copilocie, kryteria i instrukcje |
| 2 | Czy możemy ufać liczbom? | 05 → 06 → 07 → 08 **albo** 08_sql | Mapa kodu, testy, dowód rozbieżności, mała bezpieczna zmiana |
| 3 | Jak zostawić system następcy? | porownanie → 13 → 10 → mcp → 11 → zadanie_koncowe | Procedura, review, wynik limitów na ekranie, handoff |

**Dodatkowy blok dnia 1 po ćw. 03:** [Ćw. 03b — Presidio: demo i lokalna anonimizacja z Agentem](cwiczenia/cw03b/README.md), 45 min. Prowadzący wskazuje jego miejsce względem ćw. 04; nie jest warunkiem kolejnych zadań.

Ćw. 12 i `rezerwa/` są dodatkami. Nie musisz ukończyć rozszerzeń, żeby dojść do finału. Ćw. 09 wraca krótkimi fragmentami zamiast jednego wykładu o konfiguracji.

## Jak pracujemy

Copilot jest głównym narzędziem; Claude Design służy do pierwszego prototypu, a Claude Code do kontrolowanego porównania dnia 3. W banku wracasz do zatwierdzonych narzędzi i polityk, nie do dowolnego ustawienia z laboratorium. Korzystamy wyłącznie z syntetycznego repo.

Każde ćwiczenie ma podstawę i rozszerzenie. Najpierw mały wynik, potem dowód: plik, polecenie, test lub kontrprzykład. Poprawna odpowiedź AI też jest wynikiem — nie trzeba na siłę znaleźć halucynacji lub błędu.

Notatki trzymaj w `portfolio/` (katalog celowo ignorowany przez Git). Pliki kodu i współdzielone instrukcje zapisuj w repo. Przed commitem sprawdź `git diff`, dodaj zmienione pliki przez `git add -u`, **nowe pliki dodaj osobno po nazwie**. Nie commituj eksportów, kluczy ani prywatnych notatek.

## Gdy zostaniesz z tyłu

Nie kasuj pracy. Zachowaj notatki i commit albo kopię folderu. Poproś prowadzącego o czysty starter w osobnym katalogu. Finał wymaga startera, kryteriów z briefu i review limitów; naprawa importu ani refaktoryzacja odsetek nie są jego technicznym warunkiem. Starter zawiera już moduł limitów i UI.

`npm test` ma być zielone na starcie. **`npm run odbior` ma wtedy nie przechodzić**: adapter finału jest celowo pusty. Zielone testy obecnego kodu nie oznaczają ukończonej funkcji.
