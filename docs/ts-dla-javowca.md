# TypeScript dla javowca — ściągawka

Nie kurs — tylko to, co potrzebne, żeby czytać i modyfikować to repozytorium.
Przykłady z `src/`.

## `interface` vs klasa

Jedna klasa w repo: `TransactionRegister` (`src/transactions/register.ts`) —
bo ma stan i metody, które go zmieniają (`add`, `addAll`). Reszta —
`Transaction`, `ValidationResult`, `ParsedBankFile`, `DailyReport` — to
`interface`: kształt danych, bez zachowania. Logikę niosą osobne funkcje
(`validateTransaction`, `sumTransactions`, `parseBankFile`), które biorą dane
i zwracają nowe dane. Odpowiednik w Javie: rekordy/DTO plus statyczne metody
narzędziowe, bez gettera-na-pole i bez `this.stan`.

## Typowanie strukturalne, nie nominalne

Największa różnica względem Javy. `class X implements Y` deklaruje zgodność
z nazwy; w TS-ie **kształt wystarczy** — obiekt pasuje do `Transaction`,
jeśli ma te same pola i typy, bez `implements`. Literał zwracany przez
`parsujWiersz` w `parseBankFile.ts` nigdzie nie deklaruje `: Transaction` —
pasuje, bo ma odpowiednie pola. Wygodne, ale znaczy też, że przypadkowo
zgodny obiekt przejdzie typecheck, choć semantycznie jest czymś innym.

## `type` vs `interface`

W repo: `interface` dla kształtu obiektu (`Transaction`, `ValidationResult`),
`type` dla aliasów i unii (`Waluta`, `TypOperacji`). `interface` da się
rozszerzać (`extends`) i scalać wielokrotną deklaracją; `type` nie. Tu nie ma
potrzeby rozszerzania — podział jest konwencyjny, nie szukaj głębszego zamysłu.

## Unie literałów jako enum

```ts
export type Waluta = 'PLN' | 'EUR' | 'USD';
export type TypOperacji = 'UZNANIE' | 'OBCIAZENIE';
```

Odpowiednik `enum Waluta { PLN, EUR, USD }` z Javy, tyle że w runtime to
zwykły string `"PLN"`, nie obiekt enuma. Zawężanie typu robi się przez
porównania (`if (w !== 'PLN' && w !== 'EUR' && w !== 'USD')` w
`validate.ts`) — nie ma `switch` z gwarancją kompletności jak przy `sealed`.

## `undefined` vs `null`, pole opcjonalne `?`

`null` = świadomy, jawny brak (`ParsedBankFile.sumaKontrolnaGrosze: number |
null` — nagłówek pliku mógł nie mieć sumy kontrolnej). `undefined` pojawia
się, gdy czegoś w ogóle nie podano — np. `const [id = '', nrRachunku = '',
...] = pola;` w `parseBankFile.ts`: brakującej kolumnie odpowiada
`undefined`, `= ''` to wartość domyślna na tę okazję. Składnia `pole?: T`
(skrót `T | undefined`, zwalnia z podania pola) w tym repo się nie pojawia —
każdy kontrakt w `model.ts` wymaga wszystkich pól celowo, bez opcjonalności
rozmywającej gwarancję. Jedyne miejsce z realnie brakującymi polami to
`dane: any` w `accrueInterest` (np. `r.zerwanaDnia`) — `any` nie wymusza
zadeklarowania tego jako opcjonalne, więc kompilator też nie ostrzeże.
Najbliższy odpowiednik javowego `Optional<T>` to `T | undefined`, ale bez
opakowania w runtime.

## `any` w module odsetek

```ts
export function accrueInterest(dane: any): any
```

