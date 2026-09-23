# 04-review

## Zakres i wersja

Przegląd dotyczy zakresu MVP zdefiniowanego w briefu dla laboratorium limitów: ocena limitu efektywnego dla jednego kontrahenta, jednego wniosku i jednego punktu czasu. Wersja sprawdzana to implementacja w:

- laboratorium/limity/src/ocena.mjs
- laboratorium/limity/test/ocena.node.mjs
- laboratorium/limity/BRIEF.md

W zakresie review są następujące elementy:

- liczby w groszach, z wartością zero jako poprawną; brak floatów i konwersji na złote,
- rozróżnienie między limitem bazowym a limitem czasowym,
- status wniosku: oczekuje / zatwierdzony / odrzucony / cofnięty,
- kontrola identyfikatorów autora i zatwierdzającego,
- sprawdzenie przedziału czasu ISO 8601 UTC z regułą od <= teraz < do,
- selekcja wniosku aktywnego i ograniczenie do wzrostu względem limitu bazowego,
- jawny błąd dla nieprawidłowych danych zamiast ukrywania problemu,
- zwrot wyniku w formacie: limit efektywny, przekroczenie, źródło oraz id wniosku albo null.

Poza zakresem MVP pozostają: lista wniosków, baza wniosków, kolejka zatwierdzeń, audyt i logowanie, wsparcie wielu kontrahentów oraz operacje poza jednym punktem czasu.

## Uwaga z dowodem albo potwierdzony przypadek

Aktualna implementacja w ocena.mjs ignoruje całkowicie wniosek, status, identyfikatory, daty i reguły aktywności. Funkcja zawsze zwraca limit bazowy i źródło bazowy:

```js
export function ocenLimit(wejscie) {
  const limit = wejscie.limitBazowyGrosze;
  return {
    limitEfektywnyGrosze: limit,
    przekroczenieGrosze: Math.max(0, wejscie.wykorzystanieGrosze - limit),
    zrodlo: 'bazowy',
    wniosekId: null,
  };
}
```

To narusza wymagania briefu. Dla przykładu z briefu:

- baza: 10000,
- wykorzystanie: 12000,
- wniosek zatwierdzony: 15000,
- teraz: 2026-09-22T09:00:00Z,
- od: 2026-09-22T08:00:00Z,
- do: 2026-09-22T10:00:00Z,

oczekiwany wynik to:

- limit efektywny: 15000,
- przekroczenie: 0,
- źródło: czasowy,
- wniosekId: identyfikator wniosku

natomiast obecna funkcja zwraca:

- limit efektywny: 10000,
- przekroczenie: 2000,
- źródło: bazowy,
- wniosekId: null

To jest potwierdzony błąd funkcjonalny, a nie tylko różnica w stylu. Oznacza to, że implementacja nie spełnia części 3, 5, 6, 7 i 8 z briefu.

## Test regresyjny

Istniejący test w ocena.node.mjs sprawdza tylko przypadek bazowy i nie pokrywa scenariusza z wnioskiem czasowym. Dla poprawki trzeba dodać testy dla następujących przypadków:

1. Brak wniosku: zwraca bazę i przekroczenie = max(0, wykorzystanie - limit bazowy).
2. Wniosek zatwierdzony i aktywny w oknie czasu: zwraca limit czasowy i przekroczenie 0, z źródłem czasowym.
3. Wniosek zatwierdzony ale teraz dokładnie na końcu okna: zwraca bazę i brak podwyżki.
4. Wniosek oczekujący, odrzucony lub cofnięty: zwraca bazę.
5. Wniosek o limicie <= bazie: zwraca bazę, nie błąd.
6. Ta sama osoba jako autor i zatwierdzający: jawny błąd.
7. Przedział czasu nieprawidłowy: od >= do => jawny błąd.
8. Nieznany status wniosku lub nieprawidłowy format czasu: jawny błąd.

Testy powinny porównywać grosze, a nie złote, zgodnie z wymaganiem briefu.

## Decyzja o poprawce

Implementacja musi zostać poprawiona w ocena.mjs, a nie tylko dopisane wyjątki po stronie testu. Wymagany kierunek poprawki:

- przyjąć wejście z bazą, wykorzystaniem, czasem i ewentualnym wnioskiem,
- odrzucać niepoprawne dane z wyraźnym błędem,
- sprawdzić, czy wniosek ma status zatwierdzony,
- sprawdzić, czy autor i zatwierdzający są różni,
- sprawdzić, czy teraz jest w przedziale od <= teraz < do,
- sprawdzić, czy limit czasowy jest większy od limitu bazowego,
- zwrócić wynik z właściwym limitem efektywnym, przekroczeniem oraz źródłem bazowy / czasowy,
- zachować dane wejściowe bez mutacji.

To jest poprawka warunkowa, wymagana dla zgodności z briefem i dla przejścia do pełnego zakresu MVP limitów czasowych. Bez niej funkcja nie realizuje założonego modelu decyzyjnego i nie jest gotowa do review / integracji.