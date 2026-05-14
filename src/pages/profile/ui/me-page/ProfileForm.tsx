'use client';

import { Controller, UseFormReturn } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel, Input, Textarea } from 'shared/ui';
import type { ProfileFormValues } from '../../model/profile';

type AccountProfileFormProps = {
  form: UseFormReturn<ProfileFormValues>;
  onSubmit: (data: ProfileFormValues) => void;
};

function ProfileForm({ form, onSubmit }: AccountProfileFormProps) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup className="grid gap-3 sm:grid-cols-2">
        <Controller
          name="firstName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Имя</FieldLabel>
              <Input
                aria-label="firstName"
                placeholder="Имя"
                type="text"
                aria-invalid={fieldState.invalid}
                aria-required="true"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="lastName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Фамилия</FieldLabel>
              <Input
                aria-label="lastName"
                placeholder="Фамилия"
                type="text"
                aria-invalid={fieldState.invalid}
                aria-required="true"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="space-y-3 sm:col-span-2">
          <Controller
            name="bio"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>О себе</FieldLabel>
                <Textarea
                  aria-label="bio"
                  placeholder="Расскажите немного о себе"
                  rows={3}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
      </FieldGroup>
    </form>
  );
}

export { ProfileForm };
