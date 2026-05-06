import FadeReveal from '../FadeReveal';
import { WHATSAPP_URL } from '../../siteContent';

const stackPills = ['AI-powered', 'Multi-chain', 'Naira-first', 'WhatsApp-native'] as const;

export default function AboutStory() {
  return (
    <section
      id="about"
      className="w-full min-w-0 bg-background py-12 shadow-[var(--shadow-section-separate)] lg:py-20"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-12 px-4 py-12 lg:px-20 lg:py-0">
        <FadeReveal className="w-full min-w-0 max-w-4xl">
          <div className="w-full min-w-0">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#C04B22]">
              About
            </p>
            <h2 className="mt-5 w-full min-w-0 font-heading text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.02] text-[#120B04] dark:text-[rgb(225,225,227)]">
              We built the store Africa's gamers deserved.
            </h2>
            <p className="mt-5 w-full min-w-0 max-w-3xl font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
              African gamers spend billions every year on gaming — but most payment infrastructure was never built for them. PandaPay changes that.
            </p>
          </div>
        </FadeReveal>

        <FadeReveal className="w-full min-w-0">
          <article className="grid min-w-0 grid-cols-1 overflow-hidden rounded-[32px] border border-[#E8DDD0] bg-[#F5F0E8] dark:border-white/8 dark:bg-[#1C130A] lg:grid-cols-2">
            <div className="p-8 md:p-10">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#6B5642] dark:text-[rgba(225,225,227,0.4)]">
                The Problem
              </p>
              <h3 className="mt-5 font-heading text-3xl font-bold text-[#120B04] dark:text-[rgb(225,225,227)] md:text-4xl">
                The market was underserved by both global gaming platforms and local fintech.
              </h3>
              <p className="mt-4 font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
                Gamers in Nigeria and Ghana could not easily access gaming products. International card payments failed. Stores did not accept Naira. Crypto was too complicated. The checkout stack simply was not built around how African gamers actually pay.
              </p>
            </div>
            <div className="border-t border-[rgba(0,0,0,0.08)] p-8 dark:border-white/8 lg:border-l lg:border-t-0 md:p-10">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#6B5642] dark:text-[rgba(225,225,227,0.4)]">
                Our Solution
              </p>
              <h3 className="mt-5 font-heading text-3xl font-bold text-[#120B04] dark:text-[rgb(225,225,227)] md:text-4xl">
                A WhatsApp-native AI that handles the entire purchase flow.
              </h3>
              <p className="mt-4 font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
                Multi-rail payments — Naira bank transfer, USDC, and stablecoins — built around how Africans already transact. One conversation. One assistant. One checkout flow that feels native instead of patched together.
              </p>
            </div>
          </article>
        </FadeReveal>

        <div className="grid w-full min-w-0 grid-cols-1 gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <FadeReveal className="w-full min-w-0">
            <article className="h-full rounded-[32px] bg-[#C04B22] p-8 md:p-10">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                Mission
              </p>
              <h3 className="mt-5 max-w-2xl font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                We are building the fastest, clearest way for African gamers to pay, top up, and stay in the game.
              </h3>
            </article>
          </FadeReveal>

          <FadeReveal className="w-full min-w-0" delay={0.08}>
            <article className="h-full rounded-[32px] border border-[#E8DDD0] bg-white p-8 dark:border-white/8 dark:bg-[#25190F] md:p-10">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#6B5642] dark:text-[rgba(225,225,227,0.4)]">
                The Stack
              </p>
              <h3 className="mt-5 font-heading text-3xl font-bold text-[#120B04] dark:text-[rgb(225,225,227)] md:text-4xl">
                AI-powered. Multi-chain. Naira-first.
              </h3>
              <p className="mt-4 font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
                Built on Anthropic Claude, with crypto rails designed for fast, reliable checkout and a WhatsApp-native interface that keeps the whole experience simple.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {stackPills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-[#E8DDD0] bg-[#F5F0E8] px-4 py-2 text-sm text-[#6B5642] dark:border-white/8 dark:bg-[#1C130A] dark:text-[rgba(225,225,227,0.55)]"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </article>
          </FadeReveal>
        </div>

        <FadeReveal className="w-full min-w-0" delay={0.12}>
          <div className="flex w-full min-w-0 justify-center">
            <a
              href={WHATSAPP_URL}
              className="inline-flex rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
            >
              Try PandaPay
            </a>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}
