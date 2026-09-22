# cw17b — Centrum dowodzenia awarią

**Ćwiczenie dodatkowe · 90–120 min · Copilot Agent lub Claude Code · najlepiej w parach**

> Franek: „Gdy wszystko działa, patrzę na zieloną lampkę. Gdy przestaje, odświeżam stronę. Monitoringu nie zdążyłem zrobić”.

**Twoje zadanie:** zbuduj działający panel symulacji przetwarzania transakcji. Jedna osoba wywołuje awarię, druga diagnozuje ją z wykresu, kolejki i historii zdarzeń. Po naprawie panel pokazuje, jak system nadrabia zaległości.

To **samodzielny projekt**. Nie potrzebujesz kodu Franka, gotowego ekranu, danych z innych ćwiczeń ani klucza API do modelu. Poniżej masz cały opis, reguły i przykład do odbioru. Dane są syntetyczne, a awarie dotyczą wyłącznie lokalnego symulatora.

## 1. Załóż projekt — 5 min

Obok repo ćwiczeń utwórz **nowy, pusty folder** `centrum-dowodzenia` i otwórz go w osobnym oknie VS Code. Jeśli nazwa jest zajęta, wybierz inną. Utwórz w nim `wymagania.md` i skopiuj do niego sekcje „Co budujemy”, „Reguły symulacji” oraz „Scenariusz odbioru” z tej karty.

Wszystkie następne pliki i komendy dotyczą nowego folderu. Nie podmieniaj istniejącej aplikacji. Wystarczą Node, HTML, CSS i JavaScript. Agent może utworzyć prosty lokalny serwer; w podstawowym zakresie nie potrzebujesz bazy, logowania, Dockera ani zewnętrznych usług.

## Co budujemy

Panel powinien mieć:

- **Kafelki:** przyjęte transakcje łącznie, przetworzone łącznie, liczba czekających i tryb usługi.
- **Wykres kolejki:** liczba czekających po każdym kroku symulacji; można go narysować w SVG lub canvas.
- **Listę transakcji:** ID, krok przyjęcia, status `oczekuje` albo `przetworzona`, krok przetworzenia. Kliknięcie otwiera szczegóły.
- **Oś zdarzeń:** przełączenie trybu, pauza, wznowienie i przywrócenie działania, z numerem kroku.
- **Sterowanie czasem:** „Start”, „Pauza”, „Jeden krok”, „Reset”.
- **Sterowanie usługą:** „Normalnie”, „Spowolnij”, „Zatrzymaj usługę”, „Przywróć działanie”.

Efekt wizualny ma pomagać w diagnozie: po zatrzymaniu usługi kolejka rośnie, a po przywróceniu działania maleje. Na ekranie pokaż wyraźnie „Symulacja”.

## Reguły symulacji

1. Stan początkowy: krok 0, wszystkie liczniki 0, kolejka pusta, tryb normalny, symulacja na pauzie.
2. Jeden krok najpierw dodaje **3 nowe transakcje**, potem przetwarza najstarsze z kolejki. ID są kolejne: `TX-001`, `TX-002` itd. Nowe transakcje też mogą być przetworzone w tym kroku.
3. Normalnie usługa przetwarza **do 5 transakcji na krok**, po spowolnieniu do **1**, po zatrzymaniu **0**.
4. „Przywróć działanie” ustawia przepustowość 5. Nie zeruje kolejki, historii ani liczników.
5. Zmiana trybu sama nie wykonuje kroku. Wpływa na kolejny krok. „Zatrzymaj usługę” nie zatrzymuje dopływu transakcji podczas działającej symulacji.
6. „Start” wykonuje krok co sekundę. Wielokrotne kliknięcie nie tworzy kolejnych timerów. „Pauza” zatrzymuje cały zegar, w tym dopływ. „Jeden krok” działa tylko na pauzie.
7. „Reset” zatrzymuje zegar i przywraca stan początkowy, włącznie z historią i numeracją ID.
8. Zawsze: **przyjęte = przetworzone + czekające**. Każde ID jest unikalne, żadna transakcja nie jest przetwarzana dwukrotnie.
9. Kafelki, lista, szczegóły i wykres wynikają ze **wspólnego stanu symulatora**. Nie losuj osobnych liczb do wykresu. W podstawie nie ma losowości ani trwale odrzuconych transakcji.
10. Funkcja wykonująca krok ma być testowalna bez przeglądarki i bez czekania na rzeczywisty czas. Odświeżenie strony może zerować symulację; trwały zapis jest rozszerzeniem.

