import { PageLayout } from 'app/layouts/PageLayout';
import { teamTabs } from 'pages/team';
import { Badge } from 'shared/ui';

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout
      title="Управление командой"
      description="Управляйте участниками команды, ожидающими приглашениями, ролями и правами доступа."
      badge={<Badge variant="secondary">8 участников</Badge>}
      tabs={teamTabs}
    >
      {children}
    </PageLayout>
  );
}
