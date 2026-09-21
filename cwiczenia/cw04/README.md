# Ćw. 04 — Od wymagania do planu

**Dzień 1 · 35 min · Copilot Chat w VS Code · bez implementacji**

> Franek: „Limit miał być prosty, dopóki nie padło pytanie: w jakiej walucie?”.

Wracamy do ekranu limitów. W ćw. 00 zobaczyłeś prosty przykład, a w ćw. 02b poprawiłeś filtr. Teraz sprawdzisz, czego żądali zamawiający i które decyzje nadal są otwarte. **Dobry plan powinien ujawniać niewiadome, zamiast uzupełniać je po cichu.**

## 1. Poznaj dwa różne zakresy — 5 min

Otwórz i przeczytaj:

- [dane/zgloszenie_limity.md](../../dane/zgloszenie_limity.md) — szerokie wymaganie biznesowe; wykorzystasz je również do review w dniu 3;
- [historia/brief_operatora.md](../../historia/brief_operatora.md) — wąski, uzgodniony zakres demonstratora na finał: jedna partia, jeden rachunek, jedna data i waluta PLN.

Nie traktuj uproszczeń demonstratora jako ogólnych zasad produktu. **Kryterium akceptacji** to warunek, który inna osoba umie sprawdzić i oznaczyć jako spełniony lub niespełniony. „Ekran jest dobry” nie wystarczy; „filtr pokazuje FR-002 i FR-003” można sprawdzić.

## 2. Poproś o propozycję — 8 min

W nowym czacie w trybie **Ask** dołącz oba pliki przez **Add Context / Dodaj kontekst**. Nie musisz dołączać kodu modułu limitów — najpierw ustalasz, czego wymagasz. Wklej:

```text
Przejmuję aplikację po Franku. Przeczytaj dwa dołączone dokumenty:
dane/zgloszenie_limity.md i historia/brief_operatora.md.
Pierwszy opisuje szerszy produkt, drugi wąski demonstrator na finał szkolenia.
Nie implementuj niczego i nie edytuj plików.

Przygotuj:
A. Do pięciu najważniejszych wymagań szerszego produktu. Przy każdym wskaż
   dokument i fragment źródłowy oraz pytania, które wymagają decyzji.
B. Pięć sprawdzalnych kryteriów odbioru demonstratora: dane wejściowe,
   czynność i oczekiwany wynik. Wykorzystaj tabelę FR-001–FR-003 z historia/brief_operatora.md.
C. Krótki plan demonstratora, maksymalnie pięć zadań.

Oddziel wymagania zapisane w dokumentach, własne propozycje i niewiadome.
Nie rozstrzygaj sam zasad dla zwrotów, storn ani innych otwartych kwestii.
Nie rozszerzaj finału do realizacji całego zgłoszenia biznesowego.
```

## 3. Zweryfikuj źródła i założenia — 12 min

Nie oceniaj planu tylko po tym, czy brzmi rozsądnie. Porównaj jego stwierdzenia z dokumentami i oznacz każde istotne wymaganie lub decyzję:

- **WYMAGANIE** — jest zapisane w źródle; wskaż gdzie;
- **PROPOZYCJA** — model lub Ty dodajecie sposób rozwiązania; wymaga świadomej decyzji;
- **PYTANIE** — brakuje odpowiedzi, a nie powinien jej wybierać sam agent.

Nie każda propozycja jest błędem. Możesz przyjąć ją **dla demonstratora**, odłożyć lub odrzucić; zapisz powód. Decyzje dotyczące szerszego produktu pozostają pytaniami do zamawiających.

Sprawdź szczególnie: sumowanie operacji, walutę, obowiązywanie limitu w czasie, różnicę między brakiem limitu a zerem oraz ewentualne blokowanie operacji. **Jeżeli model poprawnie wypisał niewiadome, nie musisz szukać błędu na siłę.**

## 4. Zapisz materiał do kolejnych ćwiczeń — 5 min

Utwórz **jeden plik `portfolio/kryteria-limitow.md`** z czterema sekcjami:

1. **Szerszy produkt:** wymagania i fragmenty źródeł, które wykorzystasz do review.
2. **Demonstrator:** pięć kryteriów do sprawdzenia w finale.
3. **Założenia i pytania:** decyzja przyjęta dla demonstratora / odłożona / odrzucona oraz uzasadnienie.
4. **Plan:** do pięciu kroków realizacji demonstratora.

Przykład formatu kryterium, nie kompletne rozwiązanie:

> Dla obciążeń 60, 50 i 20 PLN oraz limitu 100 PLN, przy widocznych wszystkich operacjach, wiersz FR-002 pokazuje kwotę 50 PLN, wykorzystanie 110 PLN i przekroczenie 10 PLN.

Pozostałe kryteria powinny obejmować także zachowanie ekranu i pochodzenie wyniku. Nie obiecuj w finale reguł, których brief nie obejmuje.

## 5. Odbiór w parze — 5 min

Partner wybiera jedno kryterium i mówi, jak je sprawdzi. Następnie wybiera jedno założenie i pyta o jego źródło. Jeśli musisz dopowiadać istotny warunek ustnie, dopisz go do pliku.

**Gotowe:** masz kryteria obu zakresów, wskazane źródła, jawne propozycje i pytania oraz mały plan. Plik wróci w ćw. 09 część B, review w ćw. 10 i finale. Zapisujesz tylko `portfolio/`, więc nie robisz commita.

**Gdy utkniesz:** weź z planu jedną liczbę, warunek lub decyzję i znajdź odpowiadający fragment dokumentu. Zacznij od jednego kryterium dla FR-002. Nie trzeba projektować architektury całego systemu.

**Rozszerzenie:** poproś o plan ponownie w nowym czacie, z tymi samymi dokumentami. Porównaj jedną różnicę i sprawdź ją w źródłach. Zgodność dwóch odpowiedzi nie czyni założenia wymaganiem.
