import { Landmark, ShieldCheck, Wallet2 } from 'lucide-react';
import FadeReveal from '../FadeReveal';

const methods = [
  {
    title: 'Naira Bank Transfer',
    body: 'Transfer from any Nigerian bank. Send your screenshot and our AI confirms your payment in seconds.',
    label: 'Local rails',
    icon: Landmark,
    variant: 'naira' as const,
  },
  {
    title: 'USDC / Crypto',
    body: 'Pay with USDC across multiple chains. Confirmed automatically on-chain — no manual verification needed.',
    label: 'On-chain',
    icon: Wallet2,
    variant: 'usdc' as const,
  },
  {
    title: 'cNGN Stablecoin',
    body: 'Pay in cNGN, the naira-pegged stablecoin. Combine crypto speed with naira stability.',
    label: 'Stable value',
    icon: ShieldCheck,
    variant: 'cngn' as const,
  },
] as const;

const bankPills = ['GTBank', 'UBA', 'Moniepoint', 'Opay'] as const;

export default function MicroStory() {
  return (
    <section
      id="payment-methods"
      className="px-6 py-20 shadow-[var(--shadow-section-separate)] md:px-12 lg:px-20"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-12">
        <FadeReveal className="w-full min-w-0 max-w-4xl">
          <div className="w-full min-w-0">
            <div className="inline-flex rounded-full border border-[rgba(192,75,34,0.2)] bg-[rgba(192,75,34,0.08)] px-4 py-2 dark:border-[rgba(192,75,34,0.3)] dark:bg-[rgba(192,75,34,0.15)]">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#C04B22]">
                Payment methods
              </span>
            </div>
            <h2 className="mt-5 w-full min-w-0 font-heading text-4xl font-bold leading-tight text-[#120B04] dark:text-[rgb(225,225,227)] md:text-6xl">
              Pay however you want.
            </h2>
            <p className="mt-5 w-full min-w-0 max-w-3xl font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
              Move between local rails and on-chain rails without changing your flow. PandaPay keeps checkout inside WhatsApp.
            </p>
          </div>
        </FadeReveal>

        <div className="grid w-full min-w-0 grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr] lg:grid-rows-2">
          {methods.map((method, index) => {
            const Icon = method.icon;
            const isNaira = method.variant === 'naira';
            const isUsdc = method.variant === 'usdc';

            return (
              <FadeReveal
                key={method.title}
                className={`${isNaira ? 'lg:row-span-2' : ''} min-w-0 w-full`}
                delay={index * 0.06}
              >
                <article
                  className={[
                    'relative h-full overflow-hidden rounded-[28px] border p-7 md:p-8',
                    isNaira
                      ? 'border-white/6 bg-[#1A1208]'
                      : isUsdc
                        ? 'border-[#E8DDD0] bg-[#F5F0E8] dark:border-white/8 dark:bg-[#1C130A]'
                        : 'border-[#E8DDD0] bg-white dark:border-white/8 dark:bg-[#25190F]',
                  ].join(' ')}
                >
                  {isNaira ? (
                    <div className="pointer-events-none absolute right-[-40px] top-[-40px] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(192,75,34,0.32)_0%,rgba(192,75,34,0.08)_45%,transparent_72%)]" />
                  ) : null}

                  <div className="relative z-10 flex h-full flex-col">
                    <p
                      className={`font-sans text-xs font-semibold uppercase tracking-[0.24em] ${
                        isNaira
                          ? 'text-white/40'
                          : 'text-[#6B5642] dark:text-[rgba(225,225,227,0.4)]'
                      }`}
                    >
                      {method.label}
                    </p>

                    <div
                      className={`mt-5 flex h-12 w-12 items-center justify-center rounded-2xl ${
                        isNaira
                          ? 'bg-[rgba(192,75,34,0.2)] text-[rgba(192,75,34,0.9)]'
                          : 'bg-black/[0.05] text-[#120B04] dark:bg-white/5 dark:text-[rgb(225,225,227)]'
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <h3
                      className={`mt-8 font-heading text-3xl font-bold leading-tight ${
                        isNaira
                          ? 'text-[#F5F0E8]'
                          : 'text-[#120B04] dark:text-[rgb(225,225,227)]'
                      }`}
                    >
                      {method.title}
                    </h3>

                    <p
                      className={`mt-4 max-w-xl font-sans text-sm leading-8 ${
                        isNaira
                          ? 'text-white/55'
                          : 'text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]'
                      }`}
                    >
                      {method.body}
                    </p>

                    {isNaira ? (
                      <div className="mt-auto flex flex-wrap gap-3 pt-8">
                        {bankPills.map((pill) => (
                          <span
                            key={pill}
                            className="rounded-full border border-white/10 bg-white/7 px-4 py-2 text-sm text-white/55"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              </FadeReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
