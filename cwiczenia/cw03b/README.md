# Ćw. 03b — Presidio: co automat ukryje, a co zostawi?

**Dzień 1 · 45 min · demo w przeglądarce → lokalna aplikacja · Copilot Agent**

> Franek: „Usunąłem nazwisko. Zostało jeszcze tylko siedem sposobów, żeby rozpoznać osobę”.

W ćw. 03 sam wybierałeś, co przekazać AI. Teraz sprawdzisz, jak pomaga w tym automat. **Rezultat:** działający lokalny panel Presidio, porównanie wykrytych danych i krótka lista tego, co nadal wymaga decyzji człowieka.

[Presidio](https://github.com/data-privacy-stack/presidio/) to silnik wykrywania i przekształcania danych identyfikujących. Analyzer znajduje fragmenty, a Anonymizer je zastępuje lub maskuje. [Presidio Local Anonymizer](https://github.com/gacabartosz/presidio-local-anonymizer) dodaje lokalny backend i panel WWW; z niego skorzystasz w drugiej części. Nie klonujemy obu projektów.

**Przez całe ćwiczenie używaj wyłącznie poniższych fikcyjnych przykładów lub syntetycznych danych warsztatowych. Publiczne demo wysyła tekst poza VM.** Lokalna analiza nie oznacza, że sam Copilot działa offline. Zamaskowanie kilku pól nie dowodzi pełnej anonimizacji.

## 1. Pobaw się publicznym demo — 8 min

Otwórz **[Presidio Demo na Hugging Face](https://huggingface.co/spaces/presidio/presidio_demo)**. Jeśli aplikacja się wybudza, poczekaj chwilę. Znajdź pole tekstu do analizy, zastąp przykład i obejrzyj wykryte fragmenty oraz wynik przekształcenia.

Zacznij od prostego przykładu po angielsku:

```text
My name is Alice Example. Contact me at alice@example.com.
The disputed amount is PLN 0.24. My case number is FR-2048.
```

Następnie wklej przykład po polsku:

```text
Nazywam się Katarzyna Wójcik. Mój e-mail: katarzyna.wojcik@example.com.
PESEL: 88041232107. Rachunek: 99 0000 4417 0000 4561 2378 9045.
Ten sam rachunek bez spacji: 99000044170000456123789045.
W Oddziale 137 w Warszawie zgłosiłam różnicę 0,24 PLN.
Przelew 84 210,55 PLN pochodził ze sprzedaży mieszkania po rodzicach.
Data waluty to 2026-08-16, niedziela. Numer sprawy: FR-2048.
```

PESEL i rachunek są celowo niepoprawne, jak w danych warsztatowych. Rozpoznawanie z kontrolą poprawności numeru może je pominąć — to ważna obserwacja, nie powód do wklejania prawdziwych numerów.

**Zrób dwie próby:** ustawienia domyślne oraz jedna świadoma zmiana, np. zakres typów danych lub próg wykrywania, jeśli demo ją udostępnia. Zapisz język i model; jeśli nie ma języka polskiego, odnotuj to zamiast zakładać, że został użyty.

Sprawdź: e-mail, nazwisko, PESEL, obie postacie rachunku, numer sprawy i opis pochodzenia pieniędzy. Co wykryto? Co pominięto? Czy narzędzie usunęło coś potrzebnego do analizy? Nie musisz znaleźć wszystkich trzech zjawisk.

**Demo nie działa po 2 minutach:** zapisz brak dostępu i przejdź do części lokalnej. Porównanie z demo wykonasz u partnera albo podczas omówienia.

## 2. Przygotuj osobny projekt i plan agenta — 5 min

Zostaw repo Franka otwarte. W jego głównym katalogu, w terminalu, wykonaj:

```sh
git clone https://github.com/gacabartosz/presidio-local-anonymizer.git ../presidio-local-anonymizer
```

To folder **obok** repo szkoleniowego. Jeśli już istnieje, otwórz go zamiast klonować ponownie. W VS Code wybierz **File → New Window**, potem **Open Folder** i wskaż `presidio-local-anonymizer`. W tym nowym oknie otwórz Copilot Chat i wybierz **Agent**.

Wklej cały prompt:

```text
Pomóż mi uruchomić ten projekt lokalnie na szkoleniowej VM z Windows.
Mam Git, Python, Node i Docker; nie zakładaj ich wersji ani dostępności usług.
Cel: działający panel WWW, w którym przeanalizuję syntetyczny tekst po polsku.
W podstawie nie potrzebuję rozszerzenia przeglądarkowego ani autostartu.

1. Przeczytaj README.md, WINDOWS.md, Uruchom-Windows.bat,
   backend/requirements.txt i kod startu backendu. Sprawdź wersję Pythona,
   sposób tworzenia środowiska oraz potrzebne modele NLP.
2. Przed instalacją pokaż plan w maksymalnie 5 punktach: co pobierzesz,
   co uruchomisz, jaki adres otworzę i jak sprawdzisz działanie.
   Wskaż, czy skrypt instaluje coś poza tym folderem.
3. Po moim „wykonaj plan” uruchom projekt. Preferuj istniejący zgodny Python
   i lokalne środowisko wirtualne. Nie zmieniaj repo Franka, polityk VM,
   ustawień TLS ani globalnej instalacji Pythona. Nie włączaj autostartu.
4. Jeśli wystąpi błąd, pokaż komendę i istotny fragment wyniku, postaw hipotezę
   i wykonaj jedną celowaną poprawkę. Nie aktualizuj wszystkich zależności naraz.
5. Potwierdź działanie realnym wywołaniem POST /api/anonymize na localhost
   z tekstem „Kontakt: test@example.com”. Pokaż status HTTP, wykryte encje
   i anonymized_text. Sam komunikat „serwer uruchomiony” nie wystarczy.

Pracujemy wyłącznie na syntetycznych danych. Nie wysyłaj tekstu do zewnętrznej
usługi anonimizacji jako zamiennika lokalnego backendu.
Na razie przedstaw plan, bez instalowania.
```

Przeczytaj plan, potem napisz **„Wykonaj plan”**. Oceniaj proponowane komendy i ich zakres, nie klikaj zatwierdzeń bez czytania.

## 3. Uruchom lokalnie z agentem — 22 min

Projekt udostępnia launcher `Uruchom-Windows.bat`. Po sprawdzeniu go agent może go uruchomić; w **PowerShellu otwartym w folderze nowego projektu** jest to:

```powershell
.\Uruchom-Windows.bat
```

Pierwszy start pobiera biblioteki i model językowy. Launcher może też instalować Pythona, gdy go nie znajduje — dlatego najpierw sprawdzacie jego działanie i interpreter na VM. Jeśli potrzebna jest instalacja ręczna, niech agent przygotuje ją w lokalnym środowisku na podstawie plików projektu. Nie kopiuj komend aktywacji z Linuxa do PowerShella.

Otwórz **[lokalny panel: http://localhost:6677/dashboard](http://localhost:6677/dashboard)**. Zostaw terminal serwera otwarty. Jeżeli wybrano inny port, użyj adresu wypisanego przez proces.

**Sprawdzenie niezależne od deklaracji agenta:** w drugim terminalu PowerShell uruchom:

```powershell
$presidioBody = @{ text = 'Kontakt: test@example.com' } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri 'http://localhost:6677/api/anonymize' -ContentType 'application/json' -Body $presidioBody | ConvertTo-Json -Depth 8
```

Obejrzyj `anonymized_text` i `entities_found`. E-mail powinien być zastąpiony, a nie tylko opisany jako wykryty. Uwaga: odpowiedź API zawiera też `original_text` — do dalszej analizy wybierasz pole z przekształconym tekstem, nie cały JSON. Sprawdź również panel historii: lokalna aplikacja przechowuje w pamięci przykłady przed i po przekształceniu.

**Gdy utkniesz:** po 5 minutach bez nowego postępu pokaż prowadzącemu lub partnerowi konkretny błąd. Przy problemach z Pythonem agent ma sprawdzić zgodność wersji z przypiętymi zależnościami; przy pobieraniu — wskazać brakujący pakiet/model i błąd sieci. Nie wyłączaj kontroli certyfikatów ani zabezpieczeń VM. Przy blokadzie środowiska wykonaj próbę w parze na działającej VM i zapisz, że lokalne uruchomienie u Ciebie pozostało nieukończone.

## 4. Porównaj i podejmij decyzję — 7 min

W lokalnym panelu przeanalizuj **ten sam polski tekst** co w demo, bez instalowania rozszerzenia przeglądarkowego. Porównaj wyniki, uwzględniając różnice języka, modeli i konfiguracji. Nie wyciągaj wniosku „lokalnie wykrywa lepiej” bez wskazania tych różnic.

Wróć do repo Franka i zapisz `portfolio/cw03b-presidio.md`:

| Fragment | Demo: wynik i ustawienia | Lokalnie: wynik i ustawienia | Co zrobię przed przekazaniem tekstu AI? |
|---|---|---|---|
| E-mail | | | |
| Nazwisko | | | |
| PESEL i rachunek w dwóch formatach | | | |
| Numer sprawy | | | |
| Kwota, pochodzenie pieniędzy i data waluty | | | |

Dołącz adres lokalnego panelu, komendę jego uruchomienia i wynik próby API. Zdecyduj, które pozostawione szczegóły są potrzebne do analizy, a które usuniesz ręcznie. **Brak wykrycia przez Presidio nie znaczy, że informacja jest bezpieczna do udostępnienia.**

## 5. Pokaż partnerowi — 3 min

**Gotowe:**

- masz dwie próby demo albo jawnie odnotowany brak dostępu;
- lokalny backend rzeczywiście przekształcił e-mail w próbie API;
- masz porównanie tego samego tekstu i trzy uzasadnione decyzje człowieka;
- umiesz powiedzieć, gdzie działa analiza, gdzie trafia wynik i co pozostaje w historii aplikacji.

Nie potrzebujesz commita w repo Franka. Notatka zostaje w `portfolio/`. Po ćwiczeniu zatrzymaj własny serwer przez **Ctrl+C**.

**Rozszerzenie — wybierz jedno:**

- Poproś Agenta o lokalny recognizer dla fikcyjnych numerów spraw `FR-` + cztery cyfry. Sprawdź `FR-2048` oraz kontrprzykład `FR-ABC`; pokaż wynik przed i po zmianie. Najpierw niech odszuka mechanizm konfiguracji projektu, zamiast zgadywać nazwę pliku.
- Jeśli polityka VM pozwala, wypróbuj `chrome-extension/` według instrukcji projektu na syntetycznym tekście w lokalnym formularzu. Sprawdź zakres działania i uprawnienia; nie zakładaj, że rozszerzenie przeglądarki chroni również czat Copilota w VS Code.

## Źródła do pracy z agentem

- [Presidio — silnik i dokumentacja projektu](https://github.com/data-privacy-stack/presidio/).
- [Presidio Local Anonymizer — repo aplikacji](https://github.com/gacabartosz/presidio-local-anonymizer) oraz [instrukcja Windows](https://github.com/gacabartosz/presidio-local-anonymizer/blob/main/WINDOWS.md).
- [Kod lokalnego API: format żądania, odpowiedzi i historia](https://github.com/gacabartosz/presidio-local-anonymizer/blob/main/backend/api/anonymize.py).

Instrukcja przygotowana na podstawie dokumentacji i kodu dostępnych 21.09.2026. Uruchomienie na konkretnej VM jest częścią ćwiczenia.
