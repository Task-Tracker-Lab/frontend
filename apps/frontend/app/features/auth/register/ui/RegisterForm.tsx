"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  email: z.email('Неверный формат email'),
  name: z.string().min(2, 'Слишком короткое имя').max(15, 'Слишком длинное имя'),
  password: z.string().min(6, 'Минимум 6 символов').max(32, 'Слишком длинный пароль'),
});

type FormState = z.infer<typeof formSchema>;

export default function RegisterForm() {
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
    <div>
      <h1 className="text-2xl font-semibold mb-2"># Task-tracker</h1>

      <h2 className="text-lg font-medium mb-4">С возвращением</h2>

      <form className="space-y-2 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p>Почта</p>
          <input
            {...register("email")}
            type="email"
            placeholder="example@company.com"
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <p>Имя</p>
          <input
            {...register("name")}
            type="text"
            placeholder="example"
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <p>Пароль</p>
          <input
            {...register("password")}
            type="password"
            placeholder="Введите пароль"
            className="w-full border rounded px-3 py-2"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Зарегистрироваться</button>
      </form>
    </div>
  );
}
