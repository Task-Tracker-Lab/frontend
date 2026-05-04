interface SavedCall<TThis, TArgs extends unknown[]> {
  args: TArgs;
  thisArg: TThis;
}

export function throttle<TThis, TArgs extends unknown[]>(
  func: (this: TThis, ...args: TArgs) => void,
  ms: number
): (this: TThis, ...args: TArgs) => void {
  let isThrottled = false;
  let savedCall: SavedCall<TThis, TArgs> | null = null;

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

    setTimeout(() => {
      isThrottled = false;
      if (savedCall) {
        const { args: savedArgs, thisArg } = savedCall;
        savedCall = null;
        wrapper.apply(thisArg, savedArgs);
      }
    }, ms);
  }

  return wrapper;
}
