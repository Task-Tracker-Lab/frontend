'use client';

import { LoginForm } from './LoginForm';
import Link from 'next/link';
import { ScreenshotPlaceholder, AppLogo } from 'shared/ui';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex flex-col justify-between bg-secondary p-10 w-1/2">
        <div>
          <AppLogo />
          <h2 className="text-2xl mb-2 font-bold">С возвращением!</h2>
          <p>
            Войдите в свой аккаунт и продолжайте работу над проектами. <br />
            Ваша команда уже ждет вас.
          </p>
        </div>
        <ScreenshotPlaceholder />
      </div>
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Вход в систему</h2>
          <p className="text-gray-500 mb-6">Пожалуйста, введите ваши данные для входа.</p>
          <LoginForm />
          <div className="mt-6 flex justify-center gap-2 text-sm text-gray-500">
            <span>Нет аккаунта?</span>
            <Link className="text-link" href="/auth/register">
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
