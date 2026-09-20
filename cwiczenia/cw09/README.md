# Ćw. 9 — Instrukcje projektowe

**Czas:** 40 min · **Każdy u siebie** · Sprawdzenie w dwójce

## Cel

Umieć napisać plik instrukcji, który zmienia zachowanie modelu w tym repozytorium, i pokazać tę zmianę pomiarem, nie wrażeniem. Wiedzieć, który plik czyta które narzędzie — bo od tego zależy, czy to, co dziś napiszesz, zadziała u ciebie po powrocie do pracy.

To jest pierwszy warunek wstępny: zanim agent dostanie prawo pisać w repozytorium, repozytorium musi mieć zapisane zasady. Ten sam plik działa już dziś, w trybie ask i edit, bez żadnego agenta.

## Zgłoszenie

> Od kilku tygodni wraca u nas to samo. Asystent generuje testy po angielsku, chociaż cały
> katalog `tests/` mamy po polsku. Podpowiada biblioteki, których nie ma w `package.json`.
> Raz „poprawił" plik wejściowy w `dane/`, bo uznał go za zepsuty. Za każdym razem ktoś to
> wyłapuje dopiero na recenzji i pisze w komentarzu dokładnie to samo zdanie, co poprzednio.
>
> Zanim włączymy cokolwiek więcej, chcemy mieć w repozytorium plik, który mówi asystentowi,
> jak się w nim zachowywać. Napisz go i pokaż na konkretnym przykładzie, że coś zmienił.

## Kroki

1. **Zmierz stan przed.** W czystej sesji czatu poproś o testy dla `src/interest/valueDate.ts`. Nie poprawiaj wyniku, nie dopowiadaj. Zapisz całą odpowiedź — to jest twój punkt odniesienia i bez niego reszta ćwiczenia jest kwestią wiary.
2. **Napisz `.github/copilot-instructions.md`.** Wpisuj wyłącznie to, co da się sprawdzić w tym repozytorium: przepływ danych, komendy z `package.json`, konwencję nazw i języka w `tests/`, status katalogów `dane/` i `legacy-java/`, zachowanie przy brakującym kontekście. **Ten plik czyta i czat w VS Code, i czat w IntelliJ — `AGENTS.md` w IntelliJ nie działa.** Jeśli pracujesz też w Claude Code, wpisz to samo do `AGENTS.md` (`CLAUDE.md` już go dołącza). Instrukcje działają na czat, nie na podpowiedzi w locie — sondę rób w czacie.
3. **Powtórz sondę.** Nowa sesja czatu, to samo polecenie, ten sam moduł, żadnej zmiany w sformułowaniu.
4. **Porównaj oba wyniki i wskaż zdanie, które je rozjechało.** Usuń to jedno zdanie z pliku, powtórz sondę trzeci raz i sprawdź, czy różnica znika.

> **Jeśli utknąłeś po 10 minutach**
> Nie pisz pliku od zera — każ go sobie wygenerować z tego, co w repozytorium już jest,
> i dopiero to przeczytaj krytycznie:
>
> ```
> Jesteś asystentem pracującym w tym repozytorium. Zanim cokolwiek napiszesz, przejrzyj:
> README.md, package.json, tsconfig.json, src/model.ts, strukturę katalogów src/ i tests/,
> tests/transactions/validate.test.ts oraz docs/ts-dla-javowca.md.
>
> Napisz treść pliku .github/copilot-instructions.md dla tego repozytorium. Ma zawierać
> wyłącznie rzeczy, które potwierdziłeś w kodzie — żadnych ogólników w rodzaju „pisz czysty
> kod" ani „stosuj dobre praktyki". Ujmij:
> - czym jest ten projekt w dwóch zdaniach i jaki jest przepływ danych,
> - komendy do testów, typów i raportu, dokładnie takie, jak w package.json,
> - konwencję nazw i języka testów — wyprowadź ją z plików w tests/, nie zgaduj,
> - zasadę dla katalogu dane/ (to są dane wejściowe, nie poprawiamy ich),
> - zasadę dla legacy-java/ (tylko do czytania, nikt tego nie kompiluje),
> - co zrobić, gdy brakuje kontekstu: zapytać, zamiast założyć.
>
> Format: markdown, nagłówki drugiego poziomu, zdania rozkazujące, maksymalnie 40 linii.
> Przy każdym punkcie podaj w nawiasie plik, z którego go wziąłeś.
> ```
>
> Wynik traktuj jak czyjąś propozycję: wytnij wszystko, czego nie umiesz potwierdzić w repo.

> **Nie piszesz kodu testów na co dzień**
> Zrób sondę na innym poleceniu: poproś o opis tego, co robi `src/interest/valueDate.ts`,
> wraz z listą ryzyk i przypadków brzegowych. Instrukcja ma wtedy wymusić formę odpowiedzi —
> język, długość, obowiązkowe odwołanie do linii kodu. Różnicę mierzysz tak samo: przed i po.

> **Skończyłeś wcześniej**
> Przenieś część zasad z pliku ogólnego do `.github/instructions/`, przypinając je do ścieżek
> przez `applyTo` (składnia w `.github/instructions/README.md`). Sprawdź sondą, czy instrukcja
> przypięta do `tests/**` nadal działa, gdy pytasz o plik z `src/`. Co z tego wynika dla
> długości pliku ogólnego?

## Gotowe, gdy

- [ ] masz w `.github/copilot-instructions.md` wyłącznie zdania, których źródło umiesz wskazać w repozytorium
- [ ] pokazujesz drugiej osobie dwa wyniki tej samej sondy, przed i po, i wskazujesz palcem różnicę
- [ ] umiesz powiedzieć, które zdanie tę różnicę wywołało, i co się dzieje po jego usunięciu

## Na koniec ćwiczenia

```
git switch -c imie/cw09 && git add -A && git commit -m "cw09" --allow-empty && git switch main
```
