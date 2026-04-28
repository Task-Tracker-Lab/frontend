'use client';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  InputEmail,
  Link,
} from 'shared/ui';
import { routes } from 'shared/config';
import { useMutation } from '@tanstack/react-query';
import { AuthHttp, TAuth } from 'entities/auth';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { extractValidationIssues } from 'shared/api';
import type { EmailFormValues } from '../model/types';
import { EmailForm as EmailFormSchema } from '../model/schemas';
import { setFormErrors } from 'shared/lib/utils';
import { ComponentProps } from 'react';

interface EmailFormProps extends Omit<ComponentProps<'form'>, 'children' | 'onSubmit'> {
  onSuccess?: (body: TAuth.ResetPasswordBody, res: TAuth.ResetPasswordResponse) => void;
}

function EmailForm({ onSuccess, ...props }: EmailFormProps) {
  const requestResetPassword = useMutation({
    mutationFn: (data: TAuth.ResetPasswordBody) => {
      return AuthHttp.resetPassword(data);
    },
    meta: {
      skipGlobalValidationToast: true,
    },
  });

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: EmailFormValues) => {
    const body: TAuth.ResetPasswordBody = {
      email: data.email,
    };

    requestResetPassword.mutate(body, {
      onSuccess: (res) => {
        onSuccess?.(body, res);
      },
      onError: (err) => {
        setFormErrors(extractValidationIssues(err), form);
      },
    });
  };

  const disabled = requestResetPassword.isPending || requestResetPassword.isSuccess;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Забыли пароль?</CardTitle>
        <CardDescription>Введите email, чтобы получить код для восстановления.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)} {...props}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <InputEmail
                    {...field}
                    id="email"
                    aria-required="true"
                    aria-invalid={fieldState.invalid}
                    autoFocus
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Field>
              <Button type="submit" disabled={disabled}>
                Отправить код
              </Button>
            </Field>
            <Field>
              <FieldDescription className="text-center">
                Вспомнили пароль? <Link href={routes.auth.signin()}>Войти</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

export { EmailForm };
