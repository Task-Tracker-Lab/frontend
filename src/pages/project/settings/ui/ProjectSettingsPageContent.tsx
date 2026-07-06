'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ProjectQueries, useCheckSlug, validateProjectSlugAsync } from 'entities/project';
import { ProjectIdentityFields, VisibilityPicker } from 'features/projects/create';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useZodValidationWithAsyncCheck } from 'shared/lib/hooks';
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
} from 'shared/ui';
import { PageWrapper } from 'widgets/page-wrapper';
import { mapProjectToFormValues } from '../lib/map-project-to-form-values';
import { ProjectSettingsFormSchema, type ProjectSettingsFormValues } from '../model/types';
import { PROJECT_STATUS_OPTIONS } from '../config/project-statuses';
import { ProjectDangerZone } from './ProjectDangerZone';
import { ProjectSettingsSaveBar } from './ProjectSettingsSaveBar';

interface ProjectSettingsPageContentProps {
  projectSlug: string;
  teamId: string;
}

export function ProjectSettingsPageContent({
  projectSlug,
  teamId,
}: ProjectSettingsPageContentProps) {
  const projectQuery = useSuspenseQuery(ProjectQueries.getProject(teamId, projectSlug));
  const project = projectQuery.data;
  const checkSlug = useCheckSlug(projectSlug, teamId);

  const form = useForm<ProjectSettingsFormValues>({
    resolver: useZodValidationWithAsyncCheck(ProjectSettingsFormSchema, (...args) =>
      validateProjectSlugAsync(checkSlug, ...args)
    ),
    mode: 'onChange',
    defaultValues: mapProjectToFormValues(project),
  });

  const { reset } = form;

  useEffect(() => {
    reset(mapProjectToFormValues(project));
  }, [reset, project.id, project.meta.updatedAt, project]);

  const isTemplate = project.status === 'template';

  return (
    <FormProvider {...form}>
      <PageWrapper
        title="Настройки проекта"
        description={`Параметры проекта «${project.name}».`}
        className="space-y-5"
      >
        <form className="space-y-5">
          <CardSection
            title="Основные настройки"
            description="Название, ключ и оформление проекта."
          >
            <ProjectIdentityFields disabled={!project.canEdit} idPrefix="project-settings" />
          </CardSection>

          <CardSection title="Доступ" description="Видимость и статус проекта.">
            <div className="space-y-5">
              <VisibilityPicker disabled={!project.canEdit} />

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
                        disabled={!project.canEdit}
                      >
                        <SelectTrigger id="project-settings-status" className="w-full sm:w-64">
                          <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROJECT_STATUS_OPTIONS.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              )}
            </div>
          </CardSection>

          {project.canEdit ? (
            <CardSection title="Опасная зона" description="Необратимые действия с проектом.">
              <ProjectDangerZone projectName={project.name} teamId={teamId} slug={project.slug} />
            </CardSection>
          ) : null}
        </form>
      </PageWrapper>
      {project.canEdit ? <ProjectSettingsSaveBar project={project} /> : null}
    </FormProvider>
  );
}
