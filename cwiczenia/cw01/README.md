# Ćw. 01 — Co wiemy, a co dopowiedział model?

**Dzień 1 · 20 min · Copilot Chat w VS Code · bez zmian w kodzie**

Franek mówił, że „limity kredytowe już są”. Masz już projekt ekranu z ćw. 00. Teraz sprawdzisz, co w odziedziczonej aplikacji rzeczywiście działa. **Ekran ze stałymi liczbami demonstracyjnymi nie dowodzi, że aplikacja potrafi je obliczyć.**

## Przygotuj

Otwórz w VS Code cały folder repo, tak aby w panelu plików widzieć `package.json`, `src` i `operator`. Uruchom lokalny ekran zgodnie z [START.md](../../START.md). Jeśli serwer już działa, nie uruchamiaj drugiej kopii. Projekt z Claude Design nie jest tym lokalnym ekranem — od tego ćwiczenia wszyscy korzystają ze wspólnego startera.

Otwórz **nowy czat Copilota** do zadawania pytań (Ask, jeśli taki tryb jest dostępny). Nie zlecaj edycji. Dodaj przez **Add Context / Dodaj kontekst** lub wybór pliku po wpisaniu `#`:

- `src/operator/limitRows.ts` — miejsce przygotowania wierszy raportu;
- `src/operator/report.ts` — odczyt danych i budowanie odpowiedzi.

Samo wpisanie ścieżki w zdaniu nie potwierdza, że plik został przeczytany. Jeśli nie wiesz, jak dołączyć plik, zajrzyj do sekcji „Pierwszy czat” w [START.md](../../START.md).

## 1. Zadaj pytanie — 5 min

Wklej:

```text
Przejmuję aplikację po Franku. Chcę ustalić, czy lokalny ekran operatora
pokazuje już obliczone przekroczenia limitów kredytowych, czy tylko dane przykładowe.
Przeczytaj dołączone pliki. Nie zmieniaj kodu ani nie implementuj braków.

Wyjaśnij, co robią buildOperatorReport i buildLimitRows oraz jakie dane
przekazują dalej. Oddziel działającą implementację od deklaracji typów,
komentarzy i planowanej funkcjonalności. Przy każdym twierdzeniu wskaż plik
i funkcję lub fragment kodu. Jeżeli brakuje pliku do sprawdzenia całej drogi
od danych do ekranu, podaj jego ścieżkę i zaznacz, czego jeszcze nie ustaliłeś.
```

Jeśli odpowiedź wymaga sprawdzenia połączenia z ekranem, dołącz wskazany plik. Pomocne są `scripts/operator-server.ts` i `operator/app.js`. Nie musisz czytać całej aplikacji.

## 2. Sprawdź odpowiedź — 10 min

1. Wybierz **trzy konkretne twierdzenia** modelu. Otwórz wskazane fragmenty kodu. „Funkcja istnieje” i „funkcja wykonuje obliczenia” to różne twierdzenia.
2. Otwórz `http://127.0.0.1:4173`. W polu **Źródło** wybierz **„Przykład do projektowania”**, a potem **„Wynik z repozytorium”**. Zapisz komunikat i liczbę widocznych wierszy dla każdego źródła.
3. Porównaj obserwację strony z kodem i odpowiedzią AI. Brak wierszy nie musi oznaczać, że żadna operacja nie przekracza limitu kredytowego.

W `portfolio/cw01-weryfikacja.md` zapisz:

| Twierdzenie modelu | Sprawdzony plik/funkcja lub obserwacja ekranu | Werdykt: potwierdzone / obalone / nieustalone |
|---|---|---|
| Wklej jedno konkretne twierdzenie | Wskaż fragment i opisz, co faktycznie zobaczyłeś | Wybierz i uzasadnij |

Powtórz dla trzech twierdzeń. Dodaj jedno zdanie: **co trzeba jeszcze sprawdzić lub połączyć, żeby ekran pokazywał obliczony wynik?**

## 3. Pokaż dowód partnerowi — 5 min

Partner wybiera jeden wiersz Twojej tabeli. Pokaż mu plik albo działający ekran, który uzasadnia werdykt. Sama odpowiedź Copilota nie jest drugim źródłem dowodu.

**Gotowe:** trzy sprawdzone twierdzenia, rozróżnienie demo od wyniku z repo i nazwany brakujący element. Jeśli AI wszystko opisało poprawnie, zaznacz potwierdzenia — nie trzeba znaleźć halucynacji na siłę.

**Gdy utkniesz:** zostań przy dwóch pierwszych plikach i porównaniu dwóch źródeł na ekranie. Jeśli środowisko nie działa, wykonaj sprawdzenie kodu i obserwację u partnera; zapisz, czego nie zweryfikowałeś u siebie.

**Rozszerzenie:** dołącz `src/limits/creditLimit.ts`. Sprawdź, czy „brak limitu kredytowego” i „limit kredytowy zero” są reprezentowane i obsługiwane tak samo. Pokaż fragment kodu; nie wybieraj za biznes reguły, której nie uzgodniono.

Zapisujesz tylko notatki w `portfolio/`, więc **nie robisz commita**. Pozostań na gałęzi `warsztat/franek`.
