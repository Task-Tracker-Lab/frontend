'use client';

import { useTeamsQueryWithTeamIdSync } from '../model/useTeamsQueryWithTeamIdSync';

export function TeamIdSync() {
  useTeamsQueryWithTeamIdSync();
  return null;
}
