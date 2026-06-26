'use client';
import { useAbility as useCaslAbility } from '@casl/react';
import { type TeamAbility } from '../model/team.ability';
import { type ProjectAbility } from '../model/project.ability';

type SubjectMap = {
  Team: TeamAbility;
  Project: ProjectAbility;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useAbility<T extends keyof SubjectMap>(_subject: T) {
  return useCaslAbility<SubjectMap[T]>();
}
