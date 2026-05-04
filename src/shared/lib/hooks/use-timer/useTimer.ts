'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UseTimerOptions {
  durationMs: number;
  intervalMs?: number;
  autoStart?: boolean;
  onComplete?: () => void;
}

interface UseTimerReturn {
  remainingMs: number;
  elapsedMs: number;
  progress: number;
  isRunning: boolean;
  isFinished: boolean;
  start: () => void;
  pause: () => void;
  reset: (durationMs?: number) => void;
  restart: (durationMs?: number) => void;
}

const normalizeDuration = (durationMs: number) => Math.max(0, durationMs);

export function useTimer({
  durationMs,
  intervalMs = 1000,
  autoStart = true,
  onComplete,
}: UseTimerOptions): UseTimerReturn {
  const normalizedDurationMs = normalizeDuration(durationMs);
  const normalizedIntervalMs = Math.max(1, intervalMs);
  const onCompleteRef = useRef(onComplete);
  const endTimeRef = useRef<number | null>(null);

  const [remainingMs, setRemainingMs] = useState(normalizedDurationMs);
  const [activeDurationMs, setActiveDurationMs] = useState(normalizedDurationMs);
  const [isRunning, setIsRunning] = useState(autoStart && normalizedDurationMs > 0);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const completeTimer = useCallback(() => {
    endTimeRef.current = null;
    setRemainingMs(0);
    setIsRunning(false);
    onCompleteRef.current?.();
  }, []);

  const updateRemainingMs = useCallback(() => {
    if (!endTimeRef.current) {
      return;
    }

    const nextRemainingMs = Math.max(0, endTimeRef.current - Date.now());

    if (nextRemainingMs === 0) {
      completeTimer();
      return;
    }

    setRemainingMs(nextRemainingMs);
  }, [completeTimer]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    endTimeRef.current ??= Date.now() + remainingMs;
    const timeoutMs = Math.min(normalizedIntervalMs, remainingMs);
    const timeoutId = setTimeout(updateRemainingMs, timeoutMs);

    return () => clearTimeout(timeoutId);
  }, [isRunning, normalizedIntervalMs, remainingMs, updateRemainingMs]);

  const start = useCallback(() => {
    if (isRunning) {
      return;
    }

    setRemainingMs((currentRemainingMs) => {
      const nextRemainingMs = currentRemainingMs > 0 ? currentRemainingMs : activeDurationMs;

      if (nextRemainingMs > 0) {
        endTimeRef.current = Date.now() + nextRemainingMs;
        setIsRunning(true);
      }

      return nextRemainingMs;
    });
  }, [activeDurationMs, isRunning]);

  const pause = useCallback(() => {
    if (!isRunning) {
      return;
    }

    const nextRemainingMs = endTimeRef.current
      ? Math.max(0, endTimeRef.current - Date.now())
      : remainingMs;

    endTimeRef.current = null;
    setRemainingMs(nextRemainingMs);
    setIsRunning(false);
  }, [isRunning, remainingMs]);

  const reset = useCallback(
    (nextDurationMs = normalizedDurationMs) => {
      const nextRemainingMs = normalizeDuration(nextDurationMs);

      endTimeRef.current = null;
      setActiveDurationMs(nextRemainingMs);
      setRemainingMs(nextRemainingMs);
      setIsRunning(false);
    },
    [normalizedDurationMs]
  );

  const restart = useCallback(
    (nextDurationMs = normalizedDurationMs) => {
      const nextRemainingMs = normalizeDuration(nextDurationMs);

      endTimeRef.current = nextRemainingMs > 0 ? Date.now() + nextRemainingMs : null;
      setActiveDurationMs(nextRemainingMs);
      setRemainingMs(nextRemainingMs);
      setIsRunning(nextRemainingMs > 0);
    },
    [normalizedDurationMs]
  );

  const elapsedMs = Math.max(0, activeDurationMs - remainingMs);
  const progress = useMemo(() => {
    if (activeDurationMs === 0) {
      return 1;
    }

    return Math.min(1, elapsedMs / activeDurationMs);
  }, [activeDurationMs, elapsedMs]);

  return {
    remainingMs,
    elapsedMs,
    progress,
    isRunning,
    isFinished: remainingMs === 0,
    start,
    pause,
    reset,
    restart,
  };
}

export type { UseTimerOptions, UseTimerReturn };
