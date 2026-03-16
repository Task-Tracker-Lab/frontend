'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormState } from '../model/loginSchema';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui';
import { Field, FieldDescription, FieldLabel } from 'shared/ui/field';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });
  const onSubmit = (data: FormState): void => {
    console.log(data);
    reset();
  };
  return (
    <form className="space-y-6 mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-4">
        <Field>
          <FieldLabel htmlFor="email">Почта</FieldLabel>
          <Input type="email" {...register('email')} id="email" placeholder="example@company.com" />
          {errors.email && (
            <FieldDescription className="text-red-500">{errors.email.message}</FieldDescription>
          )}
        </Field>
        <Field className="grid gap-2">
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Пароль</FieldLabel>
            <Link
              href="/auth/reset-password"
              className="ml-auto text-sm underline-offset-4 hover:underline text-muted-foreground"
            >
              Забыли пароль?
            </Link>
          </div>

          <Input id="password" type="password" placeholder="********" {...register('password')} />

          {errors.password && (
            <FieldDescription className="text-red-500 text-sm">
              {errors.password.message}
            </FieldDescription>
          )}
        </Field>
      </div>
      <Button className="w-full bg-blue-600 text-white py-2 rounded">Войти</Button>
    </form>
  );
}
