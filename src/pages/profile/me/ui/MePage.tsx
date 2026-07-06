'use client';
import dynamic from 'next/dynamic';
import { MePageFallback } from './MePageFallback';

const MePageContent = dynamic(() => import('./MePageContent').then((mod) => mod.MePage), {
  ssr: false,
  loading: () => <MePageFallback />,
});

function MePage() {
  return <MePageContent />;
}

export { MePage };
