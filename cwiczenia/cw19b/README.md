# cw19b: Harmonogram na POLSTR, projekt końcowy

**20 min setupu przed obiadem + 135 min budowy po obiedzie · Copilot w VS Code (tryb Agent) albo Copilot CLI · spec-kit · własne prywatne repo na GitHubie**

**Cel:** zbudować od zera mały produkt tym samym procesem, który od wtorku ćwiczyliście na kodzie Franka: zgłoszenie, specyfikacja, plan, implementacja fazami, review, testy, wydanie, karta zmiany. Pracujesz sam, w swoim repo.

## Skąd ten projekt

Kod Franka zostaje tam, gdzie go doprowadziliście: z testami, review i notatką dla następcy ([historia Franka](../../historia/franek.md), rozdział „Środa: następca"). Franek prosił o jedno: żeby „zapytaj Franka" przestało być procedurą. Teraz jesteście po drugiej stronie. Budujecie własny kalkulator harmonogramu spłat kredytu na POLSTR 1M i WIBOR 3M od zera, w swoim repo, tym samym procesem. Na koniec dnia to Wy zostawiacie repo, które następca uruchomi bez kontaktu z autorem.

## Start

Szablon startowy: [github.com/agentGreg/harmonogram-polstr-szablon](https://github.com/agentGreg/harmonogram-polstr-szablon) (publiczny, MIT). Zawiera zainicjalizowany spec-kit dla Copilota, szkielet TypeScript z vitest, dane wskaźników, workflow GitHub Actions, reguły review i skrypty rutyny review z terminala. Nie zawiera implementacji.

Kopia zip w tym repo: [harmonogram-polstr-szablon.zip](harmonogram-polstr-szablon.zip). Użyj jej tylko bez dostępu do github.com: rozpakuj do folderu `harmonogram-polstr`, w nim osobno `git init`, `git add -A`, `git commit -m "szablon startowy"` i przejdź do kroku 3. Zip nie zawiera historii gita.

Wymagania: Node 22 lub nowszy, git, VS Code z Copilotem (Business), `gh` zalogowany na github.com (`gh auth status`; jeśli `gh` brakuje: `winget install GitHub.cli`, potem nowy terminal). Python i uv nie są potrzebne. W PowerShell 5.1 wpisuj komendy pojedynczo, `&&` tam nie działa; w Git Bash możesz łączyć.

## 1. Setup, 6 kroków (do 12:10, przed obiadem)

1. Zaloguj `gh`: `gh auth login` (github.com, HTTPS, logowanie w przeglądarce), potem `gh auth setup-git`.
2. Sklonuj szablon: `git clone --origin szablon https://github.com/agentGreg/harmonogram-polstr-szablon.git harmonogram-polstr`, potem `cd harmonogram-polstr`.
3. Załóż własne prywatne repo i wypchnij jedną komendą: `gh repo create harmonogram-polstr --private --source . --remote origin --push`. Zapas, gdy komenda odmówi: puste prywatne repo w www, `git remote add origin <url>`, `git push -u origin main`.
4. Sprawdź Actions: `gh run list`, workflow „Testy" ma być zielony po chwili. Jeśli organizacja ma wyłączone Actions, pomiń ten krok.
5. Lokalnie, osobno: `npm install`, `npm test`, `npm run typecheck`.
6. Gałąź na specyfikację: `git switch -c spec-mvp`

Zielone Actions na pustym projekcie przed obiadem to bramka 0. Problemy z kontem, Actions czy polityką rozwiązujesz w przerwie, nie w czasie budowy. Klon i własne repo zamiast forka: fork ciągnie za sobą historię i uprawnienia szablonu, a Ty masz zostawić repo, które jest w całości Twoje. Przy pierwszym PR sprawdź, czy lista Reviewers zawiera Copilota; jeśli nie, powiedz prowadzącemu i użyj rutyny `skrypty/review-pr.ps1`.

## 2. Przeczytaj kartę i brief (kickoff 13:07)

W sklonowanym repo: `KARTA.md` (bramki z checkboxami, dokładne prompty do komend spec-kit, komendy git i gh, gwiazdki, zasada awaryjna) i `BRIEF.md` (zgłoszenie z biznesu, zakres MVP, minimalny zestaw testów, liczba kontrolna). Tu tylko skrót bramek:

- Bramka 1, 14:00: constitution, spec, plan i tasks w repo; PR #1 z artefaktami zmergowany po review Copilota.
- Bramka 2, 15:00: testy zielone lokalnie i w Actions, co najmniej jeden PR z implementacją zmergowany po review, liczba kontrolna z BRIEF.md się zgadza, MVP w main z tagiem `v0.1.0`.
- Bramka 3, 15:45: karta zmiany wdrożona w kolejności test, poprawka, PR, review, merge; tag `v0.2.0`.
- Zasada awaryjna: jeśli o 14:45 nie masz zielonych testów, zmniejsz zakres do rat równych bez nadpłat i idź do review z tym, co masz.

## 3. Specyfikacja i plan (13:20 do 14:00)

Komendy spec-kit wpisujesz w czacie Copilota (Agent) albo w Copilot CLI, w tej kolejności:

1. `/speckit-constitution`
2. `/speckit-specify`
3. `/speckit-plan`
4. `/speckit-tasks`
5. `/speckit-implement` (dopiero po bramce 1)

Opcjonalnie, gdy zostaje czas: `/speckit-clarify` przed planem, `/speckit-analyze` przed implementacją, `/speckit-converge` po niej. Prompty do każdej komendy są w `KARTA.md`.

Uwaga: w spec-kit 1.0 `/speckit-specify` nie tworzy gałęzi. Gałąź `spec-mvp` zrobiłeś sam w kroku 6 setupu; artefakty trafią do `specs/001-<nazwa>/`. Po `tasks` sprawdź, czy `tasks.md` ma fazy i czy pierwsza faza z kodem to domena z testami. Potem commit, push, `gh pr create --fill --reviewer "@copilot"`, review, merge. To bramka 1.

## 4. Implementacja faza po fazie (14:00 do 15:00)

Zasada dnia: jedna faza z `tasks.md` to jedna gałąź i jeden PR. Przed kolejną fazą:

```sh
git switch -c faza-3-rowne-raty
git add -A
git commit -m "faza 3: raty rowne przy stalej stopie, z testami"
git push -u origin faza-3-rowne-raty
gh pr create --fill --reviewer "@copilot"
```

Przeczytaj review Copilota. Każdą uwagę zamknij poprawką albo krótkim uzasadnieniem odmowy w komentarzu. Merge (`gh pr merge --squash --delete-branch`), powrót na `main`, `git pull`, dopiero wtedy `/speckit-implement` dla następnej fazy. Prompt do `implement` brzmi: „Wykonaj tylko fazy 1 do 3 z tasks.md, zatrzymaj się i pokaż diff", potem „Wykonaj tylko fazę 4" i tak dalej. Spec-kit numeruje fazy tak: 1 Setup (u Ciebie pusta, szkielet już jest), 2 Fundamenty, 3 pierwsza historia użytkownika. Review Copilota przychodzi po ok. 3 minutach, zobaczysz je w przeglądarce (`gh pr view --web`); `gh pr view` pokaże Copilota dopiero po nadejściu review, a na PR z samymi plikami .md uwag często nie ma. Jeśli chcesz mieć drugą opinię przed publikacją PR, uruchom rutynę review z terminala na sucho: `skrypty/review-pr.sh <numer> --dry-run` albo `.\skrypty\review-pr.ps1 <numer> -DryRun` ([opis rutyny](../../materialy/sdlc/REVIEW-CLI.md)).

Gdy MVP jest w `main` i testy są zielone: `git tag v0.1.0`, potem `git push --tags`. To bramka 2.

## 4b. Tor równoległy: ekran w Claude Design (od 14:00)

Gdy agent implementuje fazy 1 do 3, Ty projektujesz ekran kalkulatora w Claude Design (claude.ai/design, konto szkoleniowe, jak w [cw00](../cw00/README.md)). Gotowy prompt jest w KARTA.md w sekcji „Tor równoległy”: formularz parametrów, przycisk „Policz”, wyniki i tabela rat, jeden plik HTML bez frameworka, dane z `GET /api/harmonogram`. Popraw jedną rzecz po pierwszej wersji, wyeksportuj HTML i zapisz jako `ui/index.html` w swoim repo.

Faza 4 to podpięcie ekranu do logiki: agent dodaje `src/server.ts` na `node:http` (pliki statyczne z `ui/` i endpoint JSON), skrypt `npm run ui`, port 4180. Prompt dla agenta też jest w KARTA.md. Sprawdź w przeglądarce na liczbie kontrolnej, potem PR jak przy każdej fazie. Jeśli o 14:50 ekran nie działa, taguj `v0.1.0` bez niego i wróć do ekranu po karcie zmiany. Na demo pokazujesz ekran, a CLI tylko wtedy, gdy ekranu nie ma.

## 5. Karta zmiany (15:10 do 15:45)

O 15:10 wybierasz jedną kartę z [karty_zmian.md](karty_zmian.md): CR-A (łatwa), CR-B (średnia) albo CR-C (trudna). Plik pojawia się w tym repo o 15:00, po `git pull`; wcześniej go tu nie ma, bo zgłoszenia przychodzą w trakcie dnia. Każda karta ma treść zgłoszenia, kryteria akceptacji, przypadek testowy z liczbami i pięć kroków procesu: czerwony test, poprawka, PR, review, merge z tagiem `v0.2.0`. To bramka 3.

**Gotowe:** własne repo z zielonym CI, ekran z Claude Design podpięty do logiki (albo świadoma decyzja, że wejdzie po karcie zmiany), tagi `v0.1.0` i `v0.2.0`, PR-y z artefaktami, implementacją i kartą zmiany zmergowane po review Copilota, liczba kontrolna z BRIEF.md potwierdzona testem. O 15:45 trzech ochotników pokazuje po 5 minut: aplikację z CLI, PR z review i to, co poprawili po uwagach.

## Pomoc

- `--reviewer "@copilot"` nie działa przy tworzeniu PR: `gh pr edit <numer> --add-reviewer "@copilot"`, w ostateczności panel Reviewers w przeglądarce.
- Actions czerwone na pustym szablonie: sprawdź, czy organizacja pozwala na Actions w prywatnych repo; lokalnie `npm run typecheck` i `npm test` muszą być zielone, workflow robi to samo na Node 22.
- PowerShell odmawia uruchomienia skryptów `.ps1` spec-kita: raz `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- Liczba kontrolna się nie zgadza: sprawdź zamianę procentu na ułamek, dzielenie stopy rocznej przez 12 i miejsce zaokrąglania (BRIEF.md).
- Za mało czasu: zasada awaryjna z bramek. Mały zakres z review i mergem jest lepszy niż duży bez.

## Dla osób z Claude Code

Superpowers zamiast spec-kit: `/plugin install superpowers` (pełna nazwa pakietu i uwagi w [cw15b](../cw15b/README.md)), potem skille `brainstorming` na BRIEF.md, `writing-plans` i `executing-plans` z `test-driven-development`. Claude Code czyta `CLAUDE.md`, nie `AGENTS.md`; jedna linia `@AGENTS.md` w nowym `CLAUDE.md` załatwia konwencje projektu. Bramki, PR na fazę, `gh pr create --fill --reviewer "@copilot"` i tagi są te same: review Copilota działa na każdym PR w Twoim repo, niezależnie od tego, który agent napisał kod.

## Dalej

Gwiazdki po MVP są w `KARTA.md`. Dwie z nich to skrót kart rezerwowych dnia 3: hook pre-commit z testami ([cw14b](../cw14b/README.md)) i skill „odbiór" ([cw13b](../cw13b/README.md)).

[Spis ćwiczeń i kolejność](../../CWICZENIA.md) · [Plan dnia 3](../../DZIEN-3.md) · [Review przez CLI](../../materialy/sdlc/REVIEW-CLI.md)