## Scenariusz odbioru

Po resecie, **na pauzie**, ustawiaj wskazany tryb i klikaj „Jeden krok”. „Przyjęte” i „przetworzone” są licznikami łącznymi; „czekające” to aktualna kolejka.

| Krok | Tryb podczas kroku | Przyjęte | Przetworzone | Czekające |
| --- | --- | ---: | ---: | ---: |
| 1 | Normalnie | 3 | 3 | 0 |
| 2 | Zatrzymana usługa | 6 | 3 | 3 |
| 3 | Zatrzymana usługa | 9 | 3 | 6 |
| 4 | Spowolnienie | 12 | 4 | 8 |
| 5 | Przywrócone działanie | 15 | 9 | 6 |
| 6 | Normalnie | 18 | 14 | 4 |
| 7 | Normalnie | 21 | 19 | 2 |
| 8 | Normalnie | 24 | 24 | 0 |

W kroku 4 jako pierwsza wychodzi z kolejki `TX-004`. Kolejne przetwarzanie zachowuje kolejność przyjęcia. Po kroku 8 wszystkie 24 transakcje są przetworzone.

## 2. Najpierw plan, potem jego krytyka — 15 min

Dołącz utworzony `wymagania.md` i wklej:

```text
Zaprojektuj lokalne centrum dowodzenia według wymagania.md.
Pracujemy w nowym folderze centrum-dowodzenia. Zaproponuj pliki,
model stanu i najwyżej cztery etapy: silnik, prosty ekran, interakcje,
odbiór. Wskaż pierwszy test oraz sposób uruchomienia na Windows.
Preferuj Node i zwykły HTML/CSS/JS. Oddziel zegar od logiki pojedynczego
kroku. Na razie nie twórz plików ani nie instaluj zależności.
Pokaż plan i poczekaj na moją decyzję.
```

Jeśli masz grill-me, poproś:

```text
Użyj grill-me do skrytykowania powyższego planu. Pytaj po jednym pytaniu,
łącznie do trzech pytań. Sprawdź przede wszystkim spójność danych,
różnicę między pauzą i awarią oraz możliwość powtórzenia scenariusza.
Poczekaj na odpowiedzi, potem popraw plan. Nie implementuj.
```

Bez skilla odpowiedz na te trzy kwestie z partnerem. Zapisz przyjęty plan w nowym `plan.md`. Dodaj jedną zasadę pracy do pliku instrukcji obsługiwanego przez Twoje narzędzie, np. „Po każdym etapie pokaż wynik kontroli i zatrzymaj się przed następnym”. Sprawdź, że agent ją odczytał.

## 3. Silnik i pierwszy działający ekran — 30 min

Najpierw zleć agentowi **sam silnik** i test scenariusza z tabeli:

```text
Zrealizuj tylko etap silnika symulacji z plan.md.
Dopisz test ośmiu kroków według tabeli w wymagania.md, test kolejności
TX-004 oraz braku duplikatów ID. Użyj node:test, bez przeglądarki.
Uruchom testy, pokaż rzeczywisty wynik i zatrzymaj się.
```

Sprawdź liczby w teście względem tabeli. Następnie zatwierdź prosty ekran: kafelki, „Jeden krok” i przełączanie trybu. Poproś o lokalny serwer uruchamiany komendą **`node serwer.mjs`**, pod adresem **http://127.0.0.1:4187**. Serwer ma nasłuchiwać na `127.0.0.1`. Przy zajętym porcie agent ma zaproponować inny i zapisać go w README projektu.

