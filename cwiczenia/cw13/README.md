# D3-07 — Zapisz własny odbiór jako skill

**25 min · Copilot · jedna procedura z wykonanej pracy**

> Franek: „Procedura była w mojej głowie. Następca nie miał dostępu”.

**Po co:** kilka razy odbierałeś zmianę. Zapiszesz tę procedurę tak, żeby nowa sesja potrafiła ją wykonać. Skill nie nadaje uprawnień ani nie gwarantuje poprawności.

1. Utwórz `.github/skills/odbior-zmiany/SKILL.md`. Poniżej jest tylko początek — uzupełnij go własnymi krokami. Wejściem mają być kryteria, zakres zmiany i komendy projektu. Brak kryteriów ma zatrzymać ocenę, nie skłaniać do ich wymyślenia.

```markdown
---
name: odbior-zmiany
description: Sprawdza zmianę ekranu względem kryteriów, testów i diffu. Użyj przed przekazaniem do review.
---

# Odbiór zmiany
Najpierw ustal kryteria i zakres. Nie poprawiaj kodu podczas odbioru.
Jeśli brakuje wejścia, nazwij brak. Nie ogłaszaj wykonania kontroli,
której nie uruchomiłeś.
```

2. Dopisz 4–6 kroków: przeczytanie kryteriów, sprawdzenie diffu i nowych plików, uruchomienie właściwych testów, porównanie scenariuszy UI, wynik i ograniczenia. Wskaż komendy z `package.json`. Oddziel kontrole automatyczne od ręcznych. Nie zakładaj, że cudza kopia ma Twoje `portfolio` — wymagaj jawnego dołączenia kryteriów.
3. Nowy czat: wybierz skill z listy `/` lub zleć jego użycie i sprawdź ślad odczytu pliku. Samo zapewnienie agenta nie wystarcza. Wykonaj odbiór bez implementacji. Partner powtarza jeden krok z samej procedury.

**Gotowe:** plik, próba użycia oraz rzeczywisty wynik w `portfolio/cw13-skill.md`. Gdy VM nie wykrywa skilla, sprawdź nazwę i YAML; awaryjnie dołącz procedurę ręcznie i zaznacz brak potwierdzenia mechanizmu skill.

Przejrzyj plik, `git add .github/skills/odbior-zmiany/SKILL.md`, `git diff --cached`, `git commit -m "Procedura odbioru zmiany"`.

**Dla szybszych:** dodaj `references/kryteria.md` i wskaż w procedurze moment jego odczytu. Dawne uzgodnienie raportu: [rozszerzenie](ROZSZERZENIE.md).

[Format skilli VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills).
