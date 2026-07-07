import { LandingCta } from './LandingCta';
import { LandingFeatures } from './LandingFeatures';
import { LandingFooter } from './LandingFooter';
import { LandingHeader } from './LandingHeader';
import { LandingHero } from './LandingHero';
import { LandingProblem } from './LandingProblem';
import { LandingSteps } from './LandingSteps';
import { LandingTemplates } from './LandingTemplates';
import { LandingTestimonials } from './LandingTestimonials';

interface MainPageProps {
  className?: string;
}

function MainPage({ className }: MainPageProps) {
  return (
    <div className={`bg-muted relative isolate min-h-svh overflow-hidden ${className ?? ''}`}>
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="from-background via-muted/60 to-background absolute inset-0 bg-gradient-to-b" />
        <div className="absolute inset-0 [background:radial-gradient(60%_45%_at_20%_15%,oklch(0.74_0.13_245_/_.12),transparent_72%)]" />
        <div className="absolute inset-0 [background:radial-gradient(55%_45%_at_82%_22%,oklch(0.78_0.14_180_/_.1),transparent_74%)]" />
      </div>

      <LandingHeader />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-4 md:px-10">
        <LandingHero />
        <LandingProblem />
        <LandingFeatures />
        <LandingTemplates />
        <LandingSteps />
        <LandingTestimonials />
        <LandingCta />
        <LandingFooter />
      </main>
    </div>
  );
}

export { MainPage };
