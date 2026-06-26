import { AbilityBuilder, type MongoAbility, subject } from '@casl/ability';
import { type UseAbilityStates as AbilityContext } from './store';
import type { InferSubjects } from '@casl/ability';
import { TTeam } from 'entities/team';
import { Action } from './types';
import { WithSubjectType } from '../lib/with-subject-type';

export const SUBJECTS = {
  'team.settings': 'TeamSettings',
  'team.member': 'TeamMember',
} as const;

export type SubjectsType = typeof SUBJECTS;

export type TeamMember = TTeam.TeamMemberResponse;
export type TeamSettings = TTeam.UpdateTeamBody;

export type TeamAction = 'invite' | Action;

export type TeamSubject = InferSubjects<
  | WithSubjectType<TeamMember, SubjectsType['team.member']>
  | WithSubjectType<TeamSettings, SubjectsType['team.settings']>
>;

export type TeamAbility = MongoAbility<[TeamAction, TeamSubject]>;

export const teamSubject = (member: NonNullable<TeamMember>) => subject('TeamMember', member);
export const teamSettingsSubject = (settings: NonNullable<TeamSettings>) =>
  subject('TeamSettings', settings);

export function defineTeamRules(
  user: AbilityContext['user'],
  { can }: AbilityBuilder<TeamAbility>
) {
  if (user?.teamRole === 'admin') {
    can('manage', 'TeamMember', {
      role: { $in: ['member', 'viewer'] },
    });
  }
  if (user?.teamRole === 'owner') {
    can('manage', 'TeamMember', {
      role: { $in: ['admin', 'member', 'viewer'] },
    });
  }

  if (user?.teamRole === 'admin' || user?.teamRole === 'owner') {
    can('update', 'TeamSettings');
  }
}

// - Владелец может управлять всеми участниками
// - Администратор может управлять всеми участниками, кроме владельца
// - Участник и гость ничего не могут
