'use client';

import { useTeamsQueryWithSlugSync } from '../model/useTeamsQueryWithSlugSync';

export function TeamSlugSync() {
  useTeamsQueryWithSlugSync();
  return null;
}
