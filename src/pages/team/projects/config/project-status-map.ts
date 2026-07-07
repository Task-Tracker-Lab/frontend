import type { TProject } from 'entities/project';
import type { Badge } from 'shared/ui';

type ProjectStatusMeta = {
  label: string;
  variant: React.ComponentProps<typeof Badge>['variant'];
};

export const projectStatusMap: Record<TProject.ProjectStatus, ProjectStatusMeta> = {
  active: { label: 'Активный', variant: 'secondary' },
  archived: { label: 'Архив', variant: 'outline' },
  template: { label: 'Шаблон', variant: 'outline' },
  deleted: { label: 'Удален', variant: 'destructive' },
};
