import { RefObject, useEffect } from 'react';

type UseInlineFieldOutsidePointerDownOptions = {
  enabled: boolean;
  containerRef: RefObject<HTMLElement | null>;
  onOutsidePointerDown: () => void | Promise<void>;
};

export function useInlineFieldOutsidePointerDown({
  enabled,
  containerRef,
  onOutsidePointerDown,
}: UseInlineFieldOutsidePointerDownOptions) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node) || containerRef.current?.contains(target)) {
        return;
      }

      onOutsidePointerDown();
    };

    document.addEventListener('pointerdown', handlePointerDown, true);

    return () => document.removeEventListener('pointerdown', handlePointerDown, true);
  }, [containerRef, enabled, onOutsidePointerDown]);
}
