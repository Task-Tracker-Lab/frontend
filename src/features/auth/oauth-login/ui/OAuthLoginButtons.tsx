'use client';
import { Skeleton } from 'shared/ui';
import { cn } from 'shared/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { AuthQueries } from 'entities/auth';
import { OAuthButton } from './OAuthButton';
import { type TAuth } from 'entities/auth';
import { type StartOauthParams } from '../model/types';
import { type Route } from 'next';

export const getRoute = (provider: TAuth.OAuthProvider) => {
  const params = new URLSearchParams({
    provider,
    startOAuth: 'true',
  } satisfies Record<keyof StartOauthParams, string>);

  return `/oauth?${params.toString()}`;
};

export function OAuthLoginButtons({ className }: { className?: string }) {
  const { data, isLoading } = useQuery(AuthQueries.getOAuthProviders());

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {isLoading && Array.from({ length: 3 }, (_v, i) => <Skeleton className="size-8" key={i} />)}

      {data?.map((item) => {
        return <OAuthButton key={item.value} data={item} href={getRoute(item.value) as Route} />;
      })}
    </div>
  );
}
