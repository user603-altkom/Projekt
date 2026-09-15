# legacy-java/

To jest materiał **wyłącznie do czytania**. Nie ma tu ani `pom.xml`, ani `build.gradle`,
ani skonfigurowanego JDK — `OdsetkiCalculator.java` nie jest częścią żadnego procesu
budowania w tym repozytorium i **nikt nie próbuje go kompilować ani uruchamiać**.
Traktuj go jak plik, który dostałeś od kolegi z innego zespołu do przejrzenia.

`OdsetkiCalculator.java` to starsza implementacja tego samego naliczania odsetek, które
w tym repozytorium dziś realizuje `src/interest/accrue.ts`. Klasy w środku (kalkulator,
DTO-ki, prosty interfejs repozytorium) są zebrane w jednym pliku ze względów porządkowych
materiału szkoleniowego — w oryginalnym repozytorium bankowym każda miała swój plik.

Służy do ćwiczeń z czytania cudzego kodu i dokumentacji, w tym porównania dwóch wersji
tego samego algorytmu napisanych w różnych językach i w różnym czasie.
