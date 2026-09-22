export function przekroczenie(wykorzystanie, limit) {
  const efektywny = limit || Number.POSITIVE_INFINITY;
  return Math.max(0, wykorzystanie - efektywny);
}
