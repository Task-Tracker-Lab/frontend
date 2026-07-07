import { landingTemplates } from '../config/landing';
import { BoardPreview } from './BoardPreview';

function LandingTemplates() {
  return (
    <section
      id="templates"
      className="motion-safe:animate-fade-in scroll-mt-20 py-16 motion-safe:[animation-delay:160ms]"
    >
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">Шаблоны</p>
        <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          Готовые доски для разных сфер бизнеса
        </h2>
        <p className="text-muted-foreground text-pretty">
          Выберите шаблон под свою отрасль — этапы и формулировки уже подобраны. Останется только
          добавить свои задачи.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {landingTemplates.map((template) => {
          const Icon = template.icon;

          return (
            <article
              key={template.title}
              className="bg-card ring-foreground/10 hover:bg-muted/20 flex flex-col gap-4 rounded-xl p-4 ring-1 transition-colors duration-200"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${template.accent}`}
                >
                  <Icon className="size-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold">{template.title}</h3>
                  <p className="text-muted-foreground text-sm">{template.description}</p>
                </div>
              </div>
              <BoardPreview columns={template.columns} className="mt-auto" />
            </article>
          );
        })}
      </div>
    </section>
  );
}

export { LandingTemplates };
