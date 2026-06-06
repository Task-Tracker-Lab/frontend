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
  InputPassword,
} from 'shared/ui';
import { ComponentProps, useState } from 'react';
import { TAuth } from 'entities/auth';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setFormErrors } from 'shared/lib/utils';
import { extractValidationIssues } from 'shared/api';
import { PasswordForm as PasswordFormSchema } from '../model/schemas';
import type { PasswordFormValues } from '../model/types';
import { useSendPassword, UseSendPasswordOptions } from '../model/useSendPassword';

interface PasswordFormProps extends Omit<ComponentProps<'form'>, 'children' | 'onSubmit'> {
  mutateOptions?: UseSendPasswordOptions;
  email: string;
}

function PasswordForm({ mutateOptions = {}, email, ...props }: PasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const sendPassword = useSendPassword({
    ...mutateOptions,
    onError: (err, ...args) => {
      mutateOptions.onError?.(err, ...args);
      setFormErrors(extractValidationIssues(err), form);
    },
  });

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: PasswordFormValues) => {
    const body: TAuth.ResetPasswordConfirmBody = {
      email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    sendPassword.mutate(body);
  };

  const disabled = sendPassword.isPending || sendPassword.isSuccess;

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
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

export { PasswordForm };
