import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import type { Transaction } from '../model.js';
import type { CreditLimit } from '../limits/creditLimit.js';
import type { OperatorRow } from './limitRows.js';

export function buildSqlReport(operacje: readonly Transaction[], limity: readonly CreditLimit[]) {
  const db = new DatabaseSync(':memory:');
  try {
    db.exec('CREATE TABLE operacje (kolejnosc INTEGER, id TEXT, nrRachunku TEXT, dataWaluty TEXT, waluta TEXT, kwotaGrosze INTEGER, typ TEXT); CREATE TABLE limity (nrRachunku TEXT, limitGrosze INTEGER, waluta TEXT, effectiveFrom TEXT)');
    const ins = db.prepare('INSERT INTO operacje VALUES (?,?,?,?,?,?,?)');
    operacje.forEach((t,i) => ins.run(i,t.id,t.nrRachunku,t.dataWaluty,t.waluta,t.kwotaGrosze,t.typ));
    const lim = db.prepare('INSERT INTO limity VALUES (?,?,?,?)');
    limity.forEach(l => lim.run(l.nrRachunku,l.limitGrosze,l.waluta,l.effectiveFrom));
    const query = readFileSync(new URL('../../sql/franek-limity.sql',import.meta.url),'utf8');
    const wiersze = db.prepare(query).all() as unknown as OperatorRow[];
    return {wersja:1,tryb:'repo',stan:'gotowe' as const,zrodlo:'sql/franek-limity.sql na danych dane/franek/',liczbaOperacji:operacje.length,wiersze};
  } finally { db.close(); }
}
