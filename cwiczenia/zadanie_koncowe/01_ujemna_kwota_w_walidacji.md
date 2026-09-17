# Operacja z ujemną kwotą przechodzi walidację

**Zgłaszający:** Zespół Rozliczeń
**Priorytet:** średni
**Etykiety:** ~rejestr ~walidacja ~dane-wejsciowe

## Opis

W paczce z systemu kadrowo-płacowego przyszła operacja z kwotą zapisaną ze znakiem minus.
Walidacja jej nie zatrzymała — operacja weszła do rejestru i zaniżyła sumę obrotów
w rozliczeniu dziennym. Wyłapaliśmy to dopiero przy ręcznym uzgadnianiu, bo liczby
„prawie się zgadzały".

Kontrakt danych jest tu jednoznaczny: kwota operacji jest zawsze dodatnia, a kierunek
operacji niesie osobne pole (uznanie albo obciążenie). Ujemna kwota w rejestrze jest
błędem danych, a nie sposobem zapisania obciążenia.

Walidacja zatrzymuje kwotę zerową i kwotę z ułamkową częścią grosza. Kwoty ujemnej nie
zatrzymuje, choć powinna — komunikat dla operatora nigdy się nie pojawia, więc nikt
takiego wiersza nie poprawia.

## Kryteria akceptacji

- [ ] Operacja z kwotą ujemną jest odrzucana przez walidację, z komunikatem w tej samej
      konwencji, co pozostałe komunikaty walidacji (po polsku, zrozumiały dla operatora,
      który poprawia dane ręcznie).
- [ ] Kwota zerowa jest nadal odrzucana.
- [ ] Kwota z ułamkową częścią grosza jest nadal odrzucana.
- [ ] Poprawna kwota dodatnia przechodzi bez zmian — żaden dotychczasowy przypadek
      poprawnej operacji nie zaczyna być odrzucany.
- [ ] Walidacja paczki zgłasza taki wiersz z identyfikatorem operacji, tak jak pozostałe
      błędy.
- [ ] Zmianę pokrywa test, który bez poprawki jest czerwony.
- [ ] Cały zestaw testów przechodzi.
