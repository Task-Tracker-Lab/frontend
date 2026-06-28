import { routes } from 'shared/config';
import { Button, Link, Logo, Separator } from 'shared/ui';

interface MainPageProps {
  className?: string;
}

function MainPage({ className }: MainPageProps) {
  return (
    <main className={`bg-muted relative isolate overflow-hidden ${className ?? ''}`}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="from-background via-muted/60 to-background absolute inset-0 bg-gradient-to-b" />
        <div className="absolute inset-0 [background:radial-gradient(60%_45%_at_20%_15%,oklch(0.74_0.13_245_/_.2),transparent_72%)]" />
        <div className="absolute inset-0 [background:radial-gradient(55%_45%_at_82%_22%,oklch(0.78_0.14_180_/_.16),transparent_74%)]" />
        <div className="absolute inset-0 [background:radial-gradient(120%_85%_at_50%_50%,transparent_58%,oklch(0.2_0_0_/_.06)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-8 px-6 py-10 md:px-10">
        <section className="motion-safe:animate-fade-in-6 space-y-8 pt-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-background inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-sm">
              <Logo size="sm" />
              Open Source Task Tracker
            </div>

            <div className="ml-auto hidden items-center gap-2 sm:flex">
              <Button asChild size="sm">
                <Link href={routes.auth.signin()}>Войти</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={routes.auth.signup()}>Регистрация</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
              Планируйте спринты и держите фокус команды в одной команде
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg md:text-xl">
              Один трекер для продукта, разработки и QA. Все статусы и приоритеты прозрачны в
              реальном времени.
            </p>
          </div>
        </section>

        <Separator className="motion-safe:animate-fade-in-6 motion-safe:[animation-delay:80ms]" />

        <section className="motion-safe:animate-fade-in-6 grid gap-8 py-8 motion-safe:[animation-delay:160ms] md:grid-cols-2 md:gap-12">
          <div className="space-y-3">
            <p className="text-primary text-sm font-semibold tracking-wide uppercase">
              С чего начать
            </p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Три шага до первого спринта
            </h2>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button asChild>
                <Link href={routes.auth.signup()}>Создать аккаунт</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={routes.auth.signin()}>У меня уже есть аккаунт</Link>
              </Button>
            </div>
          </div>

          <ol className="divide-border divide-y border-y md:border-y-0">
            <li className="py-4 transition-transform duration-200 hover:translate-x-1">
              <p className="text-lg font-medium">01. Создайте проект</p>
            </li>
            <li className="py-4 transition-transform duration-200 hover:translate-x-1">
              <p className="text-lg font-medium">02. Добавьте команду</p>
            </li>
            <li className="py-4 transition-transform duration-200 hover:translate-x-1">
              <p className="text-lg font-medium">03. Запустите спринт</p>
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}

export { MainPage };
