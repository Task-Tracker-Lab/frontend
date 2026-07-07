import { OAuthSection } from './oauth-section/OAuthSection';
import { ProfileSection } from './profile-section/ProfileSection';

function MePage() {
  return (
    <div className="max-w-5xl space-y-4 overflow-auto p-1 pb-4">
      <ProfileSection />
      <OAuthSection />
    </div>
  );
}

export { MePage };
