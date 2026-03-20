'use client';
import { LoginForm } from './LoginForm';
import Link from 'next/link';
export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2"># Task-tracker</h1>

      <h2 className="text-lg font-medium mb-4">С возвращением</h2>
      <LoginForm />
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="flex gap-2">
          <p className="text-gray-500">Нет аккаунта?</p>
          <Link className="text-blue-700" href="/auth/register">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
}
