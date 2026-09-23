> Materiał dodatkowy ze wcześniejszej wersji. Aktualną kolejność i podstawę określa README w tym katalogu.

# Ćw. 10 — Code review w dwie strony


> Franek: „Limity kredytowe napisałem. Czy spełniają wymagania? Dobre pytanie”.

**Zakres:** Recenzuj zamrożony zmiana.diff oraz src/limits/creditLimit.ts obecny w starterze. Nie przełączaj gałęzi i nie aplikuj diffu ponownie. Podstawa: trzy sprawdzone uwagi lub potwierdzenia; rozszerzenie: test dla jednej luki.

Pracujesz na jednej gałęzi `warsztat/franek` przez całe szkolenie. Rezultat i dowód zapisz w `portfolio/`.

**Start:** Copilot Chat → Ask, nowa rozmowa. Dołącz pliki z kroku 2; w podstawie analizujesz zmianę bez edycji kodu.

## Cel

Umieć ocenić cudzą zmianę modelem tak, żeby wynik dało się obronić: wiedzieć, co narzędzie wyłapało, czego nie tknęło i czego nie wolno mu oddać do samodzielnej decyzji. Umieć też stanąć po drugiej stronie — przygotować własną zmianę tak, żeby recenzent nie musiał zgadywać.

Zanim agent zacznie zgłaszać zmiany sam, recenzja musi być czynnością, którą umiesz przeprowadzić świadomie. To jest bramka, na której wszystko inne się zatrzymuje.

## Zgłoszenie

> Zmiana czeka na recenzję. Cały jej kod jest w `zmiana.diff` w tym katalogu — to ten sam
> zestaw commitów, co na gałęzi `recenzja/cw10-limity-kredytowe`, zapisany jako plik, żeby
> dało się go wskazać narzędziu bez przełączania gałęzi.

Pełny opis od autora — co zmienił, co założył i o co prosi recenzenta — jest niżej, w sekcji „Materiał: zmiana do recenzji".

## Kroki

1. **Wyciągnij własne kryteria akceptacji z Ćw. 4.** To jest ta sama sprawa: zgłoszenie, które wtedy rozbijałeś na zadania i kryteria, ktoś tymczasem zaimplementował. Otwórz **sekcję „Szerszy produkt”** w `portfolio/kryteria-limitow.md` i źródło `dane/zgloszenie_limity.md`. Wąskie kryteria demonstratora z finału nie zastępują wymagań produktu. Jeśli nie masz notatki, zapisz trzy kryteria ze zgłoszenia i osobno niewiadome.
2. **Zleć recenzję diffu.** Dołącz `cwiczenia/cw10/zmiana.diff`, wymagania, własne kryteria i `src/limits/creditLimit.ts`. Powiedz: „Tylko recenzja, bez edycji. Sprawdź wymagania po kolei, podaj dowody w kodzie i oddziel luki modułu od brakującej integracji”. Nie aplikuj diffu — kod już jest w repo. Zapisz listę uwag w kolejności, w jakiej je dostałeś.
3. **Przejdź swoje kryteria po kolei i przy każdym postaw jedno z trzech:** spełnione / niespełnione / nie da się stwierdzić z samego diffu. Pytanie brzmi „czy ta implementacja robi to, czego sam wymagałeś", a nie „gdzie jest błąd". Trzeci stan jest pełnoprawną odpowiedzią i zwykle najciekawszą.
4. **Odsiej uwagi modelu.** Które były trafione, które puste, a które dotyczyły rzeczy, o których model nie ma jak wiedzieć — decyzji produktowej, ustalenia z biznesem, kosztu operacyjnego. Wypisz trzy rzeczy, których recenzentowi-AI nie oddajesz.
5. **Stań po stronie autora.** Weź własną zmianę z Ćw. 7 albo Ćw. 8 (wybierz commit przez `git log --oneline -5`, następnie obejrzyj go przez `git show` z jego identyfikatorem) i przygotuj ją do recenzji: opis co i dlaczego, uzasadnienie decyzji, które podjąłeś sam, oraz lista rzeczy do sprawdzenia przez człowieka. Model pomaga pisać, ty odpowiadasz za treść.

> **Jeśli utknąłeś po 15 minutach**
> Nie czytaj diffu od góry do dołu — 629 linii przeczytasz i nic z tego nie zapamiętasz.
> Weź jedno własne kryterium z Ćw. 4 i znajdź w zmianie linię, która je realizuje.
> Gdzie mieszka to, czego wtedy zażądałeś? Jeśli nie umiesz wskazać linii, zapisz to —
> „nie znalazłem tego w kodzie" jest wynikiem recenzji, nie porażką.

> **Nie masz własnej zmiany z dnia 2**
> Zrób krok 5 na cudzej: wciel się w autora `zmiana.diff` i napisz opis, który powinien był
> do niej dołączyć — co zmienione, które z założeń wymaga potwierdzenia u zamawiającego,
> co recenzent musi sprawdzić ręcznie, bo z kodu tego nie widać. Porównaj swój opis z tym,
> który autor napisał naprawdę (sekcja niżej). Czego w jego opisie brakuje?

