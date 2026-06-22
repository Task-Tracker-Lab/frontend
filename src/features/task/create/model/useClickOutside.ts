import { useLayoutEffect, useRef } from 'react';

export function useClickOutside(id: string, handler: () => void) {
  const handlerRef = useRef(handler);

  useLayoutEffect(() => {
    const listener = (e: MouseEvent) => {
      const elem = document.getElementById(id);
      if (!elem?.contains(e.target as Node)) handlerRef.current?.();
    };
    document.addEventListener('mouseup', listener);
    return () => document.removeEventListener('mouseup', listener);
  }, [id]);
}
