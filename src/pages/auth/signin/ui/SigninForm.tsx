'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { TAuth } from 'entities/auth';
import { OAuthLoginButtons, OAuthSeparator } from 'features/auth/oauth-login';
import { ComponentProps } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { extractValidationIssues } from 'shared/api';
import { routes } from 'shared/config';
import { cn, setFormErrors } from 'shared/lib/utils';
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
  InputPassword,
  Link,
} from 'shared/ui';
import { SigninForm as SigninFormSchema } from '../model/schemas';
import type { SigninFormValues } from '../model/types';
import { useSignin, UseSigninOptions } from '../model/useSignin';

interface SigninFormProps extends Omit<ComponentProps<'form'>, 'children' | 'onSubmit'> {
  mutateOptions?: UseSigninOptions;
}

export function SigninForm({ className, mutateOptions = {}, ...props }: SigninFormProps) {
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const sendUserData = useSignin({
    ...mutateOptions,
    onError: (err, ...args) => {
      mutateOptions.onError?.(err, ...args);
      setFormErrors(extractValidationIssues(err), form);
    },
  });

  const onSubmit = (data: SigninFormValues) => {
    const body: TAuth.SigninBody = {
      email: data.email,
      password: data.password,
    };

    sendUserData.mutate(body);
  };

  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Вход в систему</CardTitle>
          <CardDescription>Пожалуйста, введите ваши данные для входа.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className={cn('flex flex-col gap-6', className)}
            onSubmit={form.handleSubmit(onSubmit)}
            {...props}
          >
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
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Пароль</FieldLabel>
                      <Link href={routes.auth.forgotPassword()} className="ml-auto text-sm">
                        Забыли пароль?
                      </Link>
                    </div>
                    <InputPassword
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="current-password"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Field>
                <Button type="submit" disabled={sendUserData.isPending}>
                  Войти
                </Button>
              </Field>
              <Field>
                <FieldDescription className="text-center">
                  Нет аккаунта? <Link href={routes.auth.signup()}>Зарегистрироваться</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
          <OAuthSeparator />
          <OAuthLoginButtons />
        </CardContent>
      </Card>
    </>
  );
}
