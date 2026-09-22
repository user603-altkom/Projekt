import { readFile } from 'node:fs/promises';
import { ocenLimit } from './src/ocena.mjs';
const scenariusze = JSON.parse(await readFile(new URL('./dane/scenariusze.json', import.meta.url), 'utf8'));
console.table(scenariusze.map(({ nazwa, wejscie }) => ({ scenariusz: nazwa, ...ocenLimit(wejscie) })));
