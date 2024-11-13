export const toSingularCapitalised = (a: string) => {
  const singular = a.slice(0, a.length - 1);
  const firstUpper = singular.substring(0, 1).toUpperCase();
  return `${firstUpper}${singular.substring(1)}`;
};
