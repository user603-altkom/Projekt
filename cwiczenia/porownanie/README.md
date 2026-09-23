# Ten sam cel, drugi harness

**Dzień 3 · 9:10–9:30 · 20 min · Copilot i Claude Code**

> Franek: „Ten sam kolega, inne biurko. Czy pracuje tak samo?”.

**Harness** to otoczenie modelu: sposób dobierania kontekstu, udostępnione narzędzia, uprawnienia i pętla wykonywania zadania. Porównujesz przebieg pracy nad jednym celem, nie tylko brzmienie odpowiedzi.

## Przygotowanie — 3 min

Otwórz tę samą kopię repo. W Copilocie wybierz Plan (jeśli niedostępny — Ask z dołączonymi plikami). W Claude Code użyj trybu planowania. Jeśli korzystasz z zainstalowanego CLI, w terminalu katalogu repo uruchom:

```bash
claude --permission-mode plan
```

W aplikacji Claude sprawdź, czy jesteś w **Code** i masz wybrany lokalny folder repo. Zwykły czat Claude nie dostaje automatycznie tego folderu. Gdy Code/CLI jest niedostępny, obserwuj demo prowadzącego i zrób drugi przebieg w nowej sesji Copilota; zapisz tę różnicę. Nie instalujemy narzędzia w trakcie tego bloku.

## Dwa przebiegi — 10 min

Zapisz `git status --short` i `git diff` przed próbą. W obu narzędziach zacznij nową rozmowę z identycznym poleceniem, bez odpowiedzi drugiego agenta:

```text
Przejmujemy aplikację po Franku. Przeczytaj historia/brief_operatora.md,
src/operator/limitRows.ts i src/limits/creditLimit.ts. Jeśli potrzebujesz
kolejnego pliku do planu, przeczytaj go i wskaż dlaczego.
Bez edycji plików zaproponuj plan integracji limitów kredytowych z ekranem:
maksymalnie pięć kroków oraz trzy kontrole odbioru.
Oddziel podstawę demonstratora od rozszerzeń i decyzji człowieka.
Nie implementuj planu.
```

Gdy pracujesz w Ask bez dostępu do repo, dołącz wymienione pliki ręcznie i odnotuj to. Po każdym przebiegu porównaj stan Git ze stanem początkowym. Nie zatwierdzaj przejścia do implementacji.

## Porównanie — 7 min

W `portfolio/porownanie-harnessow.md` zapisz po jednym wierszu na narzędzie:

| Model i tryb | Przeczytane pliki i użyte narzędzia | Pytania do Ciebie | Kontrola uprawnień | Braki w planie | Liczba Twoich interwencji |
|---|---|---|---|---|---|

Interwencją jest np. ręczne dołączenie brakującego pliku albo zawężenie zbyt dużego planu. To przybliżenie kosztu uwagi, nie koszt tokenów. Jeśli możesz wybrać ten sam model, ograniczysz jedną zmienną. Jeśli modele są różne, zapisz to — różnicy nie da się wtedy przypisać wyłącznie harnessowi.

**Gotowe:** jedna udokumentowana różnica albo brak istotnej różnicy w tej próbie, oraz jedna praktyka do dalszej pracy w Copilocie. Nie robisz commita, bo powstała tylko lokalna notatka.

Przełączaj narzędzie, gdy chcesz porównać sposób pracy, terminalową pętlę lub niezależną diagnozę i masz dostęp. Sam błąd poprzedniego agenta nie jest jeszcze powodem do zmiany. Nie uruchamiaj dwóch agentów zapisujących ten sam checkout naraz.

Tryb planowania CLI: [dokumentacja Claude Code](https://code.claude.com/docs/en/common-workflows#plan-before-editing).
