'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { routes } from 'shared/config';
import { toast } from 'sonner';

export function useAuthRedirectMessage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const error = params?.get('oauth_error');
    const message = params?.get('message');

    if (!error) return;
    toast.error(message ?? 'Authorization failed');
    router.replace(routes.auth.signin());
  }, [params, router]);
}
