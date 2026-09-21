# Ćw. 03 — Przygotuj zgłoszenie do rozmowy z AI

**Dzień 1 · 25 min · praca własna, potem Copilot Chat i sprawdzenie w parze**

> Franek: „Zgłoszenie klienta jest najbardziej konkretne. I właśnie dlatego nie wklejajmy go w całości”.

Otwierasz kolejną sprawę z utrzymywanej aplikacji: zgłoszenie dotyczące odsetek i daty waluty. **W tym ćwiczeniu przygotowujesz materiał do analizy, nie naprawiasz błędu i nie piszesz ostatecznej odpowiedzi dla klientki.**

**Data waluty** oznacza tu datę używaną przy naliczaniu odsetek; nie musi być tym samym co data księgowania. Nie zakładaj z góry, że niedziela oznacza błąd.

## 1. Przeczytaj źródło samodzielnie — 5 min

Otwórz [dane/zgloszenie_klienta_skrot.md](../../dane/zgloszenie_klienta_skrot.md) w edytorze, **bez dołączania go do czatu**. To krótki materiał do podstawy na 25 minut. Dane są syntetyczne; traktujemy je tak, jakby wymagały ograniczenia przed dalszą analizą.

W sekcji „Oczekiwany rezultat analizy” znajdź **dwie sprawy do wyjaśnienia**: różnicę **0,24 PLN** i datę waluty przypadającą w niedzielę. Zauważ, których materiałów nie ma w repo. Nie szukaj teraz pliku zapasowego ani nie uruchamiaj raportu.

**Pełne zgłoszenie z identyfikatorami, logiem i drugim przykładem rozbieżności jest rozszerzeniem.** W podstawie korzystaj wyłącznie ze skrótu — nie musisz czytać obu dokumentów.

## 2. Wybierz potrzebne informacje — 5 min

Utwórz `portfolio/cw03-decyzje.md` i uzupełnij tabelę:

| Fragment lub rodzaj informacji | Usuń / zachowaj / wymaga decyzji | Dlaczego? Jak ewentualnie zastąpić? |
|---|---|---|
| Przykład: imię i nazwisko klientki | Twoja decyzja | Uzasadnienie i sposób zachowania spójności |

Wystarczą **trzy uzasadnione decyzje** w tabeli oraz usunięcie bezpośredniego identyfikatora, np. nazwiska, z tekstu dla AI. Rozważ: nazwę oddziału, kwotę 84 210,55 PLN wraz z opisem jej pochodzenia oraz zdanie o wieku klientki.

Pytaj: „Czy ten szczegół pomaga odtworzyć problem? Czy w połączeniu z resztą wskazuje osobę lub konkretną sprawę?”. Informacja techniczna nie jest automatycznie potrzebna ani pozbawiona danych identyfikujących.

**Gdy utkniesz:** oddziel kwotę przelewu od opisu jego pochodzenia. Czy obie informacje są równie potrzebne do analizy? Jeśli zastępujesz osobę etykietą, np. „Klientka A”, używaj jej konsekwentnie. Jeśli zmieniasz daty, zachowaj istotne odstępy i dzień tygodnia; jeśli zmieniasz kwoty, nie zniszcz relacji potrzebnej do reprodukcji. Decyzję, której nie umiesz uzasadnić, zapisz jako pytanie do prowadzącego.

## 3. Napisz krótki materiał dla AI — 7 min

Zapisz `portfolio/cw03-zgloszenie-do-ai.md`: **maksymalnie 150 słów**, w pięciu krótkich sekcjach (wystarczą po 1–2 zdania):

1. Co obserwujemy i o co pytamy?
2. Dane oraz relacje liczbowe konieczne do analizy.
3. Istotne daty, moduły i kroki reprodukcji.
4. Co jest dostępne, a jakich plików lub reguł brakuje?
5. Pytania, na które na tym etapie nie da się odpowiedzieć.

Nie przepisuj całej historii osobistej klientki. Przejrzyj pozostawione informacje identyfikujące i ich kombinacje. Nie dopisuj przyczyny błędu, zasad produktu ani informacji, że przypadek jest „znany”, jeśli nie masz na to dowodu.

## 4. Sprawdź użyteczność — 5 min

Zamknij kartę źródłowego zgłoszenia. W nowym czacie Copilota wybierz **Ask** i wklej **tylko przygotowaną wersję** i poniższe polecenie. Sprawdź listę dołączonego kontekstu przed wysłaniem. Nie dołączaj źródłowego zgłoszenia jako „pomocy w anonimizacji”. Jeśli Ask jest niedostępny, poproś prowadzącego o wariant rozmowy bez edycji i wywoływania narzędzi. Nie używaj Agenta do przeszukiwania repo w tym ćwiczeniu.

```text
Poniżej jest przygotowane do analizy zgłoszenie dotyczące rozbieżności
w odsetkach i daty waluty. Oceniaj tylko wklejony materiał: nie przeszukuj
repozytorium ani nie sięgaj po pierwotne zgłoszenie.
Nie ustalaj przyczyny bez dowodów i nie pisz odpowiedzi do klienta.
Wypisz: (1) znane fakty, (2) co da się sprawdzić na dostępnych danych,
(3) brakujące informacje, (4) trzy następne kroki analizy.
Nie uznawaj daty w niedzielę za błąd bez poznania obowiązującej reguły.

TU WKLEJ MOJĄ PRZYGOTOWANĄ WERSJĘ ZGŁOSZENIA:
```

Usuń ostatnią linię zastępczą i wklej własny tekst. Sprawdź, czy AI nie dopowiedziało brakujących danych. Model w IDE może mieć dostęp do innych plików repo; to ćwiczenie doboru treści, **nie techniczna izolacja danych**.

## 5. Sprawdzenie z partnerem — 3 min

Partner dostaje Twoją przygotowaną wersję. Niech wskaże pozostałe informacje identyfikujące lub ich kombinacje, a następnie nazwie dwie sprawy do wyjaśnienia i przynajmniej jedną niewiadomą. Potem możecie porównać ją ze źródłem.

To, że partner nie odgadł tożsamości, **nie dowodzi pełnej anonimizacji**. Szukacie przeoczonych szczegółów i sprawdzacie, czy nadal można sensownie rozpocząć analizę. Nie trzeba umieć ostatecznie rozstrzygnąć obu pytań klientki.

**Gotowe:** masz krótsze zgłoszenie, uzasadnienia trzech wskazanych decyzji, zachowane fakty potrzebne do analizy i jawnie wypisane braki. Oba pliki zapisujesz w `portfolio/`; nie robisz commita ani nie wysyłasz odpowiedzi do klienta.

**Rozszerzenie — dodatkowe 15–20 minut lub praca po bloku:** otwórz pełne [dane/zgloszenie_klienta.md](../../dane/zgloszenie_klienta.md), nadal bez dołączania źródła do czatu. Sprawdź dane osobowe, rachunek zapisany ze spacjami i bez nich oraz identyfikatory w logu. Uzupełnij przygotowaną wersję o potrzebny kontekst techniczny. Oddziel **0,24 PLN z pliku zapasowego** od **0,23 PLN z miesięcznego wyciągu** — to inne zbiory danych; podobny objaw nie dowodzi wspólnej przyczyny. Zapisz, co trzeba sprawdzić w logach, ale nie zaczynaj naprawy. Na końcu zaproponuj regułę skracania zgłoszeń i wskaż przypadek, w którym usunęłaby ważny kontekst.
