import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import SeoMeta from '../components/SeoMeta';
import FadeReveal from '../components/FadeReveal';
import { HOW_IT_WORKS_STEPS, WHATSAPP_URL } from '../siteContent';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="How Panda Pay Works — WhatsApp VTU Checkout"
        description="See PandaPay's guided WhatsApp journey from the current catalog through cart review, bank-transfer checkout, and order updates."
        path="/how-it-works"
      />
      <PageHero
        title="From catalog to confirmation."
        body="Browse what is available, review your cart, complete checkout, and follow your order in WhatsApp."
      />

      <main className="pb-20">
        <section className="w-full min-w-0 py-12 shadow-[var(--shadow-section-separate)] lg:py-20">
          <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-5 px-6 md:px-12 lg:px-20">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <FadeReveal key={step} className="w-full min-w-0" delay={index * 0.04}>
                <article className="rounded-[32px] bg-[var(--color-card-soft)] p-8 shadow-elevation-2">
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary-500">
                    Step {index + 1}
                  </p>
                  <p className="mt-4 font-heading text-3xl font-bold leading-tight text-[#120B04] dark:text-[rgb(225,225,227)] md:text-4xl">
                    {step}
                  </p>
                </article>
              </FadeReveal>
            ))}
          </div>
        </section>

        <section className="w-full min-w-0 py-12 shadow-[var(--shadow-section-separate)] lg:py-20">
          <div className="mx-auto grid w-full min-w-0 max-w-[1440px] gap-5 px-6 md:px-12 lg:grid-cols-2 lg:px-20">
            <FadeReveal className="w-full min-w-0">
              <article className="h-full rounded-[32px] bg-[var(--color-card-soft)] p-8 shadow-elevation-2">
                <h2 className="font-heading text-3xl font-bold text-[#120B04] dark:text-[rgb(225,225,227)] md:text-4xl">
                  Guided checkout
                </h2>
                <p className="mt-4 font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
                  PandaPay shows the required checkout details and exact bank-transfer
                  instructions in the conversation. Review the total carefully before sending
                  payment.
                </p>
              </article>
            </FadeReveal>
            <FadeReveal className="w-full min-w-0" delay={0.08}>
              <article className="h-full rounded-[32px] bg-[var(--color-card-soft)] p-8 shadow-elevation-2">
                <h2 className="font-heading text-3xl font-bold text-[#120B04] dark:text-[rgb(225,225,227)] md:text-4xl">
                  Clear order updates
                </h2>
                <p className="mt-4 font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
                  Payment and fulfillment status stays in the same WhatsApp conversation.
                  Order fulfillment stays in WhatsApp, while an optional email address is used
                  only for the order receipt.
                </p>
              </article>
            </FadeReveal>
          </div>
        </section>

        <section className="w-full min-w-0 py-12 shadow-[var(--shadow-section-separate)] lg:py-20">
          <div className="mx-auto flex w-full min-w-0 max-w-[1440px] justify-center px-6 md:px-12 lg:px-20">
            <a
              href={WHATSAPP_URL}
              className="inline-flex rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
            >
              Try it now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
