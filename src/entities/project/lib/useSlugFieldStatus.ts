import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { ProjectQueries } from '../api/queries';
import { MAX_SLUG_LENGTH, MIN_SLUG_LENGTH } from '../model/consts';

type SlugFieldStatusValue = 'pending' | 'success' | 'error';

interface SlugFieldStatusState {
  isDirty: boolean;
  slug: string;
}

export function useSlugFieldStatus({
  isDirty,
  slug,
  teamId,
}: SlugFieldStatusState & { teamId: string }): SlugFieldStatusValue | undefined {
  const canCheck =
    Boolean(teamId) && isDirty && slug.length >= MIN_SLUG_LENGTH && slug.length <= MAX_SLUG_LENGTH;

  const { data, isFetching } = useQuery({
    ...ProjectQueries.checkSlug(teamId, slug),
    enabled: canCheck,
  });

  return useMemo(() => {
    if (!canCheck) {
      return undefined;
    }

    if (isFetching) {
      return 'pending';
    }

    if (data?.available === false) {
      return 'error';
    }

    if (data?.available === true) {
      return 'success';
    }

    return undefined;
  }, [canCheck, data?.available, isFetching]);
}
