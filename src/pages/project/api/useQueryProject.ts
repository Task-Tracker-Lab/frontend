import { useQuery } from '@tanstack/react-query';
import { ProjectQueries } from 'entities/project';
import { useTeamStore } from 'entities/team';
import { useParams } from 'next/navigation';

export function useQueryProject() {
  const teamId = useTeamStore.use.teamId();
  const params = useParams();
  const projectId = typeof params?.projectId === 'string' ? params.projectId : undefined;

  return useQuery({
    ...ProjectQueries.getProject(teamId!, projectId!),
    enabled: Boolean(teamId && projectId),
  });
}
