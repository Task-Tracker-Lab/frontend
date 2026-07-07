import NextLink from 'next/link';
import { routes } from 'shared/config';
import { Button, Link, Logo } from 'shared/ui';

const navItems = [
  { href: '#features', label: 'Возможности' },
  { href: '#templates', label: 'Шаблоны' },
  { href: '#how-it-works', label: 'Как начать' },
] as const;

function LandingHeader() {
  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-20 border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-6 md:px-10">
        <Link href={routes.home()} className="shrink-0">
          <Logo size="sm" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Основная навигация">
          {navItems.map((item) => (
            <Button key={item.href} asChild variant="ghost" size="sm">
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <NextLink href={routes.auth.signin()}>Войти</NextLink>
          </Button>
          <Button asChild variant="default" size="sm">
            <NextLink href={routes.auth.signup()}>Начать бесплатно</NextLink>
          </Button>
        </div>
      </div>
    </header>
  );
}

export { LandingHeader };
