'use client';

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
import { OtpFormSchema } from '../model/schemas/otp-form-schema';
import { cn, setFormErrors } from 'shared/lib/utils';
import { z } from 'zod/v4';
import { DefaultError, UseMutationResult } from '@tanstack/react-query';
import { extractValidationIssues } from 'shared/api';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { ComponentProps } from 'react';
import { otpFormBody } from '../model/schemas/otp-form-body';

type FSchema = z.infer<typeof OtpFormSchema>;
type BSchema = z.infer<typeof otpFormBody>;

interface OTPFormProps<TData> extends Omit<ComponentProps<'form'>, 'children'> {
  email: string;
  onSuccess?: (body: BSchema, res: TData) => void;
  autoFocusCode?: boolean;
  query: UseMutationResult<TData, DefaultError, BSchema>;
}

export function OTPForm<TData>({
  className,
  email,
  onSuccess,
  autoFocusCode = false,
  query,
  ...props
}: OTPFormProps<TData>) {
  const form = useForm<FSchema>({
    resolver: zodResolver(OtpFormSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = (data: FSchema) => {
    const body: BSchema = {
      code: data.code,
      email,
    };

    query.mutate(body, {
      onSuccess: (res) => {
        onSuccess?.(body, res);
      },
      onError: (err) => {
        setFormErrors(extractValidationIssues(err), form);
      },
    });
  };

  const disabled = query.isPending || query.isSuccess;

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
