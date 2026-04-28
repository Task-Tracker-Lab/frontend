export function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Нет данных';
  }

  return date.toLocaleString('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}
