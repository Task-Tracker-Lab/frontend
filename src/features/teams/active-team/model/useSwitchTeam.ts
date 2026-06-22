'use client';

import { useTeamStore } from 'entities/team';
import { type TUser } from 'entities/user';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { routes } from 'shared/config';
import { toast } from 'sonner';

interface SwitchTeamOptions {
  redirect?: boolean;
  showToast?: boolean;
}

interface UseSwitchTeamProps {
  teams?: TUser.UserTeamResponse[];
  defaultOptions?: SwitchTeamOptions;
}

export function useSwitchTeam({ teams = [], defaultOptions = {} }: UseSwitchTeamProps = {}) {
  const router = useRouter();
  const setTeamId = useTeamStore.use.setTeamId();

  const switchTeam = useCallback(
    (teamId: string, options: SwitchTeamOptions = {}) => {
      const { redirect = false, showToast = true } = { ...defaultOptions, ...options };
      const team = teams.find((t) => t.id === teamId);

      if (!team) {
        if (showToast) toast.error('Команда не найдена!');
        return;
      }

      setTeamId(teamId);
      if (showToast) toast.success(`Вы сменили команду на "${team.name}"`);

      if (redirect) {
        router.push(routes.team.root());
      }
    },
    [setTeamId, teams, router, defaultOptions]
  );

  return { switchTeam };
}
