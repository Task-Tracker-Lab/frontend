import { XCircle } from 'lucide-react';

const painPoints = [
  'Спринты, бэклоги и story points — непонятно большинству сотрудников',
  'Нужно проходить обучение, прежде чем можно начать работать',
  'Пустая доска: неясно, с чего начать и как назвать этапы',
] as const;

function LandingProblem() {
  return (
    <section className="motion-safe:animate-fade-in py-16 motion-safe:[animation-delay:80ms]">
      <div className="bg-card ring-foreground/10 rounded-2xl p-6 ring-1 md:p-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <p className="text-primary text-sm font-semibold tracking-wide uppercase">Знакомо?</p>
            <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
              Обычные трекеры созданы для разработчиков, а не для вашей команды
            </h2>
            <p className="text-muted-foreground text-pretty">
              Владельцы бизнеса и сотрудники хотят просто видеть, что нужно сделать сегодня. Без
              переводчика с «айтишного» на человеческий.
            </p>
          </div>

          <ul className="space-y-3">
            {painPoints.map((point) => (
              <li
                key={point}
                className="bg-muted/50 flex items-start gap-3 rounded-lg px-4 py-3 text-sm"
              >
                <XCircle className="text-destructive mt-0.5 size-4 shrink-0" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export { LandingProblem };
