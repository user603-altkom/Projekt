import http from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildOperatorReport } from '../src/operator/report.js';

const root = (p: string) => fileURLToPath(new URL(`../${p}`, import.meta.url));
const files: Record<string, [string, string]> = {
  '/': ['operator/index.html', 'text/html; charset=utf-8'],
  '/app.js': ['operator/app.js', 'text/javascript; charset=utf-8'],
  '/style.css': ['operator/style.css', 'text/css; charset=utf-8'],
  '/api/demo': ['dane/franek/demo-design.json', 'application/json; charset=utf-8'],
};
const port = Number(process.env['PORT'] ?? 4173);
const server = http.createServer((req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'GET') { res.writeHead(405); res.end('Tylko GET'); return; }
  const pathname = new URL(req.url ?? '/', 'http://localhost').pathname;
  try {
    if (pathname === '/api/raport') {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(buildOperatorReport()));
      return;
    }
    const file = files[pathname];
    if (!file) { res.writeHead(404); res.end('Nie znaleziono'); return; }
    res.setHeader('Content-Type', file[1]);
    res.end(readFileSync(root(file[0])));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ blad: error instanceof Error ? error.message : 'Błąd raportu' }));
  }
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Ekran operatora: http://127.0.0.1:${port}\nCtrl+C kończy serwer. Po zmianie TypeScript uruchom ponownie.`));
