import { Controller, FormProvider } from 'react-hook-form';
import { cn } from 'shared/lib/utils';
import { ColorPicker, Field, FieldError, FieldGroup, FieldLabel, Input } from 'shared/ui';
import { useCreateBoardColumnForm } from '../model/useCreateBoardColumnForm';
import { UseCreateBoardColumnOptions } from '../model/useCreateBoardColumn';
import { ComponentProps } from 'react';
import { COLORS, DEFAULT_COLUMN_COLOR } from '../config/consts';

interface CreateBoardColumnFormProps extends Omit<ComponentProps<'form'>, 'children' | 'onSubmit'> {
  boardSlug: string;
  defaultPosition?: number;
  mutateOptions?: UseCreateBoardColumnOptions;
}

export function CreateBoardColumnForm({
  boardSlug,
  defaultPosition,
  className,
  mutateOptions,
  ...props
}: CreateBoardColumnFormProps) {
  const { form, isPending, handleSubmit } = useCreateBoardColumnForm(boardSlug, {
    defaultPosition,
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
                  aria-label="Название колонки"
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
                    colors={COLORS}
                    id="create-board-column-color"
                    aria-label="Цвет колонки"
                    aria-invalid={fieldState.invalid}
                    disabled={isPending}
                    activeColor={value ?? DEFAULT_COLUMN_COLOR}
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
