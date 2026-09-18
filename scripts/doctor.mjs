#!/usr/bin/env node
/**
 * scripts/doctor.mjs
 *
 * Diagnostyka środowiska PRZED "npm ci". Celowo napisany w czystym
 * Node.js - ZERO importów spoza wbudowanych modułów - bo to narzędzie
 * ma pomóc, gdy sama instalacja zależności się nie powiodła. Skrypt,
 * który sam potrzebowałby "npm ci", żeby zdiagnozować awarię "npm ci",
 * byłby bezużyteczny.
 *
 * Użycie:
 *   node scripts/doctor.mjs
 *
 * Ten skrypt nic nie instaluje i niczego nie zmienia na dysku - tylko
 * sprawdza i opisuje, co widzi.
 */

import { execFile } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { builtinModules } from 'node:module';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import tls from 'node:tls';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const TIMEOUT_SIECIOWY_MS = 5000;

// registry.npmjs.org jest krytyczny - bez niego "npm ci" nie zadziała.
// Pozostałe trzy są używane w dalszych częściach szkolenia (Copilot,
// Claude/Anthropic) oraz do pracy z GitLabem - ich brak nie blokuje
// samego startu, ale warto o tym wiedzieć wcześniej niż w dniu 2 albo 3.
const HOSTY_DO_SPRAWDZENIA = [
  { host: 'registry.npmjs.org', krytyczny: true, opis: 'rejestr paczek npm - potrzebny do "npm ci"' },
  { host: 'api.githubcopilot.com', krytyczny: false, opis: 'GitHub Copilot - potrzebny w dniach 2-3' },
  { host: 'api.anthropic.com', krytyczny: false, opis: 'Claude / Anthropic - potrzebny w dniach 2-3' },
  { host: 'gitlab.com', krytyczny: false, opis: 'GitLab - hosting repozytorium' },
];

const KODY_BLEDOW_CERTYFIKATU = new Set([
  'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
  'SELF_SIGNED_CERT_IN_CHAIN',
  'DEPTH_ZERO_SELF_SIGNED_CERT',
]);

// Kolory tylko wtedy, gdy terminal je obsługuje - bez zależności typu chalk.
const kolorujTekst = Boolean(process.stdout.isTTY);
const kolor = {
  zielony: (s) => (kolorujTekst ? `\x1b[32m${s}\x1b[0m` : s),
  czerwony: (s) => (kolorujTekst ? `\x1b[31m${s}\x1b[0m` : s),
  zolty: (s) => (kolorujTekst ? `\x1b[33m${s}\x1b[0m` : s),
  szary: (s) => (kolorujTekst ? `\x1b[90m${s}\x1b[0m` : s),
  pogrubienie: (s) => (kolorujTekst ? `\x1b[1m${s}\x1b[0m` : s),
};

const wyniki = []; // { status: 'ok' | 'blad' | 'info', nazwa, krytyczny }
let wystapilBladKrytyczny = false;

/**
 * Zapisuje wynik jednego sprawdzenia i od razu wypisuje go na ekran.
 * @param {'ok'|'blad'|'info'} status
 * @param {string} nazwa
 * @param {string|null} komunikat - dodatkowe linie objaśnienia; dla błędów
 *   ZAWSZE powinny mówić, co użytkownik ma zrobić, nie tylko że coś nie działa.
 * @param {{krytyczny?: boolean}} [opcje]
 */
function zapisz(status, nazwa, komunikat, opcje = {}) {
  const krytyczny = Boolean(opcje.krytyczny);
  wyniki.push({ status, nazwa, krytyczny });
  if (status === 'blad' && krytyczny) {
    wystapilBladKrytyczny = true;
  }

  const znacznik =
    status === 'ok'
      ? kolor.zielony('[OK]  ')
      : status === 'blad'
        ? kolor.czerwony('[BŁĄD]')
        : kolor.zolty('[INFO]');

  console.log(`${znacznik} ${nazwa}`);
  if (komunikat) {
    for (const linia of komunikat.split('\n')) {
      console.log(`       ${linia}`);
    }
  }
}

function naglowek(tekst) {
  console.log('');
  console.log(kolor.pogrubienie(tekst));
}

