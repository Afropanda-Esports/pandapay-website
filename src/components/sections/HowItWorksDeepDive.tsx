import FadeReveal from '../FadeReveal';
import { WHATSAPP_URL } from '../../siteContent';

const flowSteps = [
  {
    label: 'Step 01',
    title: 'Message PandaPay on WhatsApp',
    note: 'Start the order in one chat thread. No app install, no account setup, no menu maze.',
    tag: 'Start in chat',
  },
  {
    label: 'Step 02',
    title: 'Tell the AI what you want — in plain English or Pidgin',
    note: 'The assistant understands natural language and turns it into a clean order flow instantly.',
    tag: 'Natural language',
  },
  {
    label: 'Step 03',
    title: 'Get a live price in Naira or USDC',
    note: 'Pricing stays current at the moment of checkout, so the buyer always sees the exact rail they want.',
    tag: 'Live pricing',
  },
  {
    label: 'Step 04',
    title: 'Choose your payment method',
    note: 'Move between bank transfer, cNGN, or crypto without leaving the conversation.',
    tag: 'Flexible rails',
  },
  {
    label: 'Step 05',
    title: 'Naira: transfer and upload your screenshot. AI confirms in under 2 seconds.',
    note: 'Our vision AI extracts the amount, reference, and sender details and validates the payment against the pending order.',
    tag: 'AI verification',
  },
  {
    label: 'Step 06',
    title: 'Crypto: send USDC to the wallet address. Confirmed automatically on-chain.',
    note: 'As soon as the transaction is confirmed, the fulfillment pipeline continues without manual intervention.',
    tag: 'Auto-confirmation',
  },
  {
    label: 'Step 07',
    title: 'Your gaming code is delivered to WhatsApp instantly.',
    note: 'The final handoff happens in the same thread, so the customer never loses context.',
    tag: 'Instant delivery',
  },
] as const;

export default function HowItWorksDeepDive() {
  return (
    <section
      id="how-it-works"
      className="w-full min-w-0 py-12 shadow-[var(--shadow-section-separate)] lg:py-20"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-12 px-4 py-12 lg:px-20 lg:py-0">
        <FadeReveal className="w-full min-w-0 max-w-4xl">
          <div className="w-full min-w-0">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#C04B22]">
              Full flow
            </p>
            <h2 className="mt-5 w-full min-w-0 font-heading text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.02] text-[#120B04] dark:text-[rgb(225,225,227)]">
              From chat to code in minutes.
            </h2>
            <p className="mt-5 w-full min-w-0 max-w-3xl font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
              PandaPay is powered by AI that lives inside WhatsApp. No app. No menus. Just a
              conversation.
            </p>
          </div>
        </FadeReveal>

        <div className="relative w-full min-w-0 pl-4 md:pl-8">
          <div className="absolute left-[12px] top-0 h-full w-px bg-gradient-to-b from-[#C04B22] to-[rgba(192,75,34,0.1)] dark:to-[rgba(192,75,34,0.05)] md:left-[20px]" />
          <div className="flex flex-col gap-10">
            {flowSteps.map((step, index) => (
              <FadeReveal key={step.label} className="w-full min-w-0" delay={index * 0.05}>
                <article className="relative min-w-0 pl-10 md:pl-14">
                  <div
                    className={`absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold md:h-8 md:w-8 md:text-xs ${
                      index === 0
                        ? 'border-[#C04B22] bg-[#C04B22] text-white'
                        : 'border-[#C04B22] bg-white text-[#C04B22] dark:bg-[#1C130A]'
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#C04B22]">
                        {step.label}
                      </p>
                      <span className="inline-flex rounded-full border border-[rgba(192,75,34,0.2)] bg-[rgba(192,75,34,0.08)] px-3 py-1 text-xs font-medium text-[#C04B22] dark:border-[rgba(192,75,34,0.3)] dark:bg-[rgba(192,75,34,0.15)]">
                        {step.tag}
                      </span>
                    </div>
                    <h3 className="max-w-4xl font-heading text-2xl font-bold leading-tight text-[#120B04] dark:text-[rgb(225,225,227)] md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="max-w-3xl font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
                      {step.note}
                    </p>
                  </div>
                </article>
              </FadeReveal>
            ))}
          </div>
        </div>

        <FadeReveal className="w-full min-w-0" delay={0.12}>
          <div className="flex w-full min-w-0 justify-center">
            <a
              href={WHATSAPP_URL}
              className="inline-flex rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
            >
              Try it now
            </a>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}
