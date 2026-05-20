import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { TeamQueries } from '../api/queries';
import { MAX_SLUG_LENGTH, MIN_SLUG_LENGTH } from '../model/const';

type SlugFieldStatusValue = 'pending' | 'success' | 'error';

interface SlugFieldStatusState {
  isDirty: boolean;
  slug: string;
}

export function useSlugFieldStatus({
  isDirty,
  slug,
}: SlugFieldStatusState): SlugFieldStatusValue | undefined {
  const { data, isPending } = useQuery({
    ...TeamQueries.checkSlug(slug),
    enabled: false,
  });

  return useMemo(() => {
    if (!isDirty || slug.length < MIN_SLUG_LENGTH || slug.length > MAX_SLUG_LENGTH) {
      return undefined;
    }

    if (isPending) {
      return 'pending';
    }

    if (data?.available === false) {
      return 'error';
    }

    if (data?.available === true) {
      return 'success';
    }

    return undefined;
  }, [data?.available, isDirty, isPending, slug]);
}
