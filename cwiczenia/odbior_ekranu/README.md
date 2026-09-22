> **Materiał wcześniejszej ścieżki.** Na aktualnych zajęciach otwórz [cw09b](../cw09b/README.md) oraz [spis ćwiczeń](../../CWICZENIA.md).

# D2-02 — Czy nasz ekran robi to, co obiecaliśmy?

**40 min · praca w parze · najpierw bez zmian kodu**

> Franek: „Ładny ekran już mamy. Teraz te liczby…”.

**Rezultat:** trzy sprawdzone kryteria i jedna luka do poprawy po południu. Właśnie po to pisaliśmy kryteria w ćw. 04: teraz pozwolą rozstrzygnąć, czy funkcja działa.

**Przygotuj:** działający własny ekran, `portfolio/kryteria-limitow.md`, [brief operatora](../../historia/brief_operatora.md), oba pliki `dane/franek/*-final.json`. Bez własnej notatki użyj briefu. Uruchom swoją aplikację dotychczasową komendą; starter to `npm run operator` i http://127.0.0.1:4173.

1. **Partner sprawdza trzy rzeczy.** FR-002: kwota 50 zł, wykorzystanie 110 zł, limit 100 zł, przekroczenie 10 zł. Filtr pokazuje FR-002 i FR-003, a wyłączenie przywraca trzy wiersze. Widok wskazuje, czy liczby pochodzą z demo, czy obliczeń z danych.
2. **Prześledź źródło jednej liczby.** Poproś Copilota w Ask o wskazanie pliku wejścia, funkcji i miejsca wyświetlenia FR-002. Sprawdź wskazane linie. W starterze pomaga [droga danych](../../historia/droga_danych.md). Ręcznie wpisane 110 zł może wyglądać poprawnie, ale nie dowodzi przeliczenia.
3. **Zapisz wynik.** W `portfolio/odbior-ekranu.md` utwórz tabelę: kryterium / co zrobiliśmy / co zobaczyliśmy / działa, nie działa lub nieustalone. Wybierz jedną lukę; będzie wejściem do D2-04. Nie naprawiaj teraz całego ekranu.

**Przykład zapisu:** „FR-002 wygląda poprawnie; znaleźliśmy stałą tablicę w komponencie, więc przeliczanie nie jest jeszcze zrealizowane”.

**Gotowe:** partner potrafi wyjaśnić 110 = 60 + 50 i wskazać, skąd aplikacja ma tę liczbę, albo nazwać brakujące połączenie.

**Pomoc:** jeśli ekran nie startuje, zachowaj własny projekt i poproś o starter w osobnym katalogu. W starterze widok demo pozwala sprawdzić UI, a niepodłączony raport pokazuje konkretną lukę do wykonania.

**Dla szybszych:** sprawdź na kontrolowanej kopii/testowym wejściu limit 130 zł: równość nie jest przekroczeniem. Nie nadpisuj oryginalnych danych tylko po to, by poprawić wynik.
