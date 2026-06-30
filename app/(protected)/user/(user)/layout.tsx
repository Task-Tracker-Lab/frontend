import { PageLayout } from 'app/layouts/PageLayout';
import { Bell, Settings } from 'lucide-react';
import { routes } from 'shared/config';
import { VerticalTabsNav, type TabNavItem } from 'widgets/tabs-nav';

export const tabs: TabNavItem[] = [
  { key: routes.user.profile(), label: 'Основные настройки', icon: <Settings /> },
  { key: routes.user.notifications(), label: 'Уведомления', icon: <Bell /> },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout
      title="Профиль"
      description="Управляйте данными аккаунта, безопасностью и уведомлениями."
    >
      <div className="grid gap-4 lg:grid-cols-[max-content_1fr]">
        <VerticalTabsNav className="max-lg:flex-row" tabs={tabs} />
        {children}
      </div>
    </PageLayout>
  );
}
