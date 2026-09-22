# cw06b — Wymagania: rozmowa z grill-me

**60 min · Copilot lub Claude Code · planowanie, bez edycji kodu**

**Cel:** zamienić nieprecyzyjną prośbę w zakres, który da się sprawdzić. Zapiszesz wynik w istniejącym formularzu [01-wymagania.md](../../laboratorium/limity/dokumenty/01-wymagania.md).

## Zadanie do zaplanowania

Operator chce czasowo podnosić limit kontrahenta. Inna osoba ma zatwierdzić wniosek. Po upływie terminu limit wraca do bazowego. Ekran ma pokazywać obowiązujący limit oraz przekroczenie. Czy to „tylko jedno pole i przycisk”? Wyjaśnijcie to z agentem.

Pracujcie w parze. Jedna osoba obsługuje agenta, druga gra operatora. Operator otwiera [BRIEF.md](../../laboratorium/limity/BRIEF.md), zawierający wszystkie odpowiedzi i przykłady. Na początku agent dostaje tylko opis z akapitu powyżej, aby nie omijać rozmowy gotową specyfikacją.

## 1. Dodaj skill i rozpocznij rozmowę

Źródło: [mattpocock/skills](https://github.com/mattpocock/skills). Aktualny [grill-me](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) wywołuje [grilling](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md), dlatego instalujesz oba. W terminalu katalogu repo:

```sh
npx skills add mattpocock/skills --skill grill-me --skill grilling
```

W instalatorze wybierz używane narzędzie i zakres projektu. Przeczytaj SKILL.md przed użyciem. Zacznij nową rozmowę. Jeśli instalacja lub wykrycie skilla nie działa po kilku minutach, zastosuj prompt poniżej jako zwykłą rozmowę i zapisz ten fakt. Nie zgłaszaj wtedy testu zainstalowanego skilla.

```text
Użyj grill-me; jeśli alias nie działa, użyj grilling.
Chcę zaplanować czasowe podniesienie limitu kontrahenta:
operator składa wniosek, druga osoba zatwierdza, a po terminie wraca baza.
Ekran pokazuje aktualny limit i przekroczenie. Na razie nie czytaj gotowego
BRIEF.md, bo ćwiczymy rozmowę z operatorem. Pytaj po polsku o decyzje,
po jednym pytaniu. Przy pytaniu pokaż opcje i ich konsekwencje.
Nie implementuj. Po 8–10 odpowiedziach podsumuj ustalenia i otwarte kwestie.
```

Pojedyncze pytania są naszą adaptacją warsztatową. Skill może domyślnie proponować pytania rundami.

## 2. Podejmij decyzje i ogranicz MVP

Odpowiadaj jako operator na podstawie briefu. Jeśli agent proponuje nowe konta, bazę czy proces w tle, zdecyduj, czy są potrzebne do małego modułu oceny. Nie zgadzaj się automatycznie na każdą propozycję.

Po rozmowie dołącz cały BRIEF.md i poproś o sprawdzenie zgodności ustaleń. Dla wspólnego ćwiczenia obowiązuje sekcja „Uzgodniony zakres MVP”. Różnice i pomysły na przyszłość wpisz jako poza zakresem. Zapisz w formularzu cel, zakres i co najmniej pięć kryteriów z konkretnym wejściem oraz wynikiem.

**Przykład kryterium:** przy wykorzystaniu 12000 groszy i bazie 10000 aktywna zgoda na 15000 daje przekroczenie 0. Dokładnie w chwili końca zgody przekroczenie wynosi 2000. Zapis „ma działać poprawnie” nie wystarczy.

**Gotowe:** partner potrafi z Twoich kryteriów ustalić oczekiwany wynik bez pytania agenta. Pokaż jedno pytanie, które zmieniło Twój pierwotny pomysł.

**Dla szybszych:** rozpisz decyzje potrzebne do wielu nakładających się wniosków. Nie implementuj rozszerzenia i nie zmieniaj wspólnego MVP.


[Spis ćwiczeń i kolejność](../../CWICZENIA.md) · [Start laboratorium](../../laboratorium/limity/README.md)
