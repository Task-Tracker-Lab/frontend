import { type TTeam } from 'entities/team';
import { useForm } from 'react-hook-form';
import { extractValidationIssues } from 'shared/api';
import { setFormErrors } from 'shared/lib/utils';
import { CreateTeamFormSchema } from './schemas';
import type { CreateTeamFormValues } from './types';
import { useCreateTeam, type UseCreateTeamOptions } from '../api/useCreateTeam';
import { zodResolver } from '@hookform/resolvers/zod';

export function useCreateTeamForm(mutateOptions: UseCreateTeamOptions = {}) {
  const form = useForm<CreateTeamFormValues>({
    resolver: zodResolver(CreateTeamFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const createTeam = useCreateTeam({
    ...mutateOptions,
    meta: {
      skipGlobalValidationToast: true,
    },
    onError: (err, ...args) => {
      mutateOptions.onError?.(err, ...args);
      setFormErrors(extractValidationIssues(err), form);
    },
  });

  const onSubmit = (data: CreateTeamFormValues) => {
    const body: TTeam.CreateTeamBody = {
      name: data.name.trim(),
      description: data.description.trim(),
    };

    createTeam.mutate(body);
  };

  return {
    form,
    isPending: createTeam.isPending,
    handleSubmit: form.handleSubmit(onSubmit),
  };
}
