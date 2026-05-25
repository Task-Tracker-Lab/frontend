'use client';

import { useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel, Switch } from 'shared/ui';
import type { CreateProjectFormValues } from '../model/types';

interface VisibilityPickerProps {
  disabled?: boolean;
}

export function VisibilityPicker({ disabled = false }: VisibilityPickerProps) {
  const { control } = useFormContext<CreateProjectFormValues>();
  const id = useId();

  return (
    <Controller
      name="visibility"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor={id}>Публичный проект</FieldLabel>
              <FieldDescription>Виден всем, у кого есть ссылка</FieldDescription>
            </FieldContent>
            <Switch
              className="self-center"
              id={id}
              checked={field.value === 'public'}
              onCheckedChange={(checked) => field.onChange(checked ? 'public' : 'private')}
              disabled={disabled}
              aria-label="Публичный проект"
            />
          </Field>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
