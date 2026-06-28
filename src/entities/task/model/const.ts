import { createEntityKeys } from 'shared/lib/utils';

export const taskFabricKeys = createEntityKeys('task', {
  list: (projectSlug: string, boardSlug: string, params?: Record<string, unknown>) => [
    'projects',
    projectSlug,
    'boards',
    boardSlug,
    'issues',
    params ?? {},
  ],
  detail: (projectSlug: string, boardSlug: string, taskId: string) => [
    'projects',
    projectSlug,
    'boards',
    boardSlug,
    'issues',
    taskId,
  ],
});
