import { TTask } from 'entities/task';
import type { Badge } from 'shared/ui';

type TaskPriorityMeta = {
  label: string;
  variant: React.ComponentProps<typeof Badge>['variant'];
};

export const taskPriorityMap: Record<TTask.IssuePriority, TaskPriorityMeta> = {
  critical: { label: 'Критический', variant: 'destructive' },
  high: { label: 'Высокий', variant: 'destructive' },
  medium: { label: 'Средний', variant: 'secondary' },
  low: { label: 'Низкий', variant: 'default' },
};
