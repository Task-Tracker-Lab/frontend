'use client';

import dynamic from 'next/dynamic';
import { ErrorFallback } from 'widgets/error-state';
import { ProfileSectionFallback } from './ProfileSectionFallback';

const ProfileSectionContent = dynamic(
  () => import('./ProfileSectionContent').then((mod) => mod.ProfileSectionContent),
  {
    ssr: false,
    loading: () => <ProfileSectionFallback />,
  }
);

export function ProfileSection() {
  return (
    <ErrorFallback>
      <ProfileSectionContent />
    </ErrorFallback>
  );
}
