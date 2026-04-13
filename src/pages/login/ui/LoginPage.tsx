import { LoginForm } from './LoginForm';
import { LoginImageLight, LoginImageDark } from 'shared/assests';
import { AppCopyright, Logo, ThemedImage } from 'shared/ui';
import * as React from 'react';

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-row-reverse">
      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs space-y-5">
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-3xl font-bold">Вход в систему</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Пожалуйста, введите ваши данные для входа.
            </p>
          </div>
          <LoginForm />
        </div>
      </main>
      <aside className="bg-secondary hidden max-w-1/2 flex-1 flex-col justify-between gap-4 p-8 lg:flex">
        <header>
          <Logo />
        </header>
        <div>
          <h2 className="text-2xl font-bold">С возвращением!</h2>
          <p className="mt-3">
            Войдите в свой аккаунт и продолжайте работу над проектами. <br />
            Ваша команда уже ждет вас.
          </p>
          <div className="mt-10 overflow-hidden rounded-lg">
            <ThemedImage
              className="motion-safe:animate-fade-in-6 w-full object-contain"
              srcLight={LoginImageLight}
              srcDark={LoginImageDark}
              alt="Скриншот интерфейса приложения"
            />
          </div>
        </div>
        <footer>
          <AppCopyright />
        </footer>
      </aside>
    </div>
  );
}
