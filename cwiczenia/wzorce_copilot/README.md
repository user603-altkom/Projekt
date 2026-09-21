# D2-03 — Podpatrz wzorzec, sprawdź go u siebie

**45 min · czytanie przed przerwą, adaptacja po przerwie · Copilot**

**Po co:** zobaczysz, jak autorzy rzeczywistych repo zapisują instrukcje, role i procedury. Wynikiem jest jedna przydatna reguła we Franku, nie instalacja całego pakietu.

1. **Wybierz z partnerem jedną ścieżkę.** Otwórz [materiały i przypięte źródła](../../materialy/wzorce/README.md). Początkujący: GitHub Skills, krok 1. Pozostali: krótki fragment instrukcji VS Code oraz jeden plik — review, agent planujący albo skill testowania. Nie klonuj i nie buduj obcej aplikacji.
2. **Odpowiedz na pięć pytań.** Kiedy plik jest dołączany? Co zmienia? Jakich narzędzi potrzebuje? Co ma sens we Franku? Co odrzucasz i dlaczego? W `portfolio/wzorzec.md` wystarczy po zdaniu oraz link do konkretnej wersji źródła. Pokaż partnerowi jedną linię, na której opierasz wniosek.
3. **Przenieś jeden pomysł.** Po przerwie zapisz własną krótką regułę, rolę albo procedurę. Najprościej: zasada testowania kwot w instrukcjach. W nowej sesji zleć małą próbę bez implementacji i sprawdź dostępny ślad kontekstu oraz zachowanie. Zapisz wynik, także gdy nie udało się potwierdzić użycia.

**Przykład adaptacji:** zamiast reguły budowania całego VS Code: „Wynik w groszach ustal z przykładu biznesowego. Nie obliczaj oczekiwania funkcją, którą testujesz”.

**Gotowe:** jeden przyjęty pomysł, jeden odrzucony z uzasadnieniem, plik lokalnej konfiguracji i wynik próby. Nie kopiuj arbitralnych limitów długości funkcji ani narzędzi, których nie masz.

**Pomoc:** poproś Ask: „Wyjaśnij nagłówek i trzy reguły tego pliku. Oddziel format narzędzia od konwencji projektu”. Sprawdź odpowiedź w źródle. Awesome Copilot to kolekcja społecznościowa w organizacji GitHub, nie gwarancja jakości każdego wzorca.

**Dla szybszych:** instrukcja `.github/instructions/testy.instructions.md` z `applyTo: "tests/**/*.ts"`; porównaj zadanie dotyczące testu i UI. Nie wymagaj zmiany zachowania, gdy oba zadania już spełniały zasadę. Odczyt obcych przykładów nie wymaga włączania ich narzędzi ani workspace trust.
