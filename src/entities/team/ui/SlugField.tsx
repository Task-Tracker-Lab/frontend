import { useQuery } from '@tanstack/react-query';
import { CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useId, useMemo } from 'react';
import {
  Controller,
  FieldValues,
  useController,
  UseControllerProps,
  UseFormClearErrors,
  UseFormSetError,
} from 'react-hook-form';
import { cn, debounce } from 'shared/lib/utils';
import {
  Field,
  FieldError,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Spinner,
} from 'shared/ui';
import { TeamQueries } from '../api/queries';

interface SlugFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  disabled?: boolean;
  label?: string;
  prefix?: string;
  placeholder?: string;
  className?: string;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
}

export function SlugField<T extends FieldValues>({
  disabled = false,
  label = 'Короткий адрес в ссылке (необязательно)',
  prefix,
  placeholder = 'my-team',
  className,
  setError,
  clearErrors,
  ...props
}: SlugFieldProps<T>) {
  const { field, fieldState, formState } = useController(props);
  const id = useId();
  const slug = (field.value as string) ?? '';
  const defaultSlug = (formState.defaultValues?.[props.name] as string | undefined) ?? '';

  const { data, refetch, isFetching } = useQuery({
    ...TeamQueries.checkSlug(slug),
    enabled: false,
  });

  const debouncedCheckSlug = useMemo(() => debounce((fn: typeof refetch) => fn(), 400), []);

  useEffect(() => {
    if (!fieldState.isDirty) {
      clearErrors(props.name);
      return;
    }

    if (data?.available === false) {
      setError(props.name, { message: data.message ?? 'Этот адрес уже занят' });
    } else {
      clearErrors(props.name);
    }
  }, [clearErrors, data, fieldState.isDirty, props.name, setError]);

  const showStatus = fieldState.isDirty && !!slug;

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState: renderFieldState }) => (
        <Field className={cn(className)} data-invalid={renderFieldState.invalid}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          <InputGroup>
            {prefix ? <InputGroupAddon>{prefix}</InputGroupAddon> : null}
            <InputGroupInput
              {...field}
              value={field.value ?? ''}
              onChange={(e) => {
                const v = e.target.value.toLowerCase();
                field.onChange(v);

                const isChanged = v !== defaultSlug;
                if (isChanged && v.trim().length > 1) {
                  debouncedCheckSlug.debouncedCallback(refetch);
                }
              }}
              id={id}
              aria-label={label}
              placeholder={placeholder}
              aria-invalid={renderFieldState.invalid}
              autoComplete="off"
              disabled={disabled}
            />
            <InputGroupAddon align="inline-end">
              {showStatus && (
                <>
                  {isFetching ? (
                    <Spinner className="size-4" />
                  ) : data?.available === true ? (
                    <CheckCircle className="size-4 text-green-500" />
                  ) : data?.available === false ? (
                    <XCircle className="text-destructive size-4" />
                  ) : null}
                </>
              )}
            </InputGroupAddon>
          </InputGroup>
          {renderFieldState.invalid && <FieldError errors={[renderFieldState.error]} />}
        </Field>
      )}
    />
  );
}
