import { createEntityKeys } from 'shared/lib/utils';

export const projectFabricKeys = createEntityKeys('project', {
  list: (teamId: string) => ['teams', teamId, 'projects'],
  detail: (teamId: string, id: string) => ['teams', teamId, 'projects', id],
});
