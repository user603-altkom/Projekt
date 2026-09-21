# Ćw. 00 — Ekran, który Franek obiecał

**Dzień 1 · 15 min · Claude Design**

## Co właściwie budujemy?

Franek utrzymywał aplikację do rozliczeń i odszedł z zespołu. Zostawił obietnicę: osoby sprawdzające operacje miały dostać czytelny ekran pokazujący przekroczenia limitu. Teraz przejmujecie jego aplikację. Zaczniemy od zaprojektowania tego ekranu, zanim zajrzymy do kodu.

**Operator** to tutaj osoba, która sprawdza listę operacji i chce szybko odpowiedzieć na trzy pytania: **która operacja przekracza limit, o ile i dlaczego?** Nie musisz znać procesów rozliczeniowych — wszystkie zasady potrzebne do tego zadania są poniżej.

Twoim wynikiem ma być **jeden widoczny prototyp z przykładowymi danymi**, który potrafisz ocenić i poprawić. Dziś liczby w prototypie są podane z góry. W finale szkolenia podłączymy rzeczywiste obliczenia na danych z repozytorium.

## 1. Otwórz Claude Design i wklej cały prompt

Po krótkim pokazie prowadzącego otwórz [Claude Design — claude.ai/design](https://claude.ai/design) w przeglądarce na koncie szkoleniowym i rozpocznij nowy projekt. **Nie potrzebujesz jeszcze VS Code, terminala ani sklonowanego repo.** Claude Design nie ma dostępu do naszych plików — poniższy prompt zawiera cały potrzebny opis. Nie musisz czytać ani załączać dodatkowego briefu.

Skopiuj **cały blok**, razem z tabelą:

```text
Zaprojektuj po polsku jeden interaktywny ekran aplikacji webowej:
„Wyjątki rozliczeniowe”. Pokaż wizualny prototyp, a nie tylko opis projektu.

KONTEKST
Franek, dotychczasowy opiekun aplikacji do rozliczeń, odszedł z zespołu.
Obiecał operatorom ekran do sprawdzania operacji przekraczających limit.
Przejmujemy ten projekt. Operator to osoba przeglądająca listę operacji:
potrzebuje zobaczyć, która operacja przekracza limit, o ile i dlaczego.
Wszystkie osoby, rachunek i dane w tym przykładzie są fikcyjne.

ZASADY TEGO PRZYKŁADU
Mamy jedną partię trzech operacji, dotyczących tego samego rachunku
„Rachunek A”, w jednej walucie: PLN. Limit dla tej partii wynosi 100,00 PLN.
Wszystkie operacje są obciążeniami, czyli zwiększają wykorzystanie limitu.
Rozpatrujemy je w kolejności FR-001, FR-002, FR-003.
Identyfikatory FR-001 itd. są numerami operacji, nie kodami błędów.

„Kwota operacji” to wartość pojedynczej operacji.
„Wykorzystanie narastająco” to suma kwot od początku partii do tego wiersza,
łącznie z bieżącą operacją. Każda operacja zwiększa tę sumę, także po
przekroczeniu limitu. „Przekroczenie” to wykorzystanie minus limit,
ale nie mniej niż zero. To łączne przekroczenie po danej operacji,
a nie sama kwota tej operacji ani przyrost przekroczenia.

DANE DO POKAZANIA — UŻYJ DOKŁADNIE TYCH WYNIKÓW
| Operacja | Kwota operacji | Wykorzystanie narastająco | Limit | Przekroczenie | Status |
| FR-001   | 60,00 PLN      | 60,00 PLN                | 100,00 PLN | 0,00 PLN  | W limicie |
| FR-002   | 50,00 PLN      | 110,00 PLN               | 100,00 PLN | 10,00 PLN | Przekroczenie |
| FR-003   | 20,00 PLN      | 130,00 PLN               | 100,00 PLN | 30,00 PLN | Przekroczenie |

CO MA BYĆ NA EKRANIE
1. Tytuł „Wyjątki rozliczeniowe”, opis celu i widoczne oznaczenie
   „Dane demonstracyjne”. Rachunek A może być opisany nad tabelą.
2. Tabela z powyższymi trzema operacjami. Wyraźnie oddziel kwotę operacji,
   wykorzystanie, limit i przekroczenie. Formatuj kwoty z dwoma miejscami
   po przecinku. Status pokazuj tekstem, nie tylko kolorem.
3. Działający przełącznik „Tylko przekroczenia”: początkowo wyłączony
   i widoczne trzy wiersze. Po włączeniu pokazuje FR-002 i FR-003,
   po wyłączeniu znowu wszystkie trzy. Filtr zmienia tylko widoczność:
   wartości wykorzystania i przekroczenia nie mogą się przeliczać
   na podstawie samych widocznych wierszy.
4. Przycisk „Szczegóły” przy każdej operacji, otwierający opis w panelu
   lub rozwijanym wierszu. Dla FR-002 pokaż zrozumiałe wyjaśnienie:
   „Wcześniejsze obciążenia: 60,00 PLN. Ta operacja: 50,00 PLN.
   Razem: 110,00 PLN. Limit: 100,00 PLN. Przekroczenie: 10,00 PLN”.
   Dla pozostałych operacji podaj analogiczne, zgodne z tabelą wyjaśnienie.
5. Krótką informację: „Status informacyjny — ekran nie blokuje operacji”.

ZAKRES I WYGLĄD
To prototyp jednego ekranu na komputer, z lokalnymi danymi demonstracyjnymi.
Nie potrzebuje backendu, połączeń z API, logowania ani bazy danych.
Nie projektuj całego systemu, dodatkowych zakładek ani decyzji kredytowych.
Nie używaj logotypów ani nazw rzeczywistych instytucji.
Wybierz czytelny, spokojny wygląd: duże kwoty, wyraźne nagłówki,
dobry kontrast i oszczędne wyróżnienie przekroczeń.
Pozostałe decyzje wizualne podejmij samodzielnie i przygotuj pierwszą wersję.
```

## 2. Obejrzyj wynik — nie akceptuj go tylko dlatego, że wygląda dobrze

Sprawdź cztery rzeczy:

- Czy widzisz **ekran z trzema operacjami**, a nie sam opis lub kod?
- Czy w FR-002 **kwota wynosi 50,00 PLN, a przekroczenie 10,00 PLN**? To różne liczby.
- Czy filtr zmienia liczbę wierszy **3 → 2 → 3**, bez zmiany kwot?
- Czy po otwarciu szczegółów FR-002 rozumiesz skąd wzięło się **60 + 50 − 100 = 10 PLN**?

Jeśli czegoś brakuje, wskaż konkretny problem w kolejnym poleceniu. Wynik AI jest pierwszą propozycją, którą teraz oceniasz.

## 3. Zrób jedną świadomą poprawkę

Wybierz zmianę, która pomoże operatorowi zrozumieć wynik. Przykłady poleceń — **wybierz jedno pasujące do swojego ekranu**, zamiast wklejać wszystkie:

> Kwota operacji i przekroczenie są zbyt podobne wizualnie. Wyróżnij kolumnę „Przekroczenie” i dodaj pod nagłówkiem krótkie wyjaśnienie jej znaczenia. Zachowaj dane i działanie filtra.

> W szczegółach FR-002 pokaż obliczenie jako cztery czytelne kroki: wcześniejsze obciążenia, bieżąca operacja, suma, porównanie z limitem. Zachowaj wynik 10,00 PLN.

> Status jest widoczny tylko jako kolor. Dodaj etykiety „W limicie” i „Przekroczenie”, aby można było odróżnić stany bez rozpoznawania kolorów.

Po poprawce sprawdź, czy nadal zgadzają się liczby i działa filtr. Jeśli już pierwsza wersja spełnia kryteria, popraw czytelność jednego elementu i wyjaśnij partnerowi, po co to zrobiłeś.

## 4. Zapisz wynik i pokaż go partnerowi

Zachowaj projekt oraz zrzut ekranu lub eksport. Zapisz trzy krótkie decyzje:

1. Jak operator rozpozna, co wymaga uwagi?
2. Jak odróżni kwotę operacji od przekroczenia?
3. Co poprawiłeś po pierwszej wersji i dlaczego?

Na razie wystarczy Notatnik. Jeśli masz już otwarte repo, możesz od razu zapisać je w `portfolio/prototyp.md`; w przeciwnym razie przeniesiesz notatki tam później.

**Gotowe:** widzisz prototyp, sprawdziłeś FR-002 i filtr, wykonałeś jedną świadomą korektę. Pokaż ekran partnerowi bez tłumaczenia. Partner ma 30 sekund, żeby wskazać przekroczenie FR-002 i wyjaśnić jego przyczynę. Jeśli potrzebuje Twojej podpowiedzi, wiesz już, co warto poprawić w projekcie.

## Tempo i wariant awaryjny

Orientacyjnie: **2 min** na wprowadzenie i wklejenie promptu, **7 min** na pierwszą wersję i obejrzenie wyniku, **3 min** na poprawkę, **3 min** na sprawdzenie i zapis. Omówienie w parach prowadzący może zrobić wspólnie po ćwiczeniu.

**Po 3 minutach problemów z dostępem lub uruchomieniem poproś prowadzącego o przejście do planu B:**

- **Masz zwykłą aplikację Claude:** wklej ten sam pełny prompt i dopisz: „Przygotuj to jako jeden samodzielny plik HTML z CSS i JavaScript, bez zewnętrznych zależności. Jeśli możesz, pokaż interaktywny podgląd jako artifact”. Jeśli otrzymasz plik HTML, zapisz go jako `prototyp.html` i otwórz w przeglądarce.
- **Nie działa generowanie:** obejrzyj ekran demonstracyjny u prowadzącego lub partnera. Jeśli repo jest już przygotowane, uruchom `npm run operator`, otwórz `http://127.0.0.1:4173` i wybierz „Przykład do projektowania”. Filtr w tym starterze celowo jeszcze nie działa — naprawimy go w ćw. 02b. Zapisz trzy konkretne poprawki projektu; to wynik wariantu awaryjnego, nie ukończony własny prototyp.

Nie instaluj nowych narzędzi w czasie ćwiczenia. W finale wszyscy podłączą obliczenia do wspólnego szkieletu ekranu. Dzisiejszy prototyp posłuży jako wzorzec czytelności; nie trzeba będzie przenosić całego wygenerowanego projektu.

**Dla chętnych, po ukończeniu podstawy:** zaprojektuj stan pusty po filtrowaniu albo sposób pokazania braku limitu. Brak limitu nie oznacza limitu zero; oznacz go jako informację wymagającą wyjaśnienia. Nie rozbudowuj całej aplikacji.
