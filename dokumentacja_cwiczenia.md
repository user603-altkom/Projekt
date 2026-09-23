# Dokumentacja katalogu `cwiczenia`

## Cel dokumentu

Katalog [`cwiczenia/`](cwiczenia/) zawiera samodzielne karty pracy do szkolenia z używania narzędzi AI w cyklu wytwarzania oprogramowania. Karty opisują zadanie, dane wejściowe, oczekiwany rezultat oraz sposób sprawdzenia pracy. Nie jest to kod aplikacji ani zestaw danych produkcyjnych.

Dokument porządkuje zawartość katalogu. Nie zastępuje instrukcji w konkretnych kartach, ponieważ to one zawierają dokładne polecenia, czas i warianty awaryjne.

## Jak korzystać z katalogu

Aktualną kolejność zajęć wyznacza [CWICZENIA.md](CWICZENIA.md), a harmonogramy dnia [DZIEN-2.md](DZIEN-2.md) i [DZIEN-3.md](DZIEN-3.md). W szczególności nie należy układać kolejności wyłącznie po numerach folderów: katalog zawiera też starsze karty, materiały scenariuszowe oraz ćwiczenia rezerwowe.

Każdy folder zadania zawiera zwykle `README.md`. Przed rozpoczęciem należy przeczytać całą kartę i otworzyć wskazane w niej pliki. Część zadań wymaga wyłącznie analizy, a część tworzenia testów, zmian kodu, instrukcji dla agenta lub materiałów w `portfolio/`.

## Aktualna ścieżka SDLC

Poniższe foldery tworzą obowiązującą sekwencję dni 2 i 3. Wspólnym punktem odniesienia od `cw06b` jest laboratorium limitów opisane w [laboratorium/limity/README.md](laboratorium/limity/README.md).

| Dzień | Folder | Temat i rezultat |
| --- | --- | --- |
| 2 | [cw05a](cwiczenia/cw05a/README.md) | Sprawdzenie działania instrukcji w `AGENTS.md`, odwołań `@` i zakazu edycji. |
| 2 | [cw05b](cwiczenia/cw05b/README.md) | Analiza publicznych wzorców Copilota i zapis jednej własnej reguły. |
| 2 | [cw06b](cwiczenia/cw06b/README.md) | Ustalenie wymagań oraz porównanie planu przed i po użyciu skilla `grill-me`. |
| 2 | [cw07b](cwiczenia/cw07b/README.md) | Zaprojektowanie rozwiązania z własnym agentem architektem. |
| 2 | [cw08b](cwiczenia/cw08b/README.md) | Implementacja małymi krokami: instrukcja modułu, test, poprawka i sprawdzenie. |
| 2 | [cw09b](cwiczenia/cw09b/README.md) | Ustalenie oczekiwań dla testów, sprawdzenie ich skuteczności i przekazanie stanu pracy. |
| 3 | [cw10b](cwiczenia/cw10b/README.md) | Review z dowodem: wybór kodu, własny recenzent i weryfikacja uwagi. |
| 3 | [cw11b](cwiczenia/cw11b/README.md) | Przygotowanie wydania: lokalny commit, opis, smoke test oraz plan CI i wycofania. |
| 3 | [cw12b](cwiczenia/cw12b/README.md) | Utrzymanie: diagnoza błędu, reprodukcja, naprawa i działanie zapobiegawcze. |
| 3 | [cw13b](cwiczenia/cw13b/README.md) | Utworzenie i próba własnego skilla do odbioru zmiany. |
| 3 | [cw14b](cwiczenia/cw14b/README.md) | Porównanie zastosowań MCP, CLI i hooków w kontrolowanym eksperymencie. |
| 3 | [cw15b](cwiczenia/cw15b/README.md) | Ocena gotowej metody Superpowers względem własnego procesu pracy. |

## Ćwiczenia dodatkowe

Te karty są niezależne od głównej ścieżki i można je wykonać w dniu 2 lub 3.

| Folder | Zakres |
| --- | --- |
| [cw16b](cwiczenia/cw16b/README.md) | Agent testuje aplikację przez Playwright MCP; rezultat obejmuje badanie, testy E2E oraz raport. Folder `demo/` zawiera przykładową aplikację do testów. |
| [cw17b](cwiczenia/cw17b/README.md) | Budowa i odbiór symulatora awarii z ekranem centrum dowodzenia. |
| [cw18b](cwiczenia/cw18b/README.md) | Skill korzystający ze skryptu Node, lokalnego credentiala i hooka `SessionStart`; folder zawiera także przykład konfiguracji i skrypt pogody. |

## Karty wcześniejszej ścieżki

Foldery poniżej pozostają materiałem dydaktycznym, ale nie wyznaczają kolejności aktualnej ścieżki SDLC. Pokazują rozwój pracy od oceny odpowiedzi modelu do analizy, implementacji i bezpieczeństwa.

