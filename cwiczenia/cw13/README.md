# Ćw. 13 — Zostaw procedurę zamiast „zapytaj Franka”

**Dzień 3 · 9:30–10:00 · 30 min · Copilot w VS Code**

> Franek: „Procedura była. W mojej głowie”.

Z przebiegu uzgadniania raportu z ćw. 07 zrób skill, który kolejna osoba umie powtórzyć. Skill to zapisana procedura dołączana do kontekstu, kiedy jest potrzebna. Sam plik nie nadaje ani nie odbiera agentowi uprawnień.

## 1. Przygotuj procedurę — 10 min

Otwórz `portfolio/cw07-diagnoza.md`, `src/import/parseBankFile.ts` i `src/reports/dailyReport.ts`. Jeśli nie masz własnej diagnozy, zacznij od uruchomienia `npm run raport` i poniższych kroków; nie musisz ponownie naprawiać modułu.

Utwórz `.github/skills/uzgodnienie/SKILL.md`. Początek pliku:

```markdown
---
name: uzgodnienie
description: >-
  Sprawdza zgodność raportu dziennego z sumą kontrolną wyciągu.
  Użyj przy zgłoszeniu różnicy sum lub podejrzeniu utraty precyzji kwot.
---

# Uzgodnienie raportu

Przed zmianą kodu pokaż diagnozę i dowody. Jeśli sumy są zgodne,
zapisz zgodność oraz zakres kontroli, zamiast wymyślać usterkę.
```

Pod tym początkiem opisz sześć etapów: **reprodukcja → porównanie sum → lista dotkniętych ID → przyczyna → propozycja minimalnej zmiany → kontrola**. Przy każdym dopisz plik lub komendę i oczekiwany dowód. Wykorzystaj własny skrypt z ćw. 07, jeśli go masz, ale zaznacz, co zrobić, gdy go brakuje — lokalne `portfolio/` nie trafia do repo innych uczestników.

Dodaj regułę niezależnego przeliczenia kwot i czego nie uznajesz za dowód, np. samej deklaracji modelu. W próbie poniżej kończymy na diagnozie, bez poprawiania kodu.

## 2. Sprawdź użycie — 12 min

1. Zapisz plik i otwórz nową sesję Copilot Agent w tym repo. Poproś: „Sprawdź zgodność raportu dziennego z sumą kontrolną wyciągu. Tylko diagnoza, bez edycji plików”.
2. Sprawdź w przebiegu narzędzi/kontekstu, czy załadowano `uzgodnienie/SKILL.md`. Sama odpowiedź „użyłem skilla” nie wystarcza. Automatyczny wybór nie jest gwarantowany.
3. Jeśli go nie widzisz, wpisz `/` w polu czatu i wybierz **uzgodnienie**, dodając ten sam cel. Gdy skilla nie ma na liście, sprawdź nazwę katalogu, nazwę pliku `SKILL.md` i obie linie `---` otaczające YAML. Poproś prowadzącego o pomoc, jeśli VM nie udostępnia tej funkcji.
4. Kontroluj proponowane wywołania. `npm run raport` służy diagnozie; nie zatwierdzaj zmian kodu w tej próbie. Porównaj wynik agenta z ręcznym uruchomieniem raportu.

Po naprawie z dnia 2 sumy mogą być zgodne. To oczekiwany wynik; nie przywracaj usterki dla demonstracji. Jeżeli nie udało się potwierdzić załadowania, zapisz ograniczenie środowiska zamiast zgłaszać sukces.

## 3. Odbiór i zapis — 8 min

Partner czyta sam plik procedury i wskazuje krok, którego nie umiałby powtórzyć. Doprecyzuj go. W `portfolio/cw13-skill.md` zapisz sposób wywołania, ślad załadowania, wynik oraz ograniczenia.

**Gotowe:** poprawny plik, zaobserwowane użycie i wynik z dowodem. Przejrzyj plik, następnie:

```bash
git add .github/skills/uzgodnienie/SKILL.md
git diff --cached
git commit -m "Procedura uzgadniania raportu"
```

**Rozszerzenie:** skonfiguruj recenzenta według [.github/agents/README.md](../../.github/agents/README.md). Wybierz tylko narzędzia do odczytu; dowolny terminal potrafi zapisywać pliki. Sprawdź dostępne narzędzia i zachowanie na osobnej kopii.

Po ćwiczeniu prowadzący pokazuje hook (osobny blok 8 minut). Instrukcja mówi, co robić, skill opisuje procedurę, a hook uruchamia kod przy zdarzeniu. Superpowers to zestaw skilli i workflow, nie serwer MCP; oglądamy jako rozszerzenie.

Format i ręczne wywołanie: [Agent Skills w VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills).
