# Ćw. 12 — Zapytaj Copilota, czym to się różni

**Czas:** 15 min · **Każdy u siebie** · Sprawdzenie w dwójce

## Cel

Zrozumieć, czym różnią się instrukcje, skille, prompt files, właśni agenci, MCP i hooki, używając do nauki tego samego narzędzia, o którym się uczysz. I sprawdzić, czy ten nauczyciel mówi prawdę.

To ćwiczenie ma dwa dna. Pierwsze jest praktyczne: za chwilę piszesz plik instrukcji i warto wiedzieć, czego nim NIE załatwisz. Drugie jest metodyczne: model będzie tu jednocześnie **nauczycielem, egzaminatorem i sprawdzającym**, a wszystkie trzy role oprze na jednej własnej odpowiedzi. Jeśli ta odpowiedź jest nieaktualna, quiz potwierdzi ci nieprawdę i wyjdziesz z niego pewny siebie.

## Zgłoszenie

> Wrzuciliśmy zespołowi link do dokumentacji o customizacji Copilota i nikt tego nie przeczytał.
> Za to każdy coś słyszał: jeden mówi, że trzeba pisać skille, drugi że wystarczy plik
> instrukcji, trzeci że hooki załatwiają sprawę. Zanim zdecydujemy, co wdrażamy, chcę, żeby
> każdy umiał powiedzieć własnymi słowami, czym te rzeczy się różnią i która do czego służy.

## Kroki

*Tempo: kroki 1 i 2 mają zająć osiem minut razem. Jeśli quiz się rozwleka,
przerwij go po siódmym pytaniu i przejdź do kroku 4, bo to on jest pointą.*


1. **Każ zbudować tabelę.** W czacie, w trybie ask:

   ```
   Zbuduj tabelę porównującą sposoby dostosowania GitHub Copilota w VS Code:
   instructions, prompt files, custom agents, agent skills, MCP servers, hooks.
   Kolumny: co to jest, kiedy tego użyć, gdzie się to trzyma, kto decyduje
   o uruchomieniu — model czy człowiek. Ostatnia kolumna ma wyjaśniać różnicę
   wobec pozostałych pozycji, żeby dało się tego użyć jako ściągi.
   ```

2. **Każ się odpytać.** W tej samej rozmowie:

   ```
   Teraz zadaj mi dziesięć pytań quizowych, po jednym naraz, żebym sprawdził,
   czy naprawdę rozumiem różnice. Nie podpowiadaj odpowiedzi w pytaniu.
   Po każdej mojej odpowiedzi powiedz, czy jest poprawna i dlaczego.
   ```

3. **Odpowiadaj z głowy, nie z tabeli.** Przewiń ją poza ekran. Quiz, w którym zerkasz na klucz, mierzy umiejętność przewijania.

4. **Sprawdź nauczyciela.** Otwórz
   [code.visualstudio.com/docs/agents/concepts/customization](https://code.visualstudio.com/docs/agents/concepts/customization)
   i znajdź **co najmniej dwa miejsca**, w których tabela modelu rozminęła się z dokumentacją: brakujący typ, zła lokalizacja pliku, przestarzała nazwa, zmyślone pole, albo różnica opisana odwrotnie.

5. **Zapisz jedno zdanie** o tym, która z tych rzeczy jest w waszym zespole potrzebna najpierw i dlaczego. To zdanie wchodzi na tablicę znalezisk.

> **Jeśli model odmówi albo zacznie zmyślać**
> Nie walcz z nim. Wklej mu adres strony z kroku 4 i każ zbudować tabelę wyłącznie na jej
> podstawie, wypisując przy każdym wierszu nagłówek sekcji, z której to wziął. Porównanie
> obu tabel, tej z pamięci i tej ze źródła, jest ciekawsze niż sam quiz.

> **Skończyłeś wcześniej**
> Zadaj pytanie, na które tabela nie odpowiada: *co się stanie, gdy instrukcja każe robić X,
> a hook robi nie-X?* Zobacz, czy model zgaduje, czy przyzna, że nie wie. Zapisz odpowiedź
> i przynieś ją na omówienie.

> **Nie pracujesz w VS Code**
> Cała ta tabela dotyczy VS Code. W IntelliJ działa dziś z niej jedno: `copilot-instructions.md`
> w czacie. Zrób ćwiczenie mimo to, bo decyzję o tym, co wdrożyć w zespole, i tak podejmujecie
> wspólnie — ale w kroku 5 napisz wprost, co z tego jest dla ciebie dostępne, a co nie.

## Gotowe, gdy

- [ ] masz tabelę i przeszedłeś dziesięć pytań, odpowiadając bez zaglądania do niej
- [ ] wskazujesz **dwa konkretne miejsca**, w których tabela modelu różni się od dokumentacji, i umiesz powiedzieć, które źródło jest wiarygodniejsze i dlaczego
- [ ] potrafisz wyjaśnić partnerowi różnicę między instrukcją a hookiem jednym zdaniem, bez zaglądania do czegokolwiek
- [ ] masz jedno zdanie do tablicy znalezisk

## Dlaczego to ćwiczenie wygląda inaczej niż reszta

Nie piszesz tu kodu i nie ma tu nic do uruchomienia. Ćwiczysz **technikę uczenia się**, którą możesz powtórzyć w każdym innym temacie: każ narzędziu zbudować ściągę, każ się z niej odpytać, a potem sprawdź ściągę u źródła. Dwa pierwsze kroki są przyjemne i szybkie. Trzeci jest tym, który odróżnia naukę od wrażenia, że się nauczyłeś.

## Na koniec ćwiczenia

```
git switch -c imie/cw12 && git add -A && git commit -m "cw12" --allow-empty && git switch main
```
