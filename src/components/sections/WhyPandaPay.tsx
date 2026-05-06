import FadeReveal from '../FadeReveal';
import { WHY_PANDAPAY } from '../../siteContent';

export default function WhyPandaPay() {
  return (
    <section
      id="why-pandapay"
      className="w-full min-w-0 bg-background py-12 shadow-[var(--shadow-section-separate)] lg:py-20"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-12 px-4 py-12 lg:px-20 lg:py-0">
        <FadeReveal className="w-full min-w-0 max-w-4xl">
          <div className="w-full min-w-0">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
              Why PandaPay
            </p>
            <h2 className="mt-5 w-full min-w-0 font-heading text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.02] text-text-primary">
              Built different. For us.
            </h2>
          </div>
        </FadeReveal>

        <div className="grid w-full min-w-0 grid-cols-1 gap-5 lg:grid-cols-3">
          {WHY_PANDAPAY.map((item, index) => (
            <FadeReveal key={item.title} className="w-full min-w-0" delay={index * 0.06}>
              <article className="flex h-full min-h-[220px] flex-col rounded-[32px] bg-[var(--color-card-soft)] p-7 shadow-elevation-2">
                <h3 className="font-heading text-2xl font-bold leading-tight text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-4 font-sans text-base leading-8 text-text-muted">
                  {item.body}
                </p>
              </article>
            </FadeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
