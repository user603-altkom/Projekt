import { pathToFileURL } from 'node:url';

import { readBankFile } from '../import/parseBankFile.js';
import { sumTransactions, TransactionRegister } from '../transactions/register.js';

/**
 * Raport dzienny z wyciągu bankowego.
 *
 * Wczytuje plik wyciągu, ładuje operacje do rejestru, sumuje obroty
 * i zestawia wynik z sumą kontrolną zadeklarowaną w nagłówku pliku.
 * Jeżeli obie liczby się różnią, wyciąg nie został zaimportowany w całości
 * albo po drodze zgubiliśmy część kwoty — raport musi to pokazać wprost,
 * bo księgowość rozlicza się z tej różnicy.
 *
 * Uruchomienie:
 *
 * ```
 * npm run raport
 * tsx src/reports/dailyReport.ts dane/wyciag_2026_08.csv
 * ```
 */

export interface DailyReport {
  sciezka: string;
  liczbaOperacji: number;
  /** Numery wierszy pliku, których import nie odczytał. */
  pominieteWiersze: number[];
  liczbaRachunkow: number;
  sumaObrotowGrosze: number;
  /** `null`, jeśli nagłówek pliku nie zawierał sumy kontrolnej. */
  sumaKontrolnaGrosze: number | null;
  /** Policzona suma minus suma kontrolna. `null`, gdy nie ma z czym porównać. */
  roznicaGrosze: number | null;
}

export function buildDailyReport(sciezka: string): DailyReport {
  const wyciag = readBankFile(sciezka);

  const rejestr = new TransactionRegister();
  rejestr.addAll(wyciag.transactions);

  const sumaObrotowGrosze = sumTransactions(rejestr.all());
  const sumaKontrolnaGrosze = wyciag.sumaKontrolnaGrosze;

  return {
    sciezka,
    liczbaOperacji: rejestr.size,
    pominieteWiersze: wyciag.pominieteWiersze,
    liczbaRachunkow: rejestr.accounts().length,
    sumaObrotowGrosze,
    sumaKontrolnaGrosze,
    roznicaGrosze:
      sumaKontrolnaGrosze === null ? null : sumaObrotowGrosze - sumaKontrolnaGrosze,
  };
}

const SZEROKOSC_ETYKIETY = 26;

export function formatDailyReport(raport: DailyReport): string {
  const linie: string[] = [`Raport dzienny — ${raport.sciezka}`, ''];

  linie.push(`${etykieta('Operacji zaimportowanych:')}${raport.liczbaOperacji}`);
  linie.push(`${etykieta('Wierszy pominiętych:')}${raport.pominieteWiersze.length}`);
  if (raport.pominieteWiersze.length > 0) {
    linie.push(`${etykieta('Numery pominiętych:')}${raport.pominieteWiersze.join(', ')}`);
  }
  linie.push(`${etykieta('Rachunków:')}${raport.liczbaRachunkow}`);
  linie.push('');
  linie.push(`${etykieta('Suma obrotów (policzona):')}${formatujZlote(raport.sumaObrotowGrosze)}`);

  if (raport.sumaKontrolnaGrosze === null || raport.roznicaGrosze === null) {
    linie.push('', 'UWAGA: nagłówek wyciągu nie zawiera sumy kontrolnej — nie ma z czym porównać.');
    return linie.join('\n');
  }

  linie.push(
    `${etykieta('Suma kontrolna (z pliku):')}${formatujZlote(raport.sumaKontrolnaGrosze)}`,
    `${etykieta('RÓŻNICA:')}${formatujZlote(raport.roznicaGrosze)}`,
  );

  if (raport.roznicaGrosze === 0) {
    linie.push('', 'Suma obrotów zgadza się z sumą kontrolną wyciągu.');
  } else {
    linie.push(
      '',
      `NIEZGODNOŚĆ SUMY KONTROLNEJ: policzone obroty różnią się od wyciągu o ${formatujZlote(raport.roznicaGrosze)}.`,
    );
  }

  return linie.join('\n');
}

function etykieta(tekst: string): string {
  return tekst.padEnd(SZEROKOSC_ETYKIETY, ' ');
}

/** Formatuje grosze po polsku, np. `1 234,56 zł`. */
export function formatujZlote(grosze: number): string {
  const znak = grosze < 0 ? '-' : '';
  const wartoscBezwzgledna = Math.abs(grosze);
  const zlote = Math.floor(wartoscBezwzgledna / 100);
  const reszta = wartoscBezwzgledna % 100;

  return `${znak}${grupujTysiace(zlote)},${String(reszta).padStart(2, '0')} zł`;
}

function grupujTysiace(liczba: number): string {
  return String(liczba).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function main(): void {
  const sciezka = process.argv[2];

  if (sciezka === undefined) {
    console.error('Użycie: tsx src/reports/dailyReport.ts <plik-wyciagu.csv>');
    process.exitCode = 1;
    return;
  }

  console.log(formatDailyReport(buildDailyReport(sciezka)));
}

const argument = process.argv[1];
if (argument !== undefined && import.meta.url === pathToFileURL(argument).href) {
  main();
}
