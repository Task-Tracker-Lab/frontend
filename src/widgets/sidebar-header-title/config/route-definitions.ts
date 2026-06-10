import { routes } from 'shared/config';
import type { RouteDefinition } from '../model/types';

export const routeDefinitions = [
  ['team.project.settings', (pathname) => pathname.endsWith('/settings'), 'Настройки проекта'],
  [
    'team.project.root',
    (pathname) =>
      pathname.startsWith(routes.team.project.root('')) && !pathname.endsWith('/settings'),
    'Проект',
  ],
  ['user.teams', (pathname) => pathname === routes.user.teams(), 'Мои команды'],
  ['home', (pathname) => pathname === routes.home(), 'Главная'],
  ['user.root', (pathname) => pathname === routes.user.root(), 'Профиль'],
  ['user.profile', (pathname) => pathname === routes.user.profile(), 'Мой профиль'],
  ['user.security', (pathname) => pathname === routes.user.security(), 'Безопасность'],
  ['user.notifications', (pathname) => pathname === routes.user.notifications(), 'Уведомления'],
  ['team.root', (pathname) => pathname === routes.team.root(), 'Команда'],
  ['team.members', (pathname) => pathname === routes.team.members(), 'Участники'],
  ['team.invitations', (pathname) => pathname === routes.team.invitations(), 'Приглашения'],
  ['team.roles', (pathname) => pathname === routes.team.roles(), 'Роли и права'],
  ['team.settings', (pathname) => pathname === routes.team.settings(), 'Настройки'],
  ['team.projects', (pathname) => pathname === routes.team.projects(), 'Проекты'],
  ['auth.signin', (pathname) => pathname === routes.auth.signin(), 'Вход'],
  ['auth.signup', (pathname) => pathname === routes.auth.signup(), 'Регистрация'],
  [
    'auth.forgotPassword',
    (pathname) => pathname === routes.auth.forgotPassword(),
    'Восстановление пароля',
  ],
] as const satisfies ReadonlyArray<RouteDefinition>;
