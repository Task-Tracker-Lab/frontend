import { type ComponentProps } from 'react';
import { Badge } from 'shared/ui';
import { OAUTH_STATUS_BADGE_VARIANT, OAUTH_STATUS_LABELS } from '../../config/oauth-status';
import { type OAuthConnectionStatus } from '../../model/profile';

export interface OAuthStatusBadgeProps extends Omit<
  ComponentProps<typeof Badge>,
  'variant' | 'children'
> {
  status: OAuthConnectionStatus;
}

export function OAuthStatusBadge({ status, ...props }: OAuthStatusBadgeProps) {
  return (
    <Badge variant={OAUTH_STATUS_BADGE_VARIANT[status]} {...props}>
      {OAUTH_STATUS_LABELS[status]}
    </Badge>
  );
}
