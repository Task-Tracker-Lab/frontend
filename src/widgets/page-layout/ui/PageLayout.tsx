import { ReactNode } from 'react';

interface PageLayoutProps {
  title: string | ReactNode;
  description?: string;
  badge?: ReactNode;
  headerSlot?: ReactNode;
  nav?: ReactNode;
  children: ReactNode;
}

export function PageLayout({
  title,
  description,
  badge,
  headerSlot,
  nav,
  children,
}: PageLayoutProps) {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto px-6 py-10 lg:px-8">
        <header>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {badge}
          </div>
          {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
        </header>

        {headerSlot && <div className="mt-4">{headerSlot}</div>}

        {nav && <div className="mt-8">{nav}</div>}

        <section className="mt-6 p-4">{children}</section>
      </div>
    </main>
  );
}
