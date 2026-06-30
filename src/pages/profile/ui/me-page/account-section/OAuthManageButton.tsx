'use client';

import { authFabricKeys, OAUTH_PROVIDERS, type TAuth } from 'entities/auth';
import { type ComponentProps, useCallback } from 'react';
import { Badge, Button } from 'shared/ui';
import { useConnectOAuthProvider } from '../../../api/useConnectOauthProvider';
import { useDisconnectOAuthProvider } from '../../../api/useDisconnectOauthProvider';
import { env } from 'shared/config';
import { toast } from 'sonner';
import Image from 'next/image';
import { classNames } from 'shared/lib/utils';

type OAuthManageButtonProps = ComponentProps<'div'> & {
  provider: TAuth.OAuthProvider;
  label: string;
  isLinked: boolean;
};

export function OAuthManageButton({
  provider,
  className = '',
  label,
  isLinked,
  ...props
}: OAuthManageButtonProps) {
  const connect = useConnectOAuthProvider();
  const disconnect = useDisconnectOAuthProvider();

  const isLoading = connect.isPending || disconnect.isPending;

  const handleToggleConnect = useCallback(() => {
    if (isLinked) {
      disconnect.mutate(provider, {
        onSuccess: (data, _v, _m, context) => {
          context.client.invalidateQueries({ queryKey: authFabricKeys.connectedProviders() });
          toast.success(data.message);
        },
      });
    } else {
      connect.mutate(provider, {
        onSuccess: (data) => {
          console.log(data);
          localStorage.setItem('test', JSON.stringify(data));
          const url = data.url.startsWith('http')
            ? data.url
            : new URL(data.url, env.NEXT_PUBLIC_API_BASE_URL).toString();
          window.location.href = url;
        },
      });
    }
  }, [connect, disconnect, isLinked, provider]);

  const meta = OAUTH_PROVIDERS[provider];

  return (
    <div
      className={classNames(
        'hover:bg-muted flex items-center justify-between gap-2 border-t p-2 transition-colors first:rounded-t-lg first:border-none last:rounded-b-lg',
        {},
        [className]
      )}
      {...props}
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
          <OAuthBadge className="lg:hidden" isLinked={isLinked} />
        </div>
      </div>
      <div className="grid items-center gap-3 lg:w-full lg:max-w-[220px] lg:grid-cols-2">
        <OAuthBadge isLinked={isLinked} className="hidden text-center lg:block" />
        <Button
          className="min-w-[106px]"
          disabled={isLoading}
          onClick={handleToggleConnect}
          size={'lg'}
          variant={isLinked ? 'outline' : 'default'}
        >
          {isLinked ? 'Отключить' : 'Подключить'}
        </Button>
      </div>
    </div>
  );
}

function OAuthBadge({ isLinked, className = '' }: { isLinked: boolean; className?: string }) {
  return (
    <Badge
      variant={isLinked ? 'outline' : 'destructive'}
      className={classNames(
        'w-full text-xs leading-none',
        {
          'border-transparent bg-green-700/10 text-green-700': isLinked,
        },
        [className]
      )}
    >
      {isLinked ? 'Подключен' : 'Не подключен'}
    </Badge>
  );
}
