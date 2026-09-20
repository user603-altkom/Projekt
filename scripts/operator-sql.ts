import { mkdirSync, writeFileSync } from 'node:fs';
import { loadOperatorInputs } from '../src/operator/report.js';
import { buildSqlReport } from '../src/operator/sqlReport.js';
const {operacje,limity}=loadOperatorInputs();
mkdirSync('wyniki',{recursive:true});
writeFileSync('wyniki/raport-operatora-sql.json',JSON.stringify(buildSqlReport(operacje,limity),null,2));
console.log('W ekranie wybierz Własny plik JSON (SQL) i wczytaj wyniki/raport-operatora-sql.json.');
