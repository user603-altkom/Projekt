# Zgłoszenie klientki — skrót do ćw. 03

> Dane syntetyczne. Osoby i sprawa są fikcyjne. To skrócona wersja
> `zgloszenie_klienta.md`, przygotowana do podstawowego wariantu ćwiczenia.

## Relacja z placówki

Do Oddziału 137 – Warszawa zgłosiła się Katarzyna Wójcik. Prosi o wyjaśnienie
rozbieżności w rozliczeniu za okres 14–18.08.2026 oraz daty waluty jednej operacji.

14.08.2026 otrzymała przelew **84 210,55 PLN**. Według jej relacji pieniądze
pochodzą ze sprzedaży mieszkania po rodzicach. Kwota przelewu jest widoczna
w wyciągu z systemu rozliczeniowego; klientka pytała, czy jest poprawna,
bo tak duży jednorazowy wpływ był dla niej nietypowy.

W rozmowie wspomniała również, że w przyszłym roku kończy pięćdziesiąt lat.
Pracownik odnotował w pełnym zgłoszeniu wątpliwość, czy ta informacja zgadza
się z danymi w systemie.

## Ustalenia pracownika

- Operacja jest uznaniem na kwotę **84 210,55 PLN**.
- Data księgowania: **2026-08-14**; data waluty: **2026-08-16, niedziela**.
- Saldo przed operacją: **12 630,40 PLN**, po niej: **96 840,95 PLN**.
  Te trzy kwoty są zgodne; na tej pojedynczej pozycji nie wykazano różnicy.
- Zgłaszana rozbieżność wynosi **0,24 PLN** za okres 14–18.08.2026.
  Uzgodnienie partii z pliku zapasowego również wskazuje 0,24 PLN na 219 wierszach.
- Operacja pochodzi z **`wyciag_20260819_recovery.csv`**. Pliku nie ma w repo;
  jest u zespołu utrzymania. Papierowy wyciąg klientki jest do wglądu w placówce.
- Do sprawdzenia pozostaje reguła ustalania daty waluty w module `interest`.
  Pracownik nie ustalił, czy niedziela jest w tym przypadku prawidłowa.

## Oczekiwany rezultat analizy

Klientka chce wyjaśnienia rozbieżności **0,24 PLN** oraz potwierdzenia,
czy data waluty **2026-08-16** jest prawidłowa. Przyczyny nie ustalono.
