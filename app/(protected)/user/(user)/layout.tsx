import { Bell, Settings } from 'lucide-react';
import { routes } from 'shared/config';
import { PageWrapper } from 'widgets/page-wrapper';
import { VerticalTabsNav, type TabNavItem } from 'widgets/tabs-nav';

export const tabs: TabNavItem[] = [
  { key: routes.user.profile(), label: 'Основные настройки', icon: <Settings /> },
  { key: routes.user.notifications(), label: 'Уведомления', icon: <Bell /> },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper
      title="Профиль"
      description="Управляйте данными аккаунта, безопасностью и уведомлениями."
      className="h-full overflow-auto"
      wrap={{ className: 'h-full pb-0' }}
    >
      <div className="grid h-full gap-4 max-lg:grid-rows-[max-content_1fr] lg:grid-cols-[max-content_1fr]">
        <VerticalTabsNav className="max-lg:flex-row" tabs={tabs} />
        {children}
      </div>
    </PageWrapper>
  );
}
