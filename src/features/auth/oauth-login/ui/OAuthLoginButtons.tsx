import dynamic from 'next/dynamic';
import { Skeleton } from 'shared/ui';

export const OAuthLoginButtons = dynamic(
  () => import('./OAuthLoginButtonsContent').then((module) => module.OAuthLoginButtonsContent),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: 3 }, (_v, i) => (
          <Skeleton className="size-8" key={i} />
        ))}
      </div>
    ),
  }
);
