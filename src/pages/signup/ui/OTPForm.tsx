'use client';

import type { FieldPath } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldError,
  FieldGroup,
  InputOtp,
  InputOTPGroup,
  InputOTPSlot,
  Spinner,
} from 'shared/ui';
import { ConfirmBody, ConfirmFormSchema, ConfirmResponse } from '../model/schemas/ConfirmSchema';
import { cn } from 'shared/lib/utils';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { GlobalErrorResponseType, isAxiosValidationError } from 'shared/api';
import { confirm } from '../model/services/confirm';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

type FSchema = z.infer<typeof ConfirmFormSchema>;
type BSchema = z.infer<typeof ConfirmBody>;
type RSchema = z.infer<typeof ConfirmResponse>;

interface OTPFormProps extends Omit<React.ComponentProps<'form'>, 'children'> {
  email: string;
  onSuccess?: (body: BSchema, res: RSchema) => void;
  autoFocusCode?: boolean;
}

export function OTPForm({
  className,
  email,
  onSuccess,
  autoFocusCode = false,
  ...props
}: OTPFormProps) {
  const sendConfirm = useMutation({
    mutationFn: (data: BSchema) => {
      return confirm(data);
    },
    meta: {
      skipGlobalValidationToast: true,
    },
  });

  const form = useForm<FSchema>({
    resolver: zodResolver(ConfirmFormSchema),
    defaultValues: {
      code: '',
    },
  });

  function setFormErrors<P = string>(errors: { message: string; path: P[] }[]) {
    errors.forEach(({ message, path: [path] }) => {
      const typedPath = path as FieldPath<FSchema>;

      form.setError(typedPath, { message });
    });
  }

  const onSubmit = (data: FSchema) => {
    const body: BSchema = {
      code: data.code,
      email: email,
    };

    sendConfirm.mutate(body, {
      onSuccess: (res) => {
        onSuccess?.(body, res);
      },
      onError: (err) => {
        //ошибка валидации локальная
        if (isAxiosValidationError(err)) {
          setFormErrors(err?.issues ?? []);
        }
        //ошибка валидации серверная
        if (isAxiosError<GlobalErrorResponseType>(err)) {
          setFormErrors(err?.response?.data?.details ?? []);
        }
      },
    });
  };

  const disabled = sendConfirm.isPending || sendConfirm.isSuccess;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Введите код</CardTitle>
        <CardDescription>Код подтверждения отправлен на вашу почту.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className={cn('flex flex-col gap-6', className)}
          onSubmit={form.handleSubmit(onSubmit)}
          {...props}
        >
          <FieldGroup>
            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <InputOtp
                    {...field}
                    containerClassName="justify-center"
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    autoFocus={autoFocusCode}
                    aria-label="Код подтверждения из 6 цифр"
                    disabled={disabled}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} aria-invalid={fieldState.invalid} />
                      <InputOTPSlot index={1} aria-invalid={fieldState.invalid} />
                      <InputOTPSlot index={2} aria-invalid={fieldState.invalid} />
                      <InputOTPSlot index={3} aria-invalid={fieldState.invalid} />
                      <InputOTPSlot index={4} aria-invalid={fieldState.invalid} />
                      <InputOTPSlot index={5} aria-invalid={fieldState.invalid} />
                    </InputOTPGroup>
                  </InputOtp>
                  {fieldState.invalid && (
                    <FieldError className="text-center" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field>
              <Button type="submit" disabled={disabled}>
                {disabled ? <Spinner className="size-4" /> : <div className="size-4" />}
                Продолжить
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
