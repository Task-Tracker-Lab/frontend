'use client';

import { OAUTH_PROVIDERS, type TAuth } from 'entities/auth';
import { type ComponentProps } from 'react';
import { Button, Spinner } from 'shared/ui';
import Image from 'next/image';
import { classNames } from 'shared/lib/utils';
import { type OAuthConnectionStatus } from '../../../model/profile';
import { useOAuthManage } from 'pages/profile/model/useOAuthManage';
import { OAuthBadge } from './OAuthBadge';

type OAuthManageButtonProps = ComponentProps<typeof Button> & {
  wrap?: Omit<ComponentProps<'div'>, 'children'>;
  provider: TAuth.OAuthProvider;
  label: string;
  isLoading?: boolean;
  status: OAuthConnectionStatus;
};

export function OAuthManageButton({
  provider,
  label,
  disabled,
  status,
  isLoading = false,
  wrap = {},
  ...props
}: OAuthManageButtonProps) {
  const { isPending, handleToggleConnect } = useOAuthManage(provider, status);
  const isConnected = status === 'connected';
  const isDisabled = disabled || isPending || isLoading || status === 'unknown';
  const meta = OAUTH_PROVIDERS[provider];

  return (
    <div
      {...wrap}
      className={classNames(
        'hover:bg-muted flex items-center justify-between gap-2 border-t p-2 transition-colors first:rounded-t-lg first:border-none last:rounded-b-lg',
        {},
        [wrap?.className]
      )}
    >
      <div className="flex shrink-0 items-center gap-3">
        <Image
          className={`${meta.className} rounded-lg`}
          src={meta.iconSrc}
          alt={label}
          width={24}
          height={24}
        />
        <div className="flex flex-col gap-1">
          <span className="font-medium">{label}</span>
          <OAuthBadge className="lg:hidden" status={status} />
        </div>
      </div>
      <div className="grid items-center justify-end gap-3 lg:grid-cols-[minmax(101px,1fr)_110px]">
        <OAuthBadge status={status} className="hidden text-center lg:block" />
        <Button
          className="min-w-[106px]"
          disabled={isDisabled}
          onClick={handleToggleConnect}
          size={'lg'}
          variant={isConnected ? 'outline' : 'default'}
          {...props}
        >
          {(isPending || isLoading) && <Spinner />}
          <span>{isConnected ? 'Отключить' : 'Подключить'}</span>
        </Button>
      </div>
    </div>
  );
}
