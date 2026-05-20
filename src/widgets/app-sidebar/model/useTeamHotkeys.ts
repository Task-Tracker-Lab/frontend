import type { TUser } from 'entities/user';
import { useEffect } from 'react';

export function useTeamHotkeys(teams: TUser.UserTeamResponse[], onSelect: (slug: string) => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const index = parseInt(e.key, 10) - 1;
      if (index >= 0 && index < teams.length) {
        e.preventDefault();
        onSelect(teams[index].slug);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [teams, onSelect]);
}
