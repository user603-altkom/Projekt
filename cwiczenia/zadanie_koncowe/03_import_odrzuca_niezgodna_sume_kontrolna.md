# Import przyjmuje plik, którego suma kontrolna nie zgadza się z zawartością

**Zgłaszający:** Zespół Utrzymania
**Priorytet:** wysoki
**Etykiety:** ~import ~jakosc-danych

## Opis

Wyciągi przychodzą do nas przez katalog wymiany plików i nie zawsze przychodzą w całości.
Zdarzyło się już, że transfer urwał się w połowie, a plik i tak został zaimportowany —
import wczytał tyle wierszy, ile było, i zwrócił je jak gdyby nigdy nic. Niezgodność
wyszła dopiero w rozliczeniu dziennym, czyli po tym, jak niekompletne dane były już
w rejestrze. Wycofywanie tego z rejestru to ręczna robota na pół dnia.

Każdy plik ma w nagłówku sumę kontrolną, więc materiał do sprawdzenia mamy na miejscu —
tylko nikt go nie sprawdza w momencie, w którym da się jeszcze zawrócić. Chcemy, żeby plik
niezgodny z własną sumą kontrolną **nie wchodził do rejestru**, a osoba, która uruchamia
import, dostała jednoznaczną informację, co jest nie tak.

Uwaga praktyczna: część plików z ostatnich miesięcy tego sprawdzenia i tak nie przejdzie,
z przyczyny prowadzonej osobnym zgłoszeniem. Odrzucenie ma więc być jawne i sterowalne —
musi zostać sposób, żeby świadomie uruchomić rozliczenie na takim pliku, kiedy wiemy, co
robimy. Chodzi o to, żeby nikt nie zaimportował niekompletnego pliku przez nieuwagę, a nie
o to, żeby zablokować pracę.

## Kryteria akceptacji

- [ ] Import sprawdza sumę kontrolną z nagłówka pliku względem faktycznej zawartości.
- [ ] Plik, w którym się nie zgadza, jest odrzucany — wynik importu nie udaje, że wszystko
      jest w porządku.
- [ ] Komunikat mówi, jaka suma była zadeklarowana, jaka wyszła i jaka jest różnica.
- [ ] Istnieje jawny sposób zaimportowania takiego pliku mimo niezgodności; domyślnie
      jest wyłączony.
- [ ] Plik bez sumy kontrolnej w nagłówku ma opisane, ustalone zachowanie — i jest ono
      inne niż dla pliku z sumą niezgodną.
- [ ] Wiersze, których import nie potrafił odczytać, są nadal raportowane tak jak dotąd.
- [ ] Rozliczenie dzienne nadal działa na dotychczasowych danych; jeżeli wymaga to
      świadomego użycia sposobu z punktu czwartego, jest to widoczne w wyniku.
- [ ] Zachowanie jest pokryte testami: plik zgodny, plik niezgodny, plik bez sumy
      kontrolnej.
- [ ] Cały zestaw testów przechodzi.
