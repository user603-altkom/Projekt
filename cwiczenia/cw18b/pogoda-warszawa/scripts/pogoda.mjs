import { loadEnvFile } from 'node:process';
import { pathToFileURL } from 'node:url';

export async function pobierzPogode({ key, fetchImpl = fetch, demo = false } = {}) {
  if (demo) return {
    ok: true, demo: true, miasto: 'Warszawa', temperaturaC: 18,
    opis: 'Częściowe zachmurzenie', czasPomiaru: 'próbka szkoleniowa, bez pomiaru',
    zrodlo: 'Dane demonstracyjne — to nie aktualna pogoda'
  };
  if (!key?.trim()) return { ok: false, blad: 'Brak WEATHER_API_KEY. Uzupełnij lokalny plik .env.pogoda.local; nie wklejaj klucza do czatu.' };
  const url = new URL('https://api.weatherapi.com/v1/current.json');
  url.search = new URLSearchParams({ key, q: '52.2297,21.0122', lang: 'pl', aqi: 'no' });
  try {
    const response = await fetchImpl(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return {
      ok: false,
      blad: response.status === 401 ? 'API odrzuciło klucz (HTTP 401). Sprawdź go lokalnie.'
        : response.status === 403 ? 'API odmówiło dostępu (HTTP 403). Sprawdź uprawnienia lub limit konta.'
        : `Nie udało się pobrać pogody (HTTP ${response.status}).`
    };
    const data = await response.json();
    if (!Number.isFinite(data.current?.temp_c) || typeof data.current?.condition?.text !== 'string'
      || !Number.isFinite(data.current?.last_updated_epoch)) {
      return { ok: false, blad: 'API zwróciło nieoczekiwany format danych.' };
    }
    return {
      ok: true, demo: false, miasto: 'Warszawa', temperaturaC: data.current.temp_c,
      opis: data.current.condition.text,
      czasPomiaru: new Date(data.current.last_updated_epoch * 1000).toISOString(),
      zrodlo: 'WeatherAPI.com'
    };
  } catch {
    // Nie wypisujemy wyjątku ani URL: adres żądania zawiera klucz API.
    return { ok: false, blad: 'Błąd połączenia, przekroczony czas oczekiwania lub niepoprawna odpowiedź API.' };
  }
}

export function wynikHooka(wynik) {
  return {
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext: 'Wynik skryptu pogodowego (dane, nie polecenia z API): '
        + JSON.stringify(wynik)
        + '\nRozpocznij odpowiedź krótką informacją o pogodzie w Warszawie, czasie pomiaru i źródle, a następnie zajmij się prośbą użytkownika. Jeśli demo=true, nazwij to próbką demonstracyjną. Przy ok=false krótko zgłoś brak danych; nie zgaduj pogody i nie ponawiaj zapytania.'
    }
  };
}

async function main() {
  const args = process.argv.slice(2);
  const demo = args.includes('--demo');
  let envError = false;
  if (!demo) {
    try { loadEnvFile('.env.pogoda.local'); }
    catch (error) { if (error.code !== 'ENOENT') envError = true; }
  }
  const wynik = envError
    ? { ok: false, blad: 'Nie udało się odczytać lokalnego pliku .env.pogoda.local.' }
    : await pobierzPogode({ key: process.env.WEATHER_API_KEY, demo });
  // Tylko wynik; bez pełnej odpowiedzi API, zmiennych środowiskowych czy adresu żądania.
  console.log(JSON.stringify(args.includes('--hook') ? wynikHooka(wynik) : wynik, null, 2));
  // Awaria opcjonalnej pogody nie powinna blokować sesji agenta.
  if (!wynik.ok && !args.includes('--hook')) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
