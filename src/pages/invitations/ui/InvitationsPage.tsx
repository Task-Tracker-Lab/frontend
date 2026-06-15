'use client';

import dynamic from 'next/dynamic';
import { InvitationsPageFallback } from './InvitationsPageFallback';

const InvitationsPageContent = dynamic(
  () => import('./InvitationsPageContent').then((mod) => mod.InvitationsPageContent),
  {
    ssr: false,
    loading: () => <InvitationsPageFallback />,
  }
);

export function InvitationsPage() {
  return <InvitationsPageContent />;
}
