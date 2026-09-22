import { describe, expect, it } from 'vitest';
import { loadOperatorInputs } from '../../src/operator/report.js';
import { parseCreditLimits } from '../../src/limits/creditLimit.js';

describe('Dane wejściowe do odbioru operatora', () => {
  it('mają jawne jednostki i ręcznie policzalną sumę obciążeń', () => {
    const { operacje, limity } = loadOperatorInputs();
    expect(operacje.map(t => t.kwotaGrosze)).toEqual([6000,5000,2000]);
    expect(new Set(operacje.map(t => `${t.nrRachunku}:${t.waluta}:${t.dataWaluty}`)).size).toBe(1);
    expect(limity[0]?.limitGrosze).toBe(10000);
  });
  it('rozróżnia brak limitu kredytowego od przyznanego limitu kredytowego zero w katalogu', () => {
    expect(parseCreditLimits('[]')).toEqual([]);
    expect(parseCreditLimits(JSON.stringify([{nrRachunku:'20000089180903978540630428',limitGrosze:0,waluta:'PLN',obowiazujeOd:'2026-01-01'}]))[0]?.limitGrosze).toBe(0);
  });
});
