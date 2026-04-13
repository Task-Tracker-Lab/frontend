'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputPassword, Input, InputEmail } from 'shared/ui';
import { formSchema, FormState } from '../model/registerSchema';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from 'shared/ui';
import { Button, Link } from 'shared/ui';
import { cn } from 'shared/lib/utils';
import * as z from 'zod';
import { useState } from 'react';

export function RegisterForm({
  className,
  ...props
}: Omit<React.ComponentProps<'form'>, 'children'>) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit">Зарегистрироваться</Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Уже есть аккаунт? <Link href="/login">Войти</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
