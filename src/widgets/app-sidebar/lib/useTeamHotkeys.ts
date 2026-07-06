import type { TUser } from 'entities/user';
import { useEffect } from 'react';
import { MAX_VISIBLE_TEAMS } from '../model/const';

export function useTeamHotkeys(
  teams: TUser.UserTeamResponse[],
  onSelect: (teamId: string) => void
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;

      const slot = parseInt(e.key, 10);

      if (slot < 1 || slot > MAX_VISIBLE_TEAMS) return;

      e.preventDefault();

      const team = teams[slot - 1];

      if (!team) return;

      onSelect(team.id);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [teams, onSelect]);
}
