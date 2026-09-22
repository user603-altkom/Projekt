import test from 'node:test';
import assert from 'node:assert/strict';
import { exceeded } from '../src/limits.js';

test('wykorzystanie poniżej limitu', () => assert.equal(exceeded(6000, 10000), 0));
test('wykorzystanie ponad limitem', () => assert.equal(exceeded(11000, 10000), 1000));
test('równość nie jest przekroczeniem', () => assert.equal(exceeded(10000, 10000), 0));
test('brak limitu nie ogranicza wykorzystania', () => assert.equal(exceeded(11000, null), 0));
