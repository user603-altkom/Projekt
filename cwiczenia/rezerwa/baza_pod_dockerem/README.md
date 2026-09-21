# Rezerwa - Plan wykonania kontra rada modelu (PostgreSQL)

**Czas:** 50 min · **Każdy u siebie** · Sprawdzenie w dwójce

Wymaga Dockera. Te same dane co w ćwiczeniu z raportem obrotów, ale na prawdziwym silniku, z prawdziwym planem wykonania.

## Cel

Umieć rozstrzygnąć radę dotyczącą wydajności planem wykonania, a nie zgodą z tym, że brzmi rozsądnie - i rozpoznać radę, która jest prawdziwa ogólnie, a bezużyteczna tutaj.

## Zgłoszenie

> Od: Administracja Baz Danych
> Temat: re: raport obrotów nie mieści się w oknie nocnym
>
> Dzień dobry,
>
> dostaliśmy Państwa zgłoszenie o wolnym raporcie. Zanim cokolwiek zmienimy na
> produkcji, prosimy o **plan wykonania przed zmianą i po zmianie**, a nie o sam
> pomiar czasu. Czas zależy od obciążenia maszyny i u nas wygląda inaczej niż
> u Państwa.
>
> Przy okazji: w poprzednim zgłoszeniu padła propozycja dołożenia indeksu na
> kolumnie `waluta`. Prosimy o uzasadnienie planem. Zakładamy indeksy na
> produkcji tylko wtedy, gdy widać, że optymalizator z nich korzysta - każdy
> kosztuje przy każdym zapisie.

## Przygotowanie

Baza stawia się z tych samych danych, na których liczy się `npm run sql:raport`.

```
npm run sql:setup
npm run pg:dump
docker run --name rejestr-pg -e POSTGRES_PASSWORD=szkolenie -e POSTGRES_DB=rejestr -p 127.0.0.1:55432:5432 -d postgres:17-alpine
```

Jeżeli kontener `rejestr-pg` już istnieje z Twojej wcześniejszej próby, użyj `docker start rejestr-pg` zamiast ponownego `docker run`. Nie usuwaj cudzego kontenera o tej nazwie. Poczekaj na gotowość:

```bash
docker exec rejestr-pg pg_isready -U postgres -d rejestr
```

Przejdź dalej dopiero po komunikacie `accepting connections`. W razie błędu sprawdź `docker logs rejestr-pg`. `sql:setup` odtwarza lokalną bazę SQLite, więc zachowaj wcześniej własne dane, jeśli ją rozbudowywałeś.

Import odtwarza tabele `transakcje` i `oddzialy` w bazie ćwiczeniowej. Wykonaj go raz na początku, nie między pomiarami.

Wgranie danych, w Git Bashu:

```
docker exec -i rejestr-pg psql -q -U postgres -d rejestr < dane/lokalna-baza/rozliczenia_pg.sql
```

w PowerShellu:

```
Get-Content -Encoding utf8 dane/lokalna-baza/rozliczenia_pg.sql | docker exec -i rejestr-pg psql -q -U postgres -d rejestr
```

Sprawdzenie, że weszło - ma wypisać `24` i `28000`:

```
docker exec rejestr-pg psql -t -U postgres -d rejestr -c "SELECT (SELECT count(*) FROM oddzialy), (SELECT count(*) FROM transakcje)"
```

Konsola do zapytań: `docker exec -it rejestr-pg psql -U postgres -d rejestr`, w niej `\timing on`.

## Kroki

1. **Uruchom zapytanie z `sql/lokalnie/raport_obrotow.sql` na Postgresie i zapisz czas.** Jeśli zoptymalizowałeś je w ćw. 08 SQL, zacznij od zachowanej kopii `portfolio/cw08-raport-przed.sql`. Wykonaj trzy pomiary i zapisz medianę. Porównaj z SQLite na tych samych danych i tej samej wersji zapytania; porównuj też wyniki, nie tylko czas. Różnice środowiska i pamięci podręcznej ograniczają wniosek o szybkości silnika.
2. **Zdejmij plan: `EXPLAIN (ANALYZE, BUFFERS)` przed tym samym zapytaniem.** Szukaj w nim węzła, który wykonuje się wiele razy. Ile razy i dlaczego akurat tyle?
3. **Zapytaj model o przyczyny i o poprawkę, a potem każdą jego radę osobno rozstrzygnij planem.** Nie czasem. Przy każdej radzie odpowiedz: czy optymalizator w ogóle robi to, o czym mówi model?
4. **Sprawdź propozycję z indeksem, o którą pyta zgłoszenie.** Załóż go, przeanalizuj plan, zmierz, usuń. Potem odpowiedz administracji: zakładać czy nie, i dlaczego.
5. **Popraw zapytanie i zdejmij plan jeszcze raz.** Do zgłoszenia idą dwa plany i jedno zdanie o tym, co się między nimi zmieniło.

> **Jeśli utknąłeś po 15 minutach**
> W planie `EXPLAIN ANALYZE` każdy węzeł ma `loops=`. Znajdź węzeł, w którym ta
> liczba jest równa liczbie wierszy raportu, a nie jedynce. Co takiego liczy się
> raz na każdy zwrócony wiersz, choć jego wynik dla całego oddziału jest jeden?

> **Nie pracujesz z PostgreSQL, tylko z Oracle**
> Składnia planu jest inna, mechanizm ten sam. Weź `sql/raport_dzienny.sql`
> i napisz, czego szukałbyś w `EXPLAIN PLAN` albo w `DBMS_XPLAN.DISPLAY_CURSOR`,
> żeby odpowiedzieć na to samo pytanie: który krok wykonuje się raz, a który raz
> na wiersz. Potem zapytaj model o to samo i porównaj z tym, co napisałeś.

> **Skończyłeś wcześniej**
> W osobnej bazie eksperymentalnej uruchom to samo zapytanie na tabeli powiększonej dziesięciokrotnie
> (`INSERT INTO transakcje SELECT ... ` z podmienionym `id_operacji`) i sprawdź,
> czy koszt rośnie liniowo, czy szybciej. Potem odpowiedz: która z twoich poprawek
> zyskuje na znaczeniu przy większych danych, a która przestaje mieć znaczenie?

## Gotowe, gdy

- [ ] masz dwa plany wykonania, przed i po, i umiesz wskazać zaobserwowaną zmianę kosztu, liczby wykonań lub struktury planu — węzeł nie musi zniknąć
- [ ] umiesz odpowiedzieć administracji na pytanie o indeks jedną liczbą z planu, nie opinią
- [ ] masz co najmniej jedną radę modelu zweryfikowaną planem i pomiarem; potrafisz uzasadnić jej przyjęcie albo odrzucenie

## Sprzątanie

Poniższa komenda usuwa kontener wraz z jego danymi. Użyj jej tylko dla własnego kontenera ćwiczeniowego, po zapisaniu planów w `portfolio/`.

```
docker rm -f rejestr-pg
```

## Na koniec ćwiczenia

Zapisz plany, wersje zapytań, pomiary i wniosek o indeksie w `portfolio/postgres.md`. Jeśli powstała tylko analiza, nie robisz commita. Zmienione zapytanie commituj dopiero po porównaniu wyników, kontroli `git diff` i `git diff --cached`; dodaj tylko jego rzeczywistą ścieżkę. W wariancie Oracle opisz brak uruchomienia i plan weryfikacji zamiast deklarować wynik pomiaru.
