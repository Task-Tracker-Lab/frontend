import { Quote } from 'lucide-react';
import { landingTestimonials } from '../config/landing';

function LandingTestimonials() {
  return (
    <section className="motion-safe:animate-fade-in py-16 motion-safe:[animation-delay:240ms]">
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">Отзывы</p>
        <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          Уже помогает реальным командам
        </h2>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {landingTestimonials.map((testimonial) => (
          <blockquote
            key={testimonial.name}
            className="bg-card ring-foreground/10 flex flex-col gap-4 rounded-xl p-5 ring-1"
          >
            <Quote className="text-primary/40 size-6" aria-hidden />
            <p className="text-sm text-pretty">&ldquo;{testimonial.quote}&rdquo;</p>
            <footer className="mt-auto border-t pt-4">
              <cite className="not-italic">
                <span className="block text-sm font-medium">{testimonial.name}</span>
                <span className="text-muted-foreground text-xs">
                  {testimonial.role}, {testimonial.business}
                </span>
              </cite>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

export { LandingTestimonials };
