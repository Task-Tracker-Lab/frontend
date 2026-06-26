import type { AbilityBuilder } from '@casl/ability';
import { type MongoAbility, subject } from '@casl/ability';
import { type AbilityState } from './store';
import { type InferSubjects } from '@casl/ability';
import { type TTeam } from 'entities/team';
import { type Action } from './types';
import { type WithSubjectType } from '../lib/with-subject-type';

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

export function defineTeamRules({ teamRole }: AbilityState, { can }: AbilityBuilder<TeamAbility>) {
  const isAdmin = teamRole === 'admin';
  const isOwner = teamRole === 'owner';

  if (isAdmin) {
    // Если пользователь администратор, он может (can) управлять (manage) участниками с ролями member и viewer (role: { $in: ['member', 'viewer'] })
    can('manage', 'TeamMember', {
      role: { $in: ['member', 'viewer'] },
    });
  }
  if (isOwner) {
    // Если пользователь владелец, он может  управлять участниками с ролями member, viewer и admin
    can('manage', 'TeamMember', {
      role: { $in: ['admin', 'member', 'viewer'] },
    });
  }

  if (isAdmin || isOwner) {
    // Пользователь с ролью администратор и владелец могут изменять настройки любой команды
    can('update', 'TeamSettings');
  }
}

// - Владелец может управлять всеми участниками
// - Администратор может управлять всеми участниками, кроме владельца
// - Участник и гость ничего не могут
