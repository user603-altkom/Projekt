// Strefa czasowa pinowana na sztywno: bez tego testy dat przechodzą na sali
// (Europe/Warsaw), a padają na maszynie wirtualnej dla zdalnych (UTC).
// Musi być ustawiona PRZED importem `defineConfig`, żeby Node zdążył
// zainicjalizować strefę zanim vitest cokolwiek uruchomi.
process.env.TZ = 'Europe/Warsaw';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
  },
});
