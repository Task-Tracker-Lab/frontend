import { createEntityKeys } from 'shared/lib/utils';

export const userFabricKeys = createEntityKeys('user', {
  me: () => ['users', 'me'],
  meActivity: () => ['users', 'me', 'activity'],
  myTeams: () => ['users', 'me', 'teams'],
  myInvitations: () => ['users', 'me', 'invitations'],
});
