> **Materiał wcześniejszej ścieżki.** Na aktualnych zajęciach otwórz [cw08b](../cw08b/README.md) oraz [spis ćwiczeń](../../CWICZENIA.md).

# D2-04 — Plan integracji i pierwszy krok

**40 min · Copilot: plan, potem Agent · kontynuacja w D2-06**

> Franek: „Nie trzeba przepisywać całego ekranu. Chyba”.

**Cel:** zrobić pierwszy mały krok do obliczeń we własnym ekranie. Weź lukę z `portfolio/odbior-ekranu.md`, [brief](../../historia/brief_operatora.md), [drogę danych](../../historia/droga_danych.md), `src/operator/limitRows.ts`, `src/operator/report.ts` i właściwy plik swojego UI.

1. Poproś o prześledzenie danych i plan. Wskaż, co pozostaje poza zakresem: wygląd, nowy framework, dodatkowa baza. Oczekuj celu, plików, trzech małych kroków, sprawdzeń i punktu zatrzymania. Nie pozwalaj implementować podczas czytania planu.
2. Wybierz jeden krok. Przykład: test wyniku FR-002 albo usunięcie stałej tablicy przez podłączenie eksportu. Najpierw sprawdź istniejący moduł `src/limits/creditLimit.ts` pod kątem naszego wąskiego zakresu; nie musisz robić całego dawnego ćw. 10.
3. Zleć wybrany krok Agentowi. Obejrzyj użyte narzędzia, diff i nowe pliki. Uruchom właściwą kontrolę. Zapisz stan i następny krok w `portfolio/plan-integracji.md`; po przerwie kontynuujesz tę samą integrację.

```text
Przeczytaj dołączone kryteria i pliki. Pokaż drogę danych do mojego ekranu.
Zaplanuj podłączenie buildLimitRows bez zmiany wyglądu i bez dublowania
obliczeń w UI. Podaj małe kroki, pliki i sposób sprawdzenia każdego.
Nie edytuj. Zatrzymaj się po planie. Wskaż brakujące informacje.
```

**Gotowe:** rozumiesz pierwszy diff i wynik jego kontroli. Jeśli połączenie jest zablokowane, masz konkretny błąd/ścieżkę i następny krok, nie ogólne „nie działa”. Pełny ekran kończymy w D2-06.

**Pomoc:** wybierz eksport JSON, jeśli konfiguracja proxy zabiera czas. Jeżeli adapter już działa, zacznij od testu innego wejścia albo rzeczywistego oznaczenia źródła.

**Dla szybszych:** poproś drugą sesję o review planu bez edycji. Odrzuć sugestię tylko z uzasadnieniem; nie wymagaj znalezienia błędu na siłę.
