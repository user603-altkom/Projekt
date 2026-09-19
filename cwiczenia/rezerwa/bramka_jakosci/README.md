# Rezerwa - Bramka, której model nie przejdzie po swojemu

**Czas:** 45 min · **Praca w parach** · Klawiaturę ma osoba, która czuje się mniej pewnie

Nic nie instalujesz, nic nie wychodzi do sieci. Wszystko lokalnie.

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
3. **Sprawdź, że bramka naprawdę pada.** Zepsuj po kolei każdą z rzeczy, które miała łapać, i po każdej uruchom `npm run bramka`. Bramka, której nie widziałeś czerwonej, nie jest bramką.
4. **Daj modelowi zadanie, które twoją bramkę złamie.** Poproś o zmianę w `src/`, która przejdzie przez `npm run bramka`, a mimo to zepsuje raport dzienny. Jeśli znajdzie - dopisz brakujące sprawdzenie i powtórz.
5. **Podepnij bramkę pod `git push`.** Plik `.git/hooks/pre-push`, jedna linijka wywołująca `npm run bramka`. Sprawdź, że blokuje wypchnięcie zepsutego stanu.

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

- [ ] `npm run bramka` kończy się kodem zero na czystym repozytorium i kodem jeden po każdej z zepsutych rzeczy, które miała łapać - pokazałeś obie sytuacje drugiej osobie
- [ ] wiesz, czy model znalazł zmianę przechodzącą przez bramkę i psującą raport - i jeśli znalazł, bramka ją teraz łapie
- [ ] umiesz wymienić przynajmniej jedną rzecz, której twoja bramka nie sprawdza, i powiedzieć, dlaczego zdecydowałeś jej nie sprawdzać

## Na koniec ćwiczenia

```
git switch -c imie/rezerwa-bramka && git add -A && git commit -m "rezerwa bramka" --allow-empty && git switch main
```
