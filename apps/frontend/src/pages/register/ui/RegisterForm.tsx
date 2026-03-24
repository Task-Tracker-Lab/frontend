import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormState } from '../model/registerSchema';
import { Field, FieldLabel, Button, Checkbox, Label, FieldError, Input } from 'shared/ui';
import Link from 'next/link';
import { PasswordInput } from 'shared/ui/password-input';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      terms: false,
    },
  });
  const onSubmit = (data: FormState): void => {
    console.log(data);
    reset();
  };
  return (
    <form className="space-y-6 mb-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-5">
        <Field>
          <FieldLabel htmlFor="name">Имя</FieldLabel>
          <Input id="name" type="text" placeholder="Алексей Смирнов" {...register('name')} />
          {errors.name && (
            <FieldError className="text-red-500 text-sm">{errors.name.message}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Почта</FieldLabel>
          <Input type="email" {...register('email')} id="email" placeholder="example@company.com" />
          {errors.email && <FieldError className="text-red-500">{errors.email.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Пароль</FieldLabel>
          <PasswordInput id="password" placeholder="Ваш пароль" {...register('password')} />
          {errors.password && (
            <FieldError className="text-red-500">{errors.password.message}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">Подтвердите пароль</FieldLabel>
          <PasswordInput
            id="confirmPassword"
            placeholder="*********"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <FieldError className="text-red-500">{errors.confirmPassword.message}</FieldError>
          )}
        </Field>
      </div>
      <Label className="flex items-center gap-2 text-sm">
        <Controller
          name="terms"
          control={control}
          render={({ field }) => (
            <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        Я согласен с
        <Link href="/auth/reset-password" className="text-link hover:underline">
          условиями использования
        </Link>
      </Label>
      {errors.terms && (
        <FieldError className="text-red-500 text-xs ml-6">{errors.terms.message}</FieldError>
      )}
      <Button size="lg" className="w-full">
        Зарегистрироваться
      </Button>
    </form>
  );
}
