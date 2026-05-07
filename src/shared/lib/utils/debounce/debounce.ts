interface DebouncedCallbackReturn<TArgs extends unknown[]> {
  debouncedCallback: (...args: TArgs) => void;
  cancelDebouncedCallback: () => void;
}

export function debounce<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delayMs: number
): DebouncedCallbackReturn<TArgs> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const cancelDebouncedCallback = () => {
    if (timeoutId === null) return;
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  return {
    cancelDebouncedCallback,
    debouncedCallback: (...args: TArgs) => {
      cancelDebouncedCallback();
      timeoutId = setTimeout(() => callback(...args), delayMs);
    },
  };
}
