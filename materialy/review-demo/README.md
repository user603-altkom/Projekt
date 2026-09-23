# Lokalny materiał do pokazu review

Mały syntetyczny przykład do pokazania review Copilota na GitHubie i lokalnego agenta z GitLab CLI. Bez zależności: Node 24+, `node --test materialy/review-demo/test/sprawdzenie.mjs` (z katalogu głównego repo). Wszystkie postacie i dane są fikcyjne.

## Wymaganie

Kwoty to nieujemne całkowite grosze. Funkcja `exceeded` oblicza przekroczenie przy narastającym wykorzystaniu. Limit kredytowy zero jest prawidłową wartością. Brak limitu kredytowego (`null` lub `undefined`) oznacza brak ograniczenia. Równość wykorzystania i limitu kredytowego nie jest przekroczeniem.

FR-001–003: kwoty 6000, 5000, 2000 groszy; wykorzystanie 6000, 11000, 13000. Limit kredytowy 10000 daje przekroczenia 0, 1000, 3000. Limit kredytowy 0 daje 6000, 11000, 13000.

## Pokaz

Przejrzyj PR/MR i porównaj z wymaganiem. Potwierdź uwagę na przykładzie, potem dopisz jeden test w osobnym kroku. Zielone testy mogą nie obejmować wszystkich istotnych przypadków. Nie aplikuj diffu do głównego repo warsztatowego.

Review to ocena zmiany. Pisanie testu i poprawka to osobne zadania agenta. Automatyczne uruchomienie review wymaga ustawienia usługi; samo istnienie instrukcji nie włącza automatyzacji.

GitHub: https://github.com/agentGreg/franek-copilot-review-demo/pull/1 . Ten folder zawiera poprawną bazę; PR pokazuje zmianę do oceny.
