'use client';

import dynamic from 'next/dynamic';
import { MembersPageFallback } from './MembersPageFallback';

const MembersPageContent = dynamic(
  () => import('./MembersPageContent').then((mod) => mod.MembersPageContent),
  {
    ssr: false,
    loading: () => <MembersPageFallback />,
  }
);

export function MembersPage() {
  return <MembersPageContent />;
}
