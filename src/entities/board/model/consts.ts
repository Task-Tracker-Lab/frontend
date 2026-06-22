import { createEntityKeys } from 'shared/lib/utils';

export const boardFabricKeys = createEntityKeys('board', {
  detail: (slug: string, id: string) => ['projects', slug, 'boards', id],
  columns: (slug: string) => ['boards', slug, 'columns'],
  column: (slug: string, id: string) => ['boards', slug, 'columns', id],
  views: (slug: string) => ['boards', slug, 'views'],
  view: (slug: string, id: string) => ['boards', slug, 'views', id],
  tasks: (boardSlug: string) => ['board', boardSlug, 'tasks'],
  task: (columnId: string, taskId: string) => ['columns', columnId, 'tasks', taskId],
});
