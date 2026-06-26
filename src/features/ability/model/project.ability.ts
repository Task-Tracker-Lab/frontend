import type { AbilityBuilder, MongoAbility } from '@casl/ability';
import { type TProject } from 'entities/project';
import { type AbilityState } from './store';
import { type Action } from './types';

export type Project = Pick<TProject.ProjectListItemResponse, 'role'>;

export type ProjectSubject = 'Project';
export type ProjectAction = 'publish' | 'archive' | 'share' | Action;

export type ProjectAbility = MongoAbility<[ProjectAction, ProjectSubject]>;

export function defineProjectRules(
  { teamRole }: AbilityState,
  { can }: AbilityBuilder<ProjectAbility>
) {
  if (teamRole === 'admin' || teamRole === 'owner') {
    // Пользователи с ролями администратор и владелец могут управлять любыми проектами
    can('manage', 'Project');
  }
}
