// Starter: działa tylko limit bazowy. W cw08b dodajesz ocenę wniosku.
export function ocenLimit(wejscie) {
  const limit = wejscie.limitBazowyGrosze;
  return {
    limitEfektywnyGrosze: limit,
    przekroczenieGrosze: Math.max(0, wejscie.wykorzystanieGrosze - limit),
    zrodlo: 'bazowy',
    wniosekId: null,
  };
}
