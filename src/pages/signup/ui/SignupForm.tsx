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
import { SignupBody, SignupFormSchema, SignupResponse } from '../model/schemas/signup-schema';
import { cn } from 'shared/lib/utils';
import { routes } from 'shared/config';
import { z } from 'zod';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signup } from '../model/services/signup';
import { fieldNameMapper } from '../model/utils/field-name-mapper';
import { isAxiosError } from 'axios';
import { GlobalErrorResponseType, isAxiosValidationError } from 'shared/api';
import { prepareFullName } from '../model/utils/prepare-fullname';

type FSchema = z.infer<typeof SignupFormSchema>;
type BSchema = z.infer<typeof SignupBody>;
type RSchema = z.infer<typeof SignupResponse>;

interface SignupFormProps extends Omit<React.ComponentProps<'form'>, 'children' | 'onSubmit'> {
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

  function setFormErrors<P = string>(errors: { message: string; path: P[] }[]) {
    if (Array.isArray(errors)) {
      errors.forEach(({ message, path: [path] }) => {
        const typedPath = path as FieldPath<BSchema>;
        const filedName = fieldNameMapper(typedPath);

        form.setError(filedName, { message });
      });
    }
  }

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
                  <FieldLabel htmlFor="name">Имя</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-required="true"
                    aria-label="Имя"
                    aria-invalid={fieldState.invalid}
                    type="text"
                    placeholder="Алексей Смирнов"
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
                    id="password"
                    aria-invalid={fieldState.invalid}
                    visible={showPassword}
                    onVisibleChange={setShowPassword}
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
