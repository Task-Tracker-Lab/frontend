import { createEntityKeys } from 'shared/lib/utils';

export const teamFabricKeys = createEntityKeys('team', {
  bySlug: (slug: string) => ['teams', slug],
  checkSlug: (slug: string) => ['teams', 'check-slug', slug],
  invitations: (slug: string) => ['teams', slug, 'invitations'],
  invitation: (slug: string, code: string) => ['teams', slug, 'invitations', code],
  members: (slug: string) => ['teams', slug, 'members'],
  projects: (slug: string) => ['teams', slug, 'projects'],
  project: (slug: string, id: string) => ['teams', slug, 'projects', id],
});
