import { routes } from 'shared/config';
import type { RouteDefinition } from '../model/types';

export const routeDefinitions = [
  [
    'team.projects.boardSettings',
    (pathname) => pathname.endsWith('/settings'),
    'Настройки проекта',
  ],
  [
    'team.projects.project',
    (pathname) =>
      pathname.startsWith(routes.team.projects.project('')) && !pathname.endsWith('/settings'),
    'Проект',
  ],
  ['user.teams', (pathname) => pathname === routes.user.teams(), 'Мои команды'],
  ['home', (pathname) => pathname === routes.home(), 'Главная'],
  ['user.root', (pathname) => pathname === routes.user.root(), 'Профиль'],
  ['user.profile', (pathname) => pathname === routes.user.profile(), 'Мой профиль'],
  ['user.notifications', (pathname) => pathname === routes.user.notifications(), 'Уведомления'],
  ['team.root', (pathname) => pathname === routes.team.root(), 'Команда'],
  ['team.members', (pathname) => pathname === routes.team.members(), 'Участники'],
  ['team.invitations', (pathname) => pathname === routes.team.invitations(), 'Приглашения'],
  ['team.settings', (pathname) => pathname === routes.team.settings(), 'Настройки'],
  ['team.projects.all', (pathname) => pathname === routes.team.projects.all(), 'Проекты'],
  ['auth.signin', (pathname) => pathname === routes.auth.signin(), 'Вход'],
  ['auth.signup', (pathname) => pathname === routes.auth.signup(), 'Регистрация'],
  [
    'auth.forgotPassword',
    (pathname) => pathname === routes.auth.forgotPassword(),
    'Восстановление пароля',
  ],
] as const satisfies ReadonlyArray<RouteDefinition>;
