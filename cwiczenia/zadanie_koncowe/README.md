# Zadanie końcowe — od zgłoszenia do zmiany gotowej do recenzji

**Czas:** 55 min · **Praca w parach** · Klawiaturę ma osoba, która czuje się mniej pewnie

## Cel

Przejść jedną zmianę przez pełny cykl — analiza, implementacja, testy, opis, przygotowanie do recenzji — i wiedzieć, w którym miejscu tego cyklu stawiasz bramkę, jeśli prowadzisz go agentem.

To jest sprawdzian całej trzydniowej listy warunków wstępnych naraz: kontekst, kryteria, weryfikacja, opis dla drugiego człowieka.

## Zgłoszenie

Trzy zgłoszenia z backlogu, w tym katalogu. Weź **jedno**. Są niezależne, dotykają różnych części systemu, kolejność nie ma znaczenia.

> `01_ujemna_kwota_w_walidacji.md` — „Operacja z ujemną kwotą przechodzi walidację"
> `02_raport_dzienny_sumy_per_waluta.md` — „Raport dzienny sumuje operacje w różnych walutach do jednej kwoty"
> `03_import_odrzuca_niezgodna_sume_kontrolna.md` — „Import przyjmuje plik, którego suma kontrolna nie zgadza się z zawartością"

**Uwaga do trzeciego zgłoszenia.** Wdrożone wprost zatrzyma `npm run raport` na głównym pliku wyciągu — `dane/wyciag_2026_08.csv` jest właśnie plikiem, którego suma kontrolna nie zgadza się z zawartością. To nie jest twój błąd ani błąd repozytorium, tylko zderzenie dwóch prawdziwych wymagań, i zgłoszenie to przewiduje. Przeczytaj jego kryteria akceptacji do końca, zanim uznasz, że coś zepsułeś.

## Kroki

1. **Wybierz zgłoszenie i ścieżkę.** Obie prowadzą do tego samego wyniku:
   - **Ścieżka A — ask/edit krok po kroku.** Ty rozbijasz zadanie, ty decydujesz o każdej zmianie w każdym pliku, model pisze fragmenty na twoje polecenie. **Krótsza z założenia** — mniejszy zakres, krótsza pętla, mniej do zatwierdzania. To nie jest wersja dla słabszych.
   - **Ścieżka B — tryb agentowy z bramkami.** Agent planuje i wykonuje, ty zatwierdzasz w trzech punktach: po planie i przed napisaniem pierwszej linii, przed zapisem zmian w plikach, przed uruchomieniem czegokolwiek. Bramki ustalasz z drugą osobą w parze, zanim wystartujesz — nie w trakcie.
2. **Rozłóż zgłoszenie na kryteria akceptacji, zanim dotkniesz kodu.** Tak samo jak w Ćw. 4. Zapisz je. Do nich będziesz wracał przy odbiorze.
3. **Zaimplementuj i sprawdź, czego nie zepsułeś.** `npm test`, `npm run typecheck`, `npm run raport`. Zielone testy nie są dowodem, że kryteria są spełnione — porównaj z listą z kroku 2, punkt po punkcie.
4. **Napisz opis zmiany.** Co zmieniłeś, dlaczego tak, czego świadomie nie zrobiłeś, co recenzent musi sprawdzić ręcznie, bo z kodu tego nie widać.
5. **Zatrzymaj się, kiedy zmiana jest opisana.** Kryterium ukończenia to **zmiana opisana, nie zmiana idealna**. Niedokończona implementacja z uczciwym „tego nie zdążyłem, tu jest ryzyko" jest lepszym wynikiem niż kod, o którym nikt nie wie, w jakim jest stanie.

> **Jeśli utknąłeś po 15 minutach**
> Zejdź o poziom niżej: napisz najpierw test, który pada z powodu opisanego w zgłoszeniu.
> Nie umiesz go napisać? To znaczy, że kryteria akceptacji są jeszcze za ogólne — wróć
> do kroku 2 i doprecyzuj je, zamiast poprawiać kod.

> **Pracujesz z bazą, nie z TypeScriptem**
> Drugie zgłoszenie ma swój odpowiednik w `sql/raport_dzienny.sql`. Przejdź ten sam cykl na
> zapytaniu: kryteria, zmiana, sprawdzenie na `dane/wyciag_probka.csv` przeniesionym do tabeli
> albo na danych z `sql/001_init_transakcje.sql`, opis zmiany dla recenzenta. Reszta karty
> obowiązuje bez zmian.

> **Skończyłeś wcześniej**
> Przejdź to samo zgłoszenie drugą ścieżką — A, jeśli robiłeś B, i odwrotnie. Porównaj:
> w którym miejscu bramka faktycznie coś zatrzymała, a w którym tylko kosztowała czas?
> Tę odpowiedź weź ze sobą do poniedziałku, to ona decyduje, gdzie agent w waszym zespole
> mógłby kiedyś działać, a gdzie nie.

## Gotowe, gdy

- [ ] masz kryteria akceptacji zapisane przed implementacją i przy każdym stoi, czy zmiana je spełnia
- [ ] `npm test` i `npm run typecheck` przechodzą, a jeśli `npm run raport` zachowuje się inaczej niż przed zmianą, umiesz powiedzieć dlaczego
- [ ] opis zmiany wystarcza drugiej osobie w parze, żeby wiedziała, co sprawdzić ręcznie — bez pytania cię o cokolwiek

## Na koniec ćwiczenia

```
git switch -c imie/zadanie-koncowe && git add -A && git commit -m "zadanie-koncowe" --allow-empty && git switch main
```

---

## Materiał: zgłoszenia do obsłużenia

Trzy zgłoszenia z backlogu zespołu, w formacie gotowym do wklejenia jako issue
(tytuł, opis, kryteria akceptacji). Każde jest niezależne od pozostałych — dotykają
różnych części systemu i można je wziąć w dowolnej kolejności, pojedynczo.
