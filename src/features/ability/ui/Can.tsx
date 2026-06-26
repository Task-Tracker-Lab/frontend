'use client';

import { Can as CaslCan, type CanProps } from '@casl/react';
import type { AppAbility } from './AbilityProvider';

export function Can({ children, ...props }: CanProps<AppAbility>) {
  return <CaslCan {...props}>{children}</CaslCan>;
}
