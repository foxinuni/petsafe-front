export function dateToString(date) {
  const dateType = new Date(date);
  return `${String(dateType.getDay()).padStart(2, '0')}/${String(
    dateType.getMonth(),
  ).padStart(2, '0')}/${String(dateType.getFullYear()).padStart(4, '0')}`;
}
