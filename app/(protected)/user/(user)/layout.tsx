import { PageLayout } from 'app/layouts/PageLayout';
import { profileTabs } from 'pages/profile';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout
      title="Профиль"
      description="Управляйте данными аккаунта, безопасностью и уведомлениями."
      tabs={profileTabs}
    >
      {children}
    </PageLayout>
  );
}
