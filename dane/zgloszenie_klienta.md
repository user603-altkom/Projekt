> **UWAGA — dane syntetyczne.** Wszystkie dane osobowe i identyfikatory bankowe w tym
> pliku są **wymyślone i celowo niepoprawne**, przygotowane wyłącznie na potrzeby ćwiczenia
> szkoleniowego z anonimizacji danych. W szczególności:
> - PESEL ma poprawną strukturę (11 cyfr, sensowna data urodzenia), ale **celowo błędną
>   cyfrę kontrolną**,
> - numer rachunku (NRB) ma **zmyślony kod banku** (`0000` — żaden polski bank nie ma
>   takiego kodu rozliczeniowego) oraz **celowo niepoprawne cyfry kontrolne mod-97**,
> - numer telefonu pochodzi z zakresu numeracji nieprzydzielonego operatorom,
> - adres e-mail jest w domenie zarezerwowanej do celów dokumentacyjnych (`example.com`),
> - ulica w adresie nie istnieje.
>
> Żaden fragment tego zgłoszenia nie odnosi się do prawdziwej osoby, rachunku ani sprawy.

# Zgłoszenie serwisowe SD-2026-08-0417

| Pole | Wartość |
|---|---|
| Data i godzina zgłoszenia | 2026-08-19, 10:42 |
| Zgłaszający | Michał Sobczak, starszy specjalista ds. obsługi klienta, ID pracownika PS-48213, Oddział 137 – Warszawa |
| Kanał | wizyta w placówce, wcześniej kontakt telefoniczny 2026-08-18 |
| Priorytet | Wysoki |
| Kategoria | Rejestr transakcji / naliczanie odsetek |
| Status | Otwarte — przekazane do zespołu utrzymania |

## Dane klienta

- **Imię i nazwisko:** Katarzyna Wójcik
- **PESEL:** 88041232107
- **Numer rachunku (NRB):** 99 0000 4417 0000 4561 2378 9045
- **Telefon:** +48 20 123 45 67
- **E-mail:** katarzyna.wojcik@example.com
- **Adres korespondencyjny:** ul. Cichej Zorzy 9/12, 04-987 Warszawa

## Opis zgłoszenia (relacja klientki, spisana przez pracownika)

Klientka zgłosiła się dziś osobiście do naszej placówki przy Puławskiej, po tym jak
telefonicznie zgłaszała sprawę wczoraj i nie uzyskała wyjaśnienia. Twierdzi, że w wyciągu
za sierpień widzi księgowanie, które „nie zgadza się z tym, co sama policzyła" —
chodzi o wpływ z 14.08.2026 i naliczone od niego odsetki.

Z rozmowy: klientka otrzymała 14.08.2026 (piątek) jednorazowy, nietypowo wysoki przelew
przychodzący na kwotę **84 210,55 PLN** — wg jej słów tytułem rozliczenia ze sprzedaży
mieszkania po rodzicach. Zwróciła uwagę, że to jednorazowe zdarzenie, nie regularny wpływ,
i dopytywała, czy kwota na pewno jest poprawna, bo „nigdy nie miała aż tylu zer na koncie".
Nie mam podstaw, by kwestionować kwotę — pochodzi z pliku wyciągu dostarczonego przez
system rozliczeniowy, ale odnotowuję, bo klientka sama ją zakwestionowała.

Przy okazji rozmowy klientka wspomniała, że w przyszłym roku kończy pięćdziesiąt lat —
warto zwrócić uwagę przy weryfikacji tożsamości, bo nie do końca zgadza mi się to z tym,
co mam w systemie, ale nie chciałem jej o to dopytywać wprost przy okienku.

Rzeczywisty problem: odsetki naliczone za okres 14–18.08.2026 są niższe, niż wychodzi
klientce z własnych wyliczeń (różnica rzędu kilkudziesięciu groszy, nie kilku złotych —
klientka jest tego świadoma i nie oczekuje kwoty innego rzędu wielkości, tylko wyjaśnienia
rozbieżności).

## Analiza wstępna pracownika

Sprawdziłem transakcję w systemie — to operacja **OP-2026-08-0248**, UZNANIE na kwotę
84 210,55 PLN, data księgowania 2026-08-14, **data waluty 2026-08-16**. 2026-08-16 to
niedziela. Nie wiem, czy to błąd, czy tak ma być — u innej klientki w zeszłym miesiącu
data waluty zawsze wychodziła na dzień roboczy, ale nie mam pewności, czy to reguła, czy
przypadek.

Administrator zwrócił mi uwagę na jedną rzecz: tej operacji nie ma w standardowym
eksporcie sierpniowym. Planowy import z 19.08.2026 nie doszedł do skutku (trzy
timeouty połączenia z katalogiem wymiany plików, zgłoszenie wewnętrzne INC-4471),
a transakcja weszła do rejestru dopiero z pliku zapasowego
`wyciag_20260819_recovery.csv`, dostarczonego ręcznie przez operatora o 07:42.
Rachunek klientki występuje wyłącznie w tym pliku zapasowym — w miesięcznym
wyciągu `dane/wyciag_2026_08.csv` nie ma ani jednej jego pozycji.

Poprosiłem administratora o log z nocnego przebiegu raportu dziennego z 19.08.2026 —
w załączeniu dokładny fragment.

