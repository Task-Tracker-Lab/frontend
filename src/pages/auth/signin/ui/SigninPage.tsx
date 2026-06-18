'use client';

import { SigninForm } from './SigninForm';
import { Link, Logo } from 'shared/ui';
import { routes } from 'shared/config';
import { AccessToken } from 'shared/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { QueryParamsHandler } from 'features/handle-query-params';

function SigninPage() {
  const router = useRouter();
  return (
    <>
      <Suspense>
        <QueryParamsHandler />
      </Suspense>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link href={routes.home()} className="flex items-center gap-2 self-center font-medium">
            <Logo size="sm" />
          </Link>
          <SigninForm
            mutateOptions={{
              onSuccess: (res) => {
                if (res.success) {
                  AccessToken.token = res.token;
                  router.replace(routes.user.root());
                  if (res.message) {
                    toast.success(res.message);
                  }
                }
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

export { SigninPage };
