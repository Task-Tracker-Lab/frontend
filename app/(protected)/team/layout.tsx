import { TabsNav } from 'pages/team';
import { PageLayout } from 'app/layouts/PageLayout';
import { Badge } from 'shared/ui';

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout
      title="Управление командой"
      description="Управляйте участниками рабочего пространства, ожидающими приглашениями, ролями и правами доступа."
      badge={<Badge variant="secondary">8 участников</Badge>}
      nav={<TabsNav />}
    >
      {children}
    </PageLayout>
  );
}
