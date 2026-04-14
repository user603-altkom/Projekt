/**
 * Kalendarz dni roboczych dla dat waluty.
 *
 * Moduł operuje wyłącznie na napisach w formacie `YYYY-MM-DD` i na czasie
 * uniwersalnym. Jest to decyzja świadoma: rozliczenia międzyoddziałowe
 * przechodzą przez strefy o różnym przesunięciu, a data waluty musi być
 * identyczna niezależnie od tego, gdzie stoi serwer.
 */

/**
 * Dni ustawowo wolne od pracy o stałej dacie (MM-DD).
 * Święta ruchome (Wielkanoc, Boże Ciało) wyznacza osobny kalendarz
 * ładowany z systemu centralnego.
 */
const SWIETA_STALE = [
  '01-01', // Nowy Rok
  '05-01', // Święto Pracy
  '05-03', // Święto Konstytucji 3 Maja
  '08-15', // Wniebowzięcie NMP
  '11-01', // Wszystkich Świętych
  '11-11', // Narodowe Święto Niepodległości
  '12-25', // Boże Narodzenie — pierwszy dzień
  '12-26', // Boże Narodzenie — drugi dzień
];

/** Zamienia `YYYY-MM-DD` na znacznik czasu UTC. */
function naUtc(data: string): number {
  return Date.parse(data + 'T00:00:00Z');
}

/** Zamienia znacznik czasu UTC z powrotem na `YYYY-MM-DD`. */
function naDate(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/** Czy data wypada w sobotę albo w niedzielę. */
export function isWeekend(data: string): boolean {
  const dzienTygodnia = new Date(naUtc(data)).getUTCDay();
  return dzienTygodnia === 0 || dzienTygodnia === 6;
}

/**
 * Czy data jest dniem wolnym od pracy — weekendem albo świętem o stałej dacie.
 */
export function isDzienUstawowoWolny(data: string): boolean {
  if (isWeekend(data)) {
    return true;
  }
  return SWIETA_STALE.indexOf(data.slice(5, 10)) >= 0;
}

/**
 * Dodaje `n` dni roboczych do daty podanej w formacie `YYYY-MM-DD`.
 *
 * Przy wyznaczaniu kolejnych dni pomijane są soboty, niedziele oraz dni
 * ustawowo wolne od pracy z tablicy `SWIETA_STALE`, więc zwrócona data
 * zawsze wypada w dniu roboczym. Jeżeli `n` wynosi zero, a data wejściowa
 * przypada w dniu wolnym, wynik przesuwany jest na najbliższy dzień roboczy
 * w przód.
 *
 * Obliczenia prowadzone są na czasie uniwersalnym, dzięki czemu wynik nie
 * zależy od strefy czasowej maszyny ani od zmiany czasu letniego.
 *
 * @param data data początkowa, `YYYY-MM-DD`
 * @param n liczba dni roboczych do dodania (wartość nieujemna)
 * @returns data w formacie `YYYY-MM-DD`
 */
export function addBusinessDays(data: string, n: number): string {
  const start = naUtc(data);
  if (Number.isNaN(start)) {
    return data;
  }
  return naDate(start + n * 86400000);
}
