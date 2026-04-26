'use client';

import { useCallback, useEffect, useRef } from 'react';

interface UseDebouncedCallbackReturn<TArgs extends unknown[]> {
  debouncedCallback: (...args: TArgs) => void;
  cancelDebouncedCallback: () => void;
}

export function useDebouncedCallback<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delayMs: number
): UseDebouncedCallbackReturn<TArgs> {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancelDebouncedCallback = useCallback(() => {
    if (!timeoutRef.current) {
      return;
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  const debouncedCallback = useCallback(
    (...args: TArgs) => {
      cancelDebouncedCallback();
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delayMs);
    },
    [cancelDebouncedCallback, delayMs]
  );

  useEffect(() => cancelDebouncedCallback, [cancelDebouncedCallback]);

  return {
    debouncedCallback,
    cancelDebouncedCallback,
  };
}
