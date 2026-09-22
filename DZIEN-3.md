# Dzień 3 — SDLC z AI

Obowiązuje [spis ćwiczeń](CWICZENIA.md). Dzień 3 idzie ścieżką cw10b, review przez CLI, cw12b i cw19b (projekt końcowy na własnym repo). Wejścia do ćwiczeń są w repo; szablon projektu końcowego jest na github.com, z kopią zip w `cwiczenia/cw19b/`. Godziny to orientacyjna pomoc organizacyjna, na slajdach ich nie ma.

| Godzina | Blok |
|---|---|
| 9:00–9:15 | Retro dnia 2, cel dnia, test środowiska na maszynie ochotnika |
| 9:15–10:00 | [cw10b](cwiczenia/cw10b/README.md): review na kodzie Franka, własny agent recenzent |
| 10:00–10:30 | [Review przez CLI](materialy/sdlc/REVIEW-CLI.md): jeden wzorzec, GitHub i GitLab bez Duo; pokazy z [INTEGRACJE.md](materialy/sdlc/INTEGRACJE.md) |
| 10:30–10:45 | Przerwa |
| 10:45–11:30 | [cw12b](cwiczenia/cw12b/README.md): utrzymanie, od zgłoszenia do poprawki, wersja skrócona w jednym bloku |
| 11:30–11:50 | Przekazanie następcy: zamknięcie historii Franka; metodyki: spec-kit, Superpowers i reszta |
| 11:50–12:10 | [cw19b](cwiczenia/cw19b/README.md), setup: klon szablonu, własne repo przez `gh repo create`, zielone Actions przed obiadem |
| 12:10–12:55 | Obiad |
| 12:55–13:07 | Przerywnik: bezpieczeństwo agentów |
| 13:07–13:20 | cw19b, kickoff: brief POLSTR, dane, zakres MVP, karta z bramkami |
| 13:20–14:00 | cw19b: `/speckit-constitution`, `specify`, `plan`, `tasks`; bramka 1 o 14:00 |
| 14:00–15:00 | cw19b: `/speckit-implement` faza po fazie, PR na fazę, review, testy; równolegle ekran w Claude Design, faza 4 podpina go do logiki; bramka 2 o 15:00, tag v0.1.0 |
| 15:00–15:10 | Przerwa |
| 15:10–15:45 | cw19b: karta zmiany przez proces (test, poprawka, PR, review, merge); bramka 3 o 15:45, tag v0.2.0 |
| 15:45–16:05 | Demo trzech ochotników, po 5 min: aplikacja, PR z review, co poprawili |
| 16:05–16:25 | Podsumowanie: golden tips na dniach 1–3, tip od każdego, co zabieracie w poniedziałek |
| 16:25–16:30 | Zakończenie |

380 minut pracy i 70 minut przerw. Rano pracujemy w laboratorium limitów na kodzie Franka, po obiedzie każdy w swoim repo projektu końcowego. Własny ekran z dnia 1 pozostaje osobnym projektem. Starsze karty są dodatkami, nie kolejną obowiązkową ścieżką.

## Co się zmieniło względem pierwotnego planu

Pierwotny plan dnia 3 (cw10b do cw15b, do 17:00) zastąpił projekt końcowy na własnym repo. Cztery karty zostają w repo jako materiał rezerwowy, każda ma u góry baner z odesłaniem tutaj:

- cw11b (wydanie): wraca skrótowo w cw19b jako merge MVP z tagiem v0.1.0 (bramka 2) i tag v0.2.0 po karcie zmiany (bramka 3).
- cw13b (własny skill): wraca jako rutyna review z bloku 10:00 i gwiazdka „skill odbiór" w cw19b.
- cw14b (MCP, CLI i hook): hook pre-commit z testami jest gwiazdką w cw19b; pokaz MCP wypada, Playwright MCP było w cw16b.
- cw15b (Superpowers): zastąpione spec-kit w cw19b; Superpowers zostaje alternatywą dla osób z Claude Code (sekcja w cw19b) i jednym slajdem porównania o 11:30.
- Odbiór całego cyklu z końca dnia zastępuje demo ochotników na własnym kodzie.
