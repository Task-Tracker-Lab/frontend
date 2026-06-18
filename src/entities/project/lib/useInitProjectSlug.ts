import { useEffect } from 'react';
import { useProjectStore } from '../model/store';

export function useInitProjectSlug(slug: string) {
  const setProjectSlug = useProjectStore((s) => s.setProjectSlug);
  const clearProjectSlug = useProjectStore((s) => s.clearProjectSlug);

  useEffect(() => {
    setProjectSlug(slug);

    return () => {
      clearProjectSlug();
    };
  }, [clearProjectSlug, slug, setProjectSlug]);
  return null;
}
