# Rezerwa - Narzędzie, które zaraz wyrzucisz

**Czas:** 40 min · **Każdy u siebie** · Sprawdzenie w dwójce

Bierz tę kartę po ćw. 07, z naprawionym raportem i zapisaną diagnozą. Potrzebujesz Copilota, repo i przeglądarki. Gotowy HTML ma działać lokalnie bez instalacji; `npm run raport` będzie niezależną kontrolą wyniku.

## Cel

Umieć kazać modelowi zbudować jednorazowe narzędzie do obejrzenia własnych danych - i umieć sprawdzić, czy liczby na ekranie są policzone, czy podyktowane.

## Zgłoszenie

> Z rozmowy na korytarzu, po zamknięciu uzgodnienia:
>
> Dobra, wiemy już, skąd się brała różnica. Ale za każdym razem, kiedy ktoś pyta
> „a których operacji to dotyczyło", muszę to liczyć od nowa w arkuszu i za
> każdym razem inaczej mi wychodzi.
>
> Nie chcę z tego robić funkcji w systemie, bo to na dwa tygodnie, a potem i tak
> nikt tego nie otworzy. Chcę jeden plik, który sobie otworzę, jak audyt zapyta.

## Kroki

1. **Napisz polecenie, zanim otworzysz czat.** Ma zawierać ograniczenia, nie życzenia: jeden plik `.html`, cały CSS i JavaScript w środku, zero pobierania czegokolwiek z sieci, otwierany podwójnym kliknięciem na cudzej maszynie bez internetu. Zapisz go jako `portfolio/narzedzie.html`; od początku wymagaj pola wyboru lokalnego pliku CSV. Strona nie powinna próbować automatycznie czytać ścieżki z dysku.
2. **Dopisz, skąd mają się wziąć liczby.** Dane są w `dane/wyciag_2026_08.csv`, nazwy pól jak w `src/model.ts`. Dołącz także `src/import/parseBankFile.ts`, żeby model poznał format pliku. Wynik ma być policzony z wybranego CSV, nie wpisany w kod. Pokaż osobno: dokładną sumę z tekstu, sumę kontrolną z nagłówka i ich różnicę. Jeżeli pokazujesz historyczne straty groszy, dodaj osobną kolumnę „stara konwersja” i porównaj ją z dokładnym przeliczeniem na grosze.
3. **Otwórz wynik w przeglądarce i porównaj z `npm run raport`.** Porównaj dokładną sumę z naprawionym raportem; różnica względem sumy kontrolnej powinna wynosić zero. Historyczne −23 grosze to osobna miara, nie oczekiwany wynik naprawionego importu. Są to sumy techniczne całego pliku, nie bilans PLN.
4. **Jeśli się nie zgadza, wróć do modelu z różnicą, nie z opisem.** Podaj rzeczywiste dwie wartości w groszach i wskaż, co porównujesz: sumę bieżącą, kontrolną czy historyczne odchylenie. Nie podpowiadaj modelowi błędnej sumy sprzed naprawy.
5. **Zajrzyj do kodu, który dostałeś, i znajdź miejsce, gdzie liczba wchodzi do programu.** Czy jest wyliczona, czy wklejona? To rozstrzyga, czy narzędzie będzie działać na wrześniowym wyciągu.

> **Jeśli utknąłeś po 10 minutach**
> Model najpewniej odmawia czytania pliku albo wymyśla dane. Nie walcz z tym -
> zmień zadanie: niech wygeneruje stronę, która wczytuje plik wskazany przez
> okno wyboru w przeglądarce. Wtedy dane podajesz ty, a on pisze tylko liczenie
> i rysowanie.

> **Pracujesz z bazą, nie z TypeScriptem**
> Zamiast strony poproś o jedno zapytanie, które zwraca to samo zestawienie:
> operacje wnoszące odchylenie i sumę narastającą. Dialekt Oracle, jak w `sql/`.
> Bez środowiska Oracle nie przedstawiaj tego jako uruchomionego rozwiązania.
> Przygotuj analizę zapytania i kontrprzykłady: przejdź je ręcznie na
> pięciu pierwszych wierszach z wyciągu.

> **Skończyłeś wcześniej**
> Na kopii HTML zepsuj narzędzie tak, żeby dalej wyglądało dobrze: wpisz różnicę na
> sztywno i sprawdź, ile czasu zajmie partnerowi zauważenie tego
> bez zaglądania w kod. Potem odpowiedz na pytanie, które z tego wynika: po czym
> poznajesz, że cudze narzędzie liczy, a nie powtarza?

## Gotowe, gdy

- [ ] masz jeden plik `.html`, który otwiera się bez instalacji i bez internetu, i pokazuje operacje wnoszące odchylenie
- [ ] dokładna suma zgadza się z naprawionym `npm run raport`, a historyczne odchylenia są podpisane oddzielnie; umiesz wskazać kod obliczenia
- [ ] po wybraniu innego małego CSV liczby przeliczają się; przygotuj własne dwa wiersze, policz sumę ręcznie i wpisz odpowiadającą jej sumę kontrolną
- [ ] umiesz powiedzieć, co się stanie z tym narzędziem przy wyciągu za wrzesień - i czy to jest problem

## Na koniec ćwiczenia

Zachowaj `portfolio/narzedzie.html` oraz krótką notatkę ze sprawdzenia. W wariancie Oracle zamiast HTML pokaż partnerowi zapytanie i ręczny rachunek, z jawnym brakiem uruchomienia. `portfolio/` jest ignorowane przez Git; nie potrzebujesz commita.
