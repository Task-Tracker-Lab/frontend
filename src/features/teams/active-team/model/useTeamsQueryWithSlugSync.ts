import { useQuery } from '@tanstack/react-query';
import { UserQueries } from 'entities/user';
import { useEffect } from 'react';
import { useTeamStore } from 'entities/team';

export function useTeamsQueryWithSlugSync() {
  const query = useQuery(UserQueries.getMyTeams());
  const slug = useTeamStore.use.slug();
  const setCurrentTeamSlug = useTeamStore.use.setSlug();

  useEffect(() => {
    if (!query.data) return;

    const hasTeamSlug = !!slug && query.data.some((d) => d.slug === slug);

    if (hasTeamSlug) return;

    setCurrentTeamSlug(query.data[0]?.slug);
  }, [slug, setCurrentTeamSlug, query.data]);

  return { query, slug };
}
