export function formatINR(value) {
  return new Intl.NumberFormat('en-IN').format(value);
}
