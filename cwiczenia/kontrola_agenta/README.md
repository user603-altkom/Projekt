# D2-01 — Czy agent dostał moje reguły?

**20 min · Copilot, nowa sesja · analiza bez edycji kodu**

> Franek: „Instrukcje były. Tylko chyba w innym oknie”.

**Po co:** wczoraj agent robił rzeczy po swojemu. Dzisiaj sprawdzisz, czy dostał Twoje zasady i co z nimi zrobił. Otwórz reguły z ćw. 09A, `AGENTS.md` i `CLAUDE.md`. Zasady pracy i zapisu: [PRACA-WARSZTATOWA](../../PRACA-WARSZTATOWA.md).

1. **Sprawdź własną kopię.** W starterze `CLAUDE.md` importuje `AGENTS.md`, który jest pusty. Sprawdź, co rzeczywiście masz po wczoraj. Sam model Claude wybrany w Copilocie nie zmienia Copilota w Claude Code.
2. **Wykonaj próbę.** Dołącz plik swojego ekranu z komunikatem pustego wyniku (w starterze `operator/app.js` i `operator/index.html`). W nowej sesji poproś o plan zmiany komunikatu. Sprawdź widoczne referencje/diagnostykę instrukcji oraz jedną zasadę w odpowiedzi, np. sekcje „Cel, Zakres, Sprawdzenie”. Deklaracja modelu „przeczytałem” nie wystarcza.
3. **Uporządkuj i powtórz.** Przenieś 3–5 wspólnych zasad do `AGENTS.md`, jeśli VM potwierdza jego obsługę. Zachowaj import w `CLAUDE.md`; w pliku Copilota zostaw tylko potrzebne różnice. Przy braku potwierdzenia nie usuwaj działającej konfiguracji — dołącz reguły ręcznie i nazwij ten wariant. Powtórz identyczny prompt w nowym czacie.

```text
Zaproponuj małą poprawę komunikatu pustego wyniku na moim ekranie.
Chcę tylko plan i sposób sprawdzenia. Nie edytuj plików ani nie
uruchamiaj poleceń. Uwzględnij instrukcje dostępne w tej sesji.
```

**Gotowe:** w `portfolio/reguly.md` zapisz narzędzie i wersję, plik reguł, ślad wykrycia albo „niepotwierdzone” oraz przykład zachowania. Istnienie pliku, jego załadowanie i przestrzeganie to trzy osobne sprawy. Brak różnicy między próbami też jest wynikiem.

**Pomoc:** diagnostyka dostosowań jest dostępna tylko w niektórych wersjach VS Code. Dołączenie pliku ręcznie pozwala ćwiczyć dalej, ale nie dowodzi ładowania automatycznego.

**Dla szybszych:** ten sam prompt i te same pliki w Claude Code. Współczesne wersje mogą czytać AGENTS bezpośrednio; nasz import działa jako jawne wskazanie. Sprawdź wersję i reguły pierwszeństwa, zamiast polegać na ogłoszeniu produktu.

Źródła: [VS Code](https://code.visualstudio.com/docs/agent-customization/custom-instructions), [Claude Code](https://code.claude.com/docs/en/memory).
