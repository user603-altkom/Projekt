# D3-05 — Opis, po którym da się zrobić review

**W ramach D3-03/05 · bez dodatkowego bloku**

Utwórz `portfolio/opis-zmiany.md`. Wypełnij poniższe na podstawie swojej zmiany; agent może pomóc skrócić tekst, ale nie może wymyślić wykonanych sprawdzeń.

```markdown
## Problem i zachowanie po zmianie
Operator chciał… Teraz po… widzi…

## Zakres
Najważniejsze pliki i decyzja projektowa:

## Sprawdzenia
- Komenda/scenariusz:
- Rzeczywisty wynik:
- Czego nie sprawdziliśmy:

## Do uwagi recenzenta
Jedna decyzja lub ograniczenie wymagające oceny:

## Uruchomienie
Komenda, adres i dane potrzebne do odtworzenia:
```

Partner korzysta z samego opisu i uruchamia jeden scenariusz. Jeśli musi dopytać o komendę, dopisz ją. Nie pisz „testy OK”, jeśli nie masz wyniku.

Otwórz `.gitlab-ci.yml`: wskaż, gdzie są `npm test` i `npm run typecheck`. Plik pipeline to konfiguracja; nie dowodzi wykonania joba. Nie ma tu gotowej integracji Claude API. Automatyzacja AI potrzebowałaby runnera, dostępu do modelu, poświadczeń oraz osobnego kroku publikacji.

**Gotowe:** krótki opis zgodny z kodem i wykonanymi kontrolami. Nie musisz otwierać MR, aby zaliczyć przygotowanie zmiany.
