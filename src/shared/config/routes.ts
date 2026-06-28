import type { Route } from 'next';

export const routes = {
  home: (): Route => '/',
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
    projects: {
      all: (): Route => '/team/projects',
      project: (projectSlug: string): Route => `/team/projects/${projectSlug}` as Route,
      projectSettings: (projectSlug: string): Route =>
        `/team/projects/${projectSlug}/settings` as Route,
      board: (projectSlug: string, boardSlug: string): Route =>
        `/team/projects/${projectSlug}/${boardSlug}` as Route,
      boardSettings: (projectSlug: string, boardSlug: string): Route =>
        `/team/projects/${projectSlug}/${boardSlug}/settings` as Route,
    },
  },
  auth: {
    signin: (): Route => '/signin',
    signup: (): Route => '/signup',
    forgotPassword: (): Route => '/forgot-password',
    oauth: () => '/oauth' as Route,
  },
} as const;
