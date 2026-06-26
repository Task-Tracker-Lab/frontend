'use client';
import { useAbility as useCaslAbility } from '@casl/react';
import { TeamAbility } from '../model/team.ability';
import { ProjectAbility } from '../model/project.ability';

type SubjectMap = {
  Team: TeamAbility;
  Project: ProjectAbility;
};

export function useAbility<T extends keyof SubjectMap>(_subject: T) {
  return useCaslAbility<SubjectMap[T]>();
}
