# szkolenie-ai-rejestr-rozliczen

Repozytorium ćwiczeniowe do trzydniowego szkolenia z AI w pracy programisty. **Dane w `dane/` są syntetyczne** (żadnych prawdziwych danych osobowych ani rachunków) - to materiał do ćwiczeń, nie produkcyjna aplikacja.

## Start

**Krok 0, przed czymkolwiek innym** - sprawdź środowisko (nie wymaga instalacji niczego):

```
node scripts/doctor.mjs
```

Jeśli `doctor` zgłosi błędy, napraw je najpierw - podpowiada dokładnie co zrobić. Dopiero potem:

```
npm ci && npm test
```

Codzienna praca:

- `npm test` - uruchamia wszystkie testy jednorazowo
- `npm run test:watch` - testy w trybie obserwacji
- `npm run typecheck` - sprawdzenie typów bez kompilacji
- `npm run raport` - generuje raport dzienny z `dane/wyciag_2026_08.csv`

## Windows

Uczestnicy pracują na Windowsie z Git for Windows i PowerShell 7 - **używaj Git Bash** jako domyślnego terminala do poleceń z tego repo (`npm ci`, `npm test`, `git ...`).

Jeśli PowerShell odmawia uruchomienia `npm` błędem w stylu *"running scripts is disabled on this system"* (ExecutionPolicy blokuje skrypty), masz dwie opcje:

1. Przełącz się na Git Bash (zalecane), albo
2. W PowerShellu wywołuj `npm.cmd` zamiast `npm`, np. `npm.cmd ci`.

Jeśli jesteś za firmowym proxy z inspekcją TLS i `npm ci` albo `doctor` zgłaszają błąd certyfikatu - `node scripts/doctor.mjs` wypisze gotową do skopiowania instrukcję ustawienia `NODE_EXTRA_CA_CERTS`.

## legacy-java/

Katalog `legacy-java/` jest **wyłącznie do czytania**. Nikt tego nie kompiluje ani nie uruchamia - to punkt odniesienia (kod, z którego przeportowano jeden z modułów TypeScript), a nie część projektu node.

## Wymagania

- Node.js 20 lub nowszy
- Git
