import { Bell, Settings } from 'lucide-react';
import { routes } from 'shared/config';
import { PageWrapper } from 'widgets/page-wrapper';
import { type TabNavItem, VerticalTabsNav } from 'widgets/tabs-nav';

const tabs: TabNavItem[] = [
  { key: routes.user.profile(), label: 'Основные настройки', icon: <Settings /> },
  { key: routes.user.notifications(), label: 'Уведомления', icon: <Bell /> },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper
      title="Профиль"
      description="Управляйте данными аккаунта, безопасностью и уведомлениями."
    >
      <div className="grid grid-cols-[auto_1fr] gap-2 lg:gap-4">
        <VerticalTabsNav className="sticky top-4 z-10 self-start" tabs={tabs} />
        {children}
      </div>
    </PageWrapper>
  );
}
