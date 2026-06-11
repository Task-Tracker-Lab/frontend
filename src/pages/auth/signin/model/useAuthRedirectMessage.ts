'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { routes } from 'shared/config';
import { toast } from 'sonner';

export function useAuthRedirectMessage() {
  const params = useSearchParams();

  useEffect(() => {
    const error = params?.get('oauth_error');
    const message = params?.get('message');

    if (!error) return;
    console.log(error);

    toast.error(message ?? 'Authorization failed');
    window.history.replaceState(null, '', routes.auth.signin());
  }, [params]);
}
