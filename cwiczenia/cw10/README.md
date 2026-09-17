# Limity kredytowe rachunków — zmiana do recenzji

Zmiana czeka na recenzję. Cały jej kod jest w `zmiana.diff` w tym katalogu — to ten sam
zestaw commitów, co na gałęzi `recenzja/cw10-limity-kredytowe`, zapisany jako plik, żeby
dało się go wskazać narzędziu bez przełączania gałęzi.

```
git diff main...recenzja/cw10-limity-kredytowe   # to samo, co w zmiana.diff
git log --oneline main..recenzja/cw10-limity-kredytowe
```

## Opis zmiany (od autora)

Zgłoszenie z katalogu `dane/` mówi, że rachunki firmowe mają mieć przypisany limit,
powyżej którego obciążenia nie powinny wchodzić do rozliczenia bez decyzji opiekuna.
Dziś nie mamy tego nigdzie — limit istnieje w katalogu produktów, ale rejestr transakcji
nic o nim nie wie.

Dokładam moduł `src/limits/` i konfigurację limitów w `dane/`. Moduł, zgodnie z tym, jak
zbudowana jest reszta repozytorium, importuje wyłącznie z `src/model.ts` i niczego nie
modyfikuje w istniejących plikach — sprawdzenie limitu da się wpiąć w rejestr albo
w raport dzienny osobną zmianą, kiedy ustalimy, gdzie ma stać bramka.

Co robi:

- czyta konfigurację limitów przypisanych do rachunków (kwota, data wejścia w życie),
- liczy, ile z limitu zużyły obciążenia, które weszły już do rozliczenia,
- sprawdza pojedynczą operację oraz całą partię naraz i zwraca listę komunikatów
  w tym samym kształcie, co walidacja transakcji (`ok` + `bledy`),
- do testów dołożyłem katalog `tests/limits/`.

## Decyzje, które podjąłem sam

Zgłoszenie nie rozstrzyga wszystkiego. Tam, gdzie musiałem coś założyć, założyłem tak:

1. **Limit dotyczy sumy obciążeń, nie pojedynczej operacji.** Inaczej rachunek
   wyprowadziłby dowolną kwotę serią mniejszych przelewów.
2. **Uznania nie zmniejszają wykorzystania limitu.** Liczę obciążenia w partii, nie saldo
   rachunku.
3. **Rachunek bez wpisu w konfiguracji przechodzi bez ograniczenia.** Brak limitu to
   rachunek, któremu limitu nie przyznano — nie limit zerowy. Odwrotna decyzja
   zatrzymałaby rozliczenie wszystkim klientom bez produktu kredytowego.
4. **Operacja ponad limitem i tak wchodzi do wykorzystania**, więc kolejne też zostaną
   zgłoszone. Operator ma zobaczyć wszystkie, nie tylko pierwszą.
5. **Limit wybieram po dacie waluty operacji**, nie po dacie księgowania.
6. **Wpisy konfiguracji z błędem są pomijane**, a nie wywracają całego przebiegu.

## Na co zwrócić uwagę przy recenzji

- Czy założenia z listy wyżej zgadzają się z tym, czego oczekuje biznes.
- Czy kształt wyniku (`ok`, `przekroczenieGrosze`, `bledy`) da się bez bólu wpiąć tam,
  gdzie docelowo stanie bramka.
- Czy przypadki brzegowe są pokryte testami i czy któregoś nie brakuje.
- Czy komunikaty błędów wystarczą operatorowi, żeby wiedzieć, co się stało.
