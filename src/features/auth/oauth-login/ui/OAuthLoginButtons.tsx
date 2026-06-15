'use client';
import { Button, Skeleton } from 'shared/ui';
import { OAUTH_PROVIDERS, OAUTH_PROVIDERS_COUNT } from '../model/consts';
import { cn } from 'shared/lib/utils';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { AuthQueries } from 'entities/auth';
import { type Route } from 'next';

export function OAuthLoginButtons({ className }: { className?: string }) {
  const { data, isLoading } = useQuery(AuthQueries.getOAuthProviders());

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {isLoading &&
        Array.from({ length: OAUTH_PROVIDERS_COUNT }, (_v, i) => (
          <Skeleton className="size-8" key={i} />
        ))}

      {data?.map((item) => {
        const providerConfig = OAUTH_PROVIDERS[item.value];

        return (
          <Button
            asChild
            style={{ backgroundColor: providerConfig.color }}
            key={item.value}
            size={'icon'}
            variant={'outline'}
          >
            <Link href={providerConfig.href as Route}>
              <providerConfig.icon className="size-6" />
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
