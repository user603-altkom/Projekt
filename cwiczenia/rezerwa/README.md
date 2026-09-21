# rezerwa/ - karty poza programem

Trzy karty, które nie mają swojego miejsca w harmonogramie. Bierzesz je wtedy,
gdy grupa skończy wcześniej, gdy coś wypadnie z programu albo gdy trafisz na
salę, która chce więcej.

Karty nie zależą od siebie, ale korzystają z efektów wcześniejszych ćwiczeń — sprawdź kolumnę „Czego wymaga”.

| Karta | Czas | Czego wymaga | Po czym można brać |
|---|---|---|---|
| `narzedzie_jednorazowe/` | 40 min | repo, Copilot, przeglądarka, wynik ćw. 7 | po Ćw. 7 |
| `bramka_jakosci/` | 45 min | Node, Git Bash, naprawiony raport i testy | po Ćw. 7 lub 8 |
| `baza_pod_dockerem/` | 50 min | Docker, pierwsze pobranie obrazu | po ćwiczeniu z raportem obrotów |

Razem 135 minut, czyli 2 godziny i 15 minut; wybierz kartę pasującą do czasu i gotowości grupy.

## Czego która uczy

**`narzedzie_jednorazowe/`** - model buduje narzędzie, którego nikt nie napisze
ręcznie, bo nie warto. Sedno jest w sprawdzeniu, czy liczby na ekranie są
policzone, czy wpisane. To jedyna karta, przy której powstaje coś do wyrzucenia
po użyciu, i to jest jej teza.

**`bramka_jakosci/`** - zamiana „sprawdziłem, wygląda dobrze" na komendę
kończącą się kodem zero albo jeden. Krok 4 każe modelowi złamać bramkę, którą
sam przed chwilą napisał. Najbliższa temu, co uczestnicy wdrożą u siebie
po powrocie.

**`baza_pod_dockerem/`** - te same dane, co w ćwiczeniu z raportem obrotów, ale
na PostgreSQL, z prawdziwym `EXPLAIN ANALYZE`. Rozstrzyganie rad modelu planem
wykonania zamiast zgodą, że brzmią rozsądnie. Sprawdzone 19.09: plan pokazuje
`SubPlan` wykonywany 3359 razy, a indeks, który podpowiada model, nie zostaje
przez optymalizator użyty ani razu. To wynik wzorcowego przebiegu; na swojej VM sprawdzasz, czy obserwacja się powtarza.

## Uwaga o `baza_pod_dockerem/`

Pierwsze `docker run postgres:17-alpine` pobiera obraz z sieci. Za firmowym
proxy może to trwać albo się nie udać, więc jeśli planujesz tę kartę, pobierz
obraz przed zajęciami:

```
docker pull postgres:17-alpine
```

Baza i pomiary działają już lokalnie; korzystanie z Copilota nadal wymaga połączenia.
