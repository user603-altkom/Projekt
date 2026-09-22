# Review przez CLI: jeden wzorzec, GitHub i GitLab bez Duo

**30 min · Copilot CLI i `gh`, opcjonalnie `glab` · praca w klonie szablonu projektu końcowego**

**Cel:** uruchomić rutynę review z terminala na sucho, wskazać w skrypcie trzy kroki wzorca i wiedzieć, czego brakuje, żeby ten sam wzorzec działał na GitLabie banku bez Duo.

## Start

Rutyna czyta reguły z `.github/instructions/review.instructions.md` w katalogu, w którym ją uruchamiasz. Ten plik jest w szablonie projektu końcowego, więc sklonuj go już teraz (to krok 1 setupu [cw19b](../../cwiczenia/cw19b/README.md), resztę zrobisz o 11:50):

```sh
git clone --origin szablon https://github.com/agentGreg/harmonogram-polstr-szablon.git harmonogram-polstr
cd harmonogram-polstr
gh auth status
copilot --version
```

Skrypty są w `skrypty/`: `review-pr.sh` (bash: macOS, Linux, Git Bash; GitHub), `review-pr.ps1` (Windows PowerShell; GitHub) i `review-mr.ps1` (Windows PowerShell; GitLab). Ich kopie do czytania i do zabrania do innych projektów leżą w tym repo w [materialy/sdlc/skrypty/](skrypty/). Bez Copilot CLI: przeczytaj skrypt i przykładowy wynik niżej; kroki 2, 4 i 5 wykonasz bez uruchamiania.

## 1. Rutyna na sucho na publicznym PR

Publiczny PR prowadzącego: [agentGreg/harmonogram-polstr-szablon#1](https://github.com/agentGreg/harmonogram-polstr-szablon/pull/1). Ćwiczymy w trybie na sucho, żeby dwadzieścia osób nie zasypało PR prowadzącego komentarzami: review trafia na ekran i do `.work/review/review-1.md`, nic nie jest publikowane.

```sh
skrypty/review-pr.sh agentGreg/harmonogram-polstr-szablon 1 --dry-run
```

```powershell
.\skrypty\review-pr.ps1 agentGreg/harmonogram-polstr-szablon 1 -DryRun
```

Przykładowy wynik z 22.09 (bash na macOS, 10 s w Copilot CLI, skrócony):

```text
BŁĄD: src/index.ts:34, podwójne zaokrąglanie: Math.round(rata * 100) zaokrągla do grosza,
      a zewnętrzne Math.round(...) to drugie zaokrąglenie tej samej wielkości (reguła 2).
RYZYKO: src/index.ts:42, wpis.od < dzien to porównanie ostre, brak testu granicznego (reguła 6).
STYL: src/index.ts:32, nazwa q łamie konwencję nazw domenowych po polsku (reguła 4).
Werdykt: do poprawy.
```

Porównaj z review Copilota widocznym w PR w przeglądarce, jeśli tam jest. Ta sama uwaga o podwójnym zaokrągleniu w obu miejscach to dobry znak: reguła 2 działa i w rutynie, i w automatycznym review.

## 2. Przeczytaj skrypt: trzy kroki wzorca

Otwórz `skrypty/review-pr.sh` albo `.ps1` i wskaż trzy kroki. Wszystko poza nimi to obsługa błędów, kodowanie i plik roboczy.

1. Pobierz diff: `gh pr diff [-R owner/repo] N`.
2. Oceń z regułami: prompt = instrukcja + reguły z `review.instructions.md` (bez frontmattera) + diff; `copilot -p "$PROMPT" -s --deny-tool write --deny-tool shell --disable-builtin-mcps`.
3. Opublikuj: `gh pr comment N --body-file .work/review/review-N.md`; w trybie na sucho ten krok zastępuje wypisanie na ekran.

Ten sam wzorzec działa dla GitLaba: zmieniają się tylko kroki 1 i 3 (`glab mr diff`, `glab mr note`). Krok 2 jest identyczny.

## 3. Podmień reguły na swoje z cw10b

Otwórz `.github/instructions/review.instructions.md`. Pod komentarzem „Uczestnik: dopisz tutaj reguły..." dopisz reguły ze swojego recenzenta z [cw10b](../../cwiczenia/cw10b/README.md), numerując od 7. Źródło w tym repo: [recenzent.agent.md](recenzent.agent.md) i Twój `.github/agents/recenzent-limity.agent.md`. Na przykład: „7. Każda uwaga ma plik, warunek, skutek i mały przykład; uwaga bez przykładu to STYL, nie BŁĄD" oraz „8. Oddziel potwierdzony błąd od hipotezy; hipotezę oznacz jako RYZYKO z pytaniem o test".

Skopiuj pierwszy wynik pod inną nazwą (`cp .work/review/review-1.md .work/review/review-1-przed.md`), uruchom rutynę ponownie i porównaj oba pliki. Co się zmieniło w uwagach, co w werdykcie? Ten sam plik reguł czyta automatyczne review Copilota na PR w Twoim repo projektu końcowego (z gałęzi PR), więc od popołudnia zmiana działa w obu miejscach.

## 4. Pułapki

- Copilot CLI ignoruje stdin, gdy podano `-p`. `gh pr diff 1 | copilot -p "zrecenzuj"` nie przekaże diffu; diff musi być w treści promptu albo w pliku, o którego odczyt prosisz.
- Windows ogranicza linię poleceń do ok. 32 000 znaków. Skrypty `.ps1` zawsze zapisują prompt z regułami i diffem do `.work/review/prompt-N.md` i proszą Copilota o odczyt tego pliku, bo PowerShell 5.1 nie escapuje cudzysłowów w argumentach programów, a shim `.cmd` Copilota tnie argumenty z nową linią. Duży PR to i tak zły kandydat na jedno review.
- `--deny-tool write --deny-tool shell` odbiera recenzentowi zapis plików i shell, `--disable-builtin-mcps` wyłącza wbudowany serwer MCP GitHuba, żeby review nie „pomagało", publikując komentarz samo. Deny wygrywa z allow. Bez tych flag recenzent może poprawić kod zamiast go ocenić.
- Wynik to tekst modelu. Przed publikacją przeczytaj go; tryb na sucho przydaje się też przed publikacją na własnym PR.

## 5. Wariant GitLab, bez Duo

```powershell
glab auth login --hostname <gitlab banku>
glab mr diff <N> --raw
.\skrypty\review-mr.ps1 <N> -DryRun
glab mr note <N> -m "<treść>"
```

`review-mr.ps1` to ten sam skrypt z podmienionymi krokami 1 i 3. Nie był uruchamiany na firmowym GitLabie; założenia do sprawdzenia są spisane w nagłówku skryptu (self-hosted przez `--hostname`, wieloliniowy Markdown w `glab mr note -m`, w razie problemu `glab api projects/:id/merge_requests/N/notes -f body=@plik`). Pokaz prowadzącego na MR w gitlab.com: [INTEGRACJE.md](INTEGRACJE.md).

Co trzeba w firmowym GitLabie, żeby to działało:

- `glab` na stacji developera i logowanie do instancji banku,
- polityka użycia Copilot CLI: czy wolno, z jakimi flagami, gdzie zostają logi i prompty,
- decyzja, kto i kiedy uruchamia: developer przed MR (najprościej i od razu), zadanie harmonogramowane na otwarte MR (drugi krok), runner CI (Copilot CLI w GitHub Actions jest oficjalnie wspierany, w GitLab CI to teren nieudokumentowany, do przetestowania poza warsztatem).

**Gotowe:** masz na ekranie review na sucho z własnymi regułami, potrafisz pokazać w skrypcie trzy kroki wzorca i wiesz, czego brakuje, żeby uruchomić to na GitLabie banku.

**Dla szybszych:** w kopii skryptu zamień `copilot -p` na `claude -p`. Claude Code czyta stdin, więc potok z diffem działa; flagi ograniczające narzędzia sprawdź w `claude --help`. Porównaj uwagi obu recenzentów na tym samym diffie.

Źródła:

- https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/run-cli-programmatically (tryb `-p`, stdin, `-s`)
- https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools (`--allow-tool`, `--deny-tool`)
- https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli-in-actions (Copilot CLI w GitHub Actions)
- https://gitlab.com/gitlab-org/cli (glab)

[Spis ćwiczeń i kolejność](../../CWICZENIA.md) · [Plan dnia 3](../../DZIEN-3.md) · [cw19b](../../cwiczenia/cw19b/README.md)
