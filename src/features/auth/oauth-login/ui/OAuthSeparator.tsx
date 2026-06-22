import dynamic from 'next/dynamic';
import { Skeleton } from 'shared/ui';

export const OAuthSeparator = dynamic(
  () => import('./OAuthSeparatorContent').then((module) => module.OAuthSeparatorContent),
  {
    ssr: false,
    loading: () => (
      <div className="my-3 flex items-center px-1">
        <Skeleton className="h-px w-full" />
        <Skeleton className="mx-2 h-4 w-16" />
        <Skeleton className="h-px w-full" />
      </div>
    ),
  }
);
