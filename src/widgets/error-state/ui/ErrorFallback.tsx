'use client';

import { unstable_catchError as catchError, type ErrorInfo } from 'next/error';
import { ComponentProps } from 'react';
import { ErrorState } from './ErrorState';

function ErrorFallback(props: ComponentProps<typeof ErrorState>, { unstable_retry }: ErrorInfo) {
  return <ErrorState onRetry={() => unstable_retry()} {...props} />;
}

export default catchError(ErrorFallback);
