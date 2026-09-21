# Ćw. 09 — Instrukcje, które rosną razem z wiedzą

**Część A: dzień 1, po ćw. 02b · 15 min**

**Część B: dzień 1, po ćw. 04 · 15 min**

**Część C: dzień 2, po testach · 10 min — jeszcze jej dziś nie wykonuj**

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

## Część B — wymagania i przekazanie do nowej sesji

**Wróć tutaj dopiero po ćw. 04.** Potrzebujesz `portfolio/kryteria-limitow.md` i instrukcji z części A.

1. **Uzupełnij instrukcje — 4 min.** Dodaj regułę rozdzielania wymagań, propozycji i pytań do zamawiających. Otwórz `package.json` i sprawdź polecenia: `npm test` oraz `npm run typecheck`. Dopisz, że ich przejście nie dowodzi ukończenia ekranu; `npm run odbior` sprawdza finał i na starterze celowo nie przechodzi. Zachowaj krótki plik.
2. **Przygotuj przekazanie — 4 min.** W `portfolio/cw09-handoff.md` zapisz: cel finału, aktualny stan filtra i adaptera, pliki z kryteriami, podjęte decyzje, otwarte pytania oraz następny mały krok. Jeśli zrobiłeś to już z prowadzącym podczas omówienia nowej sesji, wykorzystaj istniejącą notatkę — nie pisz jej drugi raz. Nie wklejaj całej historii rozmowy.
3. **Sprawdź odtworzenie — 5 min.** Otwórz nowy czat i dołącz handoff, `portfolio/kryteria-limitow.md` oraz `historia/brief_operatora.md`. Samo zapisanie notatek na dysku nie oznacza, że Copilot je przeczytał. Poproś:

```text
Na podstawie dołączonego przekazania, kryteriów i briefu odtwórz:
cel demonstratora, aktualny stan, jedną nierozstrzygniętą kwestię
oraz następny mały krok. Oddziel fakty z materiałów od własnych propozycji.
Nie implementuj niczego i nie rozszerzaj zakresu do całego produktu.
```

Porównaj odpowiedź ze swoimi kryteriami. Czy nowa sesja rozróżnia demo od obliczeń i nie wymyśla podjętych decyzji? Jeśli czegoś brakuje, uzupełnij handoff.

4. **Zapisz zmianę instrukcji — 2 min.** Użyj komend z części A, z opisem commita `Instrukcje: wymagania i polecenia kontroli`. Nie dodawaj ignorowanego `portfolio/` do Git. Jeśli plik instrukcji się nie zmienił, nie twórz pustego commita.

**Gotowe B:** nowa rozmowa potrafi odtworzyć zakres z krótkiego przekazania, a instrukcje odwołują się do istniejących poleceń. To Ty sprawdzasz zgodność; streszczenie może zgubić ważną informację.

## Część C — dopiero dzień 2, po testach

Dodaj jedną poznaną konwencję testów, opartą na konkretnym pliku repo. Przetestuj jej użycie w nowej rozmowie i usuń lub popraw regułę, która okazała się zbędna albo sprzeczna. Jeśli żadna nie wymaga usunięcia, zapisz ten wniosek. Zapisz zmianę instrukcji w Git tak jak wcześniej.

`AGENTS.md` może później służyć do wspólnych zasad, a istniejący `CLAUDE.md` zawiera jego import. Nie kopiuj teraz tych samych instrukcji do kilku plików. Obsługę każdego formatu sprawdzaj w danym narzędziu.

**Rozszerzenie:** przygotuj instrukcję stosowaną tylko do plików testowych i potwierdź jej ładowanie. To dodatek po ukończeniu bieżącej części, nie warunek przejścia dalej.

Opis lokalizacji pliku i diagnostyki: [oficjalna dokumentacja instrukcji VS Code](https://code.visualstudio.com/docs/agent-customization/custom-instructions). Dostępność widoków zależy od wersji na VM.
