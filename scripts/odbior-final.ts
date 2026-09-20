import assert from 'node:assert/strict';
import { buildOperatorReport, loadOperatorInputs } from '../src/operator/report.js';
import { buildLimitRows } from '../src/operator/limitRows.js';
import { buildSqlReport } from '../src/operator/sqlReport.js';

try {
  const useSql = process.argv.includes('--sql');
  const inputs = loadOperatorInputs();
  const report = useSql ? buildSqlReport(inputs.operacje,inputs.limity) : buildOperatorReport();
  assert.equal(report.stan, 'gotowe', 'Moduł limitów nie został podłączony. To oczekiwany stan przed finałem.');
  assert.equal(report.wiersze.length, 3, 'Każda z trzech operacji ma mieć wiersz.');
  const expected = [
    ['FR-001', 6000, 0, 'w_limicie'],
    ['FR-002', 11000, 1000, 'przekroczenie'],
    ['FR-003', 13000, 3000, 'przekroczenie'],
  ];
  assert.deepEqual(report.wiersze.map(r => [r.id,r.wykorzystanieGrosze,r.przekroczenieGrosze,r.status]), expected);
  for (const row of report.wiersze) {
    assert.equal(row.limitGrosze, 10000); assert.equal(row.waluta, 'PLN');
    assert.ok(row.powod.trim().length > 0, 'Operator potrzebuje uzasadnienia.');
  }
  // Druga próba utrudnia zaliczenie przez przepisanie liczb z demo.
  const { operacje, limity } = loadOperatorInputs();
  const changed = operacje.map(t => ({ ...t, kwotaGrosze: 1000 }));
  const alternative = useSql ? buildSqlReport(changed,limity) : buildLimitRows(changed, limity);
  assert.equal(alternative.stan, 'gotowe');
  assert.equal(alternative.wiersze.length, 3);
  assert.deepEqual(alternative.wiersze.map(r => r.przekroczenieGrosze), [0,0,0]);
  assert.deepEqual(alternative.wiersze.map(r => r.wykorzystanieGrosze), [1000,2000,3000]);
  assert.ok(alternative.wiersze.every(r => r.status === 'w_limicie'));
  console.log('ODBIÓR PODSTAWY: OK. Teraz pokaż wynik z repo na ekranie i wyjaśnij FR-002 partnerowi.');
  console.log('Ta kontrola obejmuje jedną partię, jeden rachunek, jedną walutę. Nie potwierdza całej specyfikacji biznesowej.');
} catch (error) {
  console.error('ODBIÓR: JESZCZE NIEGOTOWE\n' + (error instanceof Error ? error.message : String(error)));
  process.exitCode = 1;
}
