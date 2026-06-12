'use client';
import { Skeleton } from 'shared/ui';
import { CAuth, OAuthButton } from 'entities/auth';
import { cn } from 'shared/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { AuthQueries } from 'entities/auth';
import { type TAuth } from 'entities/auth';
import { routes } from 'shared/config';
import { StartOauthParams } from '../model/types';

export const getRoute = (provider: TAuth.OAuthProvider) => {
  const params = new URLSearchParams({
    provider,
    startOAuth: 'true',
  } satisfies Record<keyof StartOauthParams, string>);

  return `${routes.auth.oauth()}?${params.toString()}`;
};

export function OAuthLoginButtons({ className }: { className?: string }) {
  const { data, isLoading } = useQuery(AuthQueries.getOAuthProviders());

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {isLoading &&
        Array.from({ length: CAuth.OAUTH_PROVIDERS_COUNT }, (_v, i) => (
          <Skeleton className="size-8" key={i} />
        ))}

      {data?.map((item) => {
        return <OAuthButton key={item.value} provider={item.value} />;
      })}
    </div>
  );
}
