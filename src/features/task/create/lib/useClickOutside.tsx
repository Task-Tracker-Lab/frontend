/* eslint-disable check-file/filename-naming-convention */
import { useLayoutEffect } from 'react';

export function useClickOutside(id: string, handler: () => void) {
  useLayoutEffect(() => {
    const listener = (e: MouseEvent) => {
      const elem = document.getElementById(id);
      if (!elem) return;
      console.log(elem);

      if (!elem?.contains(e.target as Node)) handler?.();
    };
    document.addEventListener('mouseup', listener);
    return () => document.removeEventListener('mouseup', listener);
  }, [handler, id]);
}
