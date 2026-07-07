import { ComponentProps } from 'react';
import { Badge } from 'shared/ui';
import { OAuthConnectionStatus } from '../model/profile';

export const OAUTH_STATUS_LABELS = {
  connected: 'Подключен',
  disconnected: 'Не подключен',
} as const satisfies Record<OAuthConnectionStatus, string>;

export const OAUTH_STATUS_BADGE_VARIANT = {
  connected: 'success',
  disconnected: 'destructive',
} as const satisfies Record<OAuthConnectionStatus, ComponentProps<typeof Badge>['variant']>;
