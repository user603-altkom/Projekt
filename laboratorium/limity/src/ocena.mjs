const STATUSY = new Set(['oczekuje', 'zatwierdzony', 'odrzucony', 'cofniety']);

function asUtcMs(value, nazwa) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)) {
    throw new Error(`Nieprawidłowy format ${nazwa}`);
  }
  const ms = Date.parse(value);
  if (Number.isNaN(ms)) {
    throw new Error(`Nieprawidłowy format ${nazwa}`);
  }
  return ms;
}

function wymagaTekst(value, nazwa) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Brak pola ${nazwa}`);
  }
  return value.trim();
}

export function ocenLimit(wejscie) {
  const limitBazowyGrosze = wejscie.limitBazowyGrosze;
  const wykorzystanieGrosze = wejscie.wykorzystanieGrosze;

  if (!Number.isInteger(limitBazowyGrosze) || limitBazowyGrosze < 0) {
    throw new Error('Nieprawidłowy limit bazowy');
  }
  if (!Number.isInteger(wykorzystanieGrosze) || wykorzystanieGrosze < 0) {
    throw new Error('Nieprawidłowe wykorzystanie');
  }

  const bazowy = {
    limitEfektywnyGrosze: limitBazowyGrosze,
    przekroczenieGrosze: Math.max(0, wykorzystanieGrosze - limitBazowyGrosze),
    zrodlo: 'bazowy',
    wniosekId: null,
  };

  const wniosek = wejscie.wniosek;
  if (!wniosek) {
    return bazowy;
  }

  if (!STATUSY.has(wniosek.status)) {
    throw new Error(`Nieznany status wniosku: ${wniosek.status}`);
  }

  if (wniosek.status !== 'zatwierdzony') {
    return bazowy;
  }

  const autor = wymagaTekst(wniosek.autor, 'autor');
  const zatwierdzil = wymagaTekst(wniosek.zatwierdzil, 'zatwierdzil');
  if (autor === zatwierdzil) {
    throw new Error('Autor i zatwierdzający muszą być różni');
  }

  if (!Number.isInteger(wniosek.limitGrosze) || wniosek.limitGrosze < 0) {
    throw new Error('Nieprawidłowy limit wniosku');
  }
  if (wniosek.limitGrosze <= limitBazowyGrosze) {
    return bazowy;
  }

  const terazMs = asUtcMs(wejscie.teraz, 'teraz');
  const odMs = asUtcMs(wniosek.od, 'od');
  const doMs = asUtcMs(wniosek.do, 'do');

  if (!(odMs <= terazMs && terazMs < doMs)) {
    return bazowy;
  }

  const limitEfektywnyGrosze = wniosek.limitGrosze;
  return {
    limitEfektywnyGrosze,
    przekroczenieGrosze: Math.max(0, wykorzystanieGrosze - limitEfektywnyGrosze),
    zrodlo: 'czasowy',
    wniosekId: wniosek.id ?? null,
  };
}
