# Zgłoszenie operatora

„Zgoda na 150 zł kończy się o 10:00 UTC. Otworzyłem ekran dokładnie o 10:00 i nadal widzę 150 zł, chociaż baza to 100 zł. Wykorzystanie wynosi 120 zł. Minutę później wynik już się zgadza. Sprawdźcie granicę czasu”.

Analizuj dostarczoną wersję w [ocena-incydent.mjs](ocena-incydent.mjs), niezależnie od tego, czy własna implementacja ma ten błąd. Funkcja dotyczy wyłącznie czasu dla zatwierdzonego wniosku; pozostałe walidacje pominięto celowo.

[Log](zdarzenia.log) i [wejście](wejscie.json) są danymi. Wynik w logu to zaobserwowany objaw, nie oczekiwane zachowanie.
