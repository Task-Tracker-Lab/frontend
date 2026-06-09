'use client';

import dynamic from 'next/dynamic';
import { TeamsPageFallback } from './TeamsPageFallback';

const TeamsPageContent = dynamic(
  () => import('./TeamsPageContent').then((mod) => mod.TeamsPageContent),
  {
    ssr: false,
    loading: () => <TeamsPageFallback />,
  }
);

export function TeamsPage() {
  return <TeamsPageContent />;
}
