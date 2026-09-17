# Raport dzienny sumuje operacje w różnych walutach do jednej kwoty

**Zgłaszający:** Zespół Rozliczeń, po uwadze z Departamentu Finansów
**Priorytet:** wysoki
**Etykiety:** ~raporty ~rozliczenie-dzienne

## Opis

Raport dzienny wypisuje jedną „sumę obrotów" dla całego wyciągu. Wchodzą do niej wszystkie
operacje z pliku, niezależnie od waluty — kwoty są dodawane do siebie tak, jakby wszystkie
były w tej samej. Liczba, która z tego wychodzi, nie znaczy nic: nie jest sumą obrotów
w żadnym ujęciu, którego moglibyśmy użyć.

Finanse dostają ten raport co rano i rozbijają go ręcznie, przez eksport do arkusza. Przy
400 operacjach dziennie to kilkanaście minut pracy na coś, co system powinien podać od razu.

Suma kontrolna z nagłówka wyciągu jest liczona tak samo, czyli po wszystkich operacjach
razem. Uzgodnienie z nią ma zostać, ale z raportu musi jasno wynikać, czego ta linia
dotyczy — dziś łatwo odczytać ją jako uzgodnienie kwoty w jednej walucie.

## Kryteria akceptacji

- [ ] Raport dzienny pokazuje sumę obrotów **osobno dla każdej waluty** występującej
      w pliku, zamiast jednej wspólnej kwoty.
- [ ] Przy każdej walucie widać liczbę operacji, których suma dotyczy.
- [ ] Wypisywane są wyłącznie waluty, które faktycznie są w pliku — pustych pozycji nie ma.
- [ ] Linia uzgodnienia z sumą kontrolną wyciągu zostaje, ale z raportu jednoznacznie
      wynika, że dotyczy całego pliku, a nie pojedynczej waluty.
- [ ] Kwoty są nadal formatowane po polsku (separator tysięcy, przecinek dziesiętny)
      i widać, do której waluty się odnoszą.
- [ ] Rozbicie jest częścią danych raportu, a nie tylko jego wydruku — da się go użyć
      dalej w kodzie.
- [ ] Rozbicie jest pokryte testami, w tym przypadkiem pliku z operacjami w więcej niż
      jednej walucie.
- [ ] Cały zestaw testów przechodzi, `npm run raport` nadal działa.
