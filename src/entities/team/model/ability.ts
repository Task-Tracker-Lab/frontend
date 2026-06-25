import {
  createMongoAbility,
  AbilityBuilder,
  subject,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
import { TeamMemberResponse } from './types';
import { defineTeamMemberRules, UserContext } from './permissions';
import { TeamRole } from '../model/types';

export type WithSubjectType<T, S extends string = string> = T & {
  readonly __caslSubjectType__: S;
};

type TeamMember = WithSubjectType<TeamMemberResponse, 'TeamMember'>;

export type TeamMemberActions = 'invite' | 'delete' | 'changeRole' | 'changeStatus';
export type TeamMemberSubjects = InferSubjects<TeamMember>;

export type TeamMemberAbility = MongoAbility<[TeamMemberActions, TeamMemberSubjects]>;

const teamSubject = (member: NonNullable<TeamMemberResponse>) => subject('TeamMember', member);

const defineTeamMemberAbility = (user: UserContext | null, teamRole: TeamRole | null) => {
  const builder = new AbilityBuilder<TeamMemberAbility>(createMongoAbility);
  defineTeamMemberRules(user, teamRole, builder);
  return builder.build();
};

export { defineTeamMemberAbility, teamSubject };
