/**
 * Kontrakt danych systemu rozliczeniowego.
 *
 * To jedyny moduł, który importują wszystkie pozostałe. Reszta komunikuje się
 * przez publiczne sygnatury funkcji — dzięki temu zmiana wewnątrz importu,
 * rejestru czy raportów nie rozlewa się po całym repozytorium.
 */

/**
 * Numer rachunku w formacie NRB (26 cyfr, zapisywany bez spacji).
 *
 * Uwaga: numery w katalogu `dane/` są fikcyjne — mają zmyślony kod banku
 * i niepoprawne cyfry kontrolne, żeby żaden z nich nie mógł trafić
 * w istniejący rachunek.
 */
export type NrRachunku = string;

/** Waluty obsługiwane przez rejestr. */
export type Waluta = 'PLN' | 'EUR' | 'USD';

/** Kierunek operacji: UZNANIE zwiększa saldo rachunku, OBCIAZENIE je zmniejsza. */
export type TypOperacji = 'UZNANIE' | 'OBCIAZENIE';

/** Pojedyncza operacja w rejestrze transakcji. */
export interface Transaction {
  /** Identyfikator operacji nadany przez system źródłowy. */
  id: string;

  nrRachunku: NrRachunku;

  /**
   * Kwota operacji w groszach — ZAWSZE DODATNIA.
   *
   * Kierunek operacji niesie pole `typ`, nigdy znak kwoty. Kwota ujemna
   * w rejestrze jest błędem danych, a nie sposobem zapisu obciążenia —
   * wiersz wejściowy z kwotą ujemną import mapuje na `typ: 'OBCIAZENIE'`
   * z wartością bezwzględną.
   *
   * Grosze trzymamy jako liczbę całkowitą, żeby sumowanie było dokładne.
   */
  kwotaGrosze: number;

  waluta: Waluta;

  typ: TypOperacji;

  /** Moment zaksięgowania, ISO 8601 (np. `2026-08-03T09:12:41`). */
  bookedAt: string;

  /** Data waluty w formacie `YYYY-MM-DD` — od niej naliczane są odsetki. */
  dataWaluty: string;

  /** Tytuł operacji, tak jak podał go zleceniodawca. */
  tytul: string;
}

/**
 * Wynik walidacji.
 *
 * `bledy` jest pusta dokładnie wtedy, gdy `ok` jest `true`. Komunikaty są
 * po polsku, bo trafiają wprost do raportu dla operatora.
 */
export interface ValidationResult {
  ok: boolean;
  bledy: string[];
}
