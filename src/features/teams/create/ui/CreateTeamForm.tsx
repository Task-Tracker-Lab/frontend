'use client';

import { ComponentProps } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { cn } from 'shared/lib/utils';
import { Field, FieldError, FieldGroup, FieldLabel, Input, Textarea } from 'shared/ui';
import type { UseCreateTeamOptions } from '../api/useCreateTeam';
import { useCreateTeamForm } from '../model/useCreateTeamForm';

interface CreateTeamFormProps extends Omit<ComponentProps<'form'>, 'children' | 'onSubmit'> {
  mutateOptions?: UseCreateTeamOptions;
}

export function CreateTeamForm({ className, mutateOptions, ...props }: CreateTeamFormProps) {
  const { form, isPending, handleSubmit } = useCreateTeamForm(mutateOptions);

  return (
    <FormProvider {...form}>
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
    </FormProvider>
  );
}
