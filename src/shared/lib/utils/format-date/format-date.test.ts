import { afterEach, expect, test, vi } from 'vitest';
import { formatDate } from './format-date';

afterEach(() => {
  vi.restoreAllMocks();
});

test('formatDate returns fallback for invalid value', () => {
  expect(formatDate('')).toBe('Нет данных');
});

test('formatDate formats date using ru-RU locale', () => {
  const toLocaleStringSpy = vi.spyOn(Date.prototype, 'toLocaleString').mockReturnValue('formatted');

  expect(formatDate('2026-01-10T15:30:00.000Z')).toBe('formatted');
  expect(toLocaleStringSpy).toHaveBeenCalledWith('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
});
