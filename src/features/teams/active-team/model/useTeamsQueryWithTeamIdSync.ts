import { useQuery } from '@tanstack/react-query';
import { UserQueries } from 'entities/user';
import { useEffect } from 'react';
import { useTeamStore } from 'entities/team';

export function useTeamsQueryWithTeamIdSync() {
  const query = useQuery(UserQueries.getMyTeams());
  const teamId = useTeamStore.use.teamId();
  const setCurrentTeamId = useTeamStore.use.setTeamId();

  useEffect(() => {
    if (!query.data) return;

    const items = query.data;
    const hasTeamId = !!teamId && items.some((d) => d.id === teamId);

    if (hasTeamId) return;

    setCurrentTeamId(items[0]?.id);
  }, [teamId, setCurrentTeamId, query.data]);

  return { query, teamId };
}
