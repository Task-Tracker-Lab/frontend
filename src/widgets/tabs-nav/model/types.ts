import type { Route } from 'next';
import { ComponentProps, ReactNode } from 'react';
import { Badge } from 'shared/ui';

export type TabNavItem = {
  key: Route;
  label: string;
  badge?: { value: string | ReactNode; variant: ComponentProps<typeof Badge>['variant'] };
};
