import type { Route } from 'next';

export const routes = {
  home: (): Route => '/',
  auth: {
    signin: (): Route => '/signin',
    signup: (): Route => '/signup',
    forgotPassword: (): Route => '/forgot-password',
  },
  team: {
    root: (): Route => '/team',
    projects: (): Route => '/team/projects',
    profile: (): Route => '/team/profile',
    tasks: (): Route => '/team/tasks',
  },
} as const;
