'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLayoutEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { PageWrapper } from 'widgets/page-wrapper';
import { useQueryTeam } from '../api/useQueryTeam';
import { TeamSettingsFormSchema, type TeamSettingsFormValues } from '../model/types';
import { DangerZone } from './DangerZone';
import { SaveBar } from './SaveBar';
import { TeamIdentity } from './TeamIdentity';

export function SettingsPageContent() {
  const { data: team } = useQueryTeam();

  const form = useForm<TeamSettingsFormValues>({
    resolver: zodResolver(TeamSettingsFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const { reset } = form;

  useLayoutEffect(() => {
    reset({
      name: team.name,
      description: team.description || '',
    });
  }, [reset, team]);

  return (
    <PageWrapper
      title="Настройки"
      description="Измените название, описание и другие параметры команды"
    >
      <FormProvider {...form}>
        <form className="space-y-5">
          <TeamIdentity team={team} />
          <DangerZone teamName={team.name} teamId={team.id} />
        </form>
        <SaveBar team={team} />
      </FormProvider>
    </PageWrapper>
  );
}
