'use client';

import { Controller, type FieldPath, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninBody, SigninFormSchema, SigninResponse } from '../model/schemas/login-schema';
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
import { cn } from 'shared/lib/utils';
import { routes } from 'shared/config';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { signin } from '../model/services/signin';
import { extractValidationIssues, ValidationIssue } from 'shared/api';

type FSchema = z.infer<typeof SigninFormSchema>;
type BSchema = z.infer<typeof SigninBody>;
type RSchema = z.infer<typeof SigninResponse>;

interface SigninFormProps extends Omit<React.ComponentProps<'form'>, 'children' | 'onSubmit'> {
  onSuccess?: (body: BSchema, res: RSchema) => void;
}

export function SigninForm({ className, onSuccess, ...props }: SigninFormProps) {
  const sendUserData = useMutation({
    mutationFn: (data: BSchema) => {
      return signin(data);
    },
    meta: {
      skipGlobalValidationToast: true,
    },
  });

  const form = useForm<FSchema>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function setFormErrors(errors: ValidationIssue[]) {
    if (Array.isArray(errors)) {
      errors.forEach(({ message, path: [path] }) => {
        const filedName = path as FieldPath<FSchema>;
        form.setError(filedName, { message });
      });
    }
  }

  const onSubmit = (data: FSchema) => {
    const body: BSchema = {
      email: data.email,
      password: data.password,
    };

    sendUserData.mutate(body, {
      onSuccess: (res) => {
        onSuccess?.(body, res);
      },
      onError: (err) => {
        setFormErrors(extractValidationIssues(err));
      },
    });
  };

  return (
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
                    <Link href="#" className="ml-auto text-sm">
                      Забыли пароль?
                    </Link>
                  </div>
                  <InputPassword {...field} id="password" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Field>
              <Button type="submit">Войти</Button>
            </Field>
            <Field>
              <FieldDescription className="text-center">
                Нет аккаунта? <Link href={routes.auth.signup()}>Зарегистрироваться</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
