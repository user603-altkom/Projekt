# Rezerwa — Bramka jakości i jej granice

**Czas:** 45 min · **Każdy u siebie** · Sprawdzenie w dwójce

Skrypt i próby Git działają lokalnie, bez instalowania zależności. Copilot potrzebuje sieci. Zacznij po ćw. 07: naprawiony raport i testy mają stanowić zielony punkt odniesienia. Sam czysty klon startera nadal zawiera błąd uzgodnienia.

## Cel

Umieć zamienić „sprawdziłem, wygląda dobrze" w komendę, która kończy się kodem zero albo jeden - i umieć powiedzieć, czego ta komenda nie sprawdza.

## Zgłoszenie

> Z ustaleń po przeglądzie kodu:
>
> Ostatnia wpadka z uzgodnieniem przeszła przez review i przez zielony zestaw
> testów. Nie chcemy kolejnego spotkania o tym, kto miał zauważyć.
>
> Ustalenie: przed wypchnięciem zmiany na wspólną gałąź ma się uruchamiać jedna
> komenda, która przechodzi albo nie przechodzi. Bez czytania wyniku, bez
> interpretacji. Ma sprawdzać to, co dziś sprawdzamy wzrokiem.
>
> Co ma być w środku - to już wasza decyzja i chcemy ją uzasadnioną.

## Kroki

1. **Wypisz, zanim cokolwiek napiszesz, co ta bramka ma sprawdzać.** Trzy do pięciu rzeczy. Przy każdej dopisz, jak wygląda jej porażka: co dokładnie musi się wypisać na ekranie, żeby człowiek wiedział, co naprawić.
2. **Zleć modelowi napisanie skryptu `scripts/bramka.mjs` i podepnij go jako `npm run bramka`.** Czysty Node, bez nowych zależności - tak jak `scripts/doctor.mjs`. Kod wyjścia jeden przy dowolnej porażce.
3. **Sprawdź, że bramka naprawdę pada.** Zapisz działający etap. Eksperymenty z uszkadzaniem prowadź w osobnej kopii warsztatowej, z `.git/` i dostępnymi zależnościami; nie na jedynym egzemplarzu swojej pracy. Zepsuj jedną rzecz, uruchom `npm run bramka`, potem przywróć ją przed kolejną próbą. Bramka, której nie widziałeś czerwonej, nie jest bramką.
4. **Daj modelowi zadanie, które twoją bramkę złamie.** W tej samej kopii eksperymentalnej poproś o zmianę w `src/`, która przejdzie przez `npm run bramka`, a mimo to zepsuje raport dzienny. Jeśli znajdzie - dopisz brakujące sprawdzenie i powtórz.
5. **Podepnij bramkę pod lokalny test push.** W kopii eksperymentalnej sprawdź, czy `.git/hooks/pre-push` już istnieje; nie nadpisuj istniejącego hooka. Dla standardowego klona utwórz plik z zawartością:

   ```sh
   #!/bin/sh
   npm run bramka
   ```

   W Git Bash nadaj mu prawo wykonania: `chmod +x .git/hooks/pre-push`. Utwórz lokalne repo docelowe i wyślij do niego pierwszy poprawny commit:

   ```bash
   git init --bare .warsztat-kopie/push-test.git
   git push ./.warsztat-kopie/push-test.git HEAD:refs/heads/proba
   ```

   Potem, nadal w kopii eksperymentalnej, utwórz lokalny commit z kontrolowanym uszkodzeniem i powtórz push. Hook ma go zatrzymać. **Nie używaj `origin` ani wspólnego `main` do tej próby.** Obejrzyj komunikat i sprawdź `git ls-remote ./.warsztat-kopie/push-test.git refs/heads/proba`: docelowy identyfikator powinien pozostać sprzed uszkodzenia.

Hook jest lokalny, nie trafia automatycznie do klonów innych osób i można go pominąć. Nie zastępuje obowiązkowych kontroli po stronie serwera. Do właściwej gałęzi przenosisz wyłącznie działający skrypt i wpis w `package.json`, nie celowe uszkodzenia.

> **Jeśli utknąłeś po 15 minutach**
> Zacznij od jednej rzeczy, nie od pięciu. Najprostsza bramka, która ma sens
> w tym repozytorium, uruchamia `npm test` i porównuje sumę z `npm run raport`
> z sumą kontrolną z nagłówka pliku. Jeśli te dwie liczby się nie zgadzają,
> kod wyjścia jeden. Reszta to rozbudowa.

> **Nie chcesz pisać skryptów w Node**
> Napisz tę bramkę jako zadanie w `.gitlab-ci.yml`, obok `typecheck` i `test`,
> które już tam są. Reguły są te same: jedno zadanie, jasny komunikat porażki,
> brak miejsca na interpretację. Nie uruchomisz go tutaj, więc rozstrzygnij
> inaczej: opisz, przy jakiej zmianie w kodzie to zadanie ma się zaświecić
> na czerwono, i sprawdź na sucho, czy twoja definicja to łapie.

> **Skończyłeś wcześniej**
> Zmierz, ile twoja bramka trwa. Potem odpowiedz na pytanie, które rozstrzyga
> jej los: czy ktoś będzie ją obchodził flagą `--no-verify`, a jeśli tak, to
> przy którym czasie zacznie? Skróć ją poniżej tej granicy albo uzasadnij,
> dlaczego warto płacić.

## Gotowe, gdy

- [ ] `npm run bramka` kończy się kodem zero na zapisanym, naprawionym stanie odniesienia i kodem jeden po każdej z zepsutych rzeczy, które miała łapać - pokazałeś obie sytuacje drugiej osobie
- [ ] wiesz, czy model znalazł zmianę przechodzącą przez bramkę i psującą raport - i jeśli znalazł, bramka ją teraz łapie
- [ ] umiesz wymienić przynajmniej jedną rzecz, której twoja bramka nie sprawdza, i powiedzieć, dlaczego zdecydowałeś jej nie sprawdzać

## Na koniec ćwiczenia

W `portfolio/bramka.md` zapisz zakres kontroli, wyniki zielonej i czerwonej próby oraz ograniczenia hooka. W głównym repo przejrzyj `git diff`, dodaj `scripts/bramka.mjs` i `package.json`, sprawdź `git diff --cached` i wykonaj `git commit -m "Bramka lokalnej kontroli jakosci"`. W wariancie CI zachowaj projekt zadania i zaznacz, że nie został wykonany; nie zgłaszaj go jako sprawdzonej bramki.
