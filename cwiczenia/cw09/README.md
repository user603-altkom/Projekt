# Ćw. 09 — Instrukcje, które rosną razem z wiedzą

**Część A: dzień 1, po ćw. 02b · 15 min**

**Część B: D2-07, po integracji ekranu · 25 min**

**Część C: jedna reguła w ramach D2-05B — bez osobnego bloku**

> Franek: „Za każdym razem tłumaczę to samo. Tylko nigdy nie zapisałem gdzie”.

Polecenie w czacie opisuje bieżące zadanie. **Instrukcje repo** zapisują powtarzalne zasady pracy, które Copilot może dołączać do kolejnych rozmów. Nie zastępują testów ani uprawnień. Dziś pracujemy tylko z `.github/copilot-instructions.md`; nie musisz od razu konfigurować wszystkich mechanizmów.

## Część A — zapisz zasady po pierwszej zmianie

### 1. Zachowaj punkt porównania — 3 min

W nowym czacie dołącz `operator/app.js` i `operator/index.html`. Wklej:

```text
Zaproponuj małą poprawę komunikatu wyświetlanego, gdy filtr operatora
nie znajduje żadnych wierszy. Chcę tylko plan: co zmienić i jak sprawdzić.
Nie edytuj plików ani nie uruchamiaj poleceń.
```

Zapisz prompt i odpowiedź w `portfolio/cw09-instrukcje.md`. Ten sam prompt wróci po zapisaniu instrukcji. Nie realizujemy teraz tego planu.

### 2. Dopisz 3–5 zasad — 5 min

Otwórz `.github/copilot-instructions.md` w głównym katalogu repo. W starterze zawiera tylko komentarz. Zapisz pod nim **krótką listę Markdown**, bez specjalnego nagłówka YAML. Wybierz zasady, które potrafisz uzasadnić doświadczeniem z ćwiczeń. Przykład do dopasowania:

```markdown
# Zasady pracy w repo
- Zmieniaj tylko uzgodniony zakres; najpierw przedstaw mały plan.
- Nie modyfikuj danych wejściowych, żeby dopasować je do oczekiwanego wyniku.
- Pola z końcówką Grosze przechowują całkowite grosze; PLN służy prezentacji.
- W planie używaj sekcji: Cel, Zakres, Sprawdzenie.
- Po zmianie podaj faktycznie wykonane sprawdzenia i wyniki. Niewykonane oznacz wprost.
```

Nie kopiuj całej dokumentacji projektu. Każda zasada ma dać się powiązać z obserwowalnym zachowaniem. Zapisz plik **Ctrl+S**.

### 3. Sprawdź użycie w nowej rozmowie — 5 min

Otwórz nowy czat, dołącz te same dwa pliki i wyślij **dokładnie ten sam prompt**. Zachowaj model i ustawienia. Nie doklejaj treści instrukcji ręcznie do promptu — sprawdzasz jej użycie z repo.

Sprawdź osobno:

1. **Czy plik jest dostępny dla Copilota?** Zajrzyj do informacji o kontekście/referencjach odpowiedzi. W wersjach z diagnostyką dostosowań otwórz menu kontekstowe widoku Chat → **Diagnostics** i znajdź plik instrukcji. Wykrycie pliku to informacja o konfiguracji, nie dowód posłuszeństwa modelu.
2. **Co widać w odpowiedzi?** Czy występują Twoje sekcje planu? Czy zachowano zakres? Zapisz przykład zastosowanej albo pominiętej reguły. Brak różnicy też jest wynikiem — pierwsza odpowiedź mogła już spełniać zasadę.

Samo „tak, przeczytałem instrukcje” napisane przez model nie potwierdza załadowania pliku. Jeśli nie umiesz sprawdzić kontekstu w swojej wersji, zapisz **„niepotwierdzone”** i pokaż prowadzącemu. Możesz awaryjnie dołączyć plik ręcznie, ale wtedy oznacz próbę jako ręczne przekazanie kontekstu, nie automatyczne ładowanie.

### 4. Zapisz instrukcje w Git — 2 min

```sh
git diff -- .github/copilot-instructions.md
git add .github/copilot-instructions.md
git diff --cached
git commit -m "Instrukcje: zasady malych zmian i weryfikacji"
```

**Gotowe A:** krótki zapisany plik, dwie próby i uczciwy opis tego, co potwierdziłeś. Notatki pozostają w `portfolio/`, commit obejmuje instrukcje.

## Czesc B — nowa sesja przejmuje stan (D2-07)

**25 min · nowy czat Copilota · bez implementacji.** Wczoraj poznaliśmy reguły, dziś przekażemy konkretny stan projektu. Notatka nie jest pamięcią modelu, dopóki jej nie otrzyma.

1. W `portfolio/cw09-handoff.md` zapisz siedem pozycji: cel, stan, pliki, decyzje, wykonane sprawdzenia i wyniki, otwarte pytanie, następny krok. Dodaj komendę uruchomienia własnego UI. Odwołuj się do swoich rzeczywistych plików.
2. Otwórz **nowy czat**. Dołącz notatkę, brief i najważniejszy plik zmiany. Poproś o odtworzenie stanu oraz plan następnego kroku, bez zmian kodu. Nie wklejaj całej poprzedniej rozmowy.
3. Partner porównuje odpowiedź z kodem i wynikami komend. Popraw jedno pominięcie, jeśli istnieje, i ponów pytanie. Jeżeli wszystko się zgadza, nazwij sprawdzony zakres.

Przykład zdania: „Adapter przechodzi odbiór, UI czyta eksport JSON; po zmianie wejścia trzeba ponowić eksport. Nie sprawdziliśmy jeszcze pustego limitu kredytowego”. Zapisz tylko to, co jest prawdą w Twojej kopii.

```text
Odtwórz cel, aktualny stan i następny krok z dołączonego przekazania.
Sprawdź ważne twierdzenia w dołączonym kodzie. Oddziel fakty od propozycji.
Jeśli brakuje danych, wskaż brak. Tylko analiza i plan, bez edycji.
```

**Gotowe:** nowa sesja odtwarza stan, a Ty potrafisz wskazać, jak to sprawdziłeś. Notatka zostaje lokalnie; nie wymaga commita. Nie kopiuj jej całej do instrukcji projektu.

**Dla szybszych:** ta sama notatka w Claude Code; porównaj odczytane pliki i założenia, bez dwóch agentów implementujących równocześnie.

## Część C — jedna konwencja po testach

Po D2-05B dopisz do instrukcji jedną poznaną zasadę testowania, np. niezależne oczekiwanie w groszach. Wskaż plik będący wzorem. Sprawdź użycie w małym zadaniu, usuń sprzeczności. Nie twórz nowego obszernego dokumentu.

Źródło konfiguracji: [VS Code](https://code.visualstudio.com/docs/agent-customization/custom-instructions). Import `@AGENTS.md` w `CLAUDE.md` pozostaje ścieżką do wspólnych reguł. Faktyczne wsparcie formatów sprawdzamy na VM.
