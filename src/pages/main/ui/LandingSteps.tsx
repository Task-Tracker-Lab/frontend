import { landingSteps } from '../config/landing';

function LandingSteps() {
  return (
    <section
      id="how-it-works"
      className="motion-safe:animate-fade-in scroll-mt-20 py-16 motion-safe:[animation-delay:200ms]"
    >
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">Как начать</p>
        <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          Три шага — и команда уже в работе
        </h2>
      </div>

      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {landingSteps.map((step, index) => (
          <li
            key={step.title}
            className="bg-card ring-foreground/10 relative rounded-xl p-5 ring-1"
          >
            <span
              className="text-primary mb-3 block text-3xl font-semibold tabular-nums"
              aria-hidden
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mb-2 font-semibold">{step.title}</h3>
            <p className="text-muted-foreground text-sm text-pretty">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export { LandingSteps };
