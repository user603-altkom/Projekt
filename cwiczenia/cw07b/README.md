# cw07b — Projekt: własny agent architekt

**50 min · Copilot · analiza i plan**

**Cel:** przygotować mały projekt techniczny na podstawie uzgodnionych wymagań. Konfigurujesz rolę architekta i sprawdzasz, czy umie zakończyć pracę na planie.

## Wejście

Otwórz [BRIEF.md](../../laboratorium/limity/BRIEF.md), [KONTRAKT.md](../../laboratorium/limity/KONTRAKT.md), własny [formularz wymagań](../../laboratorium/limity/dokumenty/01-wymagania.md), [funkcję startera](../../laboratorium/limity/src/ocena.mjs) i [pierwszy test](../../laboratorium/limity/test/ocena.node.mjs). Jeśli nie ukończyłeś cw06b, korzystaj z uzgodnionego MVP w briefie. Wszystkie komendy i ścieżki w kartach odnoszą się do głównego folderu repo.

## 1. Utwórz rolę

Przeczytaj [szablon architekta](../../materialy/sdlc/architekt.agent.md). Skopiuj jego treść do **nowego pliku** `.github/agents/architekt-limity.agent.md`. W panelu Copilot wybierz agenta `architekt-limity`.

Sprawdź w konfiguracji narzędzia odczytu i wyszukiwania. Nie dodawaj terminala ani edycji do tej roli. Jeżeli nazwy narzędzi w szablonie nie pasują do wersji VS Code, wybierz dostępne odpowiedniki w edytorze konfiguracji agenta. Sam opis „tylko czytaj” nie zastępuje doboru narzędzi.

Jeżeli własny agent nie jest dostępny w Twoim środowisku, użyj Ask z wklejoną treścią roli i podanymi plikami. Zanotuj, że testowałeś prompt, a nie konfigurację własnego agenta.

## 2. Zleć projekt

```text
Przeczytaj BRIEF.md i KONTRAKT.md z laboratorium/limity oraz src/ocena.mjs
w tym katalogu. Uwzględnij dokumenty/01-wymagania.md, jeśli je uzupełniłem.
Zaprojektuj funkcję ocenLimit. Zachowaj istniejący kontrakt raportu.
Wyjaśnij obsługę czasu, walidację i brak mutacji wejścia.
Rozpisz najwyżej cztery małe kroki. Wskaż pierwszy test, pliki do zmiany
i moment zatrzymania. Wynik podaj w czacie. Nie zapisuj ani nie implementuj.
```

Oceń projekt: czy agent proponuje zegar systemowy mimo argumentu `teraz`? Czy potrzebuje bazy do oceny jednego wniosku? Czy plan zmienia format, którego używają raport i UI? Popraw założenia przed implementacją.

## 3. Zapisz decyzję

Samodzielnie uzupełnij [02-projekt.md](../../laboratorium/limity/dokumenty/02-projekt.md) zatwierdzonym planem. Zapisz jeden odrzucony wariant z uzasadnieniem, np. zadanie w tle do wygaszania zamiast obliczenia na podstawie dat.

**Gotowe:** plan wskazuje konkretny pierwszy krok i test. `git diff` nie zawiera zmian kodu z tej sesji. Potrafisz pokazać konfigurację narzędzi architekta.

**Dla szybszych:** dopisz opis sposobu podłączenia wyniku do swojego ekranu z dnia 1. To osobna integracja, nie warunek ukończenia modułu.


[Spis ćwiczeń i kolejność](../../CWICZENIA.md) · [Start laboratorium](../../laboratorium/limity/README.md)
