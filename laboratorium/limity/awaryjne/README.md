# Samodzielny materiał do cw10b

Jeśli nie skończyłeś implementacji, wykonaj review pliku [ocena-review.mjs](ocena-review.mjs) wobec wymagania poniżej. Nie kopiuj go na swoje rozwiązanie. Zawiera celowy błąd do odkrycia.

Wymaganie: `null` i `undefined` oznaczają brak limitu. Zero jest prawidłowym limitem. Przekroczenie to wykorzystanie ponad limit, co najmniej zero. Bez limitu przekroczenie wynosi zero.

```sh
node --test laboratorium/limity/awaryjne/review.node.mjs
```

Jeden test przechodzi. Recenzent ma sprawdzić również niepokryte wymagania. Dopisz test do `review.node.mjs` dopiero po ustaleniu oczekiwania. Ten przykład ma inny kontrakt niż główna funkcja `ocenLimit`: przyjmuje dwie liczby, nie cały wniosek.
