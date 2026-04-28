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
  InputPassword,
  Link,
} from 'shared/ui';
import * as React from 'react';
import { ComponentProps, useState } from 'react';
import { routes } from 'shared/config';
import { useMutation } from '@tanstack/react-query';
import {
  resetPasswordConfirm,
  ResetPasswordConfirmBody,
  ResetPasswordConfirmResponse,
} from 'entities/auth';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setFormErrors } from 'shared/lib/utils';
import { extractValidationIssues } from 'shared/api';
import { z } from 'zod';
import { PasswordFormSchema } from '../model/schemas/password-form-scema';

type FSchema = z.infer<typeof PasswordFormSchema>;
type BSchema = z.infer<typeof ResetPasswordConfirmBody>;
type RSchema = z.infer<typeof ResetPasswordConfirmResponse>;

interface PasswordFormProps extends Omit<ComponentProps<'form'>, 'children' | 'onSubmit'> {
  onSuccess?: (body: BSchema, res: RSchema) => void;
  email: string;
}

function PasswordForm({ onSuccess, email, ...props }: PasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const requestResetPassword = useMutation({
    mutationFn: (data: BSchema) => {
      return resetPasswordConfirm(data);
    },
    meta: {
      skipGlobalValidationToast: true,
    },
  });

  const form = useForm<FSchema>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: FSchema) => {
    const body: BSchema = {
      email,
      password: data.password,
      confirmPassword: data.confirmPassword,
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
        <CardTitle className="text-xl">Восстановление пароля</CardTitle>
        <CardDescription>Введите новый пароль для вашего аккаунта.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)} {...props}>
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Пароль</FieldLabel>
                  <InputPassword
                    {...field}
                    onChange={(event) => {
                      field.onChange(event);
                      if (form.getFieldState('confirmPassword').isTouched) {
                        void form.trigger('confirmPassword');
                      }
                    }}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    visible={showPassword}
                    onVisibleChange={setShowPassword}
                    autoComplete="new-password"
                    disabled={disabled}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">Повторите пароль</FieldLabel>
                  <InputPassword
                    {...field}
                    id="confirmPassword"
                    showEyeIcon={false}
                    aria-invalid={fieldState.invalid}
                    aria-label="Повторите пароль"
                    visible={showPassword}
                    autoComplete="new-password"
                    disabled={disabled}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Field>
              <Button type="submit" disabled={disabled}>
                Сохранить пароль
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

export { PasswordForm };
