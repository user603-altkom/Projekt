/**
 * Zrzut tych samych danych, na ktorych stoi ćwiczenie SQLite, do postaci
 * przyjmowanej przez PostgreSQL.
 *
 * Nie dodaje zadnej zaleznosci do projektu - generuje plik `.sql`, ktory
 * wgrywa sie przez `psql` w kontenerze. Dane pochodza z tej samej bazy
 * SQLite, wiec liczby w obu silnikach sa identyczne i da sie je porownac.
 *
 * Uruchomienie: npm run pg:dump   (wczesniej: npm run sql:setup)
 */

import { existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const KATALOG_SKRYPTU = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(KATALOG_SKRYPTU, '..');
const PLIK_BAZY = path.join(ROOT, 'dane', 'lokalna-baza', 'rozliczenia.db');
const PLIK_WYJSCIA = path.join(ROOT, 'dane', 'lokalna-baza', 'rozliczenia_pg.sql');

let DatabaseSync;
try {
  ({ DatabaseSync } = await import('node:sqlite'));
} catch {
  console.error(
    'Ten skrypt potrzebuje modulu "node:sqlite", ktorego nie ma w twojej wersji Node.\n' +
      `Masz: node ${process.versions.node}\n` +
      'Co zrobic: zainstaluj Node 24 (plik .nvmrc w repozytorium wskazuje te wersje).'
  );
  process.exit(1);
}

if (!existsSync(PLIK_BAZY)) {
  console.error(
    `Nie znalazlem bazy zrodlowej: ${path.relative(ROOT, PLIK_BAZY)}\n` +
      'Co zrobic: najpierw npm run sql:setup'
  );
  process.exit(1);
}

const db = new DatabaseSync(PLIK_BAZY);
const oddzialy = db.prepare('SELECT kod_oddzialu, nazwa, miasto FROM oddzialy').all();
const transakcje = db
  .prepare(
    `SELECT id_operacji, nr_rachunku, kod_oddzialu, kwota_grosze, waluta,
            typ_operacji, data_ksiegowania, data_waluty, tytul
       FROM transakcje`
  )
  .all();
db.close();

/** Apostrof w tekscie podwajamy - tak sie cytuje literaly w SQL. */
const tekst = (s) => "'" + String(s).replace(/'/g, "''") + "'";

const czesci = [];

czesci.push('-- Wygenerowane przez scripts/pg-dump.mjs. Nie edytuj recznie.');
czesci.push('-- Zrodlo: dane/lokalna-baza/rozliczenia.db (ten sam zbior co cwiczenie SQLite).');
czesci.push('');

czesci.push('DROP TABLE IF EXISTS transakcje;');
czesci.push('DROP TABLE IF EXISTS oddzialy;');
czesci.push('');
czesci.push(`CREATE TABLE oddzialy (
    kod_oddzialu   text NOT NULL PRIMARY KEY,
    nazwa          text NOT NULL,
    miasto         text NOT NULL
);`);
czesci.push('');
czesci.push(`CREATE TABLE transakcje (
    id_operacji        text    NOT NULL PRIMARY KEY,
    nr_rachunku        text    NOT NULL,
    kod_oddzialu       text    NOT NULL REFERENCES oddzialy (kod_oddzialu),
    kwota_grosze       bigint  NOT NULL CHECK (kwota_grosze > 0),
    waluta             text    NOT NULL CHECK (waluta IN ('PLN', 'EUR', 'USD')),
    typ_operacji       text    NOT NULL CHECK (typ_operacji IN ('UZNANIE', 'OBCIAZENIE')),
    data_ksiegowania   text    NOT NULL,
    data_waluty        text    NOT NULL,
    tytul              text    NOT NULL
);`);
czesci.push('');

czesci.push('BEGIN;');
for (const o of oddzialy) {
  czesci.push(
    `INSERT INTO oddzialy VALUES (${tekst(o.kod_oddzialu)}, ${tekst(o.nazwa)}, ${tekst(o.miasto)});`
  );
}

// Wstawki pakowane po 500 wierszy - jeden duzy INSERT laduje sie znacznie
// szybciej niz kilkadziesiat tysiecy pojedynczych.
const PACZKA = 500;
for (let i = 0; i < transakcje.length; i += PACZKA) {
  const wiersze = transakcje.slice(i, i + PACZKA).map(
    (t) =>
      `(${tekst(t.id_operacji)}, ${tekst(t.nr_rachunku)}, ${tekst(t.kod_oddzialu)}, ` +
      `${t.kwota_grosze}, ${tekst(t.waluta)}, ${tekst(t.typ_operacji)}, ` +
      `${tekst(t.data_ksiegowania)}, ${tekst(t.data_waluty)}, ${tekst(t.tytul)})`
  );
  czesci.push('INSERT INTO transakcje VALUES\n' + wiersze.join(',\n') + ';');
}

czesci.push('');
czesci.push('CREATE INDEX idx_transakcje_data_waluty ON transakcje (data_waluty);');
czesci.push('CREATE INDEX idx_transakcje_oddzial     ON transakcje (kod_oddzialu);');
czesci.push('COMMIT;');
czesci.push('');
czesci.push('ANALYZE;');
czesci.push('');

writeFileSync(PLIK_WYJSCIA, czesci.join('\n'), 'utf8');

console.log('Zrzut dla PostgreSQL gotowy.');
console.log(`  oddzialow:  ${oddzialy.length}`);
console.log(`  operacji:   ${transakcje.length}`);
console.log(`  plik:       ${path.relative(ROOT, PLIK_WYJSCIA)}`);
console.log('\nDalej: instrukcja w cwiczenia/rezerwa/baza_pod_dockerem/README.md');
