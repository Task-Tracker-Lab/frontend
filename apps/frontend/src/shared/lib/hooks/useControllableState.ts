'use client';

import { useState, useCallback, useMemo, Dispatch, SetStateAction } from 'react';

export interface UseControllableStateProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (val: T) => void;
}

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateProps<T>) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const setValue = useCallback<Dispatch<SetStateAction<T>>>(
    (next) => {
      const resolved: T =
        typeof next === 'function' ? (next as (prevState: T | undefined) => T)(current) : next;

      if (!isControlled) {
        setInternal(resolved);
      }
      onChange?.(resolved);
    },
    [current, isControlled, onChange]
  );

  return useMemo(() => [current, setValue] as const, [current, setValue]);
}
