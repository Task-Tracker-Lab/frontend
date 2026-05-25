'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectIdentityFields, VisibilityPicker } from 'features/projects/create';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  CardSection,
  Field,
  FieldError,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from 'shared/ui';
import { useTeamStore } from 'entities/team';
import { useQueryProject } from '../../api/useQueryProject';
import { ProjectSettingsFormSchema, type ProjectSettingsFormValues } from '../../model/settings';
import { ProjectDangerZone } from './ProjectDangerZone';
import { ProjectSettingsSaveBar } from './ProjectSettingsSaveBar';

export function ProjectSettingsPage() {
  const teamSlug = useTeamStore.use.slug();
  const projectQuery = useQueryProject();
  const project = projectQuery.data;

  const form = useForm<ProjectSettingsFormValues>({
    resolver: zodResolver(ProjectSettingsFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      key: '',
      description: '',
      visibility: 'private',
      status: 'active',
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        key: project.key,
        description: project.description ?? '',
        icon: (project.visuals.icon ?? undefined) as ProjectSettingsFormValues['icon'],
        color: project.visuals.color,
        visibility: project.access.visibility,
        status: project.status === 'archived' ? 'archived' : 'active',
      });
    }
  }, [reset, project]);

  if (projectQuery.isError) {
    return (
      <p className="text-muted-foreground text-sm">
        Не удалось загрузить настройки проекта. Попробуйте обновить страницу.
      </p>
    );
  }

  if (projectQuery.isPending || !project) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  const isTemplate = project.status === 'template';

  return (
    <FormProvider {...form}>
      <form className="space-y-5">
        <CardSection title="Основные настройки" description="Название, ключ и оформление проекта.">
          <ProjectIdentityFields disabled={!project.access.canEdit} idPrefix="project-settings" />
        </CardSection>

        <CardSection title="Доступ" description="Видимость и статус проекта.">
          <div className="space-y-5">
            <VisibilityPicker disabled={!project.access.canEdit} />

            {isTemplate ? (
              <p className="text-muted-foreground text-sm">
                Проект-шаблон: смена статуса недоступна.
              </p>
            ) : (
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="project-settings-status">Статус</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!project.access.canEdit}
                    >
                      <SelectTrigger id="project-settings-status" className="w-full sm:w-64">
                        <SelectValue placeholder="Выберите статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Активен</SelectItem>
                        <SelectItem value="archived">В архиве</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            )}
          </div>
        </CardSection>

        {project.access.canDelete && teamSlug && (
          <CardSection title="Опасная зона" description="Необратимые действия с проектом.">
            <ProjectDangerZone
              projectName={project.name}
              teamSlug={teamSlug}
              projectId={project.id}
            />
          </CardSection>
        )}
      </form>
      {project.access.canEdit ? <ProjectSettingsSaveBar project={project} /> : null}
    </FormProvider>
  );
}
