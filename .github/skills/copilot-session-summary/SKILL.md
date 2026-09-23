---
name: copilot-session-summary
description: "Use when: zapisujesz podsumowanie sesji Copilot, chcesz utrwalić przebieg pracy w AGENT-history.md, lub potrzebujesz odtworzyć kontekst zadania w repo."
---

# Copilot Session Summary

## Cel

Zapisywać krótkie i czytelne podsumowanie każdej sesji Copilot w pliku `AGENT-history.md`, aby zachować kontekst pracy, decyzje, rezultaty i obszary modyfikacji bez konieczności przeglądania całej historii czatu.

## Gdzie zapisywać

- Plik główny repo: `AGENT-history.md`
- Jeśli plik nie istnieje, utwórz go w katalogu głównym projektu.
- Ta skill jest przeznaczona do użytku w ramach konkretnego workspace, więc nie zapisuj historii w katalogu użytkownika.

## Przepływ pracy

1. Sprawdź, czy `AGENT-history.md` istnieje.
2. Jeśli nie istnieje, utwórz plik z nagłówkiem `# AGENT History`.
3. Odczytaj aktualną zawartość, aby uniknąć duplikacji i zachować spójny styl wpisów.
4. Dodaj nowy wpis z datą i krótkim opisem sesji:
   - cel sesji
   - kluczowe działania
   - decyzje lub wnioski
   - rezultat lub status
   - najważniejsze zmienione pliki / obszary
5. Zapisz wpis na końcu lub na górze historii, zachowując czytelny porządek chronologiczny.
6. Nie usuwaj wcześniejszych wpisów; uzupełniaj historię, nie ją kasuj.

## Format wpisu

Używaj prostego, spójnego formatu:

```md
## 2026-09-22
- Cel: ...
- Działania: ...
- Decyzje: ...
- Wynik: ...
- Pliki: ...
```

## Kryteria jakości

- wpis jest krótki, konkret i zrozumiały
- opisuje efekt pracy, nie tylko listę poleceń
- nie powtarza istniejących wpisów
- zapis dotyczy rzeczywistej sesji i realnych rezultatów
- plik jest utrzymany w jednym miejscu i w jednej strukturze

## Zasady końcowe

- Jeśli sesja była krótką, nadal zapisuj tylko najważniejsze informacje.
- Jeśli nie ma wystarczających danych, wpisz to jasne "stan niepełny" zamiast zgadywania.
- Nie twórz sztucznych wpisów; zapisuj tylko rzeczywiste wyniki pracy.
