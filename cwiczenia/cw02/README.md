# Ćw. 2 — Trzy jakości promptu

**Czas:** 25 min · **Praca w parach** · Klawiaturę ma osoba, która czuje się mniej pewnie

## Cel

Umieć wskazać, który element polecenia zmienił odpowiedź. Nie „precyzyjniej znaczy lepiej",
tylko: ten fragment, ta zmiana, ten skutek.

## Zadanie

```
wyjaśnij src/transactions/validate.ts
```

Trzy razy, w narzędziu, za każdym razem precyzyjniej.

## Kroki

1. **Otwórz `src/transactions/validate.ts` w narzędziu.** Jeśli narzędzie nie widzi pliku
   albo repozytorium nie działa — powiedz o tym teraz, na głos. Do samego ćwiczenia
   wystarczy ekran drugiej osoby.
2. **Zapytaj dokładnie tak, jak w zadaniu.** Nic nie dokładaj. Zachowaj odpowiedź.
3. **Zapytaj drugi raz, dokładając siebie i sytuację.** Kim jesteś, po co ci to wyjaśnienie,
   co z nim zrobisz, co już wiesz.
4. **Zapytaj trzeci raz, dokładając kształt odpowiedzi i to, co musi w niej być.** Ile,
   w jakiej formie, czego nie wolno pominąć, czego nie pisać.
5. **Postaw trzy odpowiedzi obok siebie i nazwij różnice.** Przy każdej różnicy wskaż
   fragment polecenia, który ją wywołał. Zapisz to razem z trzema poleceniami
   w `cwiczenia/cw02/notatki.md`.

> **Jeśli utknąłeś po 10 minutach**
> Trzecia odpowiedź wyszła prawie taka sama jak druga? Sprawdź, czy dołożyłeś cokolwiek,
> czego model nie mógł wyczytać z samego pliku. Czego o twojej sytuacji nie wie nikt
> poza tobą?

> **Nie czytasz TypeScriptu na co dzień**
> Zrób to samo na `sql/001_init_transakcje.sql`. Ta sama tabela, ten sam kontrakt danych,
> inny dialekt. Trzy poziomy precyzji i ta sama notatka na końcu.

> **Skończyłeś wcześniej**
> Weź najlepsze z trzech poleceń i usuń z niego dokładnie jedno zdanie. Zapytaj jeszcze raz,
> w nowej rozmowie. Które zdanie naprawdę niosło odpowiedź, a które tylko dobrze wyglądało?

## Gotowe, gdy

- [ ] masz `cwiczenia/cw02/notatki.md` z trzema poleceniami i listą różnic między odpowiedziami
- [ ] przy każdej różnicy potrafisz pokazać drugiej osobie w parze fragment polecenia,
      który ją wywołał
- [ ] sprawdziłeś w pliku co najmniej jedno zdanie z najlepszej odpowiedzi i wiesz, czy się
      zgadza z tym, co w nim faktycznie stoi

## Na koniec ćwiczenia

```
git switch -c imie/cw02 && git add -A && git commit -m "cw02" --allow-empty && git switch main
```
