'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryTeam } from '../../api/useQueryTeam';
import { TeamSettingsFormSchema, type TeamSettingsFormValues } from '../../model/settings';
import { DangerZone } from './DangerZone';
import { DefaultSettings } from './DefaultSettings';
import { InviteSecurity } from './InviteSecurity';
import { SaveBar } from './SaveBar';
import { TeamIdentity } from './TeamIdentity';
import { DangerZoneSkeleton } from './skeletons/DangerZone.skeleton';
import { DefaultSettingsSkeleton } from './skeletons/DefaultSettings.skeleton';
import { InviteSecuritySkeleton } from './skeletons/InviteSecurity.skeleton';
import { TeamIdentitySkeleton } from './skeletons/TeamIdentity.skeleton';

export function Settings() {
  const teamQuery = useQueryTeam();
  const team = teamQuery.data;

  const form = useForm<TeamSettingsFormValues>({
    resolver: zodResolver(TeamSettingsFormSchema),
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
          {team ? <InviteSecurity /> : <InviteSecuritySkeleton />}
          {team ? <DangerZone teamName={team?.name} slug={team?.slug} /> : <DangerZoneSkeleton />}
        </form>
        {team ? <SaveBar team={team} /> : null}
      </FormProvider>
    </>
  );
}
