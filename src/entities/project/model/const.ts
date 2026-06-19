import { createEntityKeys } from 'shared/lib/utils';

export const PROJECT_STATUSES = ['active', 'archived', 'template', 'deleted'] as const;
export const PROJECT_VISIBILITIES = ['public', 'private'] as const;
export const LAYOUTS = ['kanban', 'list', 'calendar', 'gantt'] as const;
export const MEMBER_ROLE = ['owner', 'admin', 'member', 'viewer'] as const;
export const MIN_SLUG_LENGTH = 1 as const;
export const MAX_SLUG_LENGTH = 100 as const;

export const projectFabricKeys = createEntityKeys('project', {
  list: (teamId: string) => ['teams', teamId, 'projects'],
  detail: (teamId: string, slug: string) => ['teams', teamId, 'projects', slug],
  checkSlug: (teamId?: string, slug?: string) =>
    ['teams', teamId, 'projects', 'check-slug', slug].filter(Boolean),
});
