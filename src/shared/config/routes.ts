import type { Route } from 'next';

export const routes = {
  home: (): Route => '/',
  profile: (): Route => '/profile',
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
