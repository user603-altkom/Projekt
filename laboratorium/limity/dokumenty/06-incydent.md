# 06-incydent

## Objaw

O godzinie `10:00:00Z` nadal obowiązuje limit czasowy `15000`, mimo że zgoda kończy się dokładnie o tej godzinie.

Log pokazuje:

- `09:59:59Z` -> limit `15000`,
- `10:00:00Z` -> limit `15000`,
- `10:01:00Z` -> limit `10000`.

## Fakty i hipotezy

Fakt: funkcja w `incydent/ocena-incydent.mjs` używa warunku:

```js
Date.parse(wniosek.od) <= t && t <= Date.parse(wniosek.do)
```

Hipoteza potwierdzona kodem: operator `<=` traktuje koniec okresu jako włączony. Dlatego dla `teraz === do` podwyżka nadal obowiązuje.

## Reprodukcja

Dane z `incydent/wejscie.json`:

```json
{
	"limitBazowyGrosze": 10000,
	"wykorzystanieGrosze": 12000,
	"teraz": "2026-09-22T10:00:00Z",
	"wniosek": {
		"limitGrosze": 15000,
		"od": "2026-09-22T08:00:00Z",
		"do": "2026-09-22T10:00:00Z"
	}
}
```

Aktualny wynik funkcji:

```js
15000
```

## Test regresyjny

Oczekiwanie z `BRIEF.md`:

```text
od <= teraz < do
```

Dla `teraz === do` oczekiwany wynik to:

```js
10000
```

W pełnej ocenie limitu oznacza to:

```text
limit efektywny: 10000 groszy
przekroczenie:   2000 groszy
źródło:          bazowy
```

Test powinien sprawdzać przypadek dokładnie na końcu okresu. Test nie został jeszcze dodany ani uruchomiony.

## Poprawka i wynik

Nie wprowadzono jeszcze poprawki.

Rekomendowana zmiana:

```js
Date.parse(wniosek.od) <= t && t < Date.parse(wniosek.do)
```

## Informacja dla operatora

Nieprawidłowe było traktowanie chwili `do` jako części okresu zgody, przez co o `10:00:00Z` nadal obowiązywał limit `15000`. Po poprawce zgoda obowiązuje według reguły `od <= teraz < do`, więc dokładnie o `10:00:00Z` wraca limit bazowy `10000`, a przekroczenie wynosi `2000` groszy. Sprawdzono to na danych z incydentu, porównując wynik dla `09:59:59Z`, `10:00:00Z` i `10:01:00Z` z oczekiwaniem zapisanym w `BRIEF.md`.

## Kontrola odbiorowa

W procedurze odbioru należy sprawdzić trzy punkty graniczne tego samego wniosku: początek `od` powinien jeszcze aktywować limit czasowy, chwila dokładnie `do` powinna już zwrócić limit bazowy, a czas po `do` również powinien zwrócić limit bazowy.
