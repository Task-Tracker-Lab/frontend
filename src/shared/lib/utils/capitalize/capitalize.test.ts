import { expect, test } from 'vitest';
import { capitalize } from './capitalize';

test('capitalize "word"', () => {
  expect(capitalize('word')).toBe('Word');
});

test('capitalize "two words"', () => {
  expect(capitalize('two words')).toBe('Two words');
});
