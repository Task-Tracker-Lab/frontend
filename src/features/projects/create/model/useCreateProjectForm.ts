import { zodResolver } from '@hookform/resolvers/zod';
import { type TProject } from 'entities/project';
import { useTeamStore } from 'entities/team';
import { useForm } from 'react-hook-form';
import { extractValidationIssues } from 'shared/api';
import { setFormErrors } from 'shared/lib/utils';
import { getDefaultCreateProjectValues } from './default-values';
import { CreateProjectFormSchema } from './schemas';
import type { CreateProjectFormValues } from './types';
import { useCreateProject, type UseCreateProjectOptions } from './useCreateProject';

export function useCreateProjectForm(options: UseCreateProjectOptions = {}) {
  const teamSlug = useTeamStore.use.slug();

  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(CreateProjectFormSchema),
    defaultValues: getDefaultCreateProjectValues(),
  });

  const createProject = useCreateProject({
    ...options,
    meta: {
      skipGlobalValidationToast: true,
    },
    onError: (err, ...args) => {
      options.onError?.(err, ...args);
      setFormErrors(extractValidationIssues(err), form);
    },
  });

  const onSubmit = (data: CreateProjectFormValues) => {
    if (!teamSlug) return;

    const body: TProject.CreateProjectBody = {
      name: data.name.trim(),
      key: data.key.trim().toUpperCase(),
      visibility: data.visibility ?? 'private',
      ...(data.description?.trim() ? { description: data.description.trim() } : {}),
      ...(data.icon ? { icon: data.icon } : {}),
      ...(data.color ? { color: data.color } : {}),
    };

    createProject.mutate({ teamSlug, body });
  };

  return {
    form,
    teamSlug,
    isPending: createProject.isPending,
    handleSubmit: form.handleSubmit(onSubmit),
  };
}
