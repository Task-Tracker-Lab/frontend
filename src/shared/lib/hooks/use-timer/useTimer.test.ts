import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useTimer } from './useTimer';

afterEach(() => {
  vi.useRealTimers();
});

describe('useTimer', () => {
  test('starts automatically and completes the timer', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
    const onComplete = vi.fn();

    const { result } = renderHook(() => useTimer({ durationMs: 3000, onComplete }));

    expect(result.current.remainingMs).toBe(3000);
    expect(result.current.isRunning).toBe(true);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(result.current.remainingMs).toBe(2000);
    expect(result.current.elapsedMs).toBe(1000);
    expect(result.current.progress).toBe(1 / 3);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(result.current.remainingMs).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isFinished).toBe(true);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  test('pauses and resumes the timer', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));

    const { result } = renderHook(() => useTimer({ durationMs: 5000 }));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    act(() => {
      result.current.pause();
    });

    expect(result.current.remainingMs).toBe(3000);
    expect(result.current.isRunning).toBe(false);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(result.current.remainingMs).toBe(3000);

    act(() => {
      result.current.start();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(result.current.remainingMs).toBe(2000);
    expect(result.current.isRunning).toBe(true);
  });

  test('resets and restarts the timer', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));

    const { result } = renderHook(() => useTimer({ durationMs: 4000, autoStart: false }));

    expect(result.current.remainingMs).toBe(4000);
    expect(result.current.isRunning).toBe(false);

    act(() => {
      result.current.start();
      vi.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.remainingMs).toBe(4000);
    expect(result.current.isRunning).toBe(false);

    act(() => {
      result.current.restart(2000);
    });

    expect(result.current.remainingMs).toBe(2000);
    expect(result.current.isRunning).toBe(true);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(result.current.remainingMs).toBe(0);
    expect(result.current.isFinished).toBe(true);
  });
});
