import { Mail, Settings, ShieldUser, UsersRound } from 'lucide-react';
import { routes } from 'shared/config';

export const team = [
  {
    url: routes.team.members(),
    title: 'Участники',
    icon: UsersRound,
  },
  { url: routes.team.invitations(), title: 'Приглашения', icon: Mail },
  { url: routes.team.roles(), title: 'Роли', icon: ShieldUser },
  { url: routes.team.settings(), title: 'Настройки', icon: Settings },
] as const;
