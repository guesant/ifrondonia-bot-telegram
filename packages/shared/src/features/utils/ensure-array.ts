export const ensureArray = <T>(arr: T | T[]) =>
  Array.isArray(arr) ? arr : [arr];
