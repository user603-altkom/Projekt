# cw06b — Wymagania i plan: przed i po grill-me

**60 min · Copilot lub Claude Code · planowanie, bez edycji kodu**

**Cel:** sprawdzić, czy rozmowa ze skillem grill-me pomaga dopracować wymagania lub plan realizacji. Najpierw przygotujesz wersję bez skilla, potem odpowiesz na pytania podważające jej założenia i porównasz obie wersje. Na końcu uzgodnisz wymagania do kolejnych ćwiczeń.

Pracujcie w parze: jedna osoba obsługuje agenta, druga gra operatora i pomaga podejmować decyzje. Możesz też wykonać ćwiczenie samodzielnie.

## Zadanie do zaplanowania

Operator chce czasowo podnosić limit kontrahenta. Inna osoba ma zatwierdzić wniosek. Po upływie terminu limit wraca do bazowego. Ekran ma pokazywać obowiązujący limit oraz przekroczenie.

To celowo niepełny opis. Na razie **nie otwierajcie BRIEF.md ani KONTRAKT.md** i nie dołączajcie ich agentowi. Własne decyzje porównacie ze wspólnym zakresem dopiero w kroku 5.

## Dwa zastosowania — wybierz jedno

Grill-me może pomóc zarówno przed zaplanowaniem prac, jak i wtedy, gdy plan już istnieje:

| Wariant | Co poddajemy krytyce? | Przykłady pytań |
| --- | --- | --- |
| **Wymagania: co i po co budujemy?** | Potrzebę użytkownika, reguły działania, zakres i kryteria odbioru. | Kto może zatwierdzić wniosek? Co ma się wydarzyć dokładnie w chwili jego wygaśnięcia? |
| **Plan: jak to zrealizujemy?** | Sposób realizacji, kolejność prac, zależności, ryzyka techniczne i weryfikację. | Gdzie obliczamy obowiązujący limit? Jak sprawdzimy upływ czasu bez czekania? Co wdrażamy jako pierwszy sprawdzalny fragment? |

**Wybierzcie jeden wariant na to ćwiczenie.** Dalsze kroki są wspólne: wersja A → pytania → wersja B → porównanie. Nie musicie wykonywać obu wariantów. Pytania mogą ujawnić problem na drugim poziomie — zapiszcie go, zamiast wymuszać sztywny podział.

## 1. Przygotuj wersję A — bez skilla (10 min)

Zacznij nową rozmowę. Jeśli masz już zainstalowany grill-me, nie wywołuj go w tym kroku. Wklej **jeden** z poniższych promptów.

**Wariant: wymagania**

```text
Operator chce czasowo podnosić limit kontrahenta. Inna osoba zatwierdza
wniosek. Po upływie terminu limit wraca do bazowego. Ekran ma pokazywać
obowiązujący limit oraz przekroczenie.

Przygotuj wstępne wymagania: cel użytkownika, zakres funkcji,
reguły działania i kryteria odbioru. Wypisz założenia i niewiadome.
Nie projektuj jeszcze rozwiązania technicznego ani kolejności implementacji.
Na tym etapie nie zadawaj mi pytań — potrzebuję pierwszej wersji dokumentu.
Nie używaj skilli, nie czytaj plików repozytorium i nie implementuj.
Pracuj wyłącznie na powyższym opisie. Odpowiedz po polsku.
```

**Wariant: plan**

```text
Operator chce czasowo podnosić limit kontrahenta. Inna osoba zatwierdza
wniosek. Po upływie terminu limit wraca do bazowego. Ekran ma pokazywać
obowiązujący limit oraz przekroczenie.

Przygotuj krótki plan realizacji: proponowane rozwiązanie, kolejność prac,
zależności, ryzyka oraz sposób sprawdzenia wyniku.
Wypisz założenia i niewiadome, w tym brakujące decyzje dotyczące wymagań.
Na tym etapie nie zadawaj mi pytań — potrzebuję pierwszej wersji dokumentu.
Nie używaj skilli, nie czytaj plików repozytorium i nie implementuj.
Pracuj wyłącznie na powyższym opisie. Odpowiedz po polsku.
```

Przeczytaj wynik. Zaznacz miejsca, które budzą Twoje wątpliwości, ale jeszcze nie poprawiaj dokumentu.

Otwórz [01-wymagania.md](../../laboratorium/limity/dokumenty/01-wymagania.md). Na końcu formularza dodaj nagłówek `## Wersja A — przed grill-me`, wpisz wybrany wariant i wklej odpowiedź bez zmian. Zachowaj ją do porównania.

## 2. Dodaj skill (5 min)

