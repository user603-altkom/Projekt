# Ćw. 02 — Trzy jakości promptu

**Dzień 1 · 25 min · Copilot Chat w VS Code · bez zmian w kodzie**

> Franek: „Routing działa. Tylko nikt nie wie, dlaczego akurat to konto”.

**Routing** to tutaj wybór reguły, według której operacja trafia na konto księgowe. To inna część tej samej aplikacji niż ekran limitów. Nie musisz znać jej wcześniej. Nauczysz się prosić o wyjaśnienie, które da się sprawdzić w kodzie i wyniku polecenia.

## Przygotuj — 3 min

Pracuj w otwartym repo z [START.md](../../START.md). Do czatu dołącz trzy pliki z `src/routing`: `schemat.ts`, `silnik.ts`, `kontoKsiegowe.ts`. Użyj **Add Context / Dodaj kontekst** lub wyboru pliku po `#`.

**Każdy z trzech promptów wyślij w nowym czacie**, z tymi samymi plikami i tym samym wybranym modelem. W przeciwnym razie kolejne odpowiedzi korzystałyby też z poprzedniej rozmowy. Nie zmieniaj ustawień między próbami. Jeśli Twoja wersja nie pozwala wybrać modelu, zachowaj ustawienie domyślne.

## 1. Porównaj trzy polecenia — 10 min

Możesz skopiować poniższe przykłady. W drugim i trzecim dopasuj opis swojej roli. Nie zlecaj edycji kodu.

**A — samo ogólne pytanie:**

```text
Wyjaśnij src/routing. Nie zmieniaj plików.
```

**B — cel i odbiorca:**

```text
Przejmuję utrzymanie aplikacji po Franku i nie znam jej reguł księgowania.
Wyjaśnij src/routing tak, żebym potrafił opowiedzieć koledze, jak operacja
z wyciągu trafia na konto księgowe. Wyjaśnij używane pojęcia i rolę trzech
plików. Nie zmieniaj plików.
```

**C — konkretne pytanie, źródło i sposób sprawdzenia:**

```text
Przejmuję utrzymanie aplikacji po Franku i nie znam jej reguł księgowania.
Na podstawie trzech dołączonych plików wyjaśnij, jak wybierana jest reguła,
gdy do jednej operacji pasuje kilka warunków. Czy wygrywa pierwsze
pasujące dopasowanie, ostatnie, czy stosowane są wszystkie?
Pokaż jedną konkretną funkcję i fragment kodu uzasadniający odpowiedź.
Następnie wyjaśnij, co robi R12 i skąd w raporcie wiemy,
ile operacji zostało do niej przypisanych.
Odpowiedz w maksymalnie pięciu punktach. Oddziel fakty z kodu od informacji,
które wymagają uruchomienia programu. Nie zgaduj liczby operacji
na podstawie samych reguł. Nie zmieniaj plików.
```

Zachowaj trzy polecenia i istotne fragmenty odpowiedzi. **Pierwsza odpowiedź też może być dobra.** Porównujesz przydatność i możliwość sprawdzenia, nie długość tekstu ani wygląd diagramu.

## 2. Sprawdź odpowiedź — 7 min

W drugim terminalu, w katalogu z `package.json`, uruchom:

```sh
npm run ksiegowanie
```

W wyniku znajdź zestawienie reguł i pozycję **R12**. Zapisz faktyczną liczbę. Jeśli model podał liczbę, porównaj ją z wynikiem. Jeśli słusznie odmówił zgadywania, dołącz wynik komendy i poproś go o wskazanie właściwego wiersza — odmowa bez danych była poprawna.

Otwórz też `src/routing/silnik.ts` i funkcję `dopasujRegule`. Sprawdź odpowiedź o kolejności dopasowania. **Zestawienie liczby operacji samo nie dowodzi, jak działa algorytm.**

## 3. Zapisz wniosek — 5 min

W `portfolio/cw02-prompty.md` zapisz trzy prompty i krótką tabelę:

| Próba | Co dodałem do polecenia? | Co zaobserwowałem w odpowiedzi? | Jak to sprawdziłem? |
|---|---|---|---|
| A / B / C | Cel, odbiorca, konkretne pytanie lub format | Konkretna różnica albo brak różnicy | Fragment kodu / wynik komendy |

Pokaż partnerowi odpowiedź o kolejności reguł i odczytaną liczbę dla R12. Zakończ zdaniem: **„Przy następnym pytaniu o obcy kod dodam…”**.

Jedno porównanie nie dowodzi, że konkretne zdanie zawsze poprawia model. Zapisuj obserwację, a nie gwarancję. Gdy odpowiedzi są podobne, też masz wynik.

**Gotowe:** trzy próby, jedna obserwacja różnicy lub jej braku, sprawdzona reguła wyboru i liczba z uruchomienia. Notatki są w `portfolio/`; nie robisz commita.

## Warianty

**Wolisz SQL:** zamiast trzech plików dołącz `sql/001_init_transakcje.sql`. W A poproś o wyjaśnienie pliku, w B dodaj swoją rolę i cel, a w C zapytaj: „Czy obciążenie zapisujemy jako kwotę ujemną? Pokaż kolumny, komentarze i ograniczenia uzasadniające odpowiedź. Oddziel deklarowaną regułę od tego, co wymusza SQL”. Sprawdź `kwota`, `typ_operacji` i odpowiednie `CHECK`. Ten plik jest materiałem do czytania w dialekcie Oracle — **nie uruchamiaj go w SQLite ani nie instaluj bazy**. Zamiast liczby dla R12 zapisz jeden konkretny przykład wiersza, który narusza wskazane ograniczenie.

**Komenda nie działa:** poproś partnera o wynik i zapisz jego pochodzenie. Nie zgaduj liczby i nie naprawiaj środowiska przez całe ćwiczenie.

**Rozszerzenie:** usuń jedno zdanie z promptu C i powtórz go w nowym czacie z tymi samymi plikami. Sprawdź, czy nadal dostajesz potrzebny dowód. Nie uznawaj zerowej liczby dopasowań reguły w jednym pliku za dowód, że reguła nigdy nie może zadziałać.
