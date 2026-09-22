import http from 'node:http';
import { readFile } from 'node:fs/promises';
const port = Number(process.argv[2] || 4186);
const server = http.createServer(async (req, res) => {
  if (req.url !== '/') { res.writeHead(404); res.end('Nie znaleziono'); return; }
  try {
    const html = await readFile(new URL('./index.html', import.meta.url));
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8', 'Cache-Control':'no-store'});
    res.end(html);
  } catch {
    res.writeHead(500); res.end('Nie udalo sie odczytac index.html');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Demo do testow: http://127.0.0.1:${port}. Ctrl+C konczy prace.`));
