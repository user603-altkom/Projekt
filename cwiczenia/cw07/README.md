# D2-05B — Diagnoza i poprawka importu

**30 min · Copilot Agent · diagnoza, zgoda na małą zmianę, regresja**

> Franek: „Brakuje 23 groszy. To nie napiwek dla systemu”.

**Start:** własny test i `portfolio/cw06-testy.md`, `src/import/parseBankFile.ts`, `src/reports/dailyReport.ts`, `dane/wyciag_2026_08.csv`. Bez testu wróć do małego przykładu `0.29` z [części A](../cw06/README.md).

1. **Odtwórz.** Uruchom test importu i `npm run raport`. Starter liczy 1322594433 grosze wobec sumy kontrolnej 1322594456: różnica −23 grosze. Jeśli Twoja wersja już daje zgodność, nie przywracaj usterki.
2. **Sprawdź hipotezę.** Zleć prześledzenie kwoty od tekstu CSV do groszy. Zażądaj obliczenia dla małego przykładu, nie tylko wskazania podejrzanej linii. Porównanie wszystkich operacji powinno liczyć wartość referencyjną z cyfr części całkowitej i ułamkowej, niezależnie od badanego przeliczenia. Zachowaj listę dotkniętych ID, jeśli mieści się w czasie; podstawą jest odtworzony przykład i uzgodniona suma.
3. **Popraw i sprawdź.** Zatwierdź minimalną zmianę parsera, zachowaj obsługę dotychczasowych formatów. Uruchom test importu, `npm test`, `npm run typecheck`, `npm run raport`. Czy zmieniono tylko to, co uzgodniliście? Dopisz jedną konkretną konwencję testowania do instrukcji.

```text
Wyjaśnij różnicę na naszym małym teście i wyniku raportu.
Najpierw diagnoza bez edycji: pokaż drogę kwoty i obliczenie.
Nie zmieniaj danych ani oczekiwania testu. Po mojej akceptacji
zaproponuj minimalną poprawkę i uruchom regresję.
```

**Gotowe:** `portfolio/cw07-diagnoza.md` zawiera przyczynę, wejście, expected/actual przed i po oraz komendy. Agentowe „naprawione” bez uruchomionego testu nie wystarcza. Zapisz parser, testy i zmienione instrukcje w lokalnym commicie.

**Dla szybszych:** pełna lista dotkniętych ID i suma różnic ze skryptu; [rozszerzenie](ROZSZERZENIE.md). Jeżeli duży raport nadal się nie zgadza, nazwij nierozwiązaną część i zachowaj mały dowód — nie maskuj wyniku.
