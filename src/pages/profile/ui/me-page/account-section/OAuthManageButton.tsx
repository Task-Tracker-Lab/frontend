'use client';

import { authFabricKeys, OAUTH_PROVIDERS, type TAuth } from 'entities/auth';
import { type ComponentProps, useCallback } from 'react';
import { Button } from 'shared/ui';
import { useConnectOAuthProvider } from '../../../api/useConnectOauthProvider';
import { useDisconnectOAuthProvider } from '../../../api/useDisconnectOauthProvider';
import { env } from 'shared/config';
import { toast } from 'sonner';
import Image from 'next/image';

type OAuthManageButtonProps = ComponentProps<typeof Button> & {
  provider: TAuth.OAuthProvider;
  label: string;
  isLinked: boolean;
};

export function OAuthManageButton({ provider, label, isLinked, ...props }: OAuthManageButtonProps) {
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
    <Button
      onClick={handleToggleConnect}
      variant={isLinked ? 'destructive' : 'outline'}
      size={'lg'}
      className="justify-start"
      disabled={isLoading}
      {...props}
    >
      <div className={`${meta.className} w-max rounded-full text-2xl`}>
        <Image src={meta.iconSrc} alt={label} width={24} height={24} />
      </div>
      <span className="w-full text-center">
        {isLinked ? 'Отвязать' : 'Привязать'} {label}
      </span>
    </Button>
  );
}
