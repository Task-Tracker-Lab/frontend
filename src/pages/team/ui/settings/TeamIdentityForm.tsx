'use client';

import { SlugField } from 'entities/team';
import { ComponentProps, useId } from 'react';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { Field, FieldError, FieldLabel, Input, Textarea } from 'shared/ui';
import { getTeamPathPrefix } from '../../model/team-identity';

export function TeamIdentityForm(props: Omit<ComponentProps<'div'>, 'children'>) {
  const idName = useId();
  const idDescription = useId();
  const teamPathPrefix = getTeamPathPrefix();

  const form = useFormContext();
  const { isSubmitting } = useFormState({ control: form.control });

  return (
    <div {...props}>
      <div className="gap-4 space-y-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="input-max-w" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={idName}>Название команды</FieldLabel>
              <Input
                id={idName}
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
                aria-label="Название команды"
                autoComplete="off"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <SlugField
          name="slug"
          label="URL рабочего пространства"
          prefix={teamPathPrefix}
          disabled={isSubmitting}
          className="input-max-w"
        />
      </div>
      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="col-span-full space-y-3" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={idDescription}>Описание команды</FieldLabel>
            <Textarea
              id={idDescription}
              rows={4}
              aria-invalid={fieldState.invalid}
              placeholder="Кратко опишите команду и цели…"
              disabled={isSubmitting}
              aria-label="Описание команды"
              {...field}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
}
