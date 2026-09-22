# cw05b — Podpatrz wzorzec, sprawdź go u siebie

**45 min · praca w parach · przeglądarka i Copilot**

Zobacz, jak inni zapisują reguły dla Copilota. Wybierz jeden pomysł, który przyda się w Twojej pracy, i sprawdź go na małym przykładzie.

## 1. Otwórz publiczne repozytoria

Wszystkie materiały są publicznie dostępne pod poniższymi linkami. Możesz je przeglądać bezpośrednio w przeglądarce, bez klonowania.

| Repozytorium | Od czego zacząć? | Na co zwrócić uwagę? |
| --- | --- | --- |
| **[VS Code — microsoft/vscode](https://github.com/microsoft/vscode)** | Otwórz [`.github/copilot-instructions.md`](https://github.com/microsoft/vscode/blob/main/.github/copilot-instructions.md). Przeczytaj opis projektu i jedną sekcję zasad. | Które informacje pomagają agentowi poruszać się po kodzie? Które reguły mają sens tylko w tym projekcie? |
| **[Awesome Copilot — github/awesome-copilot](https://github.com/github/awesome-copilot)** | Zajrzyj do katalogów [`instructions`](https://github.com/github/awesome-copilot/tree/main/instructions), [`agents`](https://github.com/github/awesome-copilot/tree/main/agents) i [`skills`](https://github.com/github/awesome-copilot/tree/main/skills). Wybierz jeden konkretny plik do przeczytania. | Czy opisuje stałą zasadę, rolę agenta czy procedurę wykonania zadania? Co musisz mieć w środowisku, żeby go użyć? |
| **[GitHub Skills — customize-your-github-copilot-experience](https://github.com/skills/customize-your-github-copilot-experience)** | Przeczytaj README kursu i [instrukcję pierwszego kroku](https://github.com/skills/customize-your-github-copilot-experience/blob/main/.github/steps/1-step.md). | Jak kurs prowadzi od potrzeby do utworzenia pliku konfiguracji? Jak proponuje sprawdzić rezultat? |

**Nie wiesz, co wybrać?** Zacznij od GitHub Skills. Jeśli pracujesz już z instrukcjami, wybierz VS Code albo Awesome Copilot. W tym ćwiczeniu wystarczy przeczytać wybrany fragment; nie musisz uruchamiać całego kursu ani instalować kolekcji.

Uwaga na nazwę: **GitHub Skills to platforma kursów**, a katalog `skills` w Awesome Copilot zawiera **skille dla agentów**.

## 2. Wybierz jeden przykład i omów go z partnerem

Zapisz link do wybranego pliku i odpowiedz krótko:

- Co ta instrukcja, agent lub skill ma zmienić w zachowaniu Copilota?
- Jak według opisu w repo należy go włączyć lub wywołać? Jeśli opis tego nie wyjaśnia, zaznacz, co trzeba jeszcze sprawdzić.
- Który pomysł wykorzystasz u siebie, a którego nie przeniesiesz? Dlaczego?

Pokaż partnerowi konkretny fragment pliku, na którym opierasz odpowiedź.

Możesz poprosić Copilota w trybie **Ask** o pomoc. Wklej wybrany fragment, aby miał dostęp do jego treści:

```text
Wyjaśnij poniższy fragment konfiguracji Copilota.
Co ma zmienić w zachowaniu agenta? Które zapisy dotyczą tylko projektu autora?
Oddziel to, co wynika z tekstu, od rzeczy wymagających sprawdzenia.

[Tu wklej wybrany fragment pliku.]
```

## 3. Wypróbuj jeden pomysł u siebie

Wybierz swój projekt albo folder `proba-regul` z poprzedniego ćwiczenia. Nie musisz używać aplikacji Franka.

1. Na podstawie przeczytanego przykładu napisz **jedną krótką własną regułę**. Zapisz ją w pliku instrukcji, którego odczyt sprawdziłeś w poprzednim ćwiczeniu. Nie kopiuj całej konfiguracji obcego projektu.
2. Przygotuj małe polecenie, na którym zobaczysz działanie reguły. Uruchom je w nowej rozmowie, bez powtarzania samej reguły w prompcie.
3. Sprawdź odpowiedź i dostępne informacje o użytych instrukcjach. Zapisz także wynik negatywny lub brak potwierdzenia odczytu.

**Przykład, jeśli potrzebujesz punktu startowego:** reguła „Gdy proponujesz testy, podaj dla każdego wejście i konkretny oczekiwany wynik”. Prompt do próby: „Zaproponuj trzy testy funkcji, która oblicza cenę po rabacie procentowym. Nie pisz kodu”. Sprawdź, czy dostałeś wartości liczbowe i wyniki, a nie same nazwy przypadków.

## Kiedy zadanie jest gotowe?

W swojej notatce zapisz: link do źródła, wybrany pomysł, treść własnej reguły, użyty prompt i wynik próby. Pokaż partnerowi jedną rzecz, którą wykorzystasz po szkoleniu.

**Dla szybszych:** zamiast kolejnej reguły przeanalizuj jednego agenta albo skilla z Awesome Copilot. Wyjaśnij partnerowi jego sposób uruchamiania, wymagane narzędzia i sytuację, w której byłby przydatny. Awesome Copilot jest kolekcją społecznościową w organizacji GitHub; oceniaj każdy przykład osobno.

[Wszystkie ćwiczenia dni 2–3](../../CWICZENIA.md)
