import { createEntityKeys } from 'shared/lib/utils';

export const teamFabricKeys = createEntityKeys('team', {
  byId: (teamId: string) => ['teams', teamId],
  invitations: (teamId: string) => ['teams', teamId, 'invitations'],
  invitation: (teamId: string, code: string) => ['teams', teamId, 'invitations', code],
  members: (teamId: string) => ['teams', teamId, 'members'],
});
