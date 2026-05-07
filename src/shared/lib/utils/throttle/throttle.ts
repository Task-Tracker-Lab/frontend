interface SavedCall<TThis, TArgs extends unknown[]> {
  args: TArgs;
  thisArg: TThis;
}

interface ThrottledFunction<TThis, TArgs extends unknown[]> {
  (this: TThis, ...args: TArgs): void;
  cancel: () => void;
}

export function throttle<TThis, TArgs extends unknown[]>(
  func: (this: TThis, ...args: TArgs) => void,
  ms: number
): ThrottledFunction<TThis, TArgs> {
  let isThrottled = false;
  let savedCall: SavedCall<TThis, TArgs> | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function wrapper(this: TThis, ...args: TArgs) {
    if (isThrottled) {
      savedCall = {
        args,
        thisArg: this,
      };
      return;
    }

    func.apply(this, args);

    isThrottled = true;

    timeoutId = setTimeout(() => {
      timeoutId = null;
      isThrottled = false;
      if (savedCall) {
        const { args: savedArgs, thisArg } = savedCall;
        savedCall = null;
        wrapper.apply(thisArg, savedArgs);
      }
    }, ms);
  }

  wrapper.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    isThrottled = false;
    savedCall = null;
  };

  return wrapper;
}
