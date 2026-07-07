import { ArrowRight } from 'lucide-react';
import NextLink from 'next/link';
import { routes } from 'shared/config';
import { Badge, Button } from 'shared/ui';
import { landingHeroAudience, landingIndustries } from '../config/landing';
import { BoardPreview } from './BoardPreview';

function LandingHero() {
  return (
    <section className="motion-safe:animate-fade-in space-y-8 pt-8 pb-4 md:space-y-10 md:pt-12">
      <div className="space-y-6">
        <Badge variant="secondary" className="h-7 px-3 text-xs font-medium">
          Для бизнеса, а не для IT-отделов
        </Badge>

        <h1 className="w-full max-w-none text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl xl:text-7xl">
          Ведите дела команды без сложных терминов
        </h1>
      </div>

      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-muted-foreground max-w-xl text-lg text-pretty md:text-xl">
              {landingHeroAudience} Готовые доски и понятные названия — начните работать в первый же
              день.
            </p>
            <ul className="flex flex-wrap gap-2 pt-1" aria-label="Подходит для сфер">
              {landingIndustries.map((industry) => (
                <li
                  key={industry}
                  className="bg-background text-muted-foreground ring-foreground/10 rounded-full px-2.5 py-1 text-xs font-medium ring-1"
                >
                  {industry}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="default">
              <NextLink href={routes.auth.signup()}>
                Создать рабочее пространство
                <ArrowRight aria-hidden />
              </NextLink>
            </Button>
            <Button asChild size="lg" variant="outline">
              <NextLink href={routes.auth.signin()}>У меня уже есть аккаунт</NextLink>
            </Button>
          </div>

          <p className="text-muted-foreground text-sm">
            Бесплатный старт · Без кредитной карты · Настройка за 5 минут
          </p>
        </div>

        <div className="relative">
          <div className="from-primary/8 to-secondary/30 absolute -inset-4 rounded-2xl bg-gradient-to-br blur-2xl" />
          <div className="relative space-y-3">
            <p className="text-muted-foreground text-center text-xs font-medium tracking-wide uppercase">
              Пример доски «Магазин»
            </p>
            <BoardPreview columns={['Новые заказы', 'Собираем', 'Выдано']} />
          </div>
        </div>
      </div>
    </section>
  );
}

export { LandingHero };
