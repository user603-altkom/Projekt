/**
 * Uruchamia raport obrotow z `sql/lokalnie/raport_obrotow.sql`, mierzy czas
 * i sprawdza, czy wynik jest poprawny.
 *
 * Poprawnosc liczona jest niezaleznie, w JavaScripcie, prosto z tabeli
 * `transakcje` - zeby nie dalo sie "przyspieszyc" raportu psujac liczby.
 *
 * Konczy sie kodem 1, gdy raport przekroczy budzet czasu albo gdy liczby
 * przestana sie zgadzac.
 *
 * Uruchomienie: npm run sql:raport
 */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const KATALOG_SKRYPTU = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(KATALOG_SKRYPTU, '..');
const PLIK_BAZY = path.join(ROOT, 'dane', 'lokalna-baza', 'rozliczenia.db');
const PLIK_ZAPYTANIA = path.join(ROOT, 'sql', 'lokalnie', 'raport_obrotow.sql');

/**
 * Okno nocne przeliczone na skale tego zbioru danych.
 *
 * Dobrane tak, zeby dzialalo na roznym sprzecie: wersja z wadami przekracza
 * budzet nawet na szybkiej maszynie, a wersja poprawiona miesci sie w nim
 * na wyrazie wolniejszym laptopie firmowym. Zmierzone 19.09.2026 na dwoch
 * maszynach: 1344 ms kontra 20 ms na MacBooku, 10-11 s kontra ok. 160 ms
 * na Windowsie z 2019 roku.
 */
const BUDZET_MS = 500;

let DatabaseSync;
try {
  ({ DatabaseSync } = await import('node:sqlite'));
} catch {
  console.error(
    'Ten skrypt potrzebuje modulu "node:sqlite", ktorego nie ma w twojej wersji Node.\n' +
      `Masz: node ${process.versions.node}\n` +
      'Co zrobic: zainstaluj Node 24 (plik .nvmrc w repozytorium wskazuje te wersje).\n' +
      'Z nvm albo nvm-windows wystarczy: nvm install 24 && nvm use 24'
  );
  process.exit(1);
}

if (!existsSync(PLIK_BAZY)) {
  console.error(
    `Nie znalazlem bazy: ${path.relative(ROOT, PLIK_BAZY)}\n` + 'Co zrobic: npm run sql:setup'
  );
  process.exit(1);
}

const db = new DatabaseSync(PLIK_BAZY);
const zapytanie = readFileSync(PLIK_ZAPYTANIA, 'utf8');

// --- pomiar -----------------------------------------------------------------

const start = performance.now();
const wiersze = db.prepare(zapytanie).all();
const czasMs = Math.round(performance.now() - start);

// --- niezalezne wyliczenie tego samego -------------------------------------

const surowe = db
  .prepare(
    `SELECT kod_oddzialu, data_waluty, kwota_grosze
       FROM transakcje
      WHERE waluta = 'PLN'`
  )
  .all();

const dzienne = new Map();
const roczne = new Map();
for (const t of surowe) {
  const klucz = t.kod_oddzialu + '|' + t.data_waluty;
  const d = dzienne.get(klucz) || { suma: 0, liczba: 0 };
  d.suma += Number(t.kwota_grosze);
  d.liczba += 1;
  dzienne.set(klucz, d);
  roczne.set(t.kod_oddzialu, (roczne.get(t.kod_oddzialu) || 0) + Number(t.kwota_grosze));
}

const bledy = [];
// Kazdy rodzaj bledu zglaszamy raz na oddzial - inaczej jedna zla kolumna
// zalewa liste tym samym komunikatem i nie widac skali szkody.
const juzZgloszone = new Set();
let wszystkichBledow = 0;

function zglos(klucz, tekst) {
  wszystkichBledow++;
  if (juzZgloszone.has(klucz) || bledy.length >= 5) return;
  juzZgloszone.add(klucz);
  bledy.push(tekst);
}

if (wiersze.length !== dzienne.size) {
  zglos('liczba-wierszy', `liczba wierszy: raport ${wiersze.length}, a powinno byc ${dzienne.size}`);
}
for (const w of wiersze) {
  const oczekiwane = dzienne.get(w.kod_oddzialu + '|' + w.data_waluty);
  if (!oczekiwane) {
    zglos('spoza|' + w.kod_oddzialu, `wiersz spoza zbioru: ${w.kod_oddzialu} ${w.data_waluty}`);
  } else if (Number(w.suma_grosze) !== oczekiwane.suma) {
    zglos(
      'suma|' + w.kod_oddzialu,
      `${w.kod_oddzialu} ${w.data_waluty}: suma ${w.suma_grosze}, a powinno byc ${oczekiwane.suma}`
    );
  } else if (Number(w.liczba_operacji) !== oczekiwane.liczba) {
    zglos(
      'operacji|' + w.kod_oddzialu,
      `${w.kod_oddzialu} ${w.data_waluty}: operacji ${w.liczba_operacji}, a powinno byc ${oczekiwane.liczba}`
    );
  } else if (Number(w.obrot_roczny_grosze) !== roczne.get(w.kod_oddzialu)) {
    zglos(
      'roczny|' + w.kod_oddzialu,
      `${w.kod_oddzialu}: obrot roczny ${w.obrot_roczny_grosze}, a powinno byc ${roczne.get(w.kod_oddzialu)}`
    );
  }
}

db.close();

// --- wynik ------------------------------------------------------------------

const zlote = (grosze) =>
  (grosze / 100).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

console.log('Raport obrotow - sql/lokalnie/raport_obrotow.sql\n');
console.log(`Operacji w bazie:    ${surowe.length}`);
console.log(`Wierszy w raporcie:  ${wiersze.length}`);
console.log(`Obroty razem:        ${zlote([...roczne.values()].reduce((a, b) => a + b, 0))} zl`);
console.log(`\nCzas wykonania:      ${czasMs} ms`);
console.log(`Budzet:              ${BUDZET_MS} ms`);

if (bledy.length > 0) {
  console.log(`\nLICZBY SIE NIE ZGADZAJA (niezgodnych wierszy: ${wszystkichBledow}):`);
  for (const b of bledy) console.log('  - ' + b);
  console.log('\nRaport ma byc szybszy, nie inny. Cofnij zmiane, ktora zmienila wynik.');
  process.exit(1);
}

console.log('Liczby:              zgadzaja sie co do grosza');

if (czasMs > BUDZET_MS) {
  console.log(`\nPRZEKROCZONY BUDZET o ${czasMs - BUDZET_MS} ms.`);
  process.exit(1);
}

console.log('\nMiesci sie w budzecie.');
