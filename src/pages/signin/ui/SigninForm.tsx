'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormState } from '../model/login-schema';
import {
  Field,
  FieldDescription,
  FieldLabel,
  Button,
  FieldGroup,
  FieldError,
  Link,
  InputPassword,
  InputEmail,
} from 'shared/ui';
import { cn } from 'shared/lib/utils';
import { routes } from 'shared/config';
import * as z from 'zod';

export function SigninForm({
  className,
  ...props
}: Omit<React.ComponentProps<'form'>, 'children'>) {
  const form = useForm<FormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    alert(JSON.stringify(data));
  };

  return (
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
  );
}
