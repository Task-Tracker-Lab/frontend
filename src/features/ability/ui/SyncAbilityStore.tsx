'use client';

import { useQuery } from '@tanstack/react-query';
import { TeamQueries, useTeamStore } from 'entities/team';
import { UserQueries } from 'entities/user';
import { useAbilityStore } from '../model/store';
import { useEffect } from 'react';

export function SyncAbilityStore() {
  const teamId = useTeamStore((s) => s.teamId);
  const setAbilityData = useAbilityStore((s) => s.setAbility);
  const { data: user } = useQuery({ ...UserQueries.getMe(), select: (data) => ({ id: data.id }) });
  const { data: teamRole } = useQuery({
    ...TeamQueries.getMembers(teamId!),
    enabled: !!teamId && !!user,
    select: (data) => {
      return data.items.find((v) => v.id === user?.id)?.role;
    },
  });

  useEffect(() => {
    setAbilityData({
      userId: user?.id ?? null,
      teamRole: teamRole ?? null,
      projectRole: teamRole ?? null,
    });
  }, [setAbilityData, teamRole, user]);

  return null;
}
