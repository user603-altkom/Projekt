# D2-05A — Test importu przed poprawką

**60 min · Copilot Agent · zmieniasz testy, na początku bez zmian parsera**

> Franek: „Testy są zielone. Tego przypadku nie pytały”.

**Cel:** napisać test z oczekiwaniem ustalonym niezależnie od kodu. Po obiedzie ten sam test poprowadzi diagnozę w [D2-05B](../cw07/README.md). Import jest osobnym modułem aplikacji; jego naprawa nie podłączy limitów kredytowych do UI.

**Otwórz:** `src/import/parseBankFile.ts`, `src/model.ts`, `tests/transactions/validate.test.ts`, `dane/wyciag_probka.csv`. Wszystkie polecenia z katalogu repo.

1. Uruchom `npm test`. Ustal ręcznie trzy oczekiwania: `0.29` PLN to **29 groszy**, `1 234,56` to **123456 groszy**, wiersz z niekompletnymi kolumnami zostaje pominięty. Pełny mały wiersz do pierwszego testu:

```text
id;nr_rachunku;kwota;waluta;typ;data_ksiegowania;data_waluty;tytul
TEST-01;20000089180903978540630428;0.29;PLN;WN;2026-08-20T10:00:00;2026-08-20;Proba
```

2. Poproś agenta o tabelę scenariuszy, następnie o testy w `tests/import/parseBankFile.test.ts` (uzupełnij plik, jeśli istnieje). Nie zmieniaj `src` ani CSV. W oczekiwaniu wpisz ustalone grosze; nie wywołuj parsera do obliczenia jego własnej odpowiedzi.
3. Uruchom `npm test -- tests/import/parseBankFile.test.ts`. Sprawdź expected/actual. Zapisz w `portfolio/cw06-testy.md` wejście, oczekiwanie, komendę i rzeczywisty wynik. Potem `npm run raport`: zachowaj różnicę, żeby wrócić do niej po obiedzie.

**Gotowe:** trzy scenariusze, testy i wynik; czerwony test z poprawnym oczekiwaniem jest wartościowym rezultatem. Zapisz lokalny commit testów według [zasad](../../PRACA-WARSZTATOWA.md). Nie usuwaj czerwonego testu.

**Prompt pomocniczy:** „Najpierw pokaż wejście, oczekiwanie i uzasadnienie. Dopisz testy zgodnie z validate.test.ts. Nie poprawiaj parsera. Po wykonaniu pokaż expected/actual i zatrzymaj się”.

**Jeśli parser już poprawiłeś:** użyj zapisu wcześniejszego wyniku albo osobnej kopii startera; nie cofaj swojej pracy. Jeżeli rozpoznasz przyczynę przed obiadem, możesz przejść dalej — zapisz przebieg przed/po.

**Dla szybszych:** ujemny zapis kwoty, BOM i puste wiersze; wybierz jeden przypadek. Więcej: [rozszerzenie](ROZSZERZENIE.md).
