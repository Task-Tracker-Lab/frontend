import { createEntityKeys } from 'shared/lib/utils';

export const MIN_SLUG_LENGTH = 2;
export const MAX_SLUG_LENGTH = 100;

export const teamFabricKeys = createEntityKeys('team', {
  bySlug: (slug: string) => ['teams', slug],
  checkSlug: (slug?: string) => ['teams', 'check-slug', slug].filter(Boolean),
  invitations: (slug: string) => ['teams', slug, 'invitations'],
  invitation: (slug: string, code: string) => ['teams', slug, 'invitations', code],
  members: (slug: string) => ['teams', slug, 'members'],
});
