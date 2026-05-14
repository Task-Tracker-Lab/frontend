'use client';

import { useTeamStore } from 'entities/team';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { routes } from 'shared/config';

export function useNavigateToTeam() {
  const router = useRouter();
  const setTeamSlug = useTeamStore.use.setSlug();

  return useCallback(
    (slug: string) => {
      setTeamSlug(slug);
      router.push(routes.team.root());
    },
    [router, setTeamSlug],
  );
}
