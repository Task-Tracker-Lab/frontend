'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { AuthQueries, OAUTH_PROVIDERS, type TAuth } from 'entities/auth';
import Image from 'next/image';
import { useCallback } from 'react';
import { routes } from 'shared/config';
import { cn } from 'shared/lib/utils';
import { Button } from 'shared/ui';

export interface OAuthLoginButtonsContentProps {
  className?: string;
}

export function OAuthLoginButtonsContent({ className }: OAuthLoginButtonsContentProps) {
  const { data } = useSuspenseQuery(AuthQueries.getOAuthProviders());

  const startOAuth = useCallback((provider: TAuth.OAuthProvider) => {
    const route = new URL(routes.auth.oauth(), window.location.origin);

    route.searchParams.set('provider', provider);
    route.searchParams.set('startOAuth', 'true');

    window.location.assign(route.href);
  }, []);

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {data?.map(({ label, value }) => {
        const data = OAUTH_PROVIDERS[value];

        return (
          <Button
            type="button"
            className={data.className}
            key={value}
            variant={'outline'}
            size="icon"
            onClick={() => startOAuth(value)}
          >
            <Image src={data.iconSrc} alt={label} width={24} height={24} className="size-6" />
          </Button>
        );
      })}
    </div>
  );
}
