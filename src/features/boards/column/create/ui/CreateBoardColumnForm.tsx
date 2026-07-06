import { PROJECT_COLORS } from 'entities/project';
import { ComponentProps } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { cn } from 'shared/lib/utils';
import { ColorPicker, Field, FieldError, FieldGroup, FieldLabel, Input } from 'shared/ui';
import { UseCreateBoardColumnOptions } from '../api/useCreateBoardColumn';
import { useCreateBoardColumnForm } from '../model/useCreateBoardColumnForm';

interface CreateBoardColumnFormProps extends Omit<ComponentProps<'form'>, 'children' | 'onSubmit'> {
  boardSlug: string;
  mutateOptions?: UseCreateBoardColumnOptions;
}

export function CreateBoardColumnForm({
  boardSlug,
  className,
  mutateOptions,
  ...props
}: CreateBoardColumnFormProps) {
  const { form, isPending, handleSubmit } = useCreateBoardColumnForm(boardSlug, {
    ...mutateOptions,
  });

  return (
    <FormProvider {...form}>
      <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-board-column-name">Название</FieldLabel>
                <Input
                  {...field}
                  id="create-board-column-name"
                  aria-label="Название этапа"
                  placeholder="В работе"
                  aria-required="true"
                  aria-invalid={fieldState.invalid}
                  disabled={isPending}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="color"
            control={form.control}
            render={({ field, fieldState }) => {
              const { value, ...rest } = field;
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-board-column-color">Цвет</FieldLabel>
                  <ColorPicker
                    colors={PROJECT_COLORS}
                    id="create-board-column-color"
                    aria-label="Цвет этапа"
                    aria-invalid={fieldState.invalid}
                    disabled={isPending}
                    activeColor={value ?? PROJECT_COLORS[0]}
                    setActiveColor={(c) => {
                      form.setValue('color', c);
                    }}
                    {...rest}
                  />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </form>
    </FormProvider>
  );
}
