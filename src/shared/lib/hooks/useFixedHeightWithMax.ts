'use client';

import { type CSSProperties, type RefObject, useLayoutEffect, useRef, useState } from 'react';

import { throttle } from 'shared/lib/utils';

const UPDATE_HEIGHT_THROTTLE_MS = 250;

interface UseFixedHeightWithMaxOptions {
  maxHeight: string;
}

interface UseFixedHeightWithMaxResult<T extends HTMLElement> {
  ref: RefObject<T | null>;
  style: CSSProperties;
}

export function useFixedHeightWithMax<T extends HTMLElement>({
  maxHeight,
}: UseFixedHeightWithMaxOptions): UseFixedHeightWithMaxResult<T> {
  const ref = useRef<T | null>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const updateHeight = () => {
      setContentHeight(element.clientHeight);
    };

    const throttledUpdateHeight = throttle(updateHeight, UPDATE_HEIGHT_THROTTLE_MS);

    updateHeight();

    const resizeObserver = new ResizeObserver(throttledUpdateHeight);
    resizeObserver.observe(element);
    window.addEventListener('resize', throttledUpdateHeight);

    return () => {
      throttledUpdateHeight.cancel();
      resizeObserver.disconnect();
      window.removeEventListener('resize', throttledUpdateHeight);
    };
  }, []);

  return {
    ref,
    style: {
      height: contentHeight ? `min(${maxHeight}, ${contentHeight}px)` : 'auto',
    },
  };
}
