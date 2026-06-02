import { createEntityKeys } from 'shared/lib/utils';

export const boardFabricKeys = createEntityKeys('board', {
  byId: (id: string) => ['board', id],
});
