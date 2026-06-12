'use client';

import { TAuth } from 'entities/auth';
import { CAuth } from 'entities/auth';
import { useCallback, type ComponentProps } from 'react';
import { Button } from 'shared/ui';
import { useConnectOAuthProvider } from '../../../model/useConnectOauthProvider';
import { useDisconnectOAuthProvider } from '../../../model/useDisconnectOauthProvider';
import { env } from 'shared/config';
import { toast } from 'sonner';

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
          context.client.invalidateQueries({ queryKey: CAuth.authKeys.connectedProviders() });
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

  const providerConfig = CAuth.OAUTH_PROVIDERS[provider];
  const Icon = providerConfig.icon;

  return (
    <Button
      onClick={handleToggleConnect}
      variant={isLinked ? 'destructive' : 'outline'}
      size={'lg'}
      className="justify-start"
      disabled={isLoading}
      {...props}
    >
      <div className={`${providerConfig.buttonClassName} w-max rounded-full text-2xl`}>
        <Icon className="size-6" />
      </div>
      <span className="w-full text-center">
        {isLinked ? 'Отвязать' : 'Привязать'} {label} аккаунт
      </span>
    </Button>
  );
}
