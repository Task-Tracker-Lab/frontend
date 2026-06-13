'use client';

import { type Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export function QueryParamsHandler() {
  const params = useSearchParams();
  const isShowToast = useRef(false);
  const router = useRouter();
  useEffect(() => {
    const success = params?.get('success');
    const message = params?.get('message');

    if (isShowToast.current || !success) return;

    if (success === 'true' && message) {
      toast.success(message);
    } else if (success === 'false' && message) {
      toast.error(message);
    }
    isShowToast.current = true;
    router.replace(location.pathname as Route);
  }, [params, router]);
  return null;
}
