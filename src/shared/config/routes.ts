import type { Route } from 'next';

export const routes = {
  home: (): Route => '/',
  profile: (): Route => '/profile',
  projects: (): Route => '/projects',
  tasks: (): Route => '/tasks',
  auth: {
    signin: (): Route => '/signin',
    signup: (): Route => '/signup',
    forgotPassword: (): Route => '/forgot-password',
  },
} as const;
