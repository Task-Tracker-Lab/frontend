'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { Spinner } from 'shared/ui';
import { useSlugFieldStatus } from '../lib/useSlugFieldStatus';

interface SlugFieldStatusProps {
  slug: string;
  isDirty: boolean;
}

export function SlugFieldStatus({ slug, isDirty }: SlugFieldStatusProps) {
  const status = useSlugFieldStatus({ isDirty, slug });

  if (!status) {
    return null;
  }

  return (
    <>
      {status === 'pending' ? (
        <Spinner className="size-4" />
      ) : status === 'error' ? (
        <XCircle className="text-destructive size-4" />
      ) : (
        <CheckCircle className="size-4 text-green-500" />
      )}
    </>
  );
}
