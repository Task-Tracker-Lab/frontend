'use client';

import { type TProject } from 'entities/project';
import { useFormContext, useFormState } from 'react-hook-form';
import { FloatingSaveBar } from 'shared/ui';
import { useUpdateProject } from '../../api/useUpdateProject';
import type { ProjectSettingsFormValues } from '../../model/settings';
import { useRouter } from 'next/navigation';
import { routes } from 'shared/config';

interface ProjectSettingsSaveBarProps {
  project: TProject.ProjectDetailResponse;
}

export function ProjectSettingsSaveBar({ project }: ProjectSettingsSaveBarProps) {
  const form = useFormContext<ProjectSettingsFormValues>();
  const { isDirty, dirtyFields, isValidating, isValid } = useFormState({ control: form.control });
  const router = useRouter();
  const updateProject = useUpdateProject({
    onSuccess: (_d, vars) => {
      form.reset(form.getValues());
      if (vars.slug) {
        router.replace(routes.team.project.settings(vars.slug));
      }
    },
  });

  const onSubmit = (data: ProjectSettingsFormValues) => {
    const body: TProject.UpdateProjectBody = {
      ...(dirtyFields.name && { name: data.name?.trim() }),
      ...(dirtyFields.slug && { slug: data.slug?.trim() }),
      ...(dirtyFields.description && {
        description: data.description?.trim() ? data.description.trim() : null,
      }),
      ...(dirtyFields.descriptionHtml && {
        descriptionHtml: data.descriptionHtml?.trim() ? data.descriptionHtml.trim() : null,
      }),
      ...(dirtyFields.icon && { icon: data.icon ?? null }),
      ...(dirtyFields.color && { color: data.color }),
      ...(dirtyFields.visibility && { visibility: data.visibility }),
      ...(dirtyFields.status && { status: data.status }),
      ...(dirtyFields.sequence && { sequence: data.sequence }),
      ...(dirtyFields.settings && { settings: data.settings }),
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
          slug: project.slug,
          description: project.description ?? '',
          descriptionHtml: project.descriptionHtml ?? '',
          icon: (project.visuals.icon ?? undefined) as ProjectSettingsFormValues['icon'],
          color: project.visuals.color,
          visibility: project.access.visibility,
          status: project.status === 'archived' ? 'archived' : 'active',
          sequence: project.meta.sequence,
          settings: project.settings,
        })
      }
      pending={updateProject.isPending || isValidating}
      disabledSave={!isValid}
    />
  );
}
