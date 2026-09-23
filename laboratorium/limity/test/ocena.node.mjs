import test from 'node:test';
import assert from 'node:assert/strict';
import { ocenLimit } from '../src/ocena.mjs';

test('bez wniosku: wykorzystanie 120 zl przy bazie 100 zl przekracza limit o 20 zl', () => {
  const wejscie = {
    kontrahent: 'K-001', limitBazowyGrosze: 10000, wykorzystanieGrosze: 12000,
    teraz: '2026-09-22T09:00:00Z', wniosek: null,
  };
  assert.deepEqual(ocenLimit(wejscie), {
    limitEfektywnyGrosze: 10000, przekroczenieGrosze: 2000,
    zrodlo: 'bazowy', wniosekId: null,
  });
});

test('zatwierdzony wniosek czasowy wyżej od bazy ma zastosowanie w oknie czasu', () => {
  const wejscie = {
    kontrahent: 'K-001',
    limitBazowyGrosze: 10000,
    wykorzystanieGrosze: 12000,
    teraz: '2026-09-22T09:00:00Z',
    wniosek: {
      id: 'W-001',
      status: 'zatwierdzony',
      autor: 'operator-1',
      zatwierdzil: 'operator-2',
      limitGrosze: 15000,
      od: '2026-09-22T08:00:00Z',
      do: '2026-09-22T10:00:00Z',
    },
  };
  assert.deepEqual(ocenLimit(wejscie), {
    limitEfektywnyGrosze: 15000,
    przekroczenieGrosze: 0,
    zrodlo: 'czasowy',
    wniosekId: 'W-001',
  });
});
