import { BriefcaseBusiness, Mail, Settings, UsersRound } from 'lucide-react';
import { routes } from 'shared/config';

export const team = [
  { url: routes.team.members(), title: 'Участники', icon: UsersRound },
  { url: routes.team.projects.all(), title: 'Проекты', icon: BriefcaseBusiness },
  { url: routes.team.invitations(), title: 'Приглашения', icon: Mail },
  { url: routes.team.settings(), title: 'Настройки', icon: Settings },
] as const;
