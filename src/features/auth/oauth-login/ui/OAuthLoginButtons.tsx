'use client';
import { Button, Skeleton } from 'shared/ui';
import { OAUTH_PROVIDERS } from '../model/consts';
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
        [...new Array(3)].map((_v, i) => {
          return <Skeleton className="size-8" key={i} />;
        })}
      {data?.map((item) => {
        const data = OAUTH_PROVIDERS[item.value];
        return (
          <Button
            asChild
            style={{ backgroundColor: data.color }}
            key={data.name}
            size={'icon'}
            variant={'outline'}
          >
            <Link href={data.href as Route} target="_top">
              <data.icon className="size-6" />
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
