import { expect, test } from 'vitest';
import { classNames } from './class-names';

test('classNames returns base class only', () => {
  expect(classNames('someClass')).toBe('someClass');
});

test('classNames appends additional classes', () => {
  expect(classNames('someClass', {}, ['class1', 'class2'])).toBe('someClass class1 class2');
});

test('classNames appends truthy modifiers', () => {
  expect(classNames('someClass', { hovered: true, scrollable: true }, ['class1', 'class2'])).toBe(
    'someClass class1 class2 hovered scrollable'
  );
});

test('classNames skips falsy modifiers', () => {
  expect(classNames('someClass', { hovered: true, scrollable: false }, ['class1', 'class2'])).toBe(
    'someClass class1 class2 hovered'
  );
});

test('classNames skips empty string modifiers', () => {
  expect(classNames('someClass', { hovered: true, scrollable: '' }, ['class1', 'class2'])).toBe(
    'someClass class1 class2 hovered'
  );
});
