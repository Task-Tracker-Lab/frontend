import { Controller, FormProvider } from 'react-hook-form';
import { cn } from 'shared/lib/utils';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, Input } from 'shared/ui';
import { useCreateBoardColumnForm } from '../model/useCreateBoardColumnForm';
import { UseCreateBoardColumnOptions } from '../model/useCreateBoardColumn';
import { ComponentProps } from 'react';

interface CreateBoardColumnFormProps extends Omit<ComponentProps<'form'>, 'children' | 'onSubmit'> {
  boardId: string;
  defaultPosition?: number;
  mutateOptions?: UseCreateBoardColumnOptions;
}

export function CreateBoardColumnForm({
  boardId,
  defaultPosition,
  className,
  mutateOptions,
  ...props
}: CreateBoardColumnFormProps) {
  const { form, isPending, handleSubmit } = useCreateBoardColumnForm(boardId, {
    defaultPosition,
    ...mutateOptions,
  });

  return (
    <FormProvider {...form}>
      <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
        <FieldGroup>
          <Controller
            name="name"
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
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-board-column-color">Цвет</FieldLabel>
                <FieldDescription>HEX, например #6366f1</FieldDescription>
                <Input
                  {...field}
                  id="create-board-column-color"
                  aria-label="Цвет колонки"
                  placeholder="#6366f1"
                  aria-invalid={fieldState.invalid}
                  disabled={isPending}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="position"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-board-column-position">Позиция колонки</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  id="create-board-column-position"
                  aria-label="Позиция колонки"
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
