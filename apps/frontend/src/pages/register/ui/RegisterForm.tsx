'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from 'shared/ui/input';
import { formSchema, FormState } from '../model/registerSchema';
import { Field, FieldDescription, FieldLabel } from 'shared/ui/field';
import { Button } from 'shared/ui';

export function RegisterForm() {
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
        <Field>
          <FieldLabel htmlFor="name">Имя</FieldLabel>
          <Input id="name" type="text" placeholder="example" {...register('name')} />
          {errors.name && (
            <FieldDescription className="text-red-500 text-sm">
              {errors.name.message}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Пароль</FieldLabel>
          <Input id="password" type="password" placeholder="*********" {...register('password')} />
          {errors.password && (
            <FieldDescription className="text-red-500">{errors.password.message}</FieldDescription>
          )}
        </Field>
      </div>
      <Button className="w-full bg-blue-600 text-white py-2 rounded">Зарегистрироваться</Button>
    </form>
  );
}
