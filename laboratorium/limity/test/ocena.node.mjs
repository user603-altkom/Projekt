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
