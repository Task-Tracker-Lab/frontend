import { AccountSectionFallback } from './account-section/AccountSectionFallback';
import { MePageLayout } from './MePageContent';
import { ProfileSectionFallback } from './profile-section/ProfileSectionFallback';

export function MePageFallback() {
  return (
    <MePageLayout>
      <ProfileSectionFallback />
      <AccountSectionFallback />
    </MePageLayout>
  );
}
