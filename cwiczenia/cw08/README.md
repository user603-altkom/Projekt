# Ćw. 8 — Bezpieczna refaktoryzacja

**Czas:** 50 min · **Praca w parach** · Klawiaturę ma osoba, która czuje się mniej pewnie

Pracujesz w IDE, na otwartym repozytorium — asystent w panelu obok plików.

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

1. **Uruchom `npm test`.** Zobacz, co jest zielone, zanim uznasz, że coś cię chroni.
2. **Ustal, czego te testy nie dotykają.** Zestaw `tests/interest/accrue.test.ts` z listą wejść w `dane/odsetki_przypadki.json` i z rozgałęzieniami w `src/interest/accrue.ts`. Wypisz gałęzie, przez które nie przechodzi ani jeden test.
3. **Domknij siatkę, zanim ruszysz kod.** Dopisz przypadki tak, żeby utrwalały dzisiejsze wyniki gałęzi, które zostały bez pokrycia.
4. **Wyodrębnij dobór stawki i naliczenie dzienne do `src/interest/stawki.ts`.** Do środka idzie to, co wylicza odsetki za jeden dzień przy danym saldzie, produkcie i parametrach. W `accrueInterest` zostaje pętla dnia, kapitalizacja, podatek i saldo. Tnij po teście, nie po pliku: kawałek nadaje się do wyjęcia wtedy, gdy umiesz wskazać test, który spadnie, jeśli go zepsujesz.
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
> Skasuj `tests/interest/accrue.test.ts` razem z katalogiem `__snapshots__` i napisz
> testy charakteryzujące od zera, tak żeby każda gałąź `accrueInterest` była dotknięta
> co najmniej raz. Ile przypadków było na to potrzeba? Czego z nich nadal nie widać?
>
> Potem zrób coś odwrotnego i nieprzyjemnego: wróć do oryginalnego zestawu wejść
> i usuń z niego trzy przypadki tak, żeby `npm test` nadal był zielony, a pokrycie
> gałęzi spadło jak najmocniej. Które trzy wybrałeś i skąd wiedziałeś, że akurat te?
> To jest dokładnie ta operacja, którą ktoś robi nieświadomie, kasując „zbędny"
> przypadek, bo wygląda na powtórzenie innego.
>
> Na koniec jedno pytanie do zapisania na omówienie: gdyby w module siedział dziś
> błąd, twoje migawki utrwaliłyby go jako poprawny wynik. Po czym poznasz różnicę
> między migawką, która chroni zachowanie, a migawką, która betonuje błąd?

## Gotowe, gdy

- [ ] `npm test` przechodzi, `src/interest/stawki.ts` istnieje i jest wołany z `accrueInterest`, a żadna migawka nie została zaktualizowana po drodze
- [ ] umiesz wymienić gałęzie, których nie dotyka żaden test, i pokazać je drugiej osobie w kodzie
- [ ] umiesz odpowiedzieć drugiej osobie, co twoje migawki gwarantują, a czego nie gwarantują — i co się z nimi stanie, jeśli w module siedzi dziś błąd

## Na koniec ćwiczenia

```
git switch -c imie/cw08 && git add -A && git commit -m "cw08" --allow-empty && git switch main
```
