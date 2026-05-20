'use client';

import { useCheckSlug, validateTeamSlugAsync } from 'entities/team';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useZodValidationWithAsyncCheck } from 'shared/lib/hooks';
import { useQueryTeam } from '../../api/useQueryTeam';
import { TeamSettingsFormSchema, type TeamSettingsFormValues } from '../../model/settings';
import { DangerZone } from './DangerZone';
import { DefaultSettings } from './DefaultSettings';
import { InvitationSecurity } from './InvitationSecurity';
import { SaveBar } from './SaveBar';
import { TeamIdentity } from './TeamIdentity';
import { DangerZoneSkeleton } from './skeletons/DangerZone.skeleton';
import { DefaultSettingsSkeleton } from './skeletons/DefaultSettings.skeleton';
import { InvitationSecuritySkeleton } from './skeletons/InvitationSecurity.skeleton';
import { TeamIdentitySkeleton } from './skeletons/TeamIdentity.skeleton';

export function Settings() {
  const teamQuery = useQueryTeam();
  const team = teamQuery.data;
  const checkSlug = useCheckSlug(team?.slug ?? '');

  const form = useForm<TeamSettingsFormValues>({
    resolver: useZodValidationWithAsyncCheck(TeamSettingsFormSchema, (...args) =>
      validateTeamSlugAsync(checkSlug, ...args)
    ),
    mode: 'onChange',
    defaultValues: {
      name: '',
      slug: '',
      //todo tags
      description: '',
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (team) {
      reset({
        name: team.name,
        slug: team.slug,
        //todo tags
        description: team.description || '',
      });
    }
  }, [reset, team]);

  if (teamQuery.isError) {
    return (
      <p className="text-muted-foreground text-sm">
        Не удалось загрузить данные команды. Попробуйте обновить страницу.
      </p>
    );
  }

  return (
    <>
      <FormProvider {...form}>
        <form className="space-y-5">
          {team ? <TeamIdentity team={team} /> : <TeamIdentitySkeleton />}
          {team ? <DefaultSettings /> : <DefaultSettingsSkeleton />}
          {team ? <InvitationSecurity /> : <InvitationSecuritySkeleton />}
          {team ? <DangerZone teamName={team?.name} slug={team?.slug} /> : <DangerZoneSkeleton />}
        </form>
        {team ? <SaveBar team={team} /> : null}
      </FormProvider>
    </>
  );
}
