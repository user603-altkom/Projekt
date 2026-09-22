# Kontrakt wspólny dla kodu, raportu i testów

Plik `src/ocena.mjs` eksportuje `ocenLimit(wejscie)`. Używamy JavaScript ESM (`.mjs`), aby uruchomić laboratorium samym Node.

```js
{
  kontrahent: "K-001",
  limitBazowyGrosze: 10000,
  wykorzystanieGrosze: 12000,
  teraz: "2026-09-22T09:00:00Z",
  wniosek: {
    id: "W-001",
    limitGrosze: 15000,
    autor: "operator-1",
    zatwierdzil: "operator-2",
    status: "zatwierdzony",
    od: "2026-09-22T08:00:00Z",
    do: "2026-09-22T10:00:00Z"
  }
}
```

`wniosek` może być `null`. Poprawny wynik to obiekt:

```js
{
  limitEfektywnyGrosze: 15000,
  przekroczenieGrosze: 0,
  zrodlo: "czasowy",
  wniosekId: "W-001"
}
```

Dla bazy: `zrodlo: "bazowy"`, `wniosekId: null`. Błędne dane: rzuć `Error` z czytelnym komunikatem. Testuj fakt błędu i jego sens, bez wiązania testów z interpunkcją komunikatu. Okres oceniaj liczbowo po parsowaniu czasu. Nie zmieniaj sygnatury ani nazw pól, bo raport i serwer już z nich korzystają.

Dane wejściowe, w tym wniosek, muszą pozostać niezmienione. Testy tworzą własne małe przykłady. Nie implementuj odczytu plików, UI ani wywołań sieciowych w tej funkcji.
