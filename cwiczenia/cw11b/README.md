# cw11b — Wydanie: co właściwie przekazujemy?

**60 min · Copilot + Git · lokalne wydanie warsztatowe**

**Cel:** przygotować zmianę tak, żeby inna osoba mogła ją uruchomić i ocenić. Nie wdrażamy do infrastruktury bankowej.

Wejście: Twój moduł albo wariant z cw10b, wyniki testów i review. Uzupełniasz istniejący [05-wydanie.md](../../laboratorium/limity/dokumenty/05-wydanie.md).

## 1. Przegląd i lokalny commit

Uruchom właściwe testy. Dla głównego laboratorium:

```sh
node --test laboratorium/limity/test/ocena.node.mjs
node laboratorium/limity/raport.mjs
git status --short
git diff -- laboratorium/limity
```

Sprawdź nowe pliki oraz zakres zmian. Dodaj do commita tylko pliki swojej funkcji, testów i dokumentacji, **każdy po nazwie**, np. `git add laboratorium/limity/src/ocena.mjs`. Nie używaj `git add .`. Dla fikcyjnej tożsamości lokalnej:

```sh
git config --local user.name "Uczestnik Warsztatu"
git config --local user.email "uczestnik@example.com"
git diff --cached
git commit -m "Dodaj ocene czasowego limitu"
git rev-parse HEAD
```

Nie wykonuj pustego commita. Jeżeli testy nadal nie przechodzą, zapisz stan jako niedokończony, nie jako gotowe wydanie. Nie wypychaj rozwiązań do wspólnego main.

## 2. Opis zmiany i smoke test

```text
Na podstawie wskazanego commita i wyników testów przygotuj krótki opis MR:
problem operatora, nowe zachowanie, zakres, wykonane sprawdzenia i ograniczenia.
Oddziel kontrole wykonane od proponowanych. Niczego nie publikuj.
Zaproponuj trzy kroki ręcznego smoke testu oraz sposób wycofania tej zmiany.
```

Partner uruchamia podgląd `node laboratorium/limity/serwer.mjs` i sprawdza http://127.0.0.1:4179. Porównuje aktywną i wygasłą zgodę z briefem. Zapisz realny wynik. W wariancie awaryjnym zamiast UI pokaż test funkcji i nazwij ograniczenie zakresu.

## 3. Plan CI i wycofania

Zaproponuj pipeline: checkout, Node 24, test laboratorium, artefakt z wynikiem, review. Dla tego laboratorium nie potrzeba instalacji zależności. Zaznacz, że to projekt pipeline, jeśli nie został uruchomiony na serwerze.

Opisz wycofanie własnego commita przez `git revert <SHA>` na czystej gałęzi oraz ponowną weryfikację. **Nie wykonuj tego teraz na ukończonym rozwiązaniu**; jeśli chcesz przećwiczyć, użyj osobnej kopii. Nie planuj force push jako standardu wycofania.

**Gotowe:** recenzent ma identyfikator wersji, instrukcję uruchomienia, realne wyniki i znane ograniczenia. Dokumentację wypełnij przed końcowym commitem albo dopisz oddzielny commit dokumentacyjny.

**Dla szybszych:** przygotuj plik pipeline jako propozycję w `laboratorium/limity/dokumenty/pipeline-propozycja.yml` (nowy plik). Bez runnera nie zgłaszaj zielonego CI.


[Spis ćwiczeń i kolejność](../../CWICZENIA.md) · [Start laboratorium](../../laboratorium/limity/README.md)
