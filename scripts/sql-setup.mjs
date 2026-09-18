/**
 * Budowa lokalnej bazy do ćwiczenia z raportem obrotów.
 *
 * Dane są generowane deterministycznie z ustalonego ziarna, więc każdy
 * dostaje identyczną bazę i identyczne czasy wykonania. Nic nie pobiera
 * z sieci, nic nie instaluje - `node:sqlite` jest wbudowany w Node.
 *
 * Uruchomienie: npm run sql:setup
 */

import { mkdirSync, rmSync, existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const KATALOG_SKRYPTU = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(KATALOG_SKRYPTU, '..');
const KATALOG_BAZY = path.join(ROOT, 'dane', 'lokalna-baza');
const PLIK_BAZY = path.join(KATALOG_BAZY, 'rozliczenia.db');
const PLIK_SCHEMATU = path.join(ROOT, 'sql', 'lokalnie', '001_schemat.sql');

const ZIARNO = 20260921;
const LICZBA_ODDZIALOW = 24;
const DNI = 240;
const OPERACJI_NA_DZIEN = 200;
const PIERWSZY_DZIEN = Date.UTC(2025, 8, 1); // 2025-09-01

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

/** Generator pseudolosowy o stalym ziarnie - ta sama baza u kazdego. */
function losowy(ziarno) {
  let a = ziarno >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rnd = losowy(ZIARNO);
const wybierz = (tablica) => tablica[Math.floor(rnd() * tablica.length)];

const MIASTA = [
  'Warszawa', 'Krakow', 'Gdansk', 'Wroclaw', 'Poznan', 'Katowice',
  'Lodz', 'Szczecin', 'Lublin', 'Bydgoszcz', 'Rzeszow', 'Bialystok',
];

const TYTULY = [
  'Przelew wychodzacy - faktura',
  'Zaplata za fakture',
  'Rozliczenie prowizji',
  'Czynsz za lokal uzytkowy',
  'Skladka ZUS',
  'Zaliczka na podatek PIT-4',
  'Wplata gotowkowa - wplatomat',
  'Przelew wlasny - zasilenie rachunku pomocniczego',
  'Zwrot nadplaty za okres',
  'Oplata za prowadzenie rachunku',
  'Wynagrodzenie - lista plac',
  'Rata kredytu obrotowego',
];

function dataDnia(offsetDni) {
  return new Date(PIERWSZY_DZIEN + offsetDni * 86400000).toISOString().slice(0, 10);
}

function nrRachunku(i) {
  let cyfry = '';
  for (let k = 0; k < 26; k++) cyfry += Math.floor(rnd() * 10);
  return cyfry.slice(0, 24) + String(i % 100).padStart(2, '0');
}

console.log('Buduje lokalna baze do cwiczenia z raportem obrotow.');
console.log(`  node ${process.versions.node}`);

rmSync(KATALOG_BAZY, { recursive: true, force: true });
mkdirSync(KATALOG_BAZY, { recursive: true });

if (!existsSync(PLIK_SCHEMATU)) {
  console.error(`Brakuje pliku ze schematem: ${path.relative(ROOT, PLIK_SCHEMATU)}`);
  process.exit(1);
}

const db = new DatabaseSync(PLIK_BAZY);
db.exec(readFileSync(PLIK_SCHEMATU, 'utf8'));

// --- oddzialy ---------------------------------------------------------------

const oddzialy = [];
for (let i = 0; i < LICZBA_ODDZIALOW; i++) {
  const kod = 'ODD-' + String(i + 1).padStart(3, '0');
  const miasto = MIASTA[i % MIASTA.length];
  oddzialy.push({ kod, nazwa: `Oddzial ${miasto} ${Math.floor(i / MIASTA.length) + 1}`, miasto });
}

const wstawOddzial = db.prepare(
  'INSERT INTO oddzialy (kod_oddzialu, nazwa, miasto) VALUES (?, ?, ?)'
);
db.exec('BEGIN');
for (const o of oddzialy) wstawOddzial.run(o.kod, o.nazwa, o.miasto);
db.exec('COMMIT');

// --- rachunki ---------------------------------------------------------------

const rachunki = [];
for (let i = 0; i < LICZBA_ODDZIALOW * 8; i++) {
  rachunki.push({ nr: nrRachunku(i), oddzial: oddzialy[i % LICZBA_ODDZIALOW].kod });
}

// --- transakcje -------------------------------------------------------------

const wstawTransakcje = db.prepare(
  `INSERT INTO transakcje
     (id_operacji, nr_rachunku, kod_oddzialu, kwota_grosze, waluta,
      typ_operacji, data_ksiegowania, data_waluty, tytul)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
);

let licznik = 0;
db.exec('BEGIN');
for (let dzien = 0; dzien < DNI; dzien++) {
  const data = dataDnia(dzien);
  for (let k = 0; k < OPERACJI_NA_DZIEN; k++) {
    const rachunek = wybierz(rachunki);
    const waluta = rnd() < 0.93 ? 'PLN' : rnd() < 0.6 ? 'EUR' : 'USD';
    const typ = rnd() < 0.5 ? 'UZNANIE' : 'OBCIAZENIE';
    const kwota = Math.floor(rnd() * 4_000_000) + 500;
    const godzina = String(6 + Math.floor(rnd() * 12)).padStart(2, '0');
    const minuta = String(Math.floor(rnd() * 60)).padStart(2, '0');
    licznik++;
    wstawTransakcje.run(
      'OP-' + String(licznik).padStart(7, '0'),
      rachunek.nr,
      rachunek.oddzial,
      kwota,
      waluta,
      typ,
      `${data}T${godzina}:${minuta}:00`,
      data,
      `${wybierz(TYTULY)} ${data.slice(0, 7)}`
    );
  }
}
db.exec('COMMIT');

const { operacji } = db.prepare('SELECT COUNT(*) AS operacji FROM transakcje').get();
const { oddzialow } = db.prepare('SELECT COUNT(*) AS oddzialow FROM oddzialy').get();
db.close();

console.log(`  oddzialow:  ${oddzialow}`);
console.log(`  operacji:   ${operacji}`);
console.log(`  baza:       ${path.relative(ROOT, PLIK_BAZY)}`);
console.log('\nGotowe. Teraz: npm run sql:raport');
