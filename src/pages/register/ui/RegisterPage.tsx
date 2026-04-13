import { AppCopyright, Logo, ThemedImage } from 'shared/ui';
import { RegisterImageDark, RegisterImageLight } from 'shared/assests';
import * as React from 'react';
import { RegisterForm } from './RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh flex-row-reverse">
      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs space-y-5">
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-3xl font-bold">Создать аккаунт</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Заполните форму ниже, чтобы начать работу.
            </p>
          </div>
          <RegisterForm />
        </div>
      </main>
      <aside className="bg-secondary hidden max-w-1/2 flex-1 flex-col justify-between gap-4 p-8 lg:flex">
        <header>
          <Logo />
        </header>
        <div>
          <h2 className="text-2xl font-bold">Начните работать эффективнее уже сегодня</h2>
          <p className="mt-3">
            Платформа, созданная для тех, кто ценит свое время. <br />
            Управляйте проектами эффективнее и прозрачнее.
          </p>
          <div className="mt-10 overflow-hidden rounded-lg">
            <ThemedImage
              className="motion-safe:animate-fade-in-6 w-full object-contain"
              srcLight={RegisterImageLight}
              srcDark={RegisterImageDark}
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
