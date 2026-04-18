import type { Route } from 'next';

export const routes = {
  home: (): Route => '/',
  auth: {
    signin: (): Route => '/signin',
    signup: (): Route => '/signup',
  },
  team: {
    root: (): Route => '/team',
    projects: (): Route => '/team/projects',
    profile: (): Route => '/team/profile',
  },
} as const;