`any` wyłącza sprawdzanie typów całkowicie — `dane.cokolwiek.jeszcze`
przechodzi `typecheck`, nawet gdy pole nie istnieje; błąd wychodzi dopiero
w runtime, albo w ogóle (cicho zwraca `undefined`, liczy złą kwotę). To nie
jest niewinne uproszczenie: `accrueInterest` to spory blok zagnieżdżonych
`if`-ów portowany z `legacy-java/OdsetkiCalculator.java`, a `any` jest
dokładnie tym, co pozwala mu kompilować się, mimo że nikt już nie jest
pewien, jakie pola faktycznie ma `dane`. W Javie odpowiednikiem byłoby
`Object` albo surowa `Map` — to samo ryzyko, tylko bez wymuszonego
rzutowania w miejscu użycia.

## ESM: `import`/`export` i rozszerzenie `.js`

```ts
import type { Transaction } from '../model.js';
```

Plik nazywa się `model.ts`, import wskazuje `model.js` — to nie pomyłka.
Node w trybie ESM (`"type": "module"` w `package.json`) rozwiązuje importy
dosłownie, a TypeScript **nie przepisuje** specyfikatorów podczas
kompilacji — piszesz ścieżkę taką, jaka powstanie po `.ts` → `.js`, nawet
edytując wyłącznie `.ts`. Pominięcie `.js` (nawyk z bundlerów) tu się nie
uruchomi pod `tsx`/node ESM, mimo że w repo nie ma bundlera ani kroku
budowania.

## `number` to zawsze `double` — nie ma `int`, nie ma `BigDecimal`

Jeden typ liczbowy, zawsze 64-bitowy zmiennoprzecinkowy IEEE 754 —
odpowiednik javowego `double`. Nie ma `int`, `long`, `BigDecimal`. Java przy
pieniądzach sięga po `BigDecimal` właśnie po to, żeby uniknąć błędów
zaokrągleń wynikających z binarnej reprezentacji ułamków dziesiętnych; w
TS-ie tej siatki nie ma. Klasyczny przykład: `0.1 + 0.2` w konsoli JS/TS da
`0.30000000000000004`, nie `0.3` — ani `0.1`, ani `0.2` nie mają dokładnej
reprezentacji binarnej, więc każde działanie na takich ułamkach może
akumulować mikroskopijny błąd. Przy operacjach finansowych, gdzie kwoty mają
się sumować co do grosza, taki błąd nie jest kosmetyczny. Odpowiednikiem
javowego `BigDecimal` w świecie JS/TS nie jest nic wbudowanego w standardową
bibliotekę — sięga się po zewnętrzne biblioteki dużej precyzji (np.
`decimal.js`, `big.js`), które reprezentują liczby jako ciąg cyfr, a nie jako
binarny ułamek zmiennoprzecinkowy.

## vitest vs JUnit

| JUnit | vitest | Uwaga |
|---|---|---|
| `@Test` | `it('robi X', () => {...})` | `it`/`test` to alias tej samej funkcji |
| `class XyzTest` | `describe('Xyz', () => {...})` | grupowanie, nie klasa |
| `assertEquals(a, b)` | `expect(a).toBe(b)` | `toBe` to `===`, nie `.equals()` |
| `assertEquals` na obiektach | `expect(a).toEqual(b)` | porównanie strukturalne (głębokie) |
| `@BeforeEach` | `beforeEach(() => {...})` | ta sama semantyka |

Nazwy testów po polsku (konwencja `tests/transactions/`), np.
`it('odrzuca transakcję bez numeru rachunku', () => {...})` wywołujące
`validateTransaction(...)` — trzymaj się tego wzorca w Ćw. 6.

## Jak uruchomić

- `npm test` — wszystkie testy jednorazowo (`vitest run`)
- `npm run typecheck` — sprawdzenie typów bez emitowania plików (`tsc --noEmit`)
- `npx tsx sciezka/do/pliku.ts` — uruchomienie pojedynczego pliku `.ts` wprost,
  bez kompilacji (np. `npx tsx src/reports/dailyReport.ts dane/wyciag_2026_08.csv`
  = `npm run raport`)
