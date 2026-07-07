import type { Route } from 'next';
import { ReactNode } from 'react';

export type TabNavItem = {
  key: Route;
  label: string;
  matchPrefix?: boolean;
  icon?: ReactNode;
};
