# Ćw. 03 — Przygotuj zgłoszenie do rozmowy z AI

**Dzień 1 · 25 min · praca własna, potem Copilot Chat i sprawdzenie w parze**

> Franek: „Zgłoszenie klienta jest najbardziej konkretne. I właśnie dlatego nie wklejajmy go w całości”.

Otwierasz kolejną sprawę z utrzymywanej aplikacji: zgłoszenie dotyczące odsetek i daty waluty. **W tym ćwiczeniu przygotowujesz materiał do analizy, nie naprawiasz błędu i nie piszesz ostatecznej odpowiedzi dla klientki.**

**Data waluty** oznacza tu datę używaną przy naliczaniu odsetek; nie musi być tym samym co data księgowania. Nie zakładaj z góry, że niedziela oznacza błąd.

## 1. Przeczytaj źródło samodzielnie — 5 min

Otwórz [dane/zgloszenie_klienta.md](../../dane/zgloszenie_klienta.md) w edytorze, **bez dołączania go do czatu**. Dane są syntetyczne, przygotowane do tego ćwiczenia. Traktujemy je tak, jakby wymagały ograniczenia przed dalszą analizą.

Znajdź dwa pytania z końca dokumentu: wyjaśnienie różnicy **0,24 PLN** i sprawdzenie daty waluty przypadającej w niedzielę. Zwróć uwagę na opis brakującego pliku zapasowego i na osobny przykład **0,23 PLN** z miesięcznego wyciągu. To różne zbiory danych — nie zamieniaj jednej liczby na drugą, żeby uprościć zgłoszenie.

## 2. Wybierz potrzebne informacje — 5 min

Utwórz `portfolio/cw03-decyzje.md` i uzupełnij tabelę:

| Fragment lub rodzaj informacji | Usuń / zachowaj / wymaga decyzji | Dlaczego? Jak ewentualnie zastąpić? |
|---|---|---|
| Przykład: numer rachunku powtórzony w kilku miejscach | Twoja decyzja | Uzasadnienie i sposób zachowania spójności |

Uwzględnij dane osobowe, placówkę oraz szczegóły techniczne. **Obowiązkowo rozważ trzy rzeczy:** nazwę oddziału, kwotę 84 210,55 PLN wraz z opisem jej pochodzenia oraz zdanie o wieku klientki.

Pytaj: „Czy ten szczegół pomaga odtworzyć problem? Czy w połączeniu z resztą wskazuje osobę lub konkretną sprawę?”. Informacja techniczna nie jest automatycznie potrzebna ani pozbawiona danych identyfikujących.

**Gdy utkniesz:** zacznij od jednej danej, np. rachunku. Znajdź wszystkie jej wystąpienia, także w logu. Jeśli stosujesz zamiennik, musi być konsekwentny. Jeśli zmieniasz daty, zachowaj istotne odstępy i dzień tygodnia; jeśli zmieniasz kwoty, nie zniszcz relacji potrzebnej do reprodukcji. Decyzję, której nie umiesz uzasadnić, zapisz jako pytanie do prowadzącego.

## 3. Napisz krótki materiał dla AI — 7 min

Zapisz `portfolio/cw03-zgloszenie-do-ai.md`. Wystarczy pięć sekcji:

1. Co obserwujemy i o co pytamy?
2. Dane oraz relacje liczbowe konieczne do analizy.
3. Istotne daty, moduły i kroki reprodukcji.
4. Co jest dostępne, a jakich plików lub reguł brakuje?
5. Pytania, na które na tym etapie nie da się odpowiedzieć.

Nie przepisuj całej historii osobistej klientki. Przejrzyj też identyfikatory we fragmentach logów. Nie dopisuj przyczyny błędu, zasad produktu ani informacji, że przypadek jest „znany”, jeśli nie masz na to dowodu.

## 4. Sprawdź użyteczność — 5 min

Zamknij kartę źródłowego zgłoszenia. W nowym czacie Copilota wklej **tylko przygotowaną wersję** i poniższe polecenie. Sprawdź listę dołączonego kontekstu przed wysłaniem. Nie dołączaj źródłowego zgłoszenia jako „pomocy w anonimizacji”. Użyj rozmowy do pytań, bez edycji i uruchamiania narzędzi.

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

Partner dostaje Twoją przygotowaną wersję. Niech wskaże pozostałe informacje identyfikujące lub ich kombinacje, a następnie nazwie dwa pytania do analizy i przynajmniej jedną niewiadomą. Potem możecie porównać ją ze źródłem.

To, że partner nie odgadł tożsamości, **nie dowodzi pełnej anonimizacji**. Szukacie przeoczonych szczegółów i sprawdzacie, czy nadal można sensownie rozpocząć analizę. Nie trzeba umieć ostatecznie rozstrzygnąć obu pytań klientki.

**Gotowe:** masz krótsze zgłoszenie, uzasadnienia trzech wskazanych decyzji, zachowane fakty potrzebne do analizy i jawnie wypisane braki. Oba pliki zapisujesz w `portfolio/`; nie robisz commita ani nie wysyłasz odpowiedzi do klienta.

**Rozszerzenie:** zaproponuj jedną regułę przygotowywania podobnych zgłoszeń. Znajdź w tym dokumencie przypadek, w którym jej mechaniczne zastosowanie usunęłoby ważny kontekst.
