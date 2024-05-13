export function dateToString(date) {
  const dateType = new Date(date);
  console.log(date);
  return `${String(dateType.getDay()).padStart(2, '0')}/${String(
    dateType.getMonth(),
  ).padStart(2, '0')}/${String(dateType.getFullYear()).padStart(4, '0')}`;
}

export function momentToUnix(moment) {
  return moment.format('YYYY-MM-DD HH:mm:ss');
}

export function momentUnix(moment) {
  return moment.unix();
}
