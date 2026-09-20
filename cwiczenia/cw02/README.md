# Ćw. 2 — Trzy jakości promptu

**Czas:** 25 min · **Każdy u siebie** · Sprawdzenie w dwójce

## Cel

Umieć wskazać, który element polecenia zmienił odpowiedź. Nie „precyzyjniej znaczy lepiej",
tylko: ten fragment, ta zmiana, ten skutek.

## Zadanie

```
wyjaśnij src/routing
```

Trzy razy, w narzędziu, za każdym razem precyzyjniej.

To jest moduł, który decyduje, na które konto księgowe trafia każda operacja z wyciągu:
trzy pliki, dwanaście reguł, kilka tablic odwzorowań. Nie zdążysz go przeczytać w ćwiczeniu
i nie o to chodzi. Chodzi o to, żeby dowiedzieć się o nim czegoś prawdziwego, nie czytając go.

Uprzedzenie, żeby cię nie zaskoczyło: **pierwsza, najprostsza odpowiedź będzie dobra.**
Ładna, uporządkowana, z diagramem. To nie jest powód, żeby uznać ćwiczenie za zrobione.

## Kroki

1. **Dołącz do rozmowy cały katalog `src/routing`.** Trzy pliki: `schemat.ts`, `silnik.ts`,
   `kontoKsiegowe.ts`. Jeśli narzędzie nie widzi plików albo repozytorium nie działa —
   powiedz o tym teraz, na głos. Do samego ćwiczenia wystarczy ekran drugiej osoby.
2. **Zapytaj dokładnie tak, jak w zadaniu.** Nic nie dokładaj. Zachowaj odpowiedź.
3. **Zapytaj drugi raz, dokładając siebie i sytuację.** Kim jesteś, po co ci to wyjaśnienie,
   co z nim zrobisz, co już wiesz.
4. **Zapytaj trzeci raz o coś, czego nie da się zgadnąć z nazw plików.** Ma to być pytanie
   z odpowiedzią sprawdzalną: o konkretną operację i regułę, która ją przejmie, albo o to,
   czy któraś z dwunastu reguł nie może zadziałać nigdy — i dlaczego. Dołóż kształt
   odpowiedzi: ile, w jakiej formie, czego nie wolno pominąć.
5. **Sprawdź liczbą, nie wzrokiem.** `npm run ksiegowanie` wypisuje, ile operacji przejęła
   każda reguła i którym kanałem poszły. Zestaw to z tym, co napisał model. Zgadza się
   co do liczby czy tylko co do wrażenia?
6. **Postaw trzy odpowiedzi obok siebie i nazwij różnice.** Przy każdej różnicy wskaż
   fragment polecenia, który ją wywołał. Zapisz to razem z trzema poleceniami
   w `cwiczenia/cw02/notatki.md`.

> **Pierwsza odpowiedź już wygląda świetnie i nie wiesz, co dalej**
> Tak ma być i to jest sedno tego ćwiczenia. Dostaniesz podział na pliki, diagram
> przepływu i numery linii, w kilkadziesiąt sekund. Pytanie nie brzmi, czy odpowiedź
> jest ładna, tylko czy da się ją sprawdzić. Weź z niej jedno zdanie i spróbuj
> zestawić je z wydrukiem `npm run ksiegowanie`. Ile zdań z tej odpowiedzi przechodzi
> ten test?

> **Jeśli utknąłeś po 10 minutach**
> Trzecia odpowiedź wyszła prawie taka sama jak druga? Sprawdź, czy dołożyłeś cokolwiek,
> czego model nie mógł wyczytać z samych nazw plików. Czego o twojej sytuacji nie wie nikt
> poza tobą? I czy zadałeś pytanie, na które istnieje jedna sprawdzalna odpowiedź,
> czy takie, na które da się odpowiedzieć akapitem o wszystkim?

> **Nie czytasz TypeScriptu na co dzień**
> Zrób to samo na `sql/001_init_transakcje.sql`. Ta sama tabela, ten sam kontrakt danych,
> inny dialekt. Trzy poziomy precyzji i ta sama notatka na końcu. Krok 5 zastąp pytaniem
> o to, której kolumny dotyczy każdy z warunków — i sprawdź to w pliku.

> **Skończyłeś wcześniej**
> Weź najlepsze z trzech poleceń i usuń z niego dokładnie jedno zdanie. Zapytaj jeszcze raz,
> w nowej rozmowie. Które zdanie naprawdę niosło odpowiedź, a które tylko dobrze wyglądało?
>
> Potem zrób to samo od drugiej strony: weź najgorsze z trzech poleceń i dokładaj do niego
> po jednym zdaniu z najlepszego, za każdym razem w nowej rozmowie, aż odpowiedź stanie się
> użyteczna. Przy którym zdaniu to się stało?
>
> Na koniec połóż trzy odpowiedzi obok siebie i znajdź twierdzenie, które pada w jednej,
> a w pozostałych go nie ma. Sprawdź w kodzie, czy jest prawdziwe. Jedno z dwojga jest
> ciekawe: albo lepsze polecenie wydobyło coś, czego gorsze nie ruszyło, albo model dopisał
> szczegół, którego nie ma nigdzie.

## Gotowe, gdy

- [ ] masz `cwiczenia/cw02/notatki.md` z trzema poleceniami i listą różnic między odpowiedziami
- [ ] przy każdej różnicy potrafisz pokazać partnerowi fragment polecenia,
      który ją wywołał
- [ ] co najmniej jedno twierdzenie z najlepszej odpowiedzi zestawiłeś z wydrukiem
      `npm run ksiegowanie` i wiesz, czy zgadza się co do liczby

## Na koniec ćwiczenia

```
git switch -c imie/cw02 && git add -A && git commit -m "cw02" --allow-empty && git switch main
```
