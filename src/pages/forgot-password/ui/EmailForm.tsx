'use client';

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
  FieldLabel,
  InputEmail,
} from 'shared/ui';
import { TAuth } from 'entities/auth';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { EmailFormValues } from '../model/types';
import { EmailForm as EmailFormSchema } from '../model/schemas';
import { ComponentProps } from 'react';
import { useResetPassword } from '../model/useResetPassword';
import { setFormErrors } from 'shared/lib/utils';
import { extractValidationIssues } from 'shared/api';

interface EmailFormProps extends Omit<ComponentProps<'form'>, 'children' | 'onSubmit'> {
  onSuccess?: (body: TAuth.ResetPasswordBody, res: TAuth.ResetPasswordResponse) => void;
}

function EmailForm({ onSuccess, ...props }: EmailFormProps) {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const resetPassword = useResetPassword({
    onSuccess,
    onError: (err) => setFormErrors(extractValidationIssues(err), form),
  });

  const onSubmit = (data: EmailFormValues) => {
    const body: TAuth.ResetPasswordBody = {
      email: data.email,
    };

    resetPassword.mutate(body);
  };

  const disabled = resetPassword.isPending || resetPassword.isSuccess;

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
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

export { EmailForm };
