import { expect, test } from 'vitest';
import { getPluralForm, type PluralForms } from './pluralize';

const testForms: PluralForms = {
  one: 'яблоке',
  few: 'яблоках',
  two: 'яблоках',
  many: 'яблоках',
  zero: 'яблоках',
  other: 'яблоках',
};

test('getPluralForm selects correct russian form', () => {
  expect(getPluralForm(1, testForms)).toBe('яблоке');
  expect(getPluralForm(2, testForms)).toBe('яблоках');
  expect(getPluralForm(5, testForms)).toBe('яблоках');
  expect(getPluralForm(11, testForms)).toBe('яблоках');
  expect(getPluralForm(21, testForms)).toBe('яблоке');
  expect(getPluralForm(22, testForms)).toBe('яблоках');
});
