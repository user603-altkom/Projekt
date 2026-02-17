import type { NrRachunku, Transaction } from '../model.js';

/**
 * Rejestr transakcji jednego okresu rozliczeniowego.
 *
 * Trzymamy wszystko w pamięci — raport dzienny wczytuje wyciąg, wrzuca go do
 * rejestru i odpytuje. Bazy danych nie ma, bo rejestr żyje tyle, co jeden
 * przebieg raportu.
 */
export class TransactionRegister {
  private readonly transakcje: Transaction[] = [];

  add(transakcja: Transaction): void {
    this.transakcje.push(transakcja);
  }

  addAll(transakcje: readonly Transaction[]): void {
    for (const transakcja of transakcje) {
      this.add(transakcja);
    }
  }

  get size(): number {
    return this.transakcje.length;
  }

  all(): readonly Transaction[] {
    return this.transakcje;
  }

  forAccount(nrRachunku: NrRachunku): Transaction[] {
    return this.transakcje.filter((transakcja) => transakcja.nrRachunku === nrRachunku);
  }

  /** Numery rachunków występujące w rejestrze, w kolejności pierwszego wystąpienia. */
  accounts(): NrRachunku[] {
    return [...new Set(this.transakcje.map((transakcja) => transakcja.nrRachunku))];
  }
}

/**
 * Suma obrotów w groszach — bez rozróżnienia na uznania i obciążenia.
 *
 * `kwotaGrosze` jest liczbą całkowitą, więc sumowanie jest dokładne; nie ma tu
 * potrzeby zaokrąglania ani porównywania z tolerancją.
 */
export function sumTransactions(transakcje: readonly Transaction[]): number {
  let suma = 0;
  for (const transakcja of transakcje) {
    suma += transakcja.kwotaGrosze;
  }
  return suma;
}

/** Saldo netto w groszach: uznania na plus, obciążenia na minus. */
export function netBalance(transakcje: readonly Transaction[]): number {
  let saldo = 0;
  for (const transakcja of transakcje) {
    saldo += transakcja.typ === 'UZNANIE' ? transakcja.kwotaGrosze : -transakcja.kwotaGrosze;
  }
  return saldo;
}
