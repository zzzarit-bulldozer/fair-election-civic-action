export function toIsoDate(displayDate) {
  return displayDate.replaceAll('. ', '-').replace('.', '');
}
