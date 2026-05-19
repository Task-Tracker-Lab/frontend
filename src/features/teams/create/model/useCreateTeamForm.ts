import { type TTeam, useCheckSlug, validateTeamSlugAsync } from 'entities/team';
import { useForm } from 'react-hook-form';
import { extractValidationIssues } from 'shared/api';
import { useZodValidationWithAsyncCheck } from 'shared/lib/hooks';
import { setFormErrors } from 'shared/lib/utils';
import { CreateTeamFormSchema } from './schemas';
import type { CreateTeamFormValues } from './types';
import { useCreateTeam, type UseCreateTeamOptions } from './useCreateTeam';

export function useCreateTeamForm(mutateOptions: UseCreateTeamOptions = {}) {
  const checkSlug = useCheckSlug('');

  const form = useForm<CreateTeamFormValues>({
    resolver: useZodValidationWithAsyncCheck(CreateTeamFormSchema, (...args) =>
      validateTeamSlugAsync(checkSlug, ...args)
    ),
    defaultValues: {
      name: '',
      description: '',
      slug: '',
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
      ...(data.slug?.trim() ? { slug: data.slug.trim() } : {}),
      tags: [''], //todo
    };

    createTeam.mutate(body);
  };

  return {
    form,
    isPending: createTeam.isPending,
    handleSubmit: form.handleSubmit(onSubmit),
  };
}
