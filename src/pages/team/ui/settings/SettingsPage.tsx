'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryTeam } from '../../api/useQueryTeam';
import { TeamSettingsFormSchema, type TeamSettingsFormValues } from '../../model/settings';
import { DangerZone } from './DangerZone';
import { SaveBar } from './SaveBar';
import { TeamIdentity } from './TeamIdentity';
import { DangerZoneSkeleton } from './skeletons/DangerZone.skeleton';
import { TeamIdentitySkeleton } from './skeletons/TeamIdentity.skeleton';
import { zodResolver } from '@hookform/resolvers/zod';

export function Settings() {
  const teamQuery = useQueryTeam();
  const team = teamQuery.data;

  const form = useForm<TeamSettingsFormValues>({
    resolver: zodResolver(TeamSettingsFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (team) {
      reset({
        name: team.name,
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
          {team ? <DangerZone teamName={team?.name} teamId={team?.id} /> : <DangerZoneSkeleton />}
        </form>
        {team ? <SaveBar team={team} /> : null}
      </FormProvider>
    </>
  );
}