Źródło: [mattpocock/skills](https://github.com/mattpocock/skills). Aktualny [grill-me](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) wywołuje [grilling](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md), dlatego instalujesz oba. W terminalu katalogu repo:

```sh
npx skills add mattpocock/skills --skill grill-me --skill grilling
```

W instalatorze wybierz używane narzędzie i zakres projektu. Przeczytaj pliki SKILL.md przed użyciem. Jeśli masz już oba skille, pomiń instalację.

Jeśli instalacja lub wykrycie skilla nie działa po kilku minutach, użyj promptu z następnego kroku jako zwykłej rozmowy. Zapisz wtedy, że sprawdzasz sposób prowadzenia rozmowy, a nie działanie zainstalowanego skilla.

## 3. Poddaj wersję A pytaniom grill-me (20 min)

Zacznij nową rozmowę, najlepiej w tym samym narzędziu i z tym samym modelem. W poniższym prompcie wybierz rodzaj dokumentu, a na końcu wklej **całą treść wersji A**. Nie dołączaj jeszcze formularza ani briefu.

```text
Użyj grill-me do przeanalizowania poniższego dokumentu.
Jeśli alias nie działa, użyj grilling.

Rodzaj dokumentu: [wpisz: wymagania albo plan realizacji]

Zadanie: operator chce czasowo podnosić limit kontrahenta. Inna osoba
zatwierdza wniosek. Po terminie limit wraca do bazowego. Ekran pokazuje
obowiązujący limit oraz przekroczenie.

Sprawdź niejawne założenia, pominięte decyzje i ryzyka.
Dla wymagań skup się na potrzebie użytkownika, regułach, zakresie
oraz sprawdzalności kryteriów odbioru.
Dla planu skup się na sposobie realizacji, kolejności prac, zależnościach,
ryzykach technicznych i weryfikacji; wskaż też brakujące wymagania.

Pytaj mnie po polsku, po jednym pytaniu. Przy pytaniu pokaż opcje,
ich konsekwencje oraz swoją rekomendację. Poczekaj na moją odpowiedź
przed kolejnym pytaniem. Nie poprzestawaj na liście wad i nie przepisuj
jeszcze dokumentu. Nie czytaj plików repozytorium i nie implementuj.
Po 6–8 odpowiedziach podsumuj decyzje oraz otwarte kwestie i zatrzymaj się.

Oto wersja A:
[Wklej tutaj cały dokument z kroku 1.]
```

Pojedyncze pytania są naszą adaptacją warsztatową. Skill może domyślnie proponować pytania rundami.

Odpowiadajcie jako osoby zamawiające funkcję. Podejmujcie własne decyzje; jeśli czegoś nie wiecie, nazwijcie niewiadomą. Nie akceptujcie automatycznie każdej rekomendacji. Gdy agent proponuje nowe konta, bazę danych lub proces w tle, dopytajcie, po co są potrzebne na tym etapie.

W formularzu, w sekcji „Pytania oraz odpowiedzi operatora”, zapiszcie najważniejsze pytania i Wasze decyzje.

## 4. Przygotuj wersję B i porównaj wyniki (10 min)

W tej samej rozmowie poproś:

```text
Teraz przygotuj poprawioną wersję dokumentu na podstawie naszych odpowiedzi.
Zachowaj strukturę wersji A, aby łatwo było porównać wyniki.
Oddziel podjęte decyzje od kwestii nadal otwartych.
Nie implementuj i nie czytaj dodatkowych plików.
```

Na końcu formularza dodaj `## Wersja B — po grill-me` i zapisz wynik. Pod nim dodaj `## Co zmieniła rozmowa?` oraz krótką tabelę:

| Założenie lub luka w wersji A | Pytanie i nasza decyzja | Zmiana w wersji B |
| --- | --- | --- |
| … | … | … |

Wybierzcie do trzech istotnych zmian. Wskażcie, która zmniejsza ryzyko zbudowania czegoś innego, niż potrzebuje operator. Jeśli rozmowa nie poprawiła dokumentu albo tylko go wydłużyła, zapiszcie to — nie trzeba na siłę wykazywać sukcesu skilla.

**Zatrzymajcie się na chwilę:** czy agent odkrył problem, czy po prostu dopisał więcej tekstu? Która Wasza odpowiedź rzeczywiście zmieniła wymagania lub plan?

## 5. Uzgodnij wspólny zakres na dalsze ćwiczenia (15 min)

**Dopiero teraz** otwórzcie [BRIEF.md](../../laboratorium/limity/BRIEF.md) i dołączcie go agentowi. Sekcja „Uzgodniony zakres MVP” określa wspólny zakres, na którym będziemy pracować dalej.

Poproś:

```text
Porównaj wersję B z dołączonym BRIEF.md, szczególnie z sekcją
„Uzgodniony zakres MVP”. Wskaż różnice. Przyjmij zakres z briefu
jako obowiązujący w kolejnych ćwiczeniach.

Przygotuj treść do formularza wymagań: cel i użytkownik, zakres MVP,
co pozostaje poza zakresem, co najmniej pięć kryteriów z konkretnym
wejściem i oczekiwanym wynikiem oraz otwarte kwestie.
Nie implementuj. Nie zmieniaj zachowanych wersji A i B.
```

Uzupełnij początkowe sekcje formularza [01-wymagania.md](../../laboratorium/limity/dokumenty/01-wymagania.md) uzgodnionymi wymaganiami. Zachowaj pod nimi obie wersje i porównanie. Zmian wynikających z nowo ujawnionego briefu nie dopisuj do tabeli korzyści z grill-me.

**Przykład kryterium:** przy wykorzystaniu 12000 groszy i bazie 10000 aktywna zgoda na 15000 daje przekroczenie 0. Dokładnie w chwili końca zgody przekroczenie wynosi 2000. Zapis „ma działać poprawnie” nie wystarczy.

**Gotowe, gdy:** masz zachowane wersje A i B (wymagań albo planu), pytania z decyzjami, własną ocenę wpływu rozmowy oraz co najmniej pięć kryteriów zgodnych z briefem. Partner potrafi z tych kryteriów ustalić oczekiwany wynik bez pytania agenta.

**Dla szybszych:** rozpisz decyzje potrzebne do wielu nakładających się wniosków. Nie implementuj rozszerzenia i nie zmieniaj wspólnego MVP.

[Spis ćwiczeń i kolejność](../../CWICZENIA.md) · [Start laboratorium](../../laboratorium/limity/README.md)
