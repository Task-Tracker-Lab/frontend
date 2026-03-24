'use client';
import Link from 'next/link';
import { RegisterForm } from './RegisterForm';
import { ScreenshotPlaceholder, AppLogo } from 'shared/ui';

export default function RegisterPage() {
  return (
    <div>
      <div className="min-h-screen flex">
        <div className="hidden md:flex flex-col justify-between bg-secondary p-10 w-1/2">
          <div>
            <AppLogo />
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Начните работать эффективнее уже сегодня</h2>
              <p>
                Платформа, созданная для тех, кто ценит свое время. Управляйте проектами эффективнее
                и прозрачнее.
              </p>
            </div>
          </div>
          <ScreenshotPlaceholder />
        </div>
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Создать аккаунт</h2>
              <p className="text-muted-foreground mb-6">
                Заполните форму ниже, чтобы начать работу.
              </p>
            </div>
            <RegisterForm />
            <div className="flex gap-3 justify-center text-sm">
              <p className="text-muted-foreground mb-6">уже есть аккаунт?</p>
              <Link href="/auth/login" className="text-link hover:underline">
                Войти
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
