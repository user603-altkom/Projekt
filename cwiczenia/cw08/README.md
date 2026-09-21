# Ćw. 8 — Bezpieczna refaktoryzacja

**Czas w nowej ścieżce:** D2 · 14:45–15:30 · 45 min · Każdy u siebie, odbiór w parze

> Franek: „Następne stawki mają wejść bez kolejnego nocnego dyżuru”.

**Zakres:** Wybierz jeden mały fragment refaktoryzacji. Alternatywa: cw08_sql. Nie rób obu. Zakończ dowodem zachowania, nie liczbą zmienionych linii.

Pracujesz na jednej gałęzi `warsztat/franek` przez całe szkolenie. Rezultat i dowód zapisz w `portfolio/`.

Pracujesz w IDE, na otwartym repozytorium — asystent w panelu obok plików.

**Start:** Copilot Chat → Agent, nowa rozmowa. Najpierw plan jednego wydzielenia i test ochronny, potem edycja. Komendy uruchamiaj z głównego katalogu repo.

## Cel

Umieć powiedzieć, przed czym chroni cię zestaw testów, który masz, zanim zaczniesz pod jego osłoną zmieniać kod — i co ten zestaw utrwala razem z zachowaniem.

## Zgłoszenie

> Z notatki po przeglądzie kodu, 15.09:
>
> `accrueInterest` ma ponad dwieście linii, `any` na wejściu i `any` na wyjściu, i nikt
> z nas nie wchodzi tam bez potrzeby. W kwartale wchodzą nowe stawki promocyjne
> i ktoś będzie musiał.
>
> Ustalenie: zanim dołożymy tam cokolwiek, wyjmujemy z pętli dobór stawki i naliczenie
> odsetek za jeden dzień do osobnego modułu `src/interest/stawki.ts`. W `accrueInterest`
> zostaje przejście po dniach, kapitalizacja, podatek i saldo. To są dwie różne
> odpowiedzialności i mają być w dwóch plikach.
>
> Warunek jest jeden: wyniki mają zostać identyczne co do grosza. Mamy zestaw wejść
> w `dane/odsetki_przypadki.json` i testy migawkowe w `tests/interest/accrue.test.ts`.
> To jest cała siatka, jaką mamy pod tym modułem.

## Kroki

1. **Uruchom `npm test -- tests/interest/accrue.test.ts`, potem `npm test`.** Zapisz punkt startowy w `portfolio/cw08-refaktoryzacja.md`. Oddziel znane czerwone testy importu z poprzednich ćwiczeń od testów modułu odsetek.
2. **Ustal, czego te testy nie dotykają.** Zestaw `tests/interest/accrue.test.ts` z listą wejść w `dane/odsetki_przypadki.json` i z rozgałęzieniami w `src/interest/accrue.ts`. Wypisz gałęzie, przez które nie przechodzi ani jeden test.
3. **Zabezpiecz wybrany fragment, zanim ruszysz kod.** Dopisz przypadek dla gałęzi, którą będziesz wydzielać. Nową migawkę wolno utworzyć teraz, na kodzie sprzed refaktoryzacji; później jej nie aktualizuj. Nie musisz pokryć całego modułu w 45 minut.
4. **Wyodrębnij jeden mały fragment, np. dobór stawki dla jednego produktu, do `src/interest/stawki.ts`.** To wystarcza w podstawie; pełny podział ze zgłoszenia jest rozszerzeniem. Do nowej funkcji przekaż jawnie dane potrzebne wybranemu fragmentowi. W `accrueInterest` zostaje pętla dnia, kapitalizacja, podatek i saldo. Tnij po teście, nie po pliku: kawałek nadaje się do wyjęcia wtedy, gdy umiesz wskazać test, który spadnie, jeśli go zepsujesz.
5. **Uruchamiaj testy po każdym cięciu, nie na końcu.** Migawka, która się zmieniła, jest sygnałem, że zmieniłeś zachowanie — nie powodem, żeby ją zaktualizować.

> **Jeśli utknąłeś po 15 minutach**
> Nie wycinaj całej funkcji naraz. Zacznij od jednego typu produktu — tego, który
> rozumiesz najlepiej — i zostaw pozostałe tam, gdzie są. Co musi wejść do nowej
> funkcji jako argument, żeby dała dokładnie ten sam wynik bez dostępu do reszty pętli?

> **Nie chcesz ruszać kodu produkcyjnego**
> Napisz kontrakt modułu, który ma powstać, zanim powstanie: co dostaje na wejściu,
> co zwraca, co robi przy każdym typie produktu, przy saldzie ujemnym, przy przekroczeniu
> limitu, przy okresie jednodniowym i przy wejściu, którego nie rozpoznaje. Materiał
> masz w `dane/odsetki_przypadki.json` — dwadzieścia wejść z opisami. Potem weź to,
> co para napisała w kodzie, i przejdź swój kontrakt punkt po punkcie: dla każdego
> punktu wskaż test, który go sprawdza. Punkty bez takiego testu wypisz osobno —
> to jest lista, z którą idziesz na omówienie.

> **Skończyłeś wcześniej**
> Zaprojektuj alternatywny zestaw testów charakteryzujących: jaki przypadek
> dotknie każdej gałęzi? Zachowaj istniejące testy i migawki. Dopisz brakujące
> przykłady, uruchom je i wskaż ograniczenia takiej ochrony.
>
> Eksperyment z usuwaniem przypadków wykonuj tylko na osobnej, tymczasowej
> kopii. Sprawdź, czy „zielono” może pozostać mimo mniejszego pokrycia.
> Do właściwej gałęzi nie przenoś usuniętych testów ani uszkodzeń.
>
> Na koniec jedno pytanie do zapisania na omówienie: gdyby w module siedział dziś
> błąd, twoje migawki utrwaliłyby go jako poprawny wynik. Po czym poznasz różnicę
> między migawką, która chroni zachowanie, a migawką, która betonuje błąd?

## Gotowe, gdy

- [ ] testy odsetek przechodzą; `stawki.ts` jest wywoływany z `accrueInterest`, a podczas refaktoryzacji nie zmieniłeś oczekiwań ani migawek utrwalonych przed nią
- [ ] pełny zestaw testów nie ma nowych błędów względem zapisanego punktu startowego
- [ ] pokazujesz test chroniący wydzielony fragment oraz pozostałe luki albo zakres potwierdzonego pokrycia
- [ ] umiesz odpowiedzieć drugiej osobie, co twoje migawki gwarantują, a czego nie gwarantują — i co się z nimi stanie, jeśli w module siedzi dziś błąd

## Na koniec ćwiczenia

Zapisz dowody w `portfolio/cw08-refaktoryzacja.md`. W wariancie bez kodu wystarczy kontrakt i wskazane luki. W wariancie implementacyjnym przejrzyj `git diff` i `git status --short`; dodaj jawnie zmienione pliki oraz nowy `src/interest/stawki.ts` i ewentualne nowe testy/migawki. Po `git diff --cached` wykonaj `git commit -m "Wydzielenie fragmentu naliczania bez zmiany wynikow"`.
