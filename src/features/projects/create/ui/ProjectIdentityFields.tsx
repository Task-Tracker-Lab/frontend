'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel, Input, Textarea } from 'shared/ui';
import type { ProjectIdentityFormValues } from '../model/types';
import { ProjectColorPicker } from './ProjectColorPicker';
import { ProjectIconPicker } from './ProjectIconPicker';
import { slugify } from '../lib/slugify';
import { SlugField } from 'entities/project';
import { useTeamStore } from 'entities/team';

interface ProjectIdentityFieldsProps {
  disabled?: boolean;
  idPrefix?: string;
  showPlaceholders?: boolean;
}

export function ProjectIdentityFields({
  disabled = false,
  idPrefix = 'project',
  showPlaceholders = false,
}: ProjectIdentityFieldsProps) {
  const form = useFormContext<ProjectIdentityFormValues>();
  const iconError = form.formState.errors.icon;
  const colorError = form.formState.errors.color;
  const hasVisualError = Boolean(iconError || colorError);
  const teamId = useTeamStore((s) => s.teamId);

  return (
    <FieldGroup>
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState, formState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${idPrefix}-name`}>Название</FieldLabel>
            <Input
              {...field}
              onChange={(e) => {
                field.onChange(e);
                if (!formState.dirtyFields.slug) {
                  form.setValue('slug', slugify(e.target.value), {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }
              }}
              id={`${idPrefix}-name`}
              aria-label="Название проекта"
              placeholder={showPlaceholders ? 'Мой проект' : undefined}
              aria-required={showPlaceholders ? true : undefined}
              aria-invalid={fieldState.invalid}
              autoComplete="off"
              disabled={disabled}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <SlugField teamId={teamId!} name="slug" disabled={disabled} />
      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${idPrefix}-description`}>Описание</FieldLabel>
            <Textarea
              {...field}
              value={field.value ?? ''}
              id={`${idPrefix}-description`}
              aria-label="Описание проекта"
              placeholder={showPlaceholders ? 'Кратко опишите проект (необязательно)' : undefined}
              rows={3}
              className="min-h-20 resize-none"
              aria-invalid={fieldState.invalid}
              disabled={disabled}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Field data-invalid={hasVisualError}>
        <FieldLabel>Иконка и цвет проекта</FieldLabel>
        <div className="space-y-4">
          <ProjectIconPicker disabled={disabled} />
          <ProjectColorPicker disabled={disabled} />
        </div>
        {iconError && <FieldError errors={[iconError]} />}
        {colorError && <FieldError errors={[colorError]} />}
      </Field>
    </FieldGroup>
  );
}
