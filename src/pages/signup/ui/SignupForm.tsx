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
import { SignupFormSchema } from '../model/schemas/signup-form-schema';
import { cn, setFormErrors } from 'shared/lib/utils';
import { routes } from 'shared/config';
import { z } from 'zod';
import { ComponentProps, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fieldNameMapper } from '../model/utils/field-name-mapper';
import { prepareFullName } from '../model/utils/prepare-fullname';
import { extractValidationIssues } from 'shared/api';
import { signup, SignupBody, SignupResponse } from 'entities/auth';

type FSchema = z.infer<typeof SignupFormSchema>;
type BSchema = z.infer<typeof SignupBody>;
type RSchema = z.infer<typeof SignupResponse>;

interface SignupFormProps extends Omit<ComponentProps<'form'>, 'children' | 'onSubmit'> {
  onSuccess?: (body: BSchema, res: RSchema) => void;
}

export function SignupForm({ className, onSuccess, ...props }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const sendUserData = useMutation({
    mutationFn: (data: BSchema) => {
      return signup(data);
    },
    meta: {
      skipGlobalValidationToast: true,
    },
  });

  const form = useForm<FSchema>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: FSchema) => {
    const body: BSchema = {
      email: data.email,
      password: data.password,
      ...prepareFullName(data.name),
    };

    sendUserData.mutate(body, {
      onSuccess: (res) => {
        onSuccess?.(body, res);
      },
      onError: (err) => {
        setFormErrors<FSchema, BSchema>(extractValidationIssues(err), form, fieldNameMapper);
      },
    });
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
      </CardContent>
    </Card>
  );
}
