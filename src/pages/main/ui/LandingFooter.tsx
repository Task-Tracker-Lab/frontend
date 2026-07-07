import { routes } from 'shared/config';
import { AppCopyright, Link, Logo } from 'shared/ui';
import {
  landingFooterDescription,
  landingFooterHighlights,
  landingFooterSections,
  landingIndustries,
  type LandingFooterLink,
} from '../config/landing';

function isAnchorLink(href: LandingFooterLink['href']): href is `#${string}` {
  return href.startsWith('#');
}

function LandingFooter() {
  return (
    <footer className="border-t pt-12 pb-8">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-1">
          <Link href={routes.home()}>
            <Logo size="sm" />
          </Link>
          <p className="text-muted-foreground max-w-xs text-sm text-pretty">
            {landingFooterDescription}
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Преимущества">
            {landingFooterHighlights.map((highlight) => (
              <li
                key={highlight}
                className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs font-medium"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {landingFooterSections.map((section) => (
          <nav key={section.title} className="space-y-3" aria-label={section.title}>
            <h2 className="text-sm font-semibold">{section.title}</h2>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  {isAnchorLink(link.href) ? (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="space-y-3">
          <h2 className="text-sm font-semibold">Для кого</h2>
          <ul className="text-muted-foreground space-y-2 text-sm">
            {landingIndustries.map((industry) => (
              <li key={industry}>{industry}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
        <AppCopyright />
        <p className="text-muted-foreground text-center text-xs sm:text-right">
          Сделано для бизнеса, где важна простота
        </p>
      </div>
    </footer>
  );
}

export { LandingFooter };
