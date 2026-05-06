import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import SeoMeta from '../components/SeoMeta';
import FadeReveal from '../components/FadeReveal';
import { HOW_IT_WORKS_STEPS, WHATSAPP_URL } from '../siteContent';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="How Panda Pay Works — WhatsApp Gaming Checkout"
        description="See how PandaPay's WhatsApp-native AI takes you from chat to live pricing, payment confirmation, and instant gaming code delivery."
        path="/how-it-works"
      />
      <PageHero
        title="From chat to code in minutes."
        body="PandaPay is powered by AI that lives inside WhatsApp. No app. No menus. Just a conversation."
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
                  AI Payment Verification
                </h2>
                <p className="mt-4 font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
                  For Naira payments, users upload a bank transfer screenshot directly to
                  WhatsApp. Our vision AI extracts the amount, reference, and sender details
                  and validates the payment against the pending order in under 2 seconds. No
                  human review needed for clean screenshots.
                </p>
              </article>
            </FadeReveal>
            <FadeReveal className="w-full min-w-0" delay={0.08}>
              <article className="h-full rounded-[32px] bg-[var(--color-card-soft)] p-8 shadow-elevation-2">
                <h2 className="font-heading text-3xl font-bold text-[#120B04] dark:text-[rgb(225,225,227)] md:text-4xl">
                  On-Chain Auto-Confirmation
                </h2>
                <p className="mt-4 font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
                  Crypto payments are monitored by chain listeners in real time. As soon as
                  the transaction is confirmed on-chain, the fulfillment pipeline triggers
                  automatically and delivers the code.
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
