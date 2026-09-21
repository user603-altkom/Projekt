# Dokumentacja na żądanie: Context7 i CLI

**Dzień 3 · 11:40–12:00 · 20 min · demo + krótka próba**

> Franek: „Pamiętałem składnię. Biblioteka pamiętała inną”.

Sprawdź w dokumentacji Vitest składnię `test.each`, a potem użyj jej w małym teście. **Context7 dostarcza dokumentację; lokalne uruchomienie sprawdza, czy kod działa w tym repo.**

## Przygotowanie i demo — 5 min

Otwórz terminal w głównym katalogu repo i uruchom:

```bash
npm ls vitest --depth=0
```

Zapisz zainstalowaną wersję. `package-lock.json` opisuje wersję przypiętą; jeśli jej nie masz lokalnie, wróć do przygotowania środowiska z [START.md](../../START.md).

Prowadzący pokazuje Context7 w Copilot Agent: wybór biblioteki przez `resolve-library-id`, potem pobranie dokumentacji przez `query-docs`. Rozszerzenie `Upstash.context7-mcp` i serwer widoczny w **MCP: List Servers** powinny być przygotowane przed blokiem. Jeśli serwer nie działa, po maksymalnie 3 minutach przejdź do planu B — nie poświęcaj ćwiczenia na instalację.

## Własna próba — 10 min

Otwórz `src/interest/valueDate.ts` i znajdź `isWeekend`. Sprawdzasz wyłącznie, czy data jest sobotą lub niedzielą, nie cały kalendarz świąt. Dołącz plik w Copilocie i podaj prompt, uzupełniając wersję z terminala:

```text
Używamy Vitest w wersji [wpisz wynik npm ls]. Przez Context7 znajdź
składnię test.each do testu parametryzowanego. Do serwera wyślij tylko
pytanie o bibliotekę i wersję, bez treści repozytorium.
Podaj źródło i wersję dokumentacji. Jeśli tej wersji nie ma, zaznacz to.

Następnie dopisz tests/interest/isWeekend.mcp.test.ts dla isWeekend:
2026-08-14 → false, 2026-08-15 → true, 2026-08-16 → true.
Nie zmieniaj funkcji ani zależności. Użyj trzech wierszy test.each,
zgodnie ze stylem istniejących testów.
```

Sprawdź, czy widać rzeczywiste wywołanie Context7 i jego odpowiedź. Potem uruchom:

```bash
npm test -- tests/interest/isWeekend.mcp.test.ts
```

Jeżeli plik już istnieje, uzupełnij go zamiast nadpisywać. Zapisz w `portfolio/mcp.md`: wersję zainstalowaną, źródło dokumentacji, wersję potwierdzoną przez źródło lub „nieustalona” i wynik testu. Nie zakładaj, że Context7 ma dokumentację każdego wydania. Nie aktualizuj biblioteki tylko po to, by dopasować ją do odpowiedzi.

**Plan B:** otwórz [oficjalną dokumentację `test.each`](https://vitest.dev/api/test#test-each) i wykonaj ten sam test. Zaznacz, że nie użyłeś MCP; bieżąca strona nie musi odpowiadać przypiętej wersji. Uruchomienie testu weryfikuje ten przykład w Twoim środowisku.

## Odbiór — 5 min

**Gotowe:** trzy przypadki przechodzą, masz źródło i jawny status wersji dokumentacji. Partner potrafi wskazać osobno dowód pobrania informacji oraz dowód wykonania kodu.

Porównaj: MCP jest interfejsem udostępniania narzędzi, CLI sposobem wywołania programu. Mogą służyć różnym lub podobnym zadaniom. MCP nie jest z definicji lepsze ani oszczędniejsze tokenowo — znaczenie ma treść wyniku, uprawnienia i obsługa błędów.

Po przejrzeniu nowego testu:

```bash
git add tests/interest/isWeekend.mcp.test.ts
git diff --cached
git commit -m "Test parametryzowany dni weekendowych"
```

**Rozszerzenie:** porównaj przydatność odpowiedzi na szerokie pytanie „jak testować w Vitest?” i konkretne pytanie o `test.each`.

Konfiguracja: [Context7 dla VS Code](https://context7.com/docs/clients/vscode), sprawdzona 21.09.2026.