Uruchom serwer w terminalu i otwórz stronę. Już teraz przejdź pierwsze trzy kroki tabeli. To pierwszy punkt kontrolny: kolejka ma wzrosnąć do 6. Nie przechodź do ozdabiania panelu, jeśli te liczby się nie zgadzają.

## 4. Zbuduj centrum dowodzenia — 30 min

```text
Rozbuduj działający ekran zgodnie z planem: wykres kolejki, lista
transakcji ze szczegółami, historia zdarzeń oraz Start/Pauza/Reset.
Wszystkie widoki muszą korzystać ze stanu działającego silnika.
Zachowaj testy i kontrakt kroku. Nie zastępuj silnika danymi pokazowymi.
Zadbaj o czytelność: duże liczniki, opisane osie, wyróżnienie awarii,
widoczny stan pauzy i etykiety przycisków. Nie sygnalizuj stanu tylko kolorem.
Podziel pracę na małe fragmenty. Po każdym pokaż co działa i jak to sprawdzić.
```

Przed zatwierdzeniem kolejnego fragmentu sam kliknij nowe funkcje. Zwróć uwagę, czy „Reset” naprawdę zatrzymuje zegar i czy kilkukrotne „Start” nie przyspiesza symulacji.

## 5. Zamieńcie się rolami: awaria i diagnoza — 15 min

Jedna osoba jest operatorem, druga wywołuje problem przez przyciski panelu. Uruchomcie symulację automatyczną, spowolnijcie lub zatrzymajcie usługę, a następnie przywróćcie jej działanie.

Operator ma odpowiedzieć, patrząc na panel:

- Co przestało działać: dopływ, przetwarzanie czy cały zegar?
- Po jakim zdarzeniu kolejka zaczęła rosnąć?
- Czy przywrócenie działania zmniejsza kolejkę? Gdzie widać dowód?
- Co stało się z konkretną transakcją, która czekała w kolejce?

Zamieńcie się rolami. Gdy pracujesz sam, odtwórz przebieg i zapisz diagnozę przed poproszeniem agenta o ocenę.

## 6. Odbiór — 10 min

1. Zatrzymaj symulację i wykonaj reset. Przejdź ręcznie wszystkie osiem kroków tabeli.
2. Sprawdź równanie liczników, kolejność transakcji i wykres; uruchom testy silnika.
3. Sprawdź osobno „Start” kliknięty kilka razy, pauzę, pojedynczy krok i reset podczas działania.
4. Zapisz w nowym `odbior.md`: komendę testów, wynik, jeden znaleziony problem i znane ograniczenia. Jeśli nie znalazłeś problemu, wskaż obszar, którego nie sprawdziłeś.

**Gotowe:** działający panel i powtarzalny scenariusz awarii, liczby zgodne z tabelą, widoczny powrót do normalnej pracy oraz test silnika. Partner potrafi z panelu wyjaśnić incydent.

**Gdy brakuje czasu:** zostaw kafelki, listę, ręczny krok i zmianę trybu; odbierz tabelę. Wykres, szczegóły i automatyczny zegar dodawaj dopiero po tym. Nie zgłaszaj wtedy pełnego zakresu jako ukończonego.

**Dla szybszych — dodatkowe 30–60 min:** wybierz jeden kierunek i najpierw ustal kryterium:

- Eksport historii do JSON i odtworzenie identycznego przebiegu.
- Reguła alertu „kolejka większa niż 10 przez 3 kolejne kroki”, z testem granicy.
- Raport incydentu: początek, działania operatora, szczyt kolejki i moment nadrobienia zaległości.
- Test całego scenariusza w przeglądarce według [cw16b](../cw16b/README.md).

[Spis ćwiczeń](../../CWICZENIA.md) · [Pierwsze ćwiczenie ratunkowe: Playwright](../cw16b/README.md)
