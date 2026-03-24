import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormState } from '../model/loginSchema';
import {
  Field,
  FieldLabel,
  Button,
  Input,
  FieldError,
  Checkbox,
  Label,
  PasswordInput,
} from 'shared/ui';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormState>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = (data: FormState): void => {
    console.log(data);
    reset();
  };
  return (
    <form className="space-y-6 mb-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-5">
        <Field>
          <FieldLabel htmlFor="email">Почта</FieldLabel>
          <Input type="email" {...register('email')} id="email" placeholder="example@company.com" />
          {errors.email && <FieldError className="text-red-500">{errors.email.message}</FieldError>}
        </Field>
        <Field className="grid gap-2">
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Пароль</FieldLabel>
          </div>
          <PasswordInput id="password" placeholder="Ваш пароль" {...register('password')} />
          {errors.password && (
            <FieldError className="text-red-500 text-sm">{errors.password.message}</FieldError>
          )}
        </Field>
        <div className="flex items-center justify-between text-sm">
          <Label className="flex items-center gap-2">
            <Checkbox />
            Запомнить меня
          </Label>
          <Link href="/auth/reset-password" className="text-link hover:underline">
            Забыли пароль?
          </Link>
        </div>
      </div>
      <Button size="lg" className="w-full">
        Войти
      </Button>
    </form>
  );
}
