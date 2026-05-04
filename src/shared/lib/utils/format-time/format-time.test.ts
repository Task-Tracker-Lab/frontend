import { expect, test } from 'vitest';
import { formatTime } from './format-time';

test('formatTime formats milliseconds as mm:ss', () => {
  expect(formatTime(65_000)).toBe('01:05');
});

test('formatTime rounds up incomplete seconds', () => {
  expect(formatTime(1_001)).toBe('00:02');
});

test('formatTime returns zero time for invalid values', () => {
  expect(formatTime(-1)).toBe('00:00');
  expect(formatTime(Number.NaN)).toBe('00:00');
  expect(formatTime(Number.POSITIVE_INFINITY)).toBe('00:00');
});
