---
name: pogoda-warszawa
description: Pobiera aktualną pogodę w Warszawie przez dołączony skrypt. Użyj, gdy użytkownik pyta o pogodę w Warszawie lub prosi o sprawdzenie połączenia z pogodowym API.
---

Uruchom [skrypt pogodowy](scripts/pogoda.mjs) z głównego katalogu projektu:

```sh
node .github/skills/pogoda-warszawa/scripts/pogoda.mjs
```

Skrypt sam odczytuje WEATHER_API_KEY ze środowiska albo `.env.pogoda.local`.
Nie odczytuj pliku z kluczem, nie wypisuj zmiennych środowiskowych i nie proś o wklejenie klucza do rozmowy. Nie zmieniaj konfiguracji ani skryptu w celu wykonania zwykłego zapytania.

Z wyniku podaj po polsku temperaturę, opis warunków, czas pomiaru i źródło. Nie dopisuj prognozy ani wartości, których nie zwrócił skrypt. Przy błędzie powiedz, czego nie udało się sprawdzić. Przy braku klucza poproś o jego samodzielne wpisanie do lokalnego pliku zgodnie z instrukcją ćwiczenia.

Trybu `--demo` używaj wyłącznie na prośbę o demonstrację bez API. Jego wynik zawsze przedstaw jako dane demonstracyjne, nie aktualną pogodę.
