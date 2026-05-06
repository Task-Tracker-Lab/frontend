'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { debounce } from '../utils';

interface UseQueuedDebouncedMutationOptions<TValue> {
  delayMs: number;
  initialPersistedValue: TValue | null;
  isEqual: (left: TValue, right: TValue) => boolean;
  mutationFn: (value: TValue) => Promise<unknown>;
  onSuccess?: (value: TValue) => void | Promise<void>;
  onError?: (error: unknown, persistedValue: TValue | null) => void | Promise<void>;
}

interface UseQueuedDebouncedMutationReturn<TValue> {
  enqueueMutation: (value: TValue) => void;
  syncPersistedValue: (value: TValue | null) => void;
}

export function useQueuedDebouncedMutation<TValue>({
  delayMs,
  initialPersistedValue,
  isEqual,
  mutationFn,
  onSuccess,
  onError,
}: UseQueuedDebouncedMutationOptions<TValue>): UseQueuedDebouncedMutationReturn<TValue> {
  const queuedValueRef = useRef<TValue | null>(null);
  const persistedValueRef = useRef<TValue | null>(initialPersistedValue);
  const isRequestInFlightRef = useRef(false);

  const flushQueue = useCallback(async () => {
    if (isRequestInFlightRef.current) {
      return;
    }

    const nextValue = queuedValueRef.current;
    if (!nextValue) {
      return;
    }

    queuedValueRef.current = null;

    const persistedValue = persistedValueRef.current;

    if (persistedValue && isEqual(persistedValue, nextValue)) {
      return;
    }

    isRequestInFlightRef.current = true;
    try {
      await mutationFn(nextValue);
      persistedValueRef.current = nextValue;
      await onSuccess?.(nextValue);
    } catch (error) {
      await onError?.(error, persistedValueRef.current);
    } finally {
      isRequestInFlightRef.current = false;
      if (queuedValueRef.current) {
        void flushQueue();
      }
    }
  }, [isEqual, mutationFn, onError, onSuccess]);

  const flushQueueRef = useRef(flushQueue);
  useEffect(() => {
    flushQueueRef.current = flushQueue;
  }, [flushQueue]);

  const { debouncedCallback: debouncedFlush, cancelDebouncedCallback } = useMemo(
    () => debounce(() => void flushQueueRef.current(), delayMs),
    [delayMs]
  );

  useEffect(() => cancelDebouncedCallback, [cancelDebouncedCallback]);

  const enqueueMutation = useCallback(
    (value: TValue) => {
      queuedValueRef.current = value;
      debouncedFlush();
    },
    [debouncedFlush]
  );

  const syncPersistedValue = useCallback((value: TValue | null) => {
    persistedValueRef.current = value;
  }, []);

  return { enqueueMutation, syncPersistedValue };
}
