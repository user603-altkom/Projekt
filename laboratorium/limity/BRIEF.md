# Zlecenie: limit tylko na określony czas

## Punkt wyjścia do rozmowy z operatorem

Operator obserwuje wykorzystanie limitu przez kontrahenta. Czasem potrzebuje podnieść limit na określony okres. Chce złożyć wniosek, uzyskać zgodę drugiej osoby, zobaczyć obowiązujący limit i wiedzieć, kiedy podwyżka przestanie działać. Po okresie zgody aplikacja ma wrócić do limitu bazowego. Decyzja powinna być możliwa do wyjaśnienia.

Franek zanotował: „Dodajcie pole z nowym limitem, a reszta chyba zrobi się sama”. Właśnie tę „resztę” trzeba ustalić przed kodowaniem.

## Jak pracować z tym dokumentem

W cw06b najpierw rozmawiasz z agentem na podstawie opisu powyżej. Osoba w roli operatora korzysta z odpowiedzi poniżej. Następnie wszyscy przyjmują ten sam zakres MVP, aby porównać testy. Pytania poza zakresem trafiają do listy na przyszłość.

## Uzgodniony zakres MVP i odpowiedzi operatora

1. Kwoty to nieujemne całkowite **grosze**, nie złote zmiennoprzecinkowe. Wykorzystanie 120 zł zapisujemy jako 12000. Limit zero jest prawidłowy. Dane syntetyczne w laboratorium mieszczą się w bezpiecznym zakresie liczb całkowitych JS.
2. Oceniamy jednego kontrahenta i najwyżej jeden wniosek. Limit bazowy i wykorzystanie są wejściem. Lista wniosków, baza, konta i kolejka zatwierdzeń są poza MVP.
3. Wniosek ma status `oczekuje`, `zatwierdzony`, `odrzucony` lub `cofniety`. Tylko `zatwierdzony` może obowiązywać. Pusty wniosek oznacza bazę.
4. `autor` i `zatwierdzil` to niepuste identyfikatory osób. Dla zgody muszą się różnić. To kontrola danych w laboratorium, nie dowód uwierzytelnienia. Nie budujemy logowania ani nie ufamy takim identyfikatorom jako zabezpieczeniu produkcyjnemu.
5. `od` i `do` oraz `teraz` są ISO 8601 w UTC, kończą się na `Z`. Początek jest włączony, koniec wyłączony: `od <= teraz < do`. Gdy `teraz == do`, obowiązuje baza. Funkcja dostaje czas jako argument i nie czyta zegara systemowego.
6. Aby obowiązywać, limit wniosku musi być większy od bieżącego limitu bazowego. Wniosek z limitem mniejszym lub równym bazie nie podnosi limitu: zwracamy bazę, nie błąd. Dotyczy to także wzrostu bazy po zatwierdzeniu wniosku. Wygasanie wynika z oceny dat, nie wymaga harmonogramu w tle.
7. Dane z błędną kwotą, nieznanym statusem, pustym identyfikatorem wymaganym do zgody, tym samym autorem i zatwierdzającym, niepoprawnym czasem lub okresem `od >= do` dają jawny błąd. Nie zamieniamy ich po cichu na zgodę. Brak zatwierdzającego jest dozwolony przy statusie innym niż `zatwierdzony`.
8. Wynik podaje limit efektywny, przekroczenie, źródło `bazowy` / `czasowy` oraz ID użytego wniosku lub null. Nie zmienia danych wejściowych. Historia decyzji jest na tym etapie stałym wejściem; utrwalanie audytu to następny zakres.

## Przykłady odbioru

Wspólne dane: baza 10000, wykorzystanie 12000, wniosek o 15000, autor `operator-1`, zatwierdzający `operator-2`, od `2026-09-22T08:00:00Z` do `2026-09-22T10:00:00Z`.

| Warunek | Limit efektywny | Przekroczenie | Źródło |
|---|---:|---:|---|
| Brak wniosku | 10000 | 2000 | bazowy |
| Zatwierdzony, teraz 09:00Z | 15000 | 0 | czasowy |
| Zatwierdzony, teraz dokładnie 08:00Z | 15000 | 0 | czasowy |
| Zatwierdzony, teraz dokładnie 10:00Z | 10000 | 2000 | bazowy |
| Oczekujący / odrzucony / cofnięty, teraz 09:00Z | 10000 | 2000 | bazowy |
| Baza 0, brak wniosku, wykorzystanie 12000 | 0 | 12000 | bazowy |
| Autor i zatwierdzający to ta sama osoba | jawny błąd | — | — |

Kwota 10000 to 100,00 zł. Testy porównują grosze, ekran może formatować je jako PLN. Nie zmieniaj przykładów, aby dopasować je do wyniku implementacji.
