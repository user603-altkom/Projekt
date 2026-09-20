# Ćw. 09 — Instrukcje, które rosną razem z wiedzą

**Dzień 1: 15 + 15 min; dzień 2: 10 min · Copilot**

Franek: „Za każdym razem tłumaczę to samo. Tylko nigdy nie zapisałem gdzie”.

## Część A — po pierwszej zmianie kodu

Otwórz `.github/copilot-instructions.md`. Dopisz 3–5 konkretnych zasad wynikających z doświadczenia: kwoty w całkowitych groszach; dane wejściowe są niezmienne; mały diff; uruchom właściwe sprawdzenia i podaj ich faktyczny wynik. Nie wpisuj całego poradnika promptowania.

## Część B — po wymaganiach

Uzupełnij instrukcje o regułę oddzielania decyzji biznesowych od założeń modelu. Wskaż prawdziwe polecenia z `package.json`. Przetestuj ten sam mały prompt w nowym czacie z instrukcją i porównaj wynik ze starym. Sprawdź, czy plik faktycznie trafił do kontekstu w używanej wersji VS Code.

## Część C — po testach

Dodaj jedną poznaną konwencję testów. Usuń regułę, która okazała się zbędna albo sprzeczna. `AGENTS.md` może przechowywać wspólne zasady; `CLAUDE.md` wskazuje je przez import. Nie zakładaj, że każdy harness czyta wszystkie pliki identycznie. Dla Copilota sprawdź ustawienia obsługi `AGENTS.md`.

**Gotowe:** krótki plik, konkretny przykład wpływu, brak sprzecznych duplikatów. Instrukcja jest częścią kontekstu, nie blokadą bezpieczeństwa. **Rozszerzenie:** instrukcja o ograniczonym zakresie dla testów, z potwierdzeniem kiedy się ładuje.
