# Przejmujemy aplikację Franka

Franek odszedł z zespołu. Zostawił działające rozliczenia, kilka skrótów i obietnicę ekranu dla operatorów. Przez trzy dni przejmiesz system i dostarczysz fragment tego ekranu. Franek, wiadomości i wszystkie dane są fikcyjne.

## Zanim zaczniemy

Sprawdź Node **24 lub nowszy**, Git i logowanie Copilota w VS Code. SQLite używa wbudowanego modułu Node; nie potrzeba Dockera. GitHub Enterprise i plan Copilota to osobne rzeczy — sprawdź faktyczne uprawnienia konta. Dostęp do Claude Design sprawdzamy osobno w przeglądarce, sama aplikacja Claude nie jest potwierdzeniem dostępu.

W terminalu Git Bash, w katalogu repozytorium (w PowerShell używaj `npm.cmd`, jeśli polityka blokuje `npm.ps1`):

```sh
node scripts/doctor.mjs
npm ci
npm test
npm run typecheck
git switch -c warsztat/franek
npm run operator
```

Otwórz **http://127.0.0.1:4173**. Zostaw serwer w jednym terminalu; testy uruchamiaj w drugim. Po zmianie TypeScript zatrzymaj serwer Ctrl+C i uruchom ponownie. Po zmianie HTML/JS/CSS odśwież stronę.

Jeżeli masz ZIP bez `.git`, przed `git switch` wykonaj `git init`, `git add .`, `git commit -m "Punkt startowy"`. Ustaw lokalnie nazwę i email Git, jeśli poprosi. Gałąź tworzysz **raz na całe szkolenie**. Jeśli już istnieje, użyj `git switch warsztat/franek`. Nie wracamy między ćwiczeniami na `main`.

## Mapa trzech dni

| Dzień | Sprawa Franka | Ćwiczenia | Rezultat |
|---|---|---|---|
| 1 | Co operator miał dostać? | 00 → 01 → 02 → 02b; 09 część A; 03 → 04; 09 część B | Prototyp, działający filtr w Copilocie, kryteria i instrukcje |
| 2 | Czy możemy ufać liczbom? | 05 → 06 → 07 → 08 **albo** 08_sql | Mapa kodu, testy, dowód rozbieżności, mała bezpieczna zmiana |
| 3 | Jak zostawić system następcy? | porownanie → 13 → 10 → mcp → 11 → zadanie_koncowe | Procedura, review, wynik limitów na ekranie, handoff |

Ćw. 12 i `rezerwa/` są dodatkami. Nie musisz ukończyć rozszerzeń, żeby dojść do finału. Ćw. 09 wraca krótkimi fragmentami zamiast jednego wykładu o konfiguracji.

## Jak pracujemy

Copilot jest głównym narzędziem; Claude Design służy do pierwszego prototypu, a Claude Code do kontrolowanego porównania dnia 3. W banku wracasz do zatwierdzonych narzędzi i polityk, nie do dowolnego ustawienia z laboratorium. Korzystamy wyłącznie z syntetycznego repo.

Każde ćwiczenie ma podstawę i rozszerzenie. Najpierw mały wynik, potem dowód: plik, polecenie, test lub kontrprzykład. Poprawna odpowiedź AI też jest wynikiem — nie trzeba na siłę znaleźć halucynacji lub błędu.

Notatki trzymaj w `portfolio/` (katalog celowo ignorowany przez Git). Pliki kodu i współdzielone instrukcje zapisuj w repo. Przed commitem sprawdź `git diff`, dodaj zmienione pliki przez `git add -u`, **nowe pliki dodaj osobno po nazwie**. Nie commituj eksportów, kluczy ani prywatnych notatek.

## Gdy zostaniesz z tyłu

Nie kasuj pracy. Zachowaj notatki i commit albo kopię folderu. Poproś prowadzącego o czysty starter w osobnym katalogu. Finał wymaga startera, kryteriów z briefu i review limitów; naprawa importu ani refaktoryzacja odsetek nie są jego technicznym warunkiem. Starter zawiera już moduł limitów i UI.

`npm test` ma być zielone na starcie. **`npm run odbior` ma wtedy nie przechodzić**: adapter finału jest celowo pusty. Zielone testy obecnego kodu nie oznaczają ukończonej funkcji.
