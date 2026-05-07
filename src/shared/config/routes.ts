import type { Route } from 'next';

export const routes = {
  home: (): Route => '/',
  profile: {
    root: (): Route => '/profile',
    me: (): Route => '/profile/me',
    security: (): Route => '/profile/security',
    notifications: (): Route => '/profile/notifications',
  },
  team: {
    root: (): Route => '/team',
    members: (): Route => '/team/members',
    invites: (): Route => '/team/invites',
    roles: (): Route => '/team/roles',
    settings: (): Route => '/team/settings',
  },
  auth: {
    signin: (): Route => '/signin',
    signup: (): Route => '/signup',
    forgotPassword: (): Route => '/forgot-password',
  },
} as const;