| Folder | Zawartość |
| --- | --- |
| [cw00](cwiczenia/cw00/README.md) | Zaprojektowanie prototypu ekranu wyjątków rozliczeniowych dla operatora. |
| [cw01](cwiczenia/cw01/README.md) | Rozróżnianie faktów potwierdzonych w źródłach od twierdzeń dopowiedzianych przez model. |
| [cw02](cwiczenia/cw02/README.md) | Porównanie trzech jakości promptu i ocena odpowiedzi. |
| [cw02b](cwiczenia/cw02b/README.md) | Pierwsza zmiana kodu: filtr przekroczeń na ekranie operatora. |
| [cw03](cwiczenia/cw03/README.md) | Przygotowanie zgłoszenia i materiału źródłowego do rozmowy z AI. |
| [cw03b](cwiczenia/cw03b/README.md) | Ocena lokalnego użycia Presidio do wykrywania danych wrażliwych. |
| [cw04](cwiczenia/cw04/README.md) | Przejście od wymagania do planu oraz weryfikacja jego źródeł i założeń. |
| [cw05](cwiczenia/cw05/README.md) | Wejście w nieznany moduł odsetek i udokumentowanie twierdzeń dowodami z kodu. |
| [cw06](cwiczenia/cw06/README.md) | Napisanie testu importu przed poprawką parsera. |
| [cw07](cwiczenia/cw07/README.md) | Diagnoza oraz minimalna poprawka importu na podstawie wcześniejszego testu. |
| [cw08](cwiczenia/cw08/README.md) | Bezpieczna refaktoryzacja. |
| [cw08_sql](cwiczenia/cw08_sql/README.md) | Ścieżka SQL: bezpieczna optymalizacja. |
| [cw09](cwiczenia/cw09/README.md) | Rozwijanie instrukcji repozytorium wraz z wiedzą zdobytą podczas zmian. |
| [cw10](cwiczenia/cw10/README.md) | Review własnego diffu albo zamrożonej zmiany Franka bez jej aplikowania. |
| [cw11](cwiczenia/cw11/README.md) | Rozpoznanie prompt injection i sanityzacja kontekstu. |
| [cw12](cwiczenia/cw12/README.md) | Porównanie różnic wskazanych przez Copilota w zadaniu analitycznym. |
| [cw13](cwiczenia/cw13/README.md) | Zapisanie własnej procedury odbioru zmiany jako skilla. |

## Scenariusze i materiały pomocnicze

Pozostałe katalogi dostarczają konkretnego kontekstu zadaniowego, wariantu ćwiczenia albo wskazania na odpowiadającą im kartę. Nie są dodatkową, liniową listą zadań.

| Folder | Rola |
| --- | --- |
| [integracje_review](cwiczenia/integracje_review/README.md) | Materiał do review, testu i przekazania zmiany; obejmuje też wariant GitLab CLI. |
| [kontrola_agenta](cwiczenia/kontrola_agenta/README.md) | Krótkie wskazanie, że właściwą kartą jest `cw05a`. |
| [mala_zmiana](cwiczenia/mala_zmiana/README.md) | Scenariusz planu integracji i pierwszego kroku. |
| [mcp](cwiczenia/mcp/README.md) | Scenariusz wyboru MCP, CLI albo hooka dla konkretnego zadania. |
| [odbior_ekranu](cwiczenia/odbior_ekranu/README.md) | Scenariusz weryfikacji, czy ekran spełnia obietnicę. |
| [porownanie](cwiczenia/porownanie/README.md) | Porównanie dwóch przebiegów realizujących ten sam cel w różnych harnessach. |
| [przygotowanie_zmiany](cwiczenia/przygotowanie_zmiany/README.md) | Formularz opisu zmiany dla recenzenta: problem, zakres, sprawdzenia i kwestie otwarte. |
| [superpowers](cwiczenia/superpowers/README.md) | Materiał do oceny gotowej metody pracy. |
| [symulacja_limitu](cwiczenia/symulacja_limitu/README.md) | Kontekst nowego wymagania operatora, projektu i implementacji po akceptacji planu. |
| [utrzymanie](cwiczenia/utrzymanie/README.md) | Scenariusz błędu powstającego na końcu okresu zgody. |
| [wzorce_copilot](cwiczenia/wzorce_copilot/README.md) | Krótkie wskazanie, że właściwą kartą jest `cw05b`. |
| [zadanie_koncowe](cwiczenia/zadanie_koncowe/README.md) | Materiały wspólnych obliczeń i własnego ekranu; zawiera trzy osobne pliki z wariantami zadań. |

## Materiały rezerwowe

Folder [rezerwa](cwiczenia/rezerwa/README.md) zawiera karty poza programem podstawowym. Są przeznaczone dla osób, które ukończyły zaplanowane ćwiczenia lub potrzebują dodatkowego wariantu:

- [baza_pod_dockerem](cwiczenia/rezerwa/baza_pod_dockerem/README.md): porównanie planu wykonania z radą modelu dla PostgreSQL;
- [bramka_jakosci](cwiczenia/rezerwa/bramka_jakosci/README.md): określenie działania i granic bramki jakości;
- [narzedzie_jednorazowe](cwiczenia/rezerwa/narzedzie_jednorazowe/README.md): zbudowanie krótkotrwałego narzędzia pomocniczego.

## Zasady interpretacji wyników

Karty konsekwentnie wymagają rozdzielania obserwacji od założeń, pracy na rzeczywistych plikach i zachowania dowodów wykonanych sprawdzeń. Test zielony, odpowiedź agenta lub sama deklaracja wykonania zadania nie są dowodem bez wskazanego wyniku, pliku, polecenia albo ręcznej weryfikacji przewidzianej przez daną kartę.

W zadaniach finansowych wartości z końcówką `Grosze` są przechowywane jako całkowite grosze; zapis PLN służy prezentacji. Nie należy zmieniać danych wejściowych po to, aby dopasować je do oczekiwanego wyniku.