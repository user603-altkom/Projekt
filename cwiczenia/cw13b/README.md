# cw13b — Własny skill do odbioru zmiany

**45 min · Copilot, opcjonalnie Claude Code**

**Cel:** zamienić powtarzaną procedurę „testy, raport, diff, ograniczenia” w skill, który da się świadomie uruchomić i ocenić.

## 1. Zbuduj skill

Otwórz [szablon SKILL.md](../../materialy/sdlc/odbior-SKILL.md). Utwórz **nowy plik** `.github/skills/odbior-limitow/SKILL.md` i skopiuj treść. Przeczytaj każdy krok i dopasuj go do tego, co rzeczywiście robiłeś. Nie dodawaj automatycznego commita ani push.

Nagłówek `name` identyfikuje skill, `description` mówi, kiedy go używać. Treść określa procedurę i oczekiwany wynik. Skill nie otrzymuje automatycznie dodatkowych uprawnień i nie gwarantuje wykonania kroków.

## 2. Wykonaj próbę

W nowej sesji Copilota wywołaj skill z listy, jeśli jest dostępny, albo poproś:

```text
Użyj skilla odbior-limitow dla laboratorium/limity.
Sprawdź stan i wykonaj opisaną procedurę. Nie edytuj kodu,
nie commituj i nie publikuj. Pokaż komendy i ich rzeczywiste wyniki.
Jeśli nie możesz uruchomić kontroli, oznacz ją jako niewykonaną.
```

Sprawdź widoczny odczyt SKILL.md lub diagnostykę. Następnie porównaj raport z faktycznym wynikiem `node --test laboratorium/limity/test/ocena.node.mjs`. Oczekujesz dowodów, nie samego zdania „wszystko dobrze”.

Jeśli funkcja nie jest ukończona, poprawny skill powinien ujawnić braki. Jeżeli klient nie wykrywa skilla, dołącz plik ręcznie i wykonaj procedurę. Zanotuj, że to wariant ręczny.

## 3. Sprawdź przenośność

Dla Claude Code możesz skopiować skill do **nowego pliku** `.claude/skills/odbior-limitow/SKILL.md`, jeśli nie korzystasz ze wspólnego obsługiwanego katalogu. Nie zakładaj, że konfiguracja Copilota działa bez zmian. Przeprowadź małą próbę odczytu, nie instaluj dwóch kopii w tym samym kliencie.

**Gotowe:** pokaż plik skilla, jego wywołanie i jedną kontrolę z wynikiem. Wyjaśnij, dlaczego to procedura, a nie globalna instrukcja dopisywana do każdego zadania.

**Dla szybszych:** rozszerz skill o odczyt `07-przekazanie.md` i wykrywanie rozbieżności między deklarowanym a rzeczywistym stanem.

Źródła: [Agent Skills w VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills), [skille Claude Code](https://code.claude.com/docs/en/skills).


[Spis ćwiczeń i kolejność](../../CWICZENIA.md) · [Start laboratorium](../../laboratorium/limity/README.md)
