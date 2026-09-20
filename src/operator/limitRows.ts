import type { Transaction } from '../model.js';
import type { CreditLimit } from '../limits/creditLimit.js';

export interface OperatorRow {
  id: string;
  nrRachunku: string;
  dataWaluty: string;
  waluta: string;
  kwotaGrosze: number;
  limitGrosze: number | null;
  wykorzystanieGrosze: number;
  przekroczenieGrosze: number;
  status: 'w_limicie' | 'przekroczenie' | 'brak_limitu' | 'inna_waluta';
  powod: string;
}

export interface LimitRowsResult {
  stan: 'niepodlaczone' | 'gotowe';
  wiersze: OperatorRow[];
}

/**
 * Punkt integracji w zadaniu końcowym. Celowo jeszcze niepodłączony.
 * Moduł Franka jest w src/limits/creditLimit.ts i wymaga wcześniejszego review.
 * Nie wpisuj tutaj wyników z demo: wiersze mają wynikać z argumentów funkcji.
 */
export function buildLimitRows(
  _operacje: readonly Transaction[],
  _limity: readonly CreditLimit[],
): LimitRowsResult {
  return { stan: 'niepodlaczone', wiersze: [] };
}
