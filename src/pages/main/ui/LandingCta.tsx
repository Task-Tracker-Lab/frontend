import { ArrowRight } from 'lucide-react';
import NextLink from 'next/link';
import { routes } from 'shared/config';
import { Button } from 'shared/ui';

function LandingCta() {
  return (
    <section className="motion-safe:animate-fade-in py-16 motion-safe:[animation-delay:280ms]">
      <div className="bg-primary text-primary-foreground rounded-2xl px-6 py-10 text-center md:px-12 md:py-14">
        <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          Попробуйте сегодня — без сложных настроек
        </h2>
        <p className="text-primary-foreground/80 mx-auto mt-3 max-w-xl text-pretty">
          Создайте рабочее пространство, выберите шаблон под свой бизнес и пригласите команду.
          Первые задачи можно добавить уже через пять минут.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="secondary">
            <NextLink href={routes.auth.signup()}>
              Начать бесплатно
              <ArrowRight aria-hidden />
            </NextLink>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <NextLink href={routes.auth.signin()}>Войти в аккаунт</NextLink>
          </Button>
        </div>
      </div>
    </section>
  );
}

export { LandingCta };
