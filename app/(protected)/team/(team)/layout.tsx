import { PageLayout } from 'app/layouts/PageLayout';
import { Badge } from 'shared/ui';
import { teamTabs } from 'pages/team';

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout
      title="Управление командой"
      description="Управляйте участниками рабочего пространства, ожидающими приглашениями, ролями и правами доступа."
      badge={<Badge variant="secondary">8 участников</Badge>}
      tabs={teamTabs}
    >
      {children}
    </PageLayout>
  );
}
