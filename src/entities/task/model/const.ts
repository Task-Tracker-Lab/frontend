import { createEntityKeys } from 'shared/lib/utils';

export const taskFabricKeys = createEntityKeys('task', {
  list: () => ['teams', 'tasks'],
  detail: (taskId: string) => ['teams', 'projects', taskId],
});
