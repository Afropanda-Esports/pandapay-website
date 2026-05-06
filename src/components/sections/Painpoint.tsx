import { Link } from 'react-router-dom';
import FadeReveal from '../FadeReveal';
import { HOMEPAGE_FLOW, WHATSAPP_URL } from '../../siteContent';

export default function Painpoint() {
  return (
    <section
      id="how-it-works-preview"
      className="w-full min-w-0 bg-background py-12 shadow-[var(--shadow-section-separate)] lg:py-20"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-12 px-4 py-12 lg:px-20 lg:py-0">
        <FadeReveal className="w-full min-w-0 max-w-4xl">
          <div className="w-full min-w-0">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
              How it works
            </p>
            <h2 className="mt-5 w-full min-w-0 font-heading text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.02] text-text-primary">
              Every step stays in one chat.
            </h2>
            <p className="mt-5 w-full min-w-0 max-w-3xl font-sans text-base leading-8 text-text-muted">
              Every step is handled by Panda Pay AI inside WhatsApp, from first message to
              delivery.
            </p>
          </div>
        </FadeReveal>

        <div className="grid w-full min-w-0 grid-cols-1 gap-5 lg:grid-cols-3">
          {HOMEPAGE_FLOW.map((item, index) => (
            <FadeReveal key={item.step} className="w-full min-w-0" delay={index * 0.06}>
              <article className="flex h-full min-h-[280px] flex-col rounded-[32px] bg-[var(--color-card-soft)] p-7 shadow-elevation-2">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary-500">
                  {item.step}
                </p>
                <h3 className="mt-6 font-heading text-3xl font-bold leading-tight text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-5 font-sans text-base leading-8 text-text-muted">
                  {item.body}
                </p>
              </article>
            </FadeReveal>
          ))}
        </div>

        <FadeReveal className="w-full min-w-0" delay={0.18}>
          <div className="flex w-full min-w-0 flex-col gap-4 rounded-[32px] bg-[var(--color-card-soft)] p-8 shadow-elevation-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
                Want the full flow?
              </p>
              <p className="mt-2 font-sans text-sm leading-7 text-text-muted">
                See the complete WhatsApp purchase journey, from chat to live pricing to
                instant code delivery.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/how-it-works"
                className="inline-flex justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-primary-500/10"
              >
                Explore the flow
              </Link>
              <a
                href={WHATSAPP_URL}
                className="inline-flex justify-center rounded-full bg-primary-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
              >
                Start on WhatsApp
              </a>
            </div>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}
