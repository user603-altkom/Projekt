> **Dane syntetyczne.** Numery rachunków w tym dokumencie są fikcyjne — mają zmyślony kod
> banku (`0000`) i niepoprawne cyfry kontrolne. Nazwy firm są wymyślone, żaden fragment
> nie odnosi się do prawdziwego klienta ani do prawdziwej sprawy.

# BR-2026-0142 — Limity kredytowe na rachunkach firmowych

| Pole | Wartość |
|---|---|
| Data zgłoszenia | 2026-08-27 |
| Zgłaszający | Departament Produktów dla Firm, wspólnie z Zespołem Ryzyka Operacyjnego |
| Dotyczy | rejestr transakcji, rozliczenie dzienne |
| Priorytet | Wysoki — uzgodnione na komitecie produktowym 2026-08-25 |
| Status | Do analizy |

## O co chodzi

Klientom firmowym przyznajemy limit kredytowy — kwotę, do której rachunek może „zejść pod kreskę"
w ramach bieżących obciążeń. Limit kredytowy jest ustalany przy zakładaniu rachunku albo przy
podpisaniu aneksu i siedzi dziś **wyłącznie w katalogu produktów**. Nasze rozliczenie go
nie zna: obciążenia przechodzą przez rejestr transakcji niezależnie od tego, czy klient
ma przyznane 75 000, czy 3 000 000.

Efekt jest taki, że limit kredytowy istnieje na papierze i w umowie, a nie istnieje w tym, co się
faktycznie dzieje z pieniędzmi. Opiekunowie klientów dowiadują się o przekroczeniu
z raportu **następnego dnia**, kiedy nie ma już czego zatrzymać.

## Skąd to zgłoszenie

Bezpośrednim powodem są dwie sprawy z sierpnia:

- Klient z segmentu handlowego (spółka z limitem kredytowym 500 000) w jeden dzień puścił serię
  siedmiu przelewów do dostawców. Żaden z nich z osobna nie był duży, razem wyszło ponad
  półtora limitu kredytowego. Opiekun zobaczył to po fakcie, wyjaśnienia z klientem trwały tydzień.
- Druga spółka, obsługiwana przez ten sam zespół, prowadzi u nas kilka rachunków: jeden
  do rozliczeń krajowych i dwa, przez które płaci kontrahentom zagranicznym. Limity kredytowe są
  przyznane osobno do każdego z nich, ale nikt w rozliczeniu ich nie pilnuje, więc
  w praktyce nie robi to żadnej różnicy. Spółka przekroczyła limit kredytowy na rachunku używanym
  do rozliczeń z dostawcą z Niemiec i dowiedzieliśmy się o tym z reklamacji, nie z systemu.

Komitet produktowy przyjął 25.08, że limity kredytowe mają zacząć działać w rozliczeniu przed
końcem kwartału.

## Czego potrzebujemy

1. Rozliczenie ma **znać limit kredytowy przypisany do rachunku**. Źródłem prawdy zostaje katalog
   produktów — nie chcemy drugiego miejsca, w którym limity kredytowe się edytuje.
2. Obciążenie, które wychodzi poza limit kredytowy, ma zostać **zauważone i zgłoszone**, z podaniem
   rachunku, operacji i tego, o ile limit kredytowy został przekroczony. Opiekun klienta musi
   dostać informację, z którą da się iść do klienta.
3. Zespół Ryzyka chce raz dziennie **listę rachunków, które wyszły poza limit kredytowy** —
   dziś składamy ją ręcznie z dwóch eksportów.

## Przykłady z ostatniego miesiąca

Kwoty limitów kredytowych podajemy tak, jak są zapisane w katalogu produktów.

| Klient (nazwa umowna) | Rachunek | Limit kredytowy | Co się wydarzyło |
|---|---|---|---|
| Stal-Mot sp. z o.o. | 20 0000 8918 0903 9785 4063 0428 | 75 000 | seria przelewów do dostawców, łącznie ponad limit kredytowy |
| Delfin Trade sp. z o.o. | 16 0000 4323 0730 1758 9148 1509 | 20 000 | rachunek do rozliczeń z kontrahentami zagranicznymi, przekroczenie wyszło z reklamacji |
| PPHU Okno-Bud | 28 0000 1235 7658 2727 4317 8349 | 300 000 | limit kredytowy podniesiony aneksem w maju, w rozliczeniu nadal działa stary |
| Kalina Logistyka S.A. | 35 0000 8054 2818 5736 2581 6461 | 0 | limit kredytowy wycofany po restrukturyzacji, rachunek nadal obciążany |

## Czego oczekujemy na wyjściu

- Przy rozliczeniu dziennym widać, które operacje wyszły poza limit kredytowy rachunku.
- Opiekun klienta dostaje konkretny komunikat, a nie samo „przekroczono limit kredytowy".
- Zespół Ryzyka nie składa już listy ręcznie.

## Uwagi zgłaszających

- Limity kredytowe **zmieniają się w czasie** — aneks podpisany w maju obowiązuje od maja, a nie od
  zawsze. Raport za kwiecień policzony po nowym limicie kredytowym byłby nieprawdziwy.
- Część rachunków **nie ma limitu kredytowego w ogóle** i to jest normalne. Nie chcemy, żeby te
  rachunki nagle zaczęły być gdziekolwiek blokowane.
- Limit kredytowy zero to osobna sytuacja: limit kredytowy był i został wycofany. Z naszego punktu widzenia to
  nie to samo, co rachunek, któremu limitu kredytowego nigdy nie przyznano, ale nie upieramy się przy
  tym, jak to ma wyglądać w środku.
- Nie wiemy, jak ma się limit kredytowy do zwrotów i storn, które wracają na rachunek tego samego
  dnia. Zespół Ryzyka i Departament Produktów mają tu różne zdania i nie rozstrzygnęliśmy
  tego na komitecie.

## Kontakt

Pytania merytoryczne: Departament Produktów dla Firm (skrzynka zespołowa
`produkty.firmowe@example.com`). Część odpowiedzi wymaga decyzji komitetu produktowego —
najbliższe posiedzenie za dwa tygodnie.
