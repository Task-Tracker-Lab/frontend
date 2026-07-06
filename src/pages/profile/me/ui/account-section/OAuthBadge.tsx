import { Badge } from 'shared/ui';
import { type OAuthConnectionStatus } from '../../model/profile';
import { classNames } from 'shared/lib/utils';
import { OAUTH_STATUS_LABELS } from '../../config/oauth-status';

export function OAuthBadge({
  status,
  className = '',
}: {
  status: OAuthConnectionStatus;
  className?: string;
}) {
  return (
    <Badge
      variant={status === 'connected' ? 'outline' : 'destructive'}
      className={classNames(
        'w-full text-xs leading-none',
        {
          'border-transparent bg-green-700/10 text-green-700': status === 'connected',
          'border-transparent bg-amber-700/10 text-amber-700': status === 'unknown',
        },
        [className]
      )}
    >
      {OAUTH_STATUS_LABELS[status]}
    </Badge>
  );
}
