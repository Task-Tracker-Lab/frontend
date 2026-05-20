import { routes } from 'shared/config';

export const profileTabs = [
  { key: routes.profile.me(), label: 'Мой профиль' },
  { key: routes.profile.teams(), label: 'Команды' },
  { key: routes.profile.security(), label: 'Безопасность' },
  { key: routes.profile.notifications(), label: 'Уведомления' },
];
