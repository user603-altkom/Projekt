const STATUSY = new Set(['oczekuje', 'zatwierdzony', 'odrzucony', 'cofniety']);

function asUtcMs(value, nazwa) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)) {
    throw new Error(`Nieprawidlowy format ${nazwa}`);
  }
  const ms = Date.parse(value);
  if (Number.isNaN(ms)) {
    throw new Error(`Nieprawidlowy format ${nazwa}`);
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
    throw new Error('Nieprawidlowy limit bazowy');
  }
  if (!Number.isInteger(wykorzystanieGrosze) || wykorzystanieGrosze < 0) {
    throw new Error('Nieprawidlowe wykorzystanie');
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
    throw new Error('Autor i zatwierdzajacy musza byc rozni');
  }
  if (!Number.isInteger(wniosek.limitGrosze) || wniosek.limitGrosze < 0) {
    throw new Error('Nieprawidlowy limit wniosku');
  }
  if (wniosek.limitGrosze <= limitBazowyGrosze) {
    return bazowy;
  }

  const terazMs = asUtcMs(wejscie.teraz, 'teraz');
  const odMs = asUtcMs(wniosek.od, 'od');
  const doMs = asUtcMs(wniosek.do, 'do');
  if (odMs >= doMs) {
    throw new Error('Okres wniosku musi miec od < do');
  }
  if (!(odMs <= terazMs && terazMs < doMs)) {
    return bazowy;
  }

  return {
    limitEfektywnyGrosze: wniosek.limitGrosze,
    przekroczenieGrosze: Math.max(0, wykorzystanieGrosze - wniosek.limitGrosze),
    zrodlo: 'czasowy',
    wniosekId: wniosek.id ?? null,
  };
}
