# Mała refaktoryzacja bez zmiany zachowania

Wariant dla osób, których własne obliczenia są już poprawnie wydzielone. Skopiuj ten przykład do osobnego pliku roboczego; nie podmieniaj działającego adaptera.

```js
export function opisA(kwotaGrosze) {
  return new Intl.NumberFormat('pl-PL', {style:'currency', currency:'PLN'}).format(kwotaGrosze / 100);
}
export function opisB(kwotaGrosze) {
  return new Intl.NumberFormat('pl-PL', {style:'currency', currency:'PLN'}).format(kwotaGrosze / 100);
}
```

Zleć test zachowania obu funkcji dla 0 i 1234 groszy. Następnie wydziel wspólne formatowanie, zachowując publiczne funkcje i wynik. Uruchom test przed i po. Nie porównuj ręcznie zwykłej spacji z typograficzną z Intl — użyj świadomie wybranego wzorca lub sprawdź `formatToParts`.

Pokaż osobny diff refaktoryzacji. Nowa funkcja produktu ma inne kryteria niż porządkowanie kodu; nie ukrywaj zmiany zachowania pod nazwą refaktoryzacji.
