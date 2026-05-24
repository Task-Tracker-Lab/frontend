'use client';

import { ComponentProps } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { cn } from 'shared/lib/utils';
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
import type { UseCreateProjectOptions } from '../model/useCreateProject';
import { useCreateProjectForm } from '../model/useCreateProjectForm';
import { ProjectColorPicker } from './ProjectColorPicker';
import { ProjectIconPicker } from './ProjectIconPicker';
import { VisibilityPicker } from './VisibilityPicker';

interface CreateProjectFormProps extends Omit<ComponentProps<'form'>, 'children' | 'onSubmit'> {
  mutateOptions?: UseCreateProjectOptions;
}

export function CreateProjectForm({
  className,
  mutateOptions,
  ...props
}: CreateProjectFormProps) {
  const { form, isPending, handleSubmit } = useCreateProjectForm(mutateOptions);
  const iconError = form.formState.errors.icon;
  const colorError = form.formState.errors.color;
  const hasVisualError = Boolean(iconError || colorError);

  return (
    <FormProvider {...form}>
      <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-project-name">Название</FieldLabel>
                <Input
                  {...field}
                  id="create-project-name"
                  aria-label="Название проекта"
                  placeholder="Мой проект"
                  aria-required="true"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  disabled={isPending}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="key"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-project-key">Ключ проекта</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      field.onChange(e.target.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, ''));
                    }}
                    id="create-project-key"
                    aria-label="Ключ проекта"
                    placeholder="PROJ"
                    aria-required="true"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    disabled={isPending}
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
                <FieldLabel htmlFor="create-project-description">Описание</FieldLabel>
                <Textarea
                  {...field}
                  value={field.value ?? ''}
                  id="create-project-description"
                  aria-label="Описание проекта"
                  placeholder="Кратко опишите проект (необязательно)"
                  rows={3}
                  className="min-h-20 resize-none"
                  aria-invalid={fieldState.invalid}
                  disabled={isPending}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Field data-invalid={hasVisualError}>
            <FieldLabel>Иконка и цвет проекта</FieldLabel>
            <div className="space-y-4">
              <ProjectIconPicker disabled={isPending} />
              <ProjectColorPicker disabled={isPending} />
            </div>
            {iconError && <FieldError errors={[iconError]} />}
            {colorError && <FieldError errors={[colorError]} />}
          </Field>
          <VisibilityPicker disabled={isPending} />
        </FieldGroup>
      </form>
    </FormProvider>
  );
}
