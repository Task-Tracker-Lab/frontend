'use client';

import { SlugField } from 'entities/team';
import { ComponentProps } from 'react';
import { Controller } from 'react-hook-form';
import { cn } from 'shared/lib/utils';
import { Field, FieldError, FieldGroup, FieldLabel, Input, Textarea } from 'shared/ui';
import { useCreateTeamForm } from '../model/useCreateTeamForm';
import type { UseCreateTeamOptions } from '../model/useCreateTeam';

interface CreateTeamFormProps extends Omit<ComponentProps<'form'>, 'children' | 'onSubmit'> {
  mutateOptions?: UseCreateTeamOptions;
}

export function CreateTeamForm({ className, mutateOptions, ...props }: CreateTeamFormProps) {
  const { form, isPending, handleSubmit } = useCreateTeamForm(mutateOptions);

  return (
    <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-team-name">Название</FieldLabel>
              <Input
                {...field}
                id="create-team-name"
                aria-label="Название команды"
                placeholder="Команда разработки"
                aria-required="true"
                aria-invalid={fieldState.invalid}
                autoComplete="organization"
                disabled={isPending}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <SlugField
          control={form.control}
          name="slug"
          setError={form.setError}
          clearErrors={form.clearErrors}
          disabled={isPending}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-team-description">Описание</FieldLabel>
              <Textarea
                {...field}
                id="create-team-description"
                aria-label="Описание команды"
                placeholder="Кратко опишите, чем занимается команда"
                rows={4}
                className="min-h-24 resize-none"
                aria-required="true"
                aria-invalid={fieldState.invalid}
                disabled={isPending}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
