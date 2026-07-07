import { landingFeatures } from '../config/landing';

function LandingFeatures() {
  return (
    <section
      id="features"
      className="motion-safe:animate-fade-in scroll-mt-20 py-16 motion-safe:[animation-delay:120ms]"
    >
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">Почему мы</p>
        <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          Всё, что нужно бизнесу — и ничего лишнего
        </h2>
        <p className="text-muted-foreground text-pretty">
          Мы убрали сложность и оставили только то, что помогает команде работать слаженно.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {landingFeatures.map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.title}
              className="bg-card ring-foreground/10 group hover:bg-muted/30 rounded-xl p-5 ring-1 transition-colors duration-200"
            >
              <div className="bg-primary/10 text-primary group-hover:bg-primary/15 mb-4 flex size-10 items-center justify-center rounded-lg transition-colors duration-200">
                <Icon className="size-5" aria-hidden />
              </div>
              <h3 className="mb-2 text-base font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground text-sm text-pretty">{feature.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export { LandingFeatures };
