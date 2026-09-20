import { writeFileSync, mkdirSync } from 'node:fs';
import { buildOperatorReport } from '../src/operator/report.js';
mkdirSync('wyniki', { recursive: true });
writeFileSync('wyniki/raport-operatora.json', JSON.stringify(buildOperatorReport(), null, 2));
console.log('Zapisano wyniki/raport-operatora.json');
