# Ćw. 3 — Anonimizacja

**Czas w nowej ścieżce:** D1 · 13:25–13:50 · 25 min · Każdy u siebie, odbiór w parze

> Franek: „Zgłoszenie klienta jest najbardziej konkretne. I właśnie dlatego nie wklejajmy go w całości”.

**Zakres:** Podstawa: minimalny fragment zgłoszenia. Rozszerzenie: ryzyko ponownej identyfikacji przez łączenie danych.

Pracujesz na jednej gałęzi `warsztat/franek` przez całe szkolenie. Rezultat i dowód zapisz w `portfolio/`.

## Cel

Umieć rozstrzygnąć, co z dokumentu musi zniknąć, zanim trafi do modelu, i co musi w nim
zostać, żeby odpowiedź była cokolwiek warta — także wtedy, gdy procedura milczy.

## Zgłoszenie

`dane/zgloszenie_klienta.md` — zgłoszenie serwisowe SD-2026-08-0417, spisane w placówce
19.08.2026. Kończy się tak:

> Klientka nie żąda korekty konkretnej kwoty — chce pisemnego wyjaśnienia rozbieżności
> 0,24 PLN oraz potwierdzenia, że data waluty 2026-08-16 jest prawidłowa mimo że wypada
> w weekend. Proszę o odniesienie się do mechanizmu wyliczania daty waluty w module
> `interest` i o informację, czy to znany, zgłoszony wcześniej przypadek.

## Kroki

1. **Przeczytaj całe zgłoszenie do końca, zanim cokolwiek wytniesz.** Sekcje techniczne też.
2. **Rozdziel treść na trzy kupki: wychodzi, zostaje, nie wiem.** Sprawdź, do której trafia
   nazwa oddziału, kwota 84 210,55 PLN razem z tym, skąd pochodzi, oraz zdanie o wieku
   klientki.
3. **Napisz wersję, którą naprawdę wyślesz.** Zapisz ją jako `cwiczenia/cw03/zgloszenie_anon.md`.
4. **Oddaj ją partnerowi.** Niech spróbuje powiedzieć, kto jest klientem
   i z której placówki przyszło zgłoszenie. Co jej wystarczyło?
5. **Wróć do kupki „nie wiem" i rozstrzygnij ją na piśmie.** Jedno zdanie uzasadnienia przy
   każdej pozycji. „Na wszelki wypadek" też jest uzasadnieniem — dopisz tylko, czego ten
   wypadek dotyczy.

> **Jeśli utknąłeś po 10 minutach**
> Zacznij od klasyfikacji, nie od cięcia — i niech pierwszą wersję zrobi model, a ty ją
> sprawdź. Daj mu treść zgłoszenia (wklej albo wskaż plik) i dopisz:
>
> ```
> Jesteś analitykiem bezpieczeństwa informacji w banku. Masz do dyspozycji treść
> zgłoszenia serwisowego od klienta (dane/zgloszenie_klienta.md).
>
> Chcę wysłać to zgłoszenie do zewnętrznego modelu językowego z prośbą o pomoc
> w dwóch rzeczach: w wyjaśnieniu rozbieżności 0,24 PLN w naliczonych odsetkach
> oraz w ocenie, czy data waluty przypadająca na niedzielę jest poprawna.
>
> Przejdź dokument fragment po fragmencie i przypisz każdy fragment do jednej
> z trzech grup, w trzech osobnych tabelach:
>
> 1. IDENTYFIKUJE — pozwala wskazać konkretną osobę, pracownika, rachunek albo
>    placówkę: sam z siebie albo w połączeniu z innym fragmentem tego dokumentu.
>    Przy każdym napisz, z czym się łączy.
> 2. NIEZBĘDNE — bez tego moje dwa pytania tracą sens: identyfikatory techniczne,
>    daty, kwoty, nazwy modułów, komunikaty błędów, kroki reprodukcji.
> 3. NIEROZSTRZYGNIĘTE — pasuje do obu grup naraz albo do żadnej. Przy każdym
>    napisz, czego ci brakuje, żeby rozstrzygnąć.
>
> Nie proponuj zamienników i nie przepisuj zgłoszenia. Sama klasyfikacja.
> Fragment, który sam wygląda na nieistotny, ale w połączeniu z innym zawęża krąg
> osób, ma trafić do grupy 1, nie do 3.
> ```
>
> To, co wróci, jest wejściem do twojej decyzji, nie decyzją.

> **Wolisz regułę niż ten jeden plik**
> Napisz zamiast tego listę zasad „co wolno wkleić", stosowalną do dowolnego zgłoszenia,
> bez czytania go w całości. Potem sprawdź ją na tym zgłoszeniu: ile pozycji zasady
> rozstrzygają same, a ile i tak zostaje na twojej głowie?

> **Skończyłeś wcześniej**
> Wyślij swoją wersję do modelu i poproś o odpowiedź dla klientki — tę, o którą prosi
> ostatni akapit zgłoszenia. Czy model ma jeszcze z czego ją zbudować? Czego musiał się
> domyślić, a czego domyślić się nie dało?

## Gotowe, gdy

- [ ] masz `cwiczenia/cw03/zgloszenie_anon.md`, z którego partner nie potrafi
      odtworzyć, kto jest klientem ani z której placówki przyszło zgłoszenie
- [ ] przy nazwie oddziału, kwocie 84 210,55 PLN i zdaniu o wieku klientki masz po jednym
      zdaniu uzasadnienia — niezależnie od tego, jak zdecydowałeś
- [ ] partner czyta twoją wersję i potwierdza, że da się z niej odpowiedzieć na
      oba pytania z ostatniego akapitu zgłoszenia

## Na koniec ćwiczenia

Po kontroli diffu dodaj nowe pliki osobno (`git add ścieżka/do/pliku`). `git add -u` dodaje tylko zmiany już śledzonych plików. Pozostań na wspólnej gałęzi.

```
git status --short
git diff
git add -u
git commit -m "Warsztat: zakończony etap"
```
