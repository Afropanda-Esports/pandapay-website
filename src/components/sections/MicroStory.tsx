import { Check, CreditCard, Landmark, ShieldCheck } from 'lucide-react';
import { cardHoverBordered } from '../../cardHover';
import FadeReveal from '../FadeReveal';

const storyPoints = [
  'Choose a product your account can actually use.',
  'Pay with transfer, crypto, or gift-card rails that fit your region.',
  'Get a clearer handoff with less waiting and less doubt.',
];

const proofPoints = [
  {
    icon: CreditCard,
    title: 'Payment flexibility',
    description: 'Built around how gamers already pay, not how checkout tools expect them to pay.',
  },
  {
    icon: Landmark,
    title: 'Regional awareness',
    description: 'Pricing and delivery can respect the reality of local currencies and account regions.',
  },
  {
    icon: ShieldCheck,
    title: 'More confidence',
    description: 'A calmer purchase flow means fewer mistakes, fewer retries, and clearer next steps.',
  },
];

const MicroStory = () => {
  return (
    <section
      id="micro-story"
      className="border-b border-border px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-12">
        <FadeReveal className="w-full min-w-0 max-w-4xl">
          <div className="w-full min-w-0">
            <div className="inline-flex rounded-full border border-primary-500/30 bg-primary-500/8 px-4 py-2">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
                Built for gamers, by gamers
              </span>
            </div>
            <h2 className="mt-5 w-full min-w-0 font-heading text-4xl font-bold leading-tight text-text-primary md:text-6xl">
              A simpler bridge between intent and checkout.
            </h2>
            <p className="mt-5 w-full min-w-0 max-w-3xl font-sans text-base leading-8 text-text-muted">
              PandaPay exists because buying a subscription or code should feel direct.
              No region guesswork. No payment maze. No awkward final step.
            </p>
          </div>
        </FadeReveal>

        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <FadeReveal
            className={`min-w-0 w-full rounded-[32px] border border-border bg-surface p-8 ${cardHoverBordered}`}
            delay={0.06}
          >
          <div className="flex flex-col gap-5">
            {storyPoints.map((point, index) => (
              <div key={point} className="flex items-start gap-4">
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
                  <Check size={16} />
                </div>
                <div>
                  <p className="font-sans text-sm uppercase tracking-[0.18em] text-text-muted">
                    Step 0{index + 1}
                  </p>
                  <p className="mt-2 font-sans text-base leading-7 text-text-primary">
                    {point}
                  </p>
                </div>
              </div>
            ))}
          </div>
          </FadeReveal>

          <div className="grid grid-cols-1 gap-5">
            {proofPoints.map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeReveal key={item.title} className="min-w-0 w-full" delay={0.1 + index * 0.06}>
                  <div className={`rounded-[28px] border border-border bg-background p-6 ${cardHoverBordered}`}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-raised text-primary-500">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-5 font-heading text-xl font-bold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-7 text-text-muted">
                      {item.description}
                    </p>
                  </div>
                </FadeReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MicroStory;
