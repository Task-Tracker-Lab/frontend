import { UseQueryResult } from '@tanstack/react-query';
import { useTeamStore } from 'entities/team';
import { type TUser } from 'entities/user';
import { ChevronsUpDown } from 'lucide-react';
import { useMemo } from 'react';
import { TeamItem } from './TeamItem';
import { TeamItemSkeleton } from './TeamItem.skeleton';

interface TeamTriggerProps {
  query: UseQueryResult<TUser.UserTeamsListResponse>;
}

export function TeamTrigger({ query }: TeamTriggerProps) {
  const teamId = useTeamStore.use.teamId();

  const activeTeam = useMemo(() => {
    if (query.data) {
      return query.data.find((d) => d.id === teamId);
    }
  }, [teamId, query.data]);

  if (query.isPending) {
    return <TeamItemSkeleton />;
  }

  if (query.isError) {
    return (
      <TeamItem name={query.error.name} description={query.error.message} variant="destructive" />
    );
  }

  if (!activeTeam) {
    return <TeamItem name="Выберите команду" action={<ChevronsUpDown />} />;
  }

  return (
    <TeamItem
      avatar={activeTeam.avatar}
      name={activeTeam.name}
      description={activeTeam.description}
      action={<ChevronsUpDown />}
    />
  );
}
