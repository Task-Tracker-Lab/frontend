import { routes } from 'shared/config';

export const profileTabs = [
  { key: routes.user.profile(), label: 'Мой профиль' },
  { key: routes.user.security(), label: 'Безопасность' },
  { key: routes.user.notifications(), label: 'Уведомления' },
];
