import test from 'node:test';
import assert from 'node:assert/strict';
import {przekroczenie} from './ocena-review.mjs';
test('120 zl przy limicie 100 zl', () => assert.equal(przekroczenie(12000, 10000), 2000));
