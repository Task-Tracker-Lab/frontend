import { afterEach, expect, test, vi } from 'vitest';
import { throttle } from './throttle';

afterEach(() => {
  vi.useRealTimers();
});

test('throttle calls function immediately', () => {
  vi.useFakeTimers();
  const callback = vi.fn();
  const throttled = throttle(callback, 1_000);

  throttled('first');

  expect(callback).toHaveBeenCalledOnce();
  expect(callback).toHaveBeenCalledWith('first');
});

test('throttle calls function with latest arguments after delay', () => {
  vi.useFakeTimers();
  const callback = vi.fn();
  const throttled = throttle(callback, 1_000);

  throttled('first');
  throttled('second');
  throttled('third');

  expect(callback).toHaveBeenCalledOnce();

  vi.advanceTimersByTime(1_000);

  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenLastCalledWith('third');
});

test('throttle allows immediate call after delay', () => {
  vi.useFakeTimers();
  const callback = vi.fn();
  const throttled = throttle(callback, 1_000);

  throttled('first');
  vi.advanceTimersByTime(1_000);
  throttled('second');

  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenLastCalledWith('second');
});

test('throttle preserves this context for delayed call', () => {
  vi.useFakeTimers();
  const calls: string[] = [];
  const firstContext = { prefix: 'first' };
  const secondContext = { prefix: 'second' };
  const throttled = throttle(function (this: typeof firstContext, value: string) {
    calls.push(`${this.prefix}:${value}`);
  }, 1_000);

  throttled.call(firstContext, 'value');
  throttled.call(secondContext, 'next-value');
  vi.advanceTimersByTime(1_000);

  expect(calls).toEqual(['first:value', 'second:next-value']);
});
