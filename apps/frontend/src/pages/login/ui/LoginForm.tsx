'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormState } from '../model/loginSchema';
import {
  Field,
  FieldDescription,
  FieldLabel,
  Button,
  Input,
  FieldGroup,
  FieldError,
  Link,
} from 'shared/ui';
import { cn } from 'shared/lib';
import * as z from 'zod';

export function LoginForm({ className, ...props }: Omit<React.ComponentProps<'form'>, 'children'>) {
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
              <Input
                {...field}
                id="email"
                aria-invalid={fieldState.invalid}
                type="email"
                placeholder="mail@example.com"
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
              <Input
                {...field}
                id="password"
                aria-invalid={fieldState.invalid}
                type="password"
                placeholder="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit">Войти</Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