## Szczegóły techniczne

**Moduł:** `interest` (naliczanie odsetek), wywołanie z `reports` (raport dzienny)

**Znacznik czasu wystąpienia:** 2026-08-19T05:12:47.331+02:00

**Identyfikator transakcji:** OP-2026-08-0248

**Numer rachunku (jak w rejestrze):** 99000044170000456123789045

**Kwoty:**
- kwota transakcji: 84 210,55 PLN (8 421 055 groszy)
- saldo rachunku przed operacją: 12 630,40 PLN
- saldo rachunku po operacji wg raportu: 96 840,95 PLN — zgodne co do grosza
  z wyliczeniem klientki; **na tej jednej pozycji rozbieżności nie ma**
- rozbieżność zgłaszana przez klientkę: **0,24 PLN**, narastająco za okres
  14–18.08.2026. Klientka zsumowała wszystkie pozycje z papierowego wyciągu
  i porównała z saldem z raportu — różnica nie siedzi w żadnej pojedynczej
  pozycji, tylko zbiera się po drobnych kwotach z kolejnych operacji.

Moduł uzgodnień raportuje dla całej partii, z której weszła ta operacja
(`wyciag_20260819_recovery.csv`), różnicę **0,24 PLN na 219 wierszach** —
wpis w logu z 2026-08-19, 07:42:24.610. To pojedyncze grosze rozsiane po
wierszach (0,24 PLN na 219 pozycji), a nie jeden większy błąd na jednej pozycji;
ta sama niezgodność sumy kontrolnej występuje też na miesięcznym wyciągu
sierpniowym.

**Komunikat błędu z logu nocnego przebiegu** (0,19 PLN w nawiasie to próg
ostrzegawczy zadania rekoncyliacji, a nie kwota rozbieżności — zgłaszane 0,24 PLN
ten próg przekracza):

```
2026-08-19T05:12:47.331+02:00 ERROR interest Nie udało się dokończyć naliczenia odsetek
dla rachunku 99000044170000456123789045 w okresie 2026-08-14..2026-08-18 — rozbieżność
salda przekracza próg ostrzegawczy (0,19 PLN)
    at accrueInterest (src/interest/accrue.ts:118:15)
    at generateDailyReport (src/reports/dailyReport.ts:47:22)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
korelacja=7f3a91c2
```

## Kroki reprodukcji

1. **Właściwy plik źródłowy to `wyciag_20260819_recovery.csv`**, nie miesięczny
   `dane/wyciag_2026_08.csv`. Operacja OP-2026-08-0248 i rachunek
   99 0000 4417 0000 4561 2378 9045 weszły do rejestru z importu ręcznego
   2026-08-19 o 07:42 (korelacja `9c04e771`). W miesięcznym wyciągu tego rachunku
   nie ma — szukanie go tam nie da żadnego wyniku.
2. Odtworzyć uzgodnienie na pliku zapasowym: uruchomić raport dzienny na
   `wyciag_20260819_recovery.csv` i porównać policzoną sumę obrotów z polem
   `suma_kontrolna_grosze` z nagłówka tego pliku. Oczekiwany wynik: różnica
   **0,24 PLN na 219 wierszach**, zgodnie z wpisem w logu z 2026-08-19,
   07:42:24.610. Plik zapasowy jest u zespołu utrzymania — operator dostarczył go
   poza katalogiem wymiany plików, więc nie leży razem z pozostałymi wyciągami.
3. Ten sam mechanizm widać bez pliku zapasowego, na danych dostępnych w repozytorium:
   `npm run raport` (czyli `tsx src/reports/dailyReport.ts dane/wyciag_2026_08.csv`)
   kończy się linią `RÓŻNICA: -0,23 zł` przy 400 zaimportowanych operacjach i 24
   rachunkach. To ta sama niezgodność sumy kontrolnej, tylko na innym pliku i bez
   danych klientki — nadaje się do analizy przyczyny.
4. Sprawdzić log aplikacji z przebiegu nocnego 19.08.2026 (znacznik czasu
   2026-08-19T05:12:47.331+02:00, korelacja `7f3a91c2`) — rekoncyliacja odsetkowa
   przerywa naliczenie dla rachunku klientki, bo rozbieżność salda przekracza próg
   ostrzegawczy. Dalej w tym samym logu, już po imporcie pliku zapasowego
   (korelacja `9c04e771`), jest ostrzeżenie, że data waluty operacji
   OP-2026-08-0248 przypada na 2026-08-16, czyli w niedzielę.

## Oczekiwania klienta / proponowane działania

Klientka nie żąda korekty konkretnej kwoty — chce pisemnego wyjaśnienia rozbieżności
0,24 PLN oraz potwierdzenia, że data waluty 2026-08-16 jest prawidłowa mimo że wypada
w weekend. Proszę o odniesienie się do mechanizmu wyliczania daty waluty w module
`interest` i o informację, czy to znany, zgłoszony wcześniej przypadek.

## Załączniki

- skan papierowego wyciągu klientki (do wglądu w placówce, nieskanowany do systemu)
- pełny fragment logu aplikacji z 19.08.2026, 05:00–05:20 (przekazany osobno do zespołu
  utrzymania)
