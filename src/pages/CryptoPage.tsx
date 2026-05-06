import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import SeoMeta from '../components/SeoMeta';
import FadeReveal from '../components/FadeReveal';
import { WHATSAPP_URL } from '../siteContent';

const steps = [
  'Choose your crypto payment method',
  'Send the exact USDC amount',
  'Your code is delivered to WhatsApp automatically',
] as const;

export default function CryptoPage() {
  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="Crypto Checkout — Panda Pay"
        description="Pay for gaming products with USDC across multiple chains through PandaPay's WhatsApp-native checkout."
        path="/crypto"
      />
      <PageHero
        badge="CRYPTO-NATIVE GAMING"
        title="Pay in crypto. Play instantly."
        body="PandaPay accepts USDC across multiple chains. No friction. Send crypto, get your code."
      >
        <a
          href={WHATSAPP_URL}
          className="inline-flex self-start rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
        >
          Start with crypto
        </a>
      </PageHero>

      <main className="pb-20">
        <section className="w-full min-w-0 py-12 shadow-[var(--shadow-section-separate)] lg:py-20">
          <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-10 px-6 md:px-12 lg:px-20">
            <FadeReveal className="max-w-3xl">
              <div>
                <h2 className="font-heading text-4xl font-bold text-[#120B04] dark:text-[rgb(225,225,227)] md:text-5xl">
                  Pay with crypto.
                </h2>
                <p className="mt-4 max-w-2xl font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
                  Multi-chain checkout stays simple inside one WhatsApp conversation.
                </p>
              </div>
            </FadeReveal>
          </div>
        </section>

        <section className="w-full min-w-0 py-12 shadow-[var(--shadow-section-separate)] lg:py-20">
          <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-10 px-6 md:px-12 lg:px-20">
            <FadeReveal className="max-w-3xl">
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
                  How crypto checkout works
                </p>
                <h2 className="mt-5 font-heading text-4xl font-bold text-[#120B04] dark:text-[rgb(225,225,227)] md:text-5xl">
                  Fast rails. Simple flow.
                </h2>
              </div>
            </FadeReveal>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {steps.map((step, index) => (
                <FadeReveal key={step} delay={index * 0.06}>
                  <article className="flex min-h-[220px] flex-col rounded-[28px] bg-[var(--color-card-soft)] p-7 shadow-elevation-2">
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary-500">
                      Step {index + 1}
                    </p>
                    <p className="mt-6 font-heading text-3xl font-bold leading-tight text-[#120B04] dark:text-[rgb(225,225,227)]">
                      {step}
                    </p>
                  </article>
                </FadeReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full min-w-0 py-12 shadow-[var(--shadow-section-separate)] lg:py-20">
          <div className="mx-auto grid w-full min-w-0 max-w-[1440px] gap-5 px-6 md:px-12 lg:grid-cols-2 lg:px-20">
            <FadeReveal className="w-full min-w-0">
              <article className="h-full rounded-[32px] bg-[var(--color-card-soft)] p-8 shadow-elevation-2">
                <h2 className="font-heading text-3xl font-bold text-[#120B04] dark:text-[rgb(225,225,227)] md:text-4xl">
                  Why USDC?
                </h2>
                <p className="mt-4 font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
                  Stable value, no price risk, instant settlement. Your NGN price is locked
                  at order creation — no volatility between checkout and delivery.
                </p>
              </article>
            </FadeReveal>
            <FadeReveal className="w-full min-w-0" delay={0.08}>
              <article className="h-full rounded-[32px] bg-[var(--color-card-soft)] p-8 shadow-elevation-2">
                <h2 className="font-heading text-3xl font-bold text-[#120B04] dark:text-[rgb(225,225,227)] md:text-4xl">
                  cNGN
                </h2>
                <p className="mt-4 font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
                  Prefer to stay in naira? cNGN is the naira-pegged stablecoin. Pay in cNGN
                  and get the same instant crypto confirmation with full naira price
                  stability.
                </p>
              </article>
            </FadeReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
