import { useCallback } from 'react';
import { useConnectOAuthProvider } from '../api/useConnectOauthProvider';
import { useDisconnectOAuthProvider } from '../api/useDisconnectOauthProvider';
import { authFabricKeys, TAuth } from 'entities/auth';
import { toast } from 'sonner';
import { OAuthConnectionStatus } from './profile';
import { env } from 'shared/config';

export function useOAuthManage(provider: TAuth.OAuthProvider, status: OAuthConnectionStatus) {
  const connect = useConnectOAuthProvider();
  const disconnect = useDisconnectOAuthProvider();

  const isPending = connect.isPending || disconnect.isPending;

  const handleToggleConnect = useCallback(() => {
    if (status === 'connected') {
      disconnect.mutate(provider, {
        onSuccess: (data, _v, _m, context) => {
          context.client.invalidateQueries({ queryKey: authFabricKeys.connectedProviders() });
          toast.success(data.message);
        },
      });
    } else if (status === 'disconnected') {
      connect.mutate(provider, {
        onSuccess: (data) => {
          localStorage.setItem('test', JSON.stringify(data));
          const url = data.url.startsWith('http')
            ? data.url
            : new URL(data.url, env.NEXT_PUBLIC_API_BASE_URL).toString();
          window.location.href = url;
        },
      });
    }
  }, [connect, disconnect, status, provider]);

  return { handleToggleConnect, isPending };
}
