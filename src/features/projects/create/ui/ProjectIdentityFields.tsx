'use client';

import { Controller, useFormContext } from 'react-hook-form';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  InputGroup,
  InputGroupInput,
  Textarea,
} from 'shared/ui';
import type { ProjectIdentityFormValues } from '../model/types';
import { ProjectColorPicker } from './ProjectColorPicker';
import { ProjectIconPicker } from './ProjectIconPicker';
import { slugify } from '../lib/slugify';

interface ProjectIdentityFieldsProps {
  disabled?: boolean;
  idPrefix?: string;
  showPlaceholders?: boolean;
}

function slugifyOnChange(value: string) {
  return value
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+/, '');
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
                  form.setValue('slug', slugify(e.target.value));
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
      <Controller
        name="slug"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${idPrefix}-key`}>Ключ проекта</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                value={field.value ?? ''}
                onChange={(e) => {
                  field.onChange(slugifyOnChange(e.target.value));
                }}
                id={`${idPrefix}-key`}
                aria-label="Ключ проекта"
                placeholder={showPlaceholders ? 'my-project' : undefined}
                aria-required={showPlaceholders ? true : undefined}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                disabled={disabled}
              />
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
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
