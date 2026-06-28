import { expect, test } from 'vitest';
import { isHexColor } from './is-hex-color';

test('isHexColor accepts #RGB and #RRGGBB', () => {
  expect(isHexColor('#fff')).toBe(true);
  expect(isHexColor('#FFFFFF')).toBe(true);
  expect(isHexColor('#9FA8DA')).toBe(true);
});

test('isHexColor rejects invalid values', () => {
  expect(isHexColor('FFFFFF')).toBe(false);
  expect(isHexColor('#ffff')).toBe(false);
  expect(isHexColor('#RRGGBB')).toBe(false);
  expect(isHexColor('')).toBe(false);
});
