'use client';

import { AbilityProvider as CaslAbilityProvider } from '@casl/react';
import { type PropsWithChildren, useEffect, useState } from 'react';
import {
  defineTeamRules,
  type TeamAbility,
  type TeamAction,
  type TeamSubject,
} from '../model/team.ability';
import type { AbilityState } from '../model/store';
import { useAbilityStore } from '../model/store';
import type { ProjectAbility, ProjectAction, ProjectSubject } from '../model/project.ability';
import { defineProjectRules } from '../model/project.ability';
import { createBuilder } from '../lib/create-builder';
import type { AbilityBuilder } from '@casl/ability';
import { type MongoAbility } from '@casl/ability';
import { useShallow } from 'zustand/shallow';

export type AppAbility = MongoAbility<[TeamAction, TeamSubject] | [ProjectAction, ProjectSubject]>;

export function AbilityProvider({ children }: PropsWithChildren) {
  const user = useAbilityStore(
    useShallow(
      ({ userId, teamRole, projectRole }): AbilityState => ({ userId, teamRole, projectRole })
    )
  );

  const [ability] = useState(() => {
    const builder = createBuilder();
    defineProjectRules(user, builder as AbilityBuilder<ProjectAbility>);
    defineTeamRules(user, builder as AbilityBuilder<TeamAbility>);
    return builder.build();
  });

  useEffect(() => {
    const builder = createBuilder();
    defineProjectRules(user, builder as AbilityBuilder<ProjectAbility>);
    defineTeamRules(user, builder as AbilityBuilder<TeamAbility>);
    ability.update(builder.rules);
  }, [ability, user]);

  return <CaslAbilityProvider value={ability}>{children}</CaslAbilityProvider>;
}
