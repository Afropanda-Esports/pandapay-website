import FadeReveal from '../FadeReveal';
import { WHATSAPP_URL } from '../../siteContent';

const steps = [
  {
    number: '01',
    title: 'Choose your crypto payment method',
    body: 'Select the crypto path inside the PandaPay conversation and confirm the order details before payment starts.',
  },
  {
    number: '02',
    title: 'Send the exact USDC amount to the provided address',
    body: 'Your checkout amount is locked at order creation, so the transfer stays clear and easy to verify.',
  },
  {
    number: '03',
    title: 'Your code is delivered to WhatsApp automatically',
    body: 'As soon as the payment confirms, fulfillment continues and the final code lands back in the same chat thread.',
  },
] as const;

const editorialCards = [
  {
    eyebrow: 'Stable value',
    title: 'Why USDC',
    body: 'Stable value, no price risk, instant settlement. Your NGN price is locked at order creation — no volatility between checkout and delivery.',
  },
  {
    eyebrow: 'Naira-pegged',
    title: 'cNGN',
    body: 'Prefer to stay in naira? cNGN is the naira-pegged stablecoin. Pay in cNGN and get the same instant crypto confirmation with full naira price stability.',
  },
] as const;

export default function CryptoShowcase() {
  return (
    <section
      id="crypto"
      className="w-full min-w-0 bg-background py-12 shadow-[var(--shadow-section-separate)] lg:py-20"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-12 px-4 py-12 lg:px-20 lg:py-0">
        <FadeReveal className="w-full min-w-0 max-w-4xl">
          <div className="w-full min-w-0">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#C04B22]">
              Crypto-native gaming
            </p>
            <h2 className="mt-5 w-full min-w-0 font-heading text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.02] text-[#120B04] dark:text-[rgb(225,225,227)]">
              Pay in crypto. Play instantly.
            </h2>
            <p className="mt-5 w-full min-w-0 max-w-3xl font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
              PandaPay accepts USDC across multiple chains. No friction. Send crypto, get your code.
            </p>
          </div>
        </FadeReveal>

        <div className="grid w-full min-w-0 grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-0">
          {steps.map((step, index) => (
            <FadeReveal key={step.number} className="w-full min-w-0" delay={index * 0.06}>
              <article
                className={`flex h-full min-h-[260px] flex-col gap-6 py-4 lg:px-8 ${
                  index < steps.length - 1 ? 'lg:border-r lg:border-[rgba(0,0,0,0.1)] lg:dark:border-white/8' : ''
                }`}
              >
                <p className="font-heading text-[clamp(4rem,10vw,6.5rem)] leading-none text-black/12 dark:text-[rgba(255,255,255,0.1)]">
                  {step.number}
                </p>
                <div className="max-w-md">
                  <h3 className="font-heading text-3xl font-bold leading-tight text-[#120B04] dark:text-[rgb(225,225,227)]">
                    {step.title}
                  </h3>
                  <p className="mt-4 font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
                    {step.body}
                  </p>
                </div>
              </article>
            </FadeReveal>
          ))}
        </div>

        <div className="grid w-full min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
          {editorialCards.map((card, index) => (
            <FadeReveal key={card.title} className="w-full min-w-0" delay={index * 0.08}>
              <article className="h-full rounded-2xl border border-[#E8DDD0] bg-[#F5F0E8] p-8 dark:border-white/8 dark:bg-[#1C130A]">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#C04B22]">
                  {card.eyebrow}
                </p>
                <h3 className="mt-5 text-[22px] font-medium leading-tight text-[#120B04] dark:text-[rgb(225,225,227)]">
                  {card.title}
                </h3>
                <p className="mt-4 font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
                  {card.body}
                </p>
              </article>
            </FadeReveal>
          ))}
        </div>

        <FadeReveal className="w-full min-w-0" delay={0.12}>
          <div className="flex w-full min-w-0 justify-center">
            <a
              href={WHATSAPP_URL}
              className="inline-flex rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
            >
              Start with crypto
            </a>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}
