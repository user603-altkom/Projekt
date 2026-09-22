---
name: odbior-limitow
description: Sprawdza gotowość zmiany w laboratorium limitów przed przekazaniem do review lub lokalnym wydaniem. Użyj, gdy użytkownik prosi o odbiór limitów.
---
1. Ustal zakres zmiany i przeczytaj laboratorium/limity/BRIEF.md oraz KONTRAKT.md.
2. Sprawdź git status --short i git diff -- laboratorium/limity. Nowe pliki odczytaj jawnie.
3. Uruchom node --test laboratorium/limity/test/ocena.node.mjs.
4. Uruchom node laboratorium/limity/raport.mjs. Porównaj cztery scenariusze z briefem.
5. Podaj wykonane kontrole, rzeczywiste wyniki i znane braki. Nie myl zielonego testu startera z pełnym odbiorem.
6. Nie poprawiaj kodu, nie commituj i nie publikuj. Gdy kontrola jest niemożliwa, oznacz ją jako niewykonaną i podaj powód.
