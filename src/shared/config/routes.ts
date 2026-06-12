import type { Route } from 'next';

export const routes = {
  home: (): Route => '/',
  profile: (): Route => '/profile',
  user: {
    root: (): Route => '/user',
    profile: (): Route => '/user/profile',
    security: (): Route => '/user/security',
    notifications: (): Route => '/user/notifications',
    teams: (): Route => '/user/teams',
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
    oauth: () => '/oauth' as Route,
  },
} as const;
