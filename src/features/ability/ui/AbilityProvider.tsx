'use client';

import { AbilityProvider as CaslAbilityProvider } from '@casl/react';
import { AbilityBuilder, MongoAbility } from '@casl/ability';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { defineTeamRules, TeamAbility, TeamAction, TeamSubject } from '../model/team.ability';
import { useAbilityStore } from '../model/store';
import {
  defineProjectRules,
  ProjectAbility,
  ProjectAction,
  ProjectSubject,
} from '../model/project.ability';
import { createBuilder } from '../lib/create-builder';

export type AppAbility = MongoAbility<[TeamAction, TeamSubject] | [ProjectAction, ProjectSubject]>;

const builder = createBuilder();

export function AbilityProvider({ children }: PropsWithChildren) {
  const mounted = useRef(false);
  const user = useAbilityStore((s) => s.user);

  defineProjectRules(user, builder as AbilityBuilder<ProjectAbility>);
  defineTeamRules(user, builder as AbilityBuilder<TeamAbility>);

  const ability = builder.build();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    ability.update(builder.rules);
    console.log('updated');
  }, [ability, user]);

  return <CaslAbilityProvider value={ability}>{children}</CaslAbilityProvider>;
}
