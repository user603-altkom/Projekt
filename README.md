# szkolenie-ai-rejestr-rozliczen

Repozytorium ćwiczeniowe do trzydniowego szkolenia z AI w pracy programisty. Udaje zastany system rozliczeniowy: rejestr transakcji, naliczanie odsetek, raport dzienny i schemat księgowania operacji.

**Wszystko w `dane/` jest zmyślone.** Numery rachunków mają nieistniejący kod banku i niepoprawne cyfry kontrolne, nazwiska i firmy nie istnieją, zgłoszenia klientów zostały napisane na potrzeby ćwiczeń. Żaden plik w tym repozytorium nie pochodzi z systemu produkcyjnego ani z żadnej instytucji finansowej. To materiał dydaktyczny, nie aplikacja.

## Nowa ścieżka: historia Franka

**Zacznij od [START.md](START.md).** Tam są kolejność zadań, wspólna gałąź i ekran operatora. We wtorek podłączasz własny ekran do obliczeń, w środę rozwijasz go o nową funkcję. Aktualna kolejność: [dzień 2](DZIEN-2.md), [dzień 3](DZIEN-3.md). Przed pobraniem zmian: [bezpieczna aktualizacja](PRACA-WARSZTATOWA.md).

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
- `npm run ksiegowanie` - pokazuje, którą regułą schematu księgowania poszła każda operacja

Ścieżka SQL (potrzebna tylko do jednego ćwiczenia, opis w `sql/lokalnie/README.md`):

- `npm run sql:setup` - buduje lokalną bazę SQLite, bez instalowania czegokolwiek
- `npm run sql:raport` - uruchamia raport obrotów, mierzy czas i sprawdza liczby

## Co leży w `dane/`

Wszystkie pliki łączą się po kolumnie `nr_rachunku`, więc dają się zestawiać ze sobą.

| Plik | Co zawiera |
|---|---|
| `wyciag_2026_08.csv` | 400 operacji za sierpień, z sumą kontrolną w nagłówku |
| `wyciag_probka.csv` | 23 operacje, celowo różnorodne formaty - materiał do testów importu |
| `rachunki.csv` | katalog 24 rachunków: nazwa klienta, segment, produkt, oddział, status |
| `karty_platnicze.csv` | 40 kart wydanych do tych rachunków, z limitami i statusami |
| `przelewy_zaplanowane.csv` | 37 zleceń na wrzesień i październik, jednorazowych i cyklicznych |
| `odsetki_przypadki.json` | 20 wejść do naliczania odsetek, bez oczekiwanych wyników |
| `aplikacja.log` | log aplikacji za okres 13-21.08 |
| `zgloszenie_klienta.md`, `zgloszenie_limity.md` | zgłoszenia do ćwiczeń |

Numery rachunków w katalogu, kartach i zleceniach to **te same numery**, które występują w wyciągu. Produkt w `rachunki.csv` jest wyprowadzony z tej samej cyfry numeru NRB, którą czyta `src/routing/`.

## Windows

Uczestnicy pracują na Windowsie z Git for Windows i PowerShell 7 - **używaj Git Bash** jako domyślnego terminala do poleceń z tego repo (`npm ci`, `npm test`, `git ...`).

Jeśli PowerShell odmawia uruchomienia `npm` błędem w stylu *"running scripts is disabled on this system"* (ExecutionPolicy blokuje skrypty), masz dwie opcje:

1. Przełącz się na Git Bash (zalecane), albo
2. W PowerShellu wywołuj `npm.cmd` zamiast `npm`, np. `npm.cmd ci`.

Jeśli jesteś za firmowym proxy z inspekcją TLS i `npm ci` albo `doctor` zgłaszają błąd certyfikatu - `node scripts/doctor.mjs` wypisze gotową do skopiowania instrukcję ustawienia `NODE_EXTRA_CA_CERTS`.

## legacy-java/

Katalog `legacy-java/` jest **wyłącznie do czytania**. Nikt tego nie kompiluje ani nie uruchamia - to punkt odniesienia (kod, z którego przeportowano jeden z modułów TypeScript), a nie część projektu node.

## Wymagania

- Node.js 24 lub nowszy
- Git
