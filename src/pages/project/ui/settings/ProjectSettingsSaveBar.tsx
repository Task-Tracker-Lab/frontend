'use client';

import { type TProject } from 'entities/project';
import { useFormContext, useFormState } from 'react-hook-form';
import { FloatingSaveBar } from 'shared/ui';
import { useUpdateProject } from '../../api/useUpdateProject';
import type { ProjectSettingsFormValues } from '../../model/settings';

interface ProjectSettingsSaveBarProps {
  project: TProject.ProjectDetailResponse;
}

export function ProjectSettingsSaveBar({ project }: ProjectSettingsSaveBarProps) {
  const form = useFormContext<ProjectSettingsFormValues>();
  const { isDirty, dirtyFields, isValidating, isValid } = useFormState({ control: form.control });

  const updateProject = useUpdateProject({
    onSuccess: () => {
      form.reset(form.getValues());
    },
  });

  const onSubmit = (data: ProjectSettingsFormValues) => {
    const body: TProject.UpdateProjectBody = {
      ...(dirtyFields.name && { name: data.name.trim() }),
      ...(dirtyFields.key && { key: data.key.trim().toUpperCase() }),
      ...(dirtyFields.description && {
        description: data.description?.trim() ? data.description.trim() : null,
      }),
      ...(dirtyFields.icon && { icon: data.icon ?? null }),
      ...(dirtyFields.color && { color: data.color }),
      ...(dirtyFields.visibility && { visibility: data.visibility }),
      ...(dirtyFields.status && { status: data.status }),
    };

    if (Object.keys(body).length === 0) {
      return;
    }

    updateProject.mutate(body);
  };

  return (
    <FloatingSaveBar
      visible={isDirty}
      onSave={form.handleSubmit(onSubmit)}
      onDiscard={() =>
        form.reset({
          name: project.name,
          key: project.key,
          description: project.description ?? '',
          icon: (project.visuals.icon ?? undefined) as ProjectSettingsFormValues['icon'],
          color: project.visuals.color,
          visibility: project.access.visibility,
          status: project.status === 'archived' ? 'archived' : 'active',
        })
      }
      pending={updateProject.isPending || isValidating}
      disabledSave={!isValid}
    />
  );
}
