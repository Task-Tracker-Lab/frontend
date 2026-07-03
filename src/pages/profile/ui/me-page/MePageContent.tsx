'use client';

import { type PropsWithChildren, Suspense } from 'react';
import { QueryParamsHandler } from 'features/handle-query-params';
import { ProfileSection } from './profile-section/ProfileSection';
import { AccountSection } from './account-section/AccountSection';
import { ProfileSectionFallback } from './profile-section/ProfileSectionFallback';

function MePage() {
  return (
    <>
      <Suspense>
        <QueryParamsHandler />
      </Suspense>
      <MePageLayout>
        <Suspense fallback={<ProfileSectionFallback />}>
          <ProfileSection />
        </Suspense>
        <AccountSection />
      </MePageLayout>
    </>
  );
}

function MePageLayout({ children }: PropsWithChildren) {
  return <div className="max-w-5xl space-y-4 overflow-auto p-1 pb-4">{children}</div>;
}

export { MePage, MePageLayout };
