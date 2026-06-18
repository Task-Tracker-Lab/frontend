'use client';

import { useId } from 'react';
import { Controller, FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import { cn } from 'shared/lib/utils';
import {
  Field,
  FieldError,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from 'shared/ui';
import { SlugFieldStatus } from './SlugFieldStatus';

interface SlugFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  disabled?: boolean;
  label?: string;
  prefix?: string;
  placeholder?: string;
  className?: string;
  teamId: string;
}

function slugifyOnChange(value: string) {
  return value
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+/, '');
}

export function SlugField<T extends FieldValues>({
  disabled = false,
  label = 'Короткий адрес в ссылке (необязательно)',
  prefix,
  placeholder = 'my-team',
  className,
  name,
  teamId,
}: SlugFieldProps<T>) {
  const id = useId();
  const { trigger, control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className={cn(className)} data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          <InputGroup>
            {prefix ? <InputGroupAddon>{prefix}</InputGroupAddon> : null}
            <InputGroupInput
              {...field}
              value={field.value ?? ''}
              onChange={(e) => {
                field.onChange(slugifyOnChange(e.target.value));
                void trigger(name);
              }}
              id={id}
              aria-label={label}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              autoComplete="off"
              disabled={disabled}
            />
            <InputGroupAddon align="inline-end">
              <SlugFieldStatus teamId={teamId} slug={field.value} isDirty={fieldState.isDirty} />
            </InputGroupAddon>
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
