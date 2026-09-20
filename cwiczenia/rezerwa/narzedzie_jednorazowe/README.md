# Rezerwa - Narzędzie, które zaraz wyrzucisz

**Czas:** 40 min · **Każdy u siebie** · Sprawdzenie w dwójce

Nic nie instalujesz, niczego nie uruchamiasz poza przeglądarką. Bierz tę kartę dopiero po Ćw. 7.

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

1. **Napisz polecenie, zanim otworzysz czat.** Ma zawierać ograniczenia, nie życzenia: jeden plik `.html`, cały CSS i JavaScript w środku, zero pobierania czegokolwiek z sieci, otwierany podwójnym kliknięciem na cudzej maszynie bez internetu.
2. **Dopisz, skąd mają się wziąć liczby.** Dane są w `dane/wyciag_2026_08.csv`, nazwy pól jak w `src/model.ts`. Powiedz wprost, że wynik ma być policzony z pliku, a nie wpisany w kod.
3. **Otwórz wynik w przeglądarce i porównaj z `npm run raport`.** Zgodność co do grosza albo nic.
4. **Jeśli się nie zgadza, wróć do modelu z różnicą, nie z opisem.** „Powinno być 13 225 944,33, jest X" działa lepiej niż „coś jest źle".
5. **Zajrzyj do kodu, który dostałeś, i znajdź miejsce, gdzie liczba wchodzi do programu.** Czy jest wyliczona, czy wklejona? To rozstrzyga, czy narzędzie będzie działać na wrześniowym wyciągu.

> **Jeśli utknąłeś po 10 minutach**
> Model najpewniej odmawia czytania pliku albo wymyśla dane. Nie walcz z tym -
> zmień zadanie: niech wygeneruje stronę, która wczytuje plik wskazany przez
> okno wyboru w przeglądarce. Wtedy dane podajesz ty, a on pisze tylko liczenie
> i rysowanie.

> **Pracujesz z bazą, nie z TypeScriptem**
> Zamiast strony poproś o jedno zapytanie, które zwraca to samo zestawienie:
> operacje wnoszące odchylenie i sumę narastającą. Dialekt Oracle, jak w `sql/`.
> Sprawdzenia dokonujesz tak samo - wynik ma się zgodzić z `npm run raport`.
> Zapytania nie uruchomisz, więc rozstrzygnij inaczej: przejdź je ręcznie na
> pięciu pierwszych wierszach z wyciągu.

> **Skończyłeś wcześniej**
> Zepsuj swoje narzędzie tak, żeby dalej wyglądało dobrze: wpisz różnicę na
> sztywno i sprawdź, ile czasu zajmie partnerowi zauważenie tego
> bez zaglądania w kod. Potem odpowiedz na pytanie, które z tego wynika: po czym
> poznajesz, że cudze narzędzie liczy, a nie powtarza?

## Gotowe, gdy

- [ ] masz jeden plik `.html`, który otwiera się bez instalacji i bez internetu, i pokazuje operacje wnoszące odchylenie
- [ ] liczby zgadzają się z `npm run raport` co do grosza, a ty umiesz pokazać w kodzie miejsce, w którym są liczone
- [ ] umiesz powiedzieć, co się stanie z tym narzędziem przy wyciągu za wrzesień - i czy to jest problem

## Na koniec ćwiczenia

Po kontroli diffu dodaj nowe pliki osobno (`git add ścieżka/do/pliku`). `git add -u` dodaje tylko zmiany już śledzonych plików. Pozostań na wspólnej gałęzi.

```
git status --short
git diff
git add -u
git commit -m "Warsztat: zakończony etap"
```
