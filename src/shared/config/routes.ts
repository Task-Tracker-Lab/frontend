import type { Route } from 'next';

export const routes = {
  home: (): Route => '/',
  profile: {
    root: (): Route => '/profile',
    me: (): Route => '/profile/me',
    security: (): Route => '/profile/security',
    notifications: (): Route => '/profile/notifications',
    teams: (): Route => '/profile/teams',
  },
  team: {
    root: (): Route => '/team',
    members: (): Route => '/team/members',
    invitations: (): Route => '/team/invitations',
    roles: (): Route => '/team/roles',
    settings: (): Route => '/team/settings',
    projects: (): Route => '/team/projects',
    project: {
      root: (projectId: string): Route => `/team/projects/${projectId}` as Route,
      settings: (projectId: string): Route => `/team/projects/${projectId}/settings` as Route,
    },
  },
  auth: {
    signin: (): Route => '/signin',
    signup: (): Route => '/signup',
    forgotPassword: (): Route => '/forgot-password',
  },
} as const;
