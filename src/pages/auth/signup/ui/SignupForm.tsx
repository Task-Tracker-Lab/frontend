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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  InputEmail,
  InputPassword,
  Link,
  Spinner,
} from 'shared/ui';
import type { SignupFormValues } from '../model/types';
import { SignupForm as SignupFormSchema } from '../model/schemas';
import { cn, setFormErrors } from 'shared/lib/utils';
import { routes } from 'shared/config';
import { ComponentProps, useState } from 'react';
import { fieldNameMapper } from '../model/utils/field-name-mapper';
import { prepareFullName } from '../model/utils/prepare-fullname';
import { extractValidationIssues } from 'shared/api';
import { TAuth } from 'entities/auth';
import { useSignup, type UseSignupOptions } from '../model/useSignup';
import { OAuthLoginButtons, OAuthSeparator } from 'features/auth/oauth-login';

interface SignupFormProps extends Omit<ComponentProps<'form'>, 'children' | 'onSubmit'> {
  mutateOptions?: UseSignupOptions;
}

export function SignupForm({ className, mutateOptions = {}, ...props }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const sendUserData = useSignup({
    ...mutateOptions,
    onError: (err, ...args) => {
      mutateOptions.onError?.(err, ...args);
      setFormErrors<SignupFormValues, TAuth.SignupBody>(
        extractValidationIssues(err),
        form,
        fieldNameMapper
      );
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    const body: TAuth.SignupBody = {
      email: data.email,
      password: data.password,
      ...prepareFullName(data.name),
    };

    sendUserData.mutate(body);
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Создать аккаунт</CardTitle>
        <CardDescription>Заполните форму ниже, чтобы начать работу.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className={cn('flex flex-col gap-6', className)}
          onSubmit={form.handleSubmit(onSubmit)}
          {...props}
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Имя и фамилия</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-required="true"
                    aria-label="Имя"
                    aria-invalid={fieldState.invalid}
                    type="text"
                    placeholder="Алексей Смирнов"
                    autoComplete="name"
                    disabled={sendUserData.isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
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
                    disabled={sendUserData.isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
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
                    disabled={sendUserData.isPending}
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
                    disabled={sendUserData.isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Field>
              <Button type="submit" disabled={sendUserData.isPending}>
                {sendUserData.isPending ? (
                  <Spinner className="size-4" />
                ) : (
                  <div className="size-4" />
                )}
                Зарегистрироваться
              </Button>
            </Field>
            <Field>
              <FieldDescription className="text-center">
                Уже есть аккаунт? <Link href={routes.auth.signin()}>Войти</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
        <OAuthSeparator />
        <OAuthLoginButtons />
      </CardContent>
    </Card>
  );
}
