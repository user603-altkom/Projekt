import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadCreditLimits } from '../limits/creditLimit.js';
import type { Transaction } from '../model.js';
import { buildLimitRows } from './limitRows.js';

const fixture = (name: string) => fileURLToPath(new URL(`../../dane/franek/${name}`, import.meta.url));

export function loadOperatorInputs(): { operacje: Transaction[]; limity: ReturnType<typeof loadCreditLimits> } {
  // Zaufana, wersjonowana próbka dydaktyczna. To nie jest parser plików klientów.
  const operacje = JSON.parse(readFileSync(fixture('operacje-final.json'), 'utf8')) as Transaction[];
  return { operacje, limity: loadCreditLimits(fixture('limity-final.json')) };
}

export function buildOperatorReport() {
  const { operacje, limity } = loadOperatorInputs();
  return {
    wersja: 1,
    tryb: 'repo',
    zrodlo: 'dane/franek/operacje-final.json + dane/franek/limity-final.json',
    liczbaOperacji: operacje.length,
    ...buildLimitRows(operacje, limity),
  };
}
