import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { ocenLimit } from './src/ocena.mjs';
const port = Number(process.argv[2] || 4179);
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pln = value => new Intl.NumberFormat('pl-PL', {style:'currency', currency:'PLN'}).format(value / 100);
const server = http.createServer(async (req, res) => {
  try {
    if (!['/', '/api/raport'].includes(req.url)) { res.writeHead(404); res.end('Nie znaleziono'); return; }
    const dane = JSON.parse(await readFile(new URL('./dane/scenariusze.json', import.meta.url), 'utf8'));
    const rows = dane.map(({nazwa, wejscie}) => ({nazwa, ...ocenLimit(wejscie)}));
    res.setHeader('Cache-Control', 'no-store');
    if (req.url === '/api/raport') { res.setHeader('Content-Type','application/json; charset=utf-8');res.end(JSON.stringify(rows));return; }
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.end(`<!doctype html><html lang="pl"><meta charset="utf-8"><title>Laboratorium limitów</title><style>body{font:20px system-ui;margin:40px;color:#173444}table{border-collapse:collapse}th,td{padding:16px;border-bottom:1px solid #ccc;text-align:left}h1{font-size:32px}</style><h1>Czasowy limit: wynik Twojego modułu</h1><p>Kwoty pochodzą z funkcji ocenLimit. Dane są syntetyczne.</p><table><thead><tr><th>Scenariusz</th><th>Limit</th><th>Przekroczenie</th><th>Źródło</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${escape(r.nazwa)}</td><td>${escape(pln(r.limitEfektywnyGrosze))}</td><td>${escape(pln(r.przekroczenieGrosze))}</td><td>${escape(r.zrodlo)}</td></tr>`).join('')}</tbody></table><p><a href="/api/raport">Te same dane jako JSON</a></p></html>`);
  } catch (e) { res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});res.end('Błąd modułu: '+e.message); }
});
server.on('error', e => { console.error(e.message);process.exitCode=1; });
server.listen(port, '127.0.0.1', () => console.log(`Otworz http://127.0.0.1:${port}. Ctrl+C zatrzymuje serwer.`));
