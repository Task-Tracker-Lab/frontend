'use client';

import dynamic from 'next/dynamic';
import { ErrorFallback } from 'widgets/error-state';
import { OAuthSectionFallback } from './OAuthSectionFallback';

const OAuthSectionContent = dynamic(
  () => import('./OAuthSectionContent').then((mod) => mod.OAuthSectionContent),
  {
    ssr: false,
    loading: () => <OAuthSectionFallback />,
  }
);

export function OAuthSection() {
  return (
    <ErrorFallback>
      <OAuthSectionContent />
    </ErrorFallback>
  );
}
