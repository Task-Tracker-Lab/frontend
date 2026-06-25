import { AbilityBuilder } from '@casl/ability';
import { TeamMemberAbility } from './ability';
import { TeamRole } from './types';

export type UserContext = { id: string };

export function defineTeamMemberRules(
  user: UserContext | null,
  teamRole: TeamRole | null,
  { can, cannot }: AbilityBuilder<TeamMemberAbility>
) {
  cannot('delete', 'TeamMember', { role: 'owner' });

  if (teamRole === 'admin') {
    can(['changeRole', 'changeStatus', 'delete', 'invite'], 'TeamMember', {
      role: { $in: ['member', 'viewer'] },
    });
  }
  if (teamRole === 'owner') {
    can(['changeRole', 'changeStatus', 'delete', 'invite'], 'TeamMember', {
      role: { $in: ['admin', 'member', 'viewer'] },
    });
  }

  cannot(['changeRole', 'changeStatus', 'delete'], 'TeamMember', {
    id: user?.id,
  });
}

// - Владелец может управлять всеми участниками
// - Администратор может управлять всеми участниками, кроме владельца
// - Участник и гость ничего не могут