> **Skończyłeś wcześniej**
> Wróć do pliku instrukcji z Ćw. 9 i dopisz jedno zdanie, po którym recenzent-AI zapytałby
> o to, co tym razem przemilczał. Puść ten sam diff jeszcze raz i sprawdź, czy to zadziałało.
> Jeśli nie — czy problem jest w zdaniu, czy w tym, że tej rzeczy w ogóle nie widać z diffu?

## Gotowe, gdy

- [ ] masz swoje kryteria z Ćw. 4, każde oznaczone: spełnione / niespełnione / nie da się stwierdzić z diffu
- [ ] weryfikujesz co najmniej trzy uwagi lub potwierdzenia modelu i pokazujesz dowód; brak fałszywej uwagi nie obniża wyniku
- [ ] twoja zmiana z dnia 2 ma opis, po którym recenzent wie, co sprawdzić ręcznie, bez zadawania ci pytań

## Na koniec ćwiczenia

Zapisz `portfolio/cw10-review.md`: tabela „kryterium / źródło / miejsce w kodzie / werdykt / sposób sprawdzenia”, trzy zweryfikowane uwagi lub potwierdzenia oraz opis własnej zmiany. Notatkę wykorzystasz w finale. Sama recenzja nie wymaga commita. Jeśli w rozszerzeniu zmieniłeś instrukcje lub dopisałeś test, przejrzyj diff i commituj wyłącznie te pliki.

---

## Materiał: zmiana do recenzji

### Limity kredytowe rachunków — zmiana do recenzji

Zmiana czeka na recenzję. Cały jej kod jest w `zmiana.diff` w tym katalogu — to ten sam
zestaw commitów, co na gałęzi `recenzja/cw10-limity-kredytowe`, zapisany jako plik, żeby
dało się go wskazać narzędziu bez przełączania gałęzi.

Historyczna gałąź służy archiwizacji. Źródłem tego ćwiczenia jest dostarczony `zmiana.diff`; moduł jest już obecny w starterze.

### Opis zmiany (od autora)

Zgłoszenie z katalogu `dane/` mówi, że rachunki firmowe mają mieć przypisany limit kredytowy,
powyżej którego obciążenia nie powinny wchodzić do rozliczenia bez decyzji opiekuna.
Dziś nie mamy tego nigdzie — limit kredytowy istnieje w katalogu produktów, ale rejestr transakcji
nic o nim nie wie.

Dokładam moduł `src/limits/` i konfigurację limitów kredytowych w `dane/`. Moduł, zgodnie z tym, jak
zbudowana jest reszta repozytorium, importuje wyłącznie z `src/model.ts` i niczego nie
modyfikuje w istniejących plikach — sprawdzenie limitu kredytowego da się wpiąć w rejestr albo
w raport dzienny osobną zmianą, kiedy ustalimy, gdzie ma stać bramka.

Co robi:

- czyta konfigurację limitów kredytowych przypisanych do rachunków (kwota, data wejścia w życie),
- liczy, ile z limitu kredytowego zużyły obciążenia, które weszły już do rozliczenia,
- sprawdza pojedynczą operację oraz całą partię naraz i zwraca listę komunikatów
  w tym samym kształcie, co walidacja transakcji (`ok` + `bledy`),
- do testów dołożyłem katalog `tests/limits/`.

### Decyzje, które podjąłem sam

Zgłoszenie nie rozstrzyga wszystkiego. Tam, gdzie musiałem coś założyć, założyłem tak:

1. **Limit kredytowy dotyczy sumy obciążeń, nie pojedynczej operacji.** Inaczej rachunek
   wyprowadziłby dowolną kwotę serią mniejszych przelewów.
2. **Uznania nie zmniejszają wykorzystania limitu kredytowego.** Liczę obciążenia w partii, nie saldo
   rachunku.
3. **Rachunek bez wpisu w konfiguracji przechodzi bez ograniczenia.** Brak limitu kredytowego to
   rachunek, któremu limitu kredytowego nie przyznano — nie limit kredytowy zerowy. Odwrotna decyzja
   zatrzymałaby rozliczenie wszystkim klientom bez produktu kredytowego.
4. **Operacja ponad limitem kredytowym i tak wchodzi do wykorzystania**, więc kolejne też zostaną
   zgłoszone. Operator ma zobaczyć wszystkie, nie tylko pierwszą.
5. **Limit kredytowy wybieram po dacie waluty operacji**, nie po dacie księgowania.
6. **Wpisy konfiguracji z błędem są pomijane**, a nie wywracają całego przebiegu.

### Na co zwrócić uwagę przy recenzji

- Czy założenia z listy wyżej zgadzają się z tym, czego oczekuje biznes.
- Czy kształt wyniku (`ok`, `przekroczenieGrosze`, `bledy`) da się bez bólu wpiąć tam,
  gdzie docelowo stanie bramka.
- Czy przypadki brzegowe są pokryte testami i czy któregoś nie brakuje.
- Czy komunikaty błędów wystarczą operatorowi, żeby wiedzieć, co się stało.
