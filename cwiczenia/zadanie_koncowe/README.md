# Zadanie końcowe — limity kredytowe wchodzą do rozliczenia

**Czas:** 55 min · **Każdy u siebie** · Sprawdzenie w dwójce

## Cel

Umieć doprowadzić agenta przez zmianę większą niż jeden plik tak, żeby na końcu wiedzieć
o niej tyle, ile wiedziałbyś, gdybyś napisał ją sam — a w szczególności umieć wskazać
miejsca, w których agent rozstrzygnął coś, czego nikt nie rozstrzygnął.

## Zgłoszenie

> Od: Departament Produktów dla Firm
> Do: Zespół Rozliczeń
> Temat: re: BR-2026-0142 — i co dalej
>
> Dzień dobry,
>
> dostaliśmy informację, że moduł liczący limity jest gotowy i ma testy. Sprawdziliśmy
> u siebie: w rozliczeniu dziennym nadal nie widać ani jednego przekroczenia. Opiekunowie
> klientów dalej dowiadują się o wszystkim z reklamacji, a Ryzyko dalej składa swoją listę
> ręcznie z dwóch eksportów.
>
> Z naszej strony zgłoszenie jest zamknięte dopiero wtedy, gdy działają te trzy rzeczy
> z pierwotnego pisma: rozliczenie zna limit rachunku, przekroczenie jest zgłaszane
> z konkretem, a Ryzyko dostaje listę bez składania jej ręcznie.
>
> Komitet produktowy zbiera się za dwa tygodnie. Do tego czasu nie rozstrzygniemy tego,
> czego nie rozstrzygnęliśmy w sierpniu. Jeżeli coś Wam po drodze będzie potrzebne do
> decyzji, wypiszcie to, a my to wniesiemy — tylko wypiszcie wprost, bo ostatnim razem
> okazało się po fakcie, że ktoś przyjął coś za nas.

Pełne zgłoszenie: `dane/zgloszenie_limity.md`. Moduł, o którym pisze Departament, jest na
gałęzi `recenzja/cw10-limity-kredytowe` — ten sam, który recenzowałeś rano.

## Kroki

1. **Zbierz to, co już masz, zanim otworzysz narzędzie.** Kryteria akceptacji napisane
   w Ćw. 4 (`git switch imie/cw04`, przeczytaj, `git switch main`), uwagi z recenzji
   z Ćw. 10 i plik instrukcji z Ćw. 9. To jest twój materiał wejściowy — nie zaczynasz
   od zera i agent też nie powinien.
2. **Napisz jedno wejście dla agenta i dopiero potem je wyślij.** Ma zawierać cel, pliki
   od których zacząć, to czego nie wolno ruszyć, i sposób, w jaki sprawdzisz, że jest
   zrobione. Zapisz je sobie — będzie ci potrzebne w kroku 5.
3. **Zatrzymaj go na planie.** Zanim powstanie pierwsza linia kodu, zestaw plan z twoimi
   kryteriami z Ćw. 4. Szukasz dwóch rzeczy: czego w planie brakuje wobec zgłoszenia
   i co w nim jest, choć nikt o to nie prosił.
4. **Puść wykonanie i sprawdź je liczbą.** `npm test`, `npm run typecheck`,
   `npm run raport`. Raport przed zmianą i po zmianie ma się różnić w dający się wskazać
   sposób — jeżeli się nie różni, moduł nadal nie ma odbiorcy.
5. **Wypisz rozstrzygnięcia, których komitet nie podjął.** Najpierw wyjmij swoją listę
   z kroku 1 i zaznacz, które z nich miałeś już wtedy, a których nie. Dopiero potem
   porównaj ją z tą: limit zmieniający się w czasie, rachunek bez limitu, limit zero,
   zwroty i storna tego samego dnia, obciążenie w innej walucie niż limit. Przy każdym
   zapisz, co się z nim stało w kodzie i skąd to wiesz. Osobno zaznacz te, o których
   agent ci nie powiedział.

   Ta różnica między twoją listą a tą jest wynikiem ćwiczenia, nie porażką. Pokazuje,
   czego nie widać przy pierwszym czytaniu zgłoszenia, a kosztuje przy wdrożeniu.

> **Jeśli utknąłeś po 20 minutach**
> Zejdź do jednej rzeczy z trzech: niech `npm run raport` pokaże choć jedno przekroczenie
> na `dane/wyciag_2026_08.csv`. Reszta zgłoszenia poczeka. Jedna działająca ścieżka
> od danych do wyniku jest warta więcej niż trzy zaczęte.

> **Pracujesz z bazą, nie z TypeScriptem**
> To samo zgłoszenie od strony `sql/raport_dzienny.sql`: limit przypisany do rachunku,
> przekroczenia widoczne w wyniku zapytania, lista dla Ryzyka jako osobne zapytanie.
> Kroki 2–5 obowiązują bez zmian, a liczbą sprawdzającą jest wynik na danych
> z `sql/001_init_transakcje.sql`.

> **Skończyłeś wcześniej**
> Weź pytanie o zwroty i storna tego samego dnia — to jedyne, przy którym zgłaszający
> wprost piszą, że mają różne zdania. Przygotuj dwie wersje zachowania i po jednym teście
> do każdej. Nie wybieraj za komitet; pokaż mu, między czym wybiera.

## Gotowe, gdy

- [ ] `npm run raport` pokazuje coś, czego nie pokazywał przed twoją zmianą, i umiesz
      wskazać, która operacja i o ile przekroczyła limit
- [ ] masz spisane rozstrzygnięcia z kroku 5 i przy każdym stoi, czy podjąłeś je ty,
      czy agent — a przy tych agenta, czy powiedział ci o tym sam
- [ ] partner czyta twój opis zmiany i wie, co ma sprawdzić ręcznie, bez pytania cię o nic

## Na koniec ćwiczenia

```
git switch -c imie/zadanie-koncowe && git add -A && git commit -m "zadanie-koncowe" --allow-empty && git switch main
```

---

## Materiał: trzy mniejsze zgłoszenia z backlogu

Te trzy karty zostają w katalogu jako materiał zapasowy — bierzesz jedną zamiast zadania
powyżej, jeżeli wolisz przejść pełny cykl na mniejszym zakresie.

> `01_ujemna_kwota_w_walidacji.md` — „Operacja z ujemną kwotą przechodzi walidację"
> `02_raport_dzienny_sumy_per_waluta.md` — „Raport dzienny sumuje operacje w różnych walutach do jednej kwoty"
> `03_import_odrzuca_niezgodna_sume_kontrolna.md` — „Import przyjmuje plik, którego suma kontrolna nie zgadza się z zawartością"

**Uwaga do trzeciego zgłoszenia.** Wdrożone wprost zatrzyma `npm run raport` na głównym
pliku wyciągu — `dane/wyciag_2026_08.csv` jest właśnie plikiem, którego suma kontrolna nie
zgadza się z zawartością. To nie jest twój błąd ani błąd repozytorium, tylko zderzenie
dwóch prawdziwych wymagań, i zgłoszenie to przewiduje. Przeczytaj jego kryteria akceptacji
do końca, zanim uznasz, że coś zepsułeś.
