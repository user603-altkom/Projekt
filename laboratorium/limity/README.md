# Laboratorium SDLC: czasowy limit

To mały, samodzielny moduł w repo ćwiczeń. Wszystkie dane są fikcyjne. Nie potrzebujesz kodu ekranu z dnia 1. Wymaganie i odpowiedzi operatora są w [BRIEF.md](BRIEF.md), kontrakt w [KONTRAKT.md](KONTRAKT.md).

## Start

Otwórz w VS Code **główny folder repo**, zawierający `laboratorium`, `cwiczenia` i `package.json`. Wszystkie komendy wykonuj w terminalu w tym folderze. Node 24 jest wystarczający; laboratorium nie wymaga `npm ci`.

```sh
node --version
node --test laboratorium/limity/test/ocena.node.mjs
node laboratorium/limity/raport.mjs
node laboratorium/limity/serwer.mjs
```

Otwórz **http://127.0.0.1:4179**. Serwer zostaw w jednym terminalu, inne komendy wykonuj w drugim. Po zmianie `.mjs` zatrzymaj serwer Ctrl+C i uruchom ponownie. Jeśli port jest zajęty: `node laboratorium/limity/serwer.mjs 4180`, potem otwórz port 4180.

**Na starcie:** jeden test przechodzi. Raport pokazuje limit bazowy 100 zł i przekroczenie 20 zł dla wszystkich czterech scenariuszy. To celowo niepełny starter: ignoruje wniosek o podniesienie limitu. Zielony test nie oznacza spełnienia całego briefu.

## Pliki, na których pracujesz

- [src/ocena.mjs](src/ocena.mjs): funkcja do rozwinięcia.
- [test/ocena.node.mjs](test/ocena.node.mjs): pierwszy test; tutaj dopisujesz następne.
- [dane/scenariusze.json](dane/scenariusze.json): cztery stałe scenariusze wejściowe.
- [raport.mjs](raport.mjs): raport w terminalu, korzysta z Twojej funkcji.
- [serwer.mjs](serwer.mjs): podgląd HTML i JSON `/api/raport`, ten sam moduł obliczeń.
- [dokumenty/01-wymagania.md](dokumenty/01-wymagania.md), [02-projekt.md](dokumenty/02-projekt.md), [03-testy.md](dokumenty/03-testy.md), [04-review.md](dokumenty/04-review.md), [05-wydanie.md](dokumenty/05-wydanie.md), [06-incydent.md](dokumenty/06-incydent.md), [07-przekazanie.md](dokumenty/07-przekazanie.md): gotowe puste formularze do uzupełniania. Nie są rozwiązaniem.

Nie edytuj starej aplikacji przy pracy nad podstawą. Podłączenie modułu do własnego ekranu to rozszerzenie po ukończeniu cyklu. Laboratorium ocenia przekazany wniosek; nie jest systemem uwierzytelniania ani usługą produkcyjną.

Gdy utkniesz przed dniem 3, karta cw10b opisuje oddzielny [przykład do review](awaryjne/README.md). Nie nadpisuje on Twojego rozwiązania.
