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
  const teamId = useTeamStore.use.teamId();
  const projectQuery = useQueryProject();
  const project = projectQuery.data;

  const form = useForm<ProjectSettingsFormValues>({
    resolver: zodResolver(ProjectSettingsFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      descriptionHtml: '',
      icon: undefined,
      color: null,
      visibility: 'private',
      status: 'active',
      sequence: 0,
      settings: {
        allowGuests: false,
        timeTracking: false,
        autoCloseDays: null,
        maxTasksPerArea: null,
        maxMembers: null,
        maxAreas: null,
        defaultView: 'kanban',
        taskPrefix: null,
        timeTrackingMode: 'optional',
        defaultAssigneeId: null,
      },
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (project) {
      reset({
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
  const canEdit =
    project.access.currentUserRole === 'admin' || project.access.currentUserRole === 'owner';
  return (
    <FormProvider {...form}>
      <form className="space-y-5">
        <CardSection title="Основные настройки" description="Название, ключ и оформление проекта.">
          <ProjectIdentityFields disabled={!canEdit} idPrefix="project-settings" />
        </CardSection>

        <CardSection title="Доступ" description="Видимость и статус проекта.">
          <div className="space-y-5">
            <VisibilityPicker disabled={!canEdit} />

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
                    <Select value={field.value} onValueChange={field.onChange} disabled={!canEdit}>
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

        {canEdit && teamId && (
          <CardSection title="Опасная зона" description="Необратимые действия с проектом.">
            <ProjectDangerZone projectName={project.name} teamId={teamId} projectId={project.id} />
          </CardSection>
        )}
      </form>
      {canEdit ? <ProjectSettingsSaveBar project={project} /> : null}
    </FormProvider>
  );
}
