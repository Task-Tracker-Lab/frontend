import { routes } from 'shared/config';
import { TabNavItem } from 'widgets/tabs-nav';

export const teamTabs: TabNavItem[] = [
  { key: routes.team.members(), label: 'Участники', badge: { value: '8', variant: 'default' } },
  { key: routes.team.projects.all(), label: 'Проекты' },
  {
    key: routes.team.invitations(),
    label: 'Приглашения',
    badge: { value: '3', variant: 'default' },
  },
  {
    key: routes.team.roles(),
    label: 'Роли и права',
    badge: { value: 'Не реализовано', variant: 'destructive' },
  },
  { key: routes.team.settings(), label: 'Настройки' },
];
