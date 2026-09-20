# Ćw. 02b — Pierwsza zmiana kodu: filtr operatora

**Dzień 1, 11:20–11:40 · 20 min · Copilot Agent**

Ekran pokazuje trzy operacje. Checkbox istnieje, ale niczego nie filtruje. Franek: „Frontend prawie gotowy. To prawie jest teraz wasze”.

1. Uruchom `npm run operator`; wybierz dane demonstracyjne. Zaznacz filtr i potwierdź objaw.
2. Wskaż Copilotowi `operator/app.js` i funkcję `visibleRows`. Zleć tylko filtr: zaznaczony pokazuje `status === 'przekroczenie'`, odznaczony wszystkie. Bez modyfikacji danych ani backendu.
3. Przeczytaj plan i diff; zatwierdzaj polecenia ze zrozumieniem. Agent może działać od dnia 1, ale zakres jest mały.
4. Odśwież stronę. Sprawdź 3 → 2 → 3 wiersze, ID FR-002 i FR-003 oraz szczegóły FR-002. `npm test` nie zastępuje tej kontroli UI.
5. Zapisz commit i dowód przed/po w portfolio.

**Gotowe:** działający filtr, mały zrozumiały diff, dane wejściowe nietknięte. **Rozszerzenie:** stan bez przekroczeń i czytelny komunikat „Brak wyników”. Nie podłączaj jeszcze adaptera finałowego.