// --- 1. Wersja Node.js -----------------------------------------------------

function sprawdzWersjeNode() {
  naglowek('1. Node.js');

  const aktualna = process.versions.node;
  console.log(`       Zainstalowana wersja: node ${aktualna}`);

  let wymagana = null;
  try {
    const pkg = JSON.parse(readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
    wymagana = pkg.engines && pkg.engines.node ? pkg.engines.node : null;
  } catch {
    // Brak package.json albo błąd parsowania - nie blokuje reszty diagnozy,
    // po prostu nie mamy z czym porównać.
  }

  if (!wymagana) {
    zapisz(
      'info',
      'Wersja Node.js',
      'Nie znalazłem wymagania w package.json (pole "engines.node") - pomijam porównanie.'
    );
    return;
  }

  const minimalnaGlownaWersja = parseInt(wymagana.replace(/[^0-9.]/g, '').split('.')[0], 10);
  const aktualnaGlownaWersja = parseInt(aktualna.split('.')[0], 10);

  if (Number.isFinite(minimalnaGlownaWersja) && aktualnaGlownaWersja < minimalnaGlownaWersja) {
    zapisz(
      'blad',
      'Wersja Node.js',
      `Masz node ${aktualna}, a repozytorium wymaga wersji ${wymagana}.\n` +
        'Co zrobić: zainstaluj aktualną wersję LTS ze strony https://nodejs.org ' +
        'i uruchom ten skrypt ponownie.\n' +
        'Jeśli używasz nvm (albo nvm-windows), wystarczy: nvm install 20 && nvm use 20',
      { krytyczny: true }
    );
  } else {
    zapisz('ok', 'Wersja Node.js', `Spełnia wymaganie z package.json (${wymagana}).`);
  }

  // Moduł `node:sqlite` jest potrzebny wyłącznie w ścieżce SQL (`npm run sql:setup`).
  // Reszta repozytorium działa bez niego, więc jego brak to informacja, nie błąd.
  //
  // Sprawdzamy przez listę modułów wbudowanych, a nie przez import - import
  // wypisałby ExperimentalWarning w środek diagnostyki.
  const maSqlite = builtinModules.includes('node:sqlite');

  if (maSqlite) {
    zapisz('ok', 'Moduł node:sqlite', 'Dostępny - ścieżka SQL zadziała.');
  } else {
    zapisz(
      'info',
      'Moduł node:sqlite',
      `Niedostępny w node ${aktualna}. Reszta repozytorium działa normalnie.\n` +
        'Potrzebny tylko wtedy, gdy będziesz robić ścieżkę SQL ("npm run sql:setup").\n' +
        'Co zrobić: zainstaluj node 24, np. nvm install 24 && nvm use 24'
    );
  }
}

// --- 2. Git ------------------------------------------------------------------

async function sprawdzGita() {
  naglowek('2. Git');
  try {
    const { stdout } = await execFileAsync('git', ['--version']);
    zapisz('ok', 'Git', stdout.trim());
  } catch {
    zapisz(
      'blad',
      'Git',
      'Nie znalazłem polecenia "git" w systemie.\n' +
        'Co zrobić: zainstaluj Git for Windows ze strony https://git-scm.com/download/win, ' +
        'a potem uruchamiaj polecenia z okna "Git Bash" (instalator dodaje je do menu Start).',
      { krytyczny: true }
    );
  }
}

// --- 3. node_modules (informacyjnie) -----------------------------------------

function sprawdzNodeModules() {
  naglowek('3. Zależności projektu (node_modules)');
  const sciezka = path.join(ROOT_DIR, 'node_modules');
  if (existsSync(sciezka)) {
    zapisz('ok', 'node_modules', 'Zależności są już zainstalowane.');
  } else {
    zapisz(
      'info',
      'node_modules',
      'Jeszcze nie zainstalowano zależności - to normalne przy pierwszym uruchomieniu.\n' +
        'Co zrobić: uruchom "npm ci" w tym katalogu (albo "npm.cmd ci" w PowerShellu).'
    );
  }
}

// --- 4. Sieć -------------------------------------------------------------------

/** Adres proxy z typowych zmiennych środowiskowych, jeśli jest ustawiony. */
function pobierzAdresProxy() {
  return (
    process.env.HTTPS_PROXY ||
    process.env.https_proxy ||
    process.env.HTTP_PROXY ||
    process.env.http_proxy ||
    null
  );
}

/** Bezpośrednie połączenie TLS do hosta na porcie 443. */
function polaczBezposrednio(host) {
  return new Promise((resolve) => {
    const socket = tls.connect({ host, port: 443, servername: host, timeout: TIMEOUT_SIECIOWY_MS });
    const zakoncz = (wynik) => {
      socket.removeAllListeners();
      socket.destroy();
      resolve(wynik);
    };
    socket.on('secureConnect', () => zakoncz({ ok: true }));
    socket.on('timeout', () => zakoncz({ ok: false, err: { code: 'TIMEOUT' } }));
    socket.on('error', (err) => zakoncz({ ok: false, err }));
  });
}

/**
 * Połączenie TLS do hosta przez firmowe proxy (metoda CONNECT), gdy w
 * zmiennych środowiskowych ustawiono HTTP_PROXY/HTTPS_PROXY. Używamy tylko
 * modułów "node:net" i "node:tls" - żadnych zależności zewnętrznych.
 */
function polaczPrzezProxy(host, adresProxy) {
  return new Promise((resolve) => {
    let proxy;
    try {
      proxy = new URL(adresProxy);
    } catch {
      resolve({ ok: false, err: { code: 'PROXY_NIEPOPRAWNY' } });
      return;
    }

    const port = Number(proxy.port) || 80;
    const socket = net.connect(port, proxy.hostname);
    let zakonczone = false;

    const zakoncz = (wynik) => {
      if (zakonczone) return;
      zakonczone = true;
      clearTimeout(zegar);
      socket.removeAllListeners();
      socket.destroy();
      resolve(wynik);
    };

    const zegar = setTimeout(() => zakoncz({ ok: false, err: { code: 'TIMEOUT' } }), TIMEOUT_SIECIOWY_MS);

    socket.on('error', (err) => zakoncz({ ok: false, err }));

    socket.on('connect', () => {
      let naglowkiPolaczenia = `CONNECT ${host}:443 HTTP/1.1\r\nHost: ${host}:443\r\n`;
      if (proxy.username) {
        const dane = `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password || '')}`;
        naglowkiPolaczenia += `Proxy-Authorization: Basic ${Buffer.from(dane).toString('base64')}\r\n`;
      }
      naglowkiPolaczenia += 'Connection: close\r\n\r\n';
      socket.write(naglowkiPolaczenia);
    });

    let odpowiedzProxy = '';
    socket.on('data', function naDaneProxy(fragment) {
      odpowiedzProxy += fragment.toString('utf8');
      if (!odpowiedzProxy.includes('\r\n\r\n')) return;
      socket.removeListener('data', naDaneProxy);

      if (!/^HTTP\/1\.[01] 200/.test(odpowiedzProxy)) {
        zakoncz({ ok: false, err: { code: 'PROXY_ODMOWA', message: odpowiedzProxy.split('\r\n')[0] } });
        return;
      }

      // Tunel gotowy - teraz właściwy uścisk dłoni TLS z docelowym hostem.
      const socketTls = tls.connect({ socket, servername: host, timeout: TIMEOUT_SIECIOWY_MS }, () => {
        zakoncz({ ok: true });
      });
      socketTls.on('error', (err) => zakoncz({ ok: false, err }));
      socketTls.on('timeout', () => zakoncz({ ok: false, err: { code: 'TIMEOUT' } }));
    });
  });
}

function polaczZHostem(host) {
  const adresProxy = pobierzAdresProxy();
  return adresProxy ? polaczPrzezProxy(host, adresProxy) : polaczBezposrednio(host);
}

async function sprawdzSiec() {
  naglowek('4. Połączenie sieciowe (HTTPS)');

  const adresProxy = pobierzAdresProxy();
  if (adresProxy) {
    console.log(`       Wykryto ustawione proxy w zmiennych środowiskowych: ${adresProxy}`);
    console.log('       Sprawdzam połączenia przez ten tunel (CONNECT).');
  }

  let wykrytoBladCertyfikatu = false;

  for (const { host, krytyczny, opis } of HOSTY_DO_SPRAWDZENIA) {
    const wynik = await polaczZHostem(host);
    const nazwaSprawdzenia = `Połączenie z ${host} (${opis})`;

    if (wynik.ok) {
      zapisz('ok', nazwaSprawdzenia, null);
      continue;
    }

    const kod = wynik.err?.code || '';

    if (KODY_BLEDOW_CERTYFIKATU.has(kod)) {
      wykrytoBladCertyfikatu = true;
      zapisz(
        'blad',
        nazwaSprawdzenia,
        `Błąd certyfikatu TLS (${kod}).\n` +
          'To najczęstsza awaria w salach szkoleniowych za firmowym proxy z inspekcją TLS ' +
          '(proxy podmienia certyfikat, a Node mu nie ufa).\n' +
          'Zobacz gotową do skopiowania instrukcję NODE_EXTRA_CA_CERTS na końcu tego raportu.',
        { krytyczny }
      );
    } else if (kod === 'TIMEOUT') {
      zapisz(
        'blad',
        nazwaSprawdzenia,
        `Brak odpowiedzi w ciągu ${TIMEOUT_SIECIOWY_MS / 1000} s.\n` +
          'Co zrobić: sprawdź połączenie z internetem albo VPN. Jeśli jesteś w sieci firmowej, ' +
          'zapytaj dział IT o adres serwera proxy i ustaw zmienną HTTPS_PROXY przed ponownym uruchomieniem.',
        { krytyczny }
      );
    } else if (kod === 'PROXY_ODMOWA' || kod === 'PROXY_NIEPOPRAWNY') {
      zapisz(
        'blad',
        nazwaSprawdzenia,
        'Firmowe proxy odrzuciło połączenie albo adres proxy jest niepoprawny ' +
          `(zmienna HTTPS_PROXY/HTTP_PROXY = "${adresProxy}").\n` +
          'Co zrobić: potwierdź z działem IT poprawny adres, port oraz login i hasło do proxy.',
        { krytyczny }
      );
    } else {
      zapisz(
        'blad',
        nazwaSprawdzenia,
        `Nie udało się połączyć (${kod || wynik.err?.message || 'nieznany błąd'}).\n` +
          'Co zrobić: sprawdź połączenie z internetem oraz ewentualne ustawienia proxy/VPN.',
        { krytyczny }
      );
    }
  }

  return wykrytoBladCertyfikatu;
}

function wypiszPomocCertyfikat() {
  console.log('');
  console.log(kolor.zolty('-------------------------------------------------------------'));
  console.log(kolor.zolty('Błąd certyfikatu TLS - najczęściej to firmowe proxy z inspekcją'));
  console.log(kolor.zolty('szyfrowanego ruchu (podmienia certyfikaty, a Node im nie ufa).'));
  console.log('');
  console.log('Co zrobić:');
  console.log('  1) Poproś dział IT o plik certyfikatu głównego firmy (root CA),');
  console.log('     zwykle z rozszerzeniem .pem albo .crt.');
  console.log('  2) Zapisz go w dowolnym miejscu, np. C:\\Certs\\firma-ca.pem');
  console.log('  3) Ustaw zmienną środowiskową NODE_EXTRA_CA_CERTS na ścieżkę do tego pliku');
  console.log('     - i zrób to w TYM SAMYM oknie terminala, w którym potem uruchomisz npm/node:');
  console.log('');
  console.log('     Git Bash (zalecane w tym warsztacie):');
  console.log(kolor.szary('       export NODE_EXTRA_CA_CERTS="C:/Certs/firma-ca.pem"'));
  console.log('');
  console.log('     PowerShell 7:');
  console.log(kolor.szary('       $env:NODE_EXTRA_CA_CERTS = "C:\\Certs\\firma-ca.pem"'));
  console.log('');
  console.log('  4) Uruchom ponownie: node scripts/doctor.mjs');
  console.log(kolor.zolty('-------------------------------------------------------------'));
}

// --- 5. System i powłoka -------------------------------------------------------

function sprawdzSystem() {
  naglowek('5. System operacyjny i powłoka');

  const platforma = os.platform(); // 'win32' | 'darwin' | 'linux'
  const jestWindows = platforma === 'win32';
  const opisPlatformy = { win32: 'Windows', darwin: 'macOS', linux: 'Linux' }[platforma] || platforma;

  zapisz('ok', 'System operacyjny', `${opisPlatformy} (${os.release()})`);

  let opisPowloki = 'nie udało się rozpoznać';
  if (jestWindows && process.env.PSModulePath) {
    opisPowloki = 'najpewniej PowerShell';
  } else if (process.env.SHELL && process.env.SHELL.toLowerCase().includes('bash')) {
    opisPowloki = 'bash (np. Git Bash)';
  } else if (jestWindows) {
    opisPowloki = 'najpewniej cmd.exe';
  } else if (process.env.SHELL) {
    opisPowloki = process.env.SHELL;
  }
  zapisz('info', 'Powłoka', `Wygląda na: ${opisPowloki}`);

  if (jestWindows) {
    console.log('');
    console.log(kolor.zolty('   Uwaga (Windows + PowerShell):'));
    console.log(
      '   Jeśli polecenie npm w PowerShellu kończy się błędem podobnym do:\n' +
        '     "...cannot be loaded because running scripts is disabled on this system"\n' +
        '   to PowerShell blokuje uruchamianie skryptów (ExecutionPolicy). Dwa wyjścia:\n' +
        '     1) Używaj Git Bash zamiast PowerShella (tak pracujemy na tym warsztacie), albo\n' +
        '     2) w PowerShellu wywołuj "npm.cmd" zamiast "npm", np.: npm.cmd ci'
    );
  }
}

// --- Podsumowanie ----------------------------------------------------------------

function wypiszPodsumowanie() {
  const liczbaOk = wyniki.filter((w) => w.status === 'ok').length;
  const liczbaBledow = wyniki.filter((w) => w.status === 'blad').length;
  const liczbaInfo = wyniki.filter((w) => w.status === 'info').length;

  console.log('');
  console.log(kolor.pogrubienie('==============================='));
  console.log(kolor.pogrubienie(' PODSUMOWANIE'));
  console.log(kolor.pogrubienie('==============================='));
  console.log(`  ${kolor.zielony('OK:')}    ${liczbaOk}`);
  console.log(`  ${kolor.czerwony('Błędy:')} ${liczbaBledow}`);
  console.log(`  Info:  ${liczbaInfo}`);
  console.log('');

  if (wystapilBladKrytyczny) {
    console.log(kolor.czerwony('Wynik: są problemy, które trzeba rozwiązać przed "npm ci". Zobacz [BŁĄD] powyżej.'));
  } else if (liczbaBledow > 0) {
    console.log(
      kolor.zolty(
        'Wynik: podstawy (Node.js, git, rejestr npm) są w porządku, ale są dodatkowe rzeczy do sprawdzenia (patrz [BŁĄD] powyżej) - dotyczą one dalszych dni szkolenia.'
      )
    );
  } else {
    console.log(kolor.zielony('Wynik: wszystko wygląda dobrze. Można uruchomić "npm ci".'));
  }

  process.exitCode = wystapilBladKrytyczny ? 1 : 0;
}

// --- main ------------------------------------------------------------------------

async function main() {
  console.log(kolor.pogrubienie('====================================================='));
  console.log(kolor.pogrubienie(' DOCTOR - diagnostyka środowiska (szkolenie-ai-rejestr-rozliczen)'));
  console.log(kolor.pogrubienie('====================================================='));
  console.log('Ten skrypt nie wymaga zainstalowanych zależności - można go');
  console.log('uruchomić od razu po sklonowaniu repozytorium, PRZED "npm ci".');

  sprawdzWersjeNode();
  await sprawdzGita();
  sprawdzNodeModules();
  const wykrytoBladCertyfikatu = await sprawdzSiec();
  sprawdzSystem();

  if (wykrytoBladCertyfikatu) {
    wypiszPomocCertyfikat();
  }

  wypiszPodsumowanie();
}

main().catch((err) => {
  console.error('');
  console.error(kolor.czerwony('Doctor napotkał nieoczekiwany błąd i nie mógł dokończyć diagnozy:'));
  console.error(err);
  process.exitCode = 1;
});
