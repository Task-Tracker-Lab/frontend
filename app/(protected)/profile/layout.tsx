import { PageLayout } from 'app/layouts/PageLayout';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout title="Профиль" description="Основная информация аккаунта и настройки языка.">
      {children}
    </PageLayout>
  );
}
