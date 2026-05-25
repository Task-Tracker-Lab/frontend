import { createEntityKeys } from 'shared/lib/utils';

export const projectFabricKeys = createEntityKeys('project', {
  list: (teamSlug: string) => ['teams', teamSlug, 'projects'],
  detail: (teamSlug: string, id: string) => ['teams', teamSlug, 'projects', id],
});
