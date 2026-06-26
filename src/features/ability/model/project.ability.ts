import { AbilityBuilder, MongoAbility } from '@casl/ability';
import { TProject } from 'entities/project';
import { UseAbilityStates as AbilityContext } from './store';
import { Action } from './types';

export type Project = Pick<TProject.ProjectListItemResponse, 'role'>;

export type ProjectSubject = 'Project';
export type ProjectAction = 'publish' | 'archive' | 'share' | Action;

export type ProjectAbility = MongoAbility<[ProjectAction, ProjectSubject]>;

export function defineProjectRules(
  user: AbilityContext['user'],
  { can }: AbilityBuilder<ProjectAbility>
) {
  if (user?.teamRole === 'admin' || user?.teamRole === 'owner') {
    can('manage', 'Project');
  }
}
