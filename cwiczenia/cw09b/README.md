# cw09b — Testy: czy sprawdziliśmy właściwe rzeczy?

**45 min + 20 min przekazania na koniec dnia · Copilot**

**Cel:** wykryć luki, których nie ujawnia jeden zielony test. Nie prosimy o „jak najwięcej testów”.

Wejście: [brief z oczekiwaniami](../../laboratorium/limity/BRIEF.md), [kontrakt](../../laboratorium/limity/KONTRAKT.md), [Twój kod](../../laboratorium/limity/src/ocena.mjs), [testy](../../laboratorium/limity/test/ocena.node.mjs). Wyniki zapisujesz w [03-testy.md](../../laboratorium/limity/dokumenty/03-testy.md).

## 1. Ustal oczekiwania przed generowaniem testów

W parze wybierz przypadki: dokładny początek i koniec okresu, limit zero, zgoda tej samej osoby, cofnięcie, błędny okres i brak zmiany wejścia. Dla każdego zapisz wejście oraz oczekiwany wynik albo błąd. Liczby policzcie samodzielnie.

```text
Porównaj laboratorium/limity/BRIEF.md z testami w test/ocena.node.mjs
tego laboratorium. Wypisz wymagania bez pokrycia. Nie edytuj jeszcze plików.
Dla każdego zaproponuj małe wejście i oczekiwany wynik, z uzasadnieniem
w wymaganiu. Nie wyliczaj oczekiwania przez wywołanie ocenLimit.
```

Porównaj odpowiedź z własną listą. Dopiero po jej ocenie poproś agenta o dopisanie wybranych testów. Uruchom:

```sh
node --test laboratorium/limity/test/ocena.node.mjs
```

Jeśli test pada, ustal, czy błędna jest implementacja, test czy interpretacja wymagania. Zapisz rozstrzygnięcie, potem zleć minimalną poprawkę.

## 2. Sprawdź, czy test potrafi wykryć błąd

Wybierz test końca okresu. W osobnej kopii pliku albo przez jedną świadomą edycję zmień `< koniec` na `<= koniec`. Sprawdź, czy test wykryje tę zmianę. Następnie **cofnij tylko tę własną edycję w edytorze** i ponownie uruchom testy. Nie używaj resetu repo. Jeśli kod ma inny zapis warunku, wybierz analogiczną zmianę z partnerem.

**Gotowe:** masz macierz przypadków, rzeczywisty wynik testów i jeden dowód, że test wykrywa konkretną regresję. Jeśli moduł pozostaje niegotowy, jawnie zapisz braki.

## 3. Przekaż pracę do nowej sesji

Uzupełnij [07-przekazanie.md](../../laboratorium/limity/dokumenty/07-przekazanie.md): co działa, co nie działa, pliki, ostatnia komenda i wynik, następny krok. W nowej rozmowie dołącz wyłącznie ten plik i poproś o odtworzenie stanu oraz propozycję jednego kroku **bez edycji**. Agent może doczytać wskazane pliki. Jeśli zgaduje brakujące informacje, popraw przekazanie.

**Dla szybszych:** sprawdź, czy wywołanie funkcji dwa razy daje ten sam wynik i czy nie mutuje zagnieżdżonego obiektu `wniosek`. Nowa sesja nie dziedziczy automatycznie całej poprzedniej rozmowy.


[Spis ćwiczeń i kolejność](../../CWICZENIA.md) · [Start laboratorium](../../laboratorium/limity/README.md)
