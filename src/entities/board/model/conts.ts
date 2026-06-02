import { createEntityKeys } from 'shared/lib/utils';

export const boardFabricKeys = createEntityKeys('board', {
  detail: (projectId: string, id: string) => ['projects', projectId, 'boards', id],
  columns: (boardId: string) => ['boards', boardId, 'columns'],
  column: (boardId: string, id: string) => ['boards', boardId, 'columns', id],
  views: (boardId: string) => ['boards', boardId, 'views'],
  view: (boardId: string, id: string) => ['boards', boardId, 'views', id],
});
