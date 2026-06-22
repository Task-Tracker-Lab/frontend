import { Controller, FormProvider } from 'react-hook-form';
import { cn } from 'shared/lib/utils';
import { Field, FieldError, FieldGroup, FieldLabel, Input } from 'shared/ui';
import { useCreateBoardForm } from '../model/useCreateBoardForm';
import { UseCreateBoardOptions } from '../model/useCreateBoard';
import { ComponentProps } from 'react';

interface CreateBoardFormProps extends Omit<ComponentProps<'form'>, 'children' | 'onSubmit'> {
  mutateOptions?: UseCreateBoardOptions;
}

export function CreateBoardForm({ className, mutateOptions, ...props }: CreateBoardFormProps) {
  const { form, isPending, handleSubmit } = useCreateBoardForm(mutateOptions);

  return (
    <FormProvider {...form}>
      <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-board-name">Название</FieldLabel>
                <Input
                  {...field}
                  id="create-board-name"
                  aria-label="Название доски"
                  placeholder="Идеи"
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
