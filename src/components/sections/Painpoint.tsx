import { AlertCircle, Globe2, WalletCards, type LucideIcon } from 'lucide-react';
import { cardHoverSolid, lightCardSurface } from '../../cardHover';
import { sectionSeparatorShadow } from '../../layoutStyles';
import FadeReveal from '../FadeReveal';

type PainPoint = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  cardClassName: string;
  badgeClassName: string;
  accentClassName: string;
  /** Extra depth for light surfaces (e.g. white card on light background) */
  cardSurfaceClass?: string;
};

const painPoints: PainPoint[] = [
  {
    icon: WalletCards,
    eyebrow: 'Workarounds',
    title: 'Too many payment workarounds',
    description:
      'Gamers jump between cards, transfers, crypto, and screenshots just to complete one purchase.',
    cardClassName: 'bg-testimonial-1',
    badgeClassName: 'bg-white/65 text-primary-500',
    accentClassName: 'text-white/60',
  },
  {
    icon: Globe2,
    eyebrow: 'Mismatch',
    title: 'Region mismatch everywhere',
    description:
      'The right code, the right account region, and the right currency rarely line up cleanly.',
    cardClassName: 'bg-testimonial-2',
    badgeClassName: 'bg-white/60 text-primary-500',
    // Cream surface: light-on-light quote fails; use dark ink at low alpha
    accentClassName: 'text-neutral-900/12',
  },
  {
    icon: AlertCircle,
    eyebrow: 'Uncertainty',
    title: 'Slow and uncertain delivery',
    description:
      'You should not have to wonder if your payment went through or when your code will arrive.',
    cardClassName: 'bg-testimonial-3',
    cardSurfaceClass: lightCardSurface,
    badgeClassName: 'bg-white/65 text-primary-500',
    accentClassName: 'text-neutral-900/12',
  },
];

const Painpoint = () => {
  return (
    <section
      id="painpoint"
      className={`box-border w-full min-w-0 shrink-0 px-6 md:px-12 lg:px-20 ${sectionSeparatorShadow}`}
    >
      <div className="mx-auto box-border w-full min-w-0 max-w-[1440px]">
        {/* Block flow only (no flex column + min-height): nested flex + % width was collapsing this stack to min-content in Chrome. */}
        <header className="mx-auto box-border w-full min-w-0 max-w-5xl py-20 text-center md:py-24 lg:min-h-[720px] lg:py-28 lg:pt-32">
          <div className="mb-4 flex justify-center md:mb-5">
            <span className="inline-flex items-center rounded-full bg-primary-500/10 px-3 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary-500">
              The problem
            </span>
          </div>
          <h2
            className="font-heading font-bold text-text-primary"
            style={{ fontSize: 'clamp(2.5rem, 5.2vw, 4.5rem)', lineHeight: '1.12' }}
          >
            Paying <span className="text-primary-500">for</span> games should not feel this messy.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-8 text-text-muted opacity-80 md:mt-7 md:max-w-3xl md:text-lg">
            Before PandaPay, the experience was fragmented, regional, and often frustrating. The goal here
            is clarity, not cleverness.
          </p>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-5 pb-20 pt-4 md:pt-6 lg:grid-cols-3 lg:grid-rows-1 lg:pt-8">
          {painPoints.map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeReveal key={item.title} className="h-full w-full min-w-0" delay={index * 0.08}>
                <div
                  className={`relative flex h-full min-h-[360px] w-full min-w-0 flex-col overflow-hidden rounded-[36px] p-8 md:p-10 ${cardHoverSolid} ${item.cardClassName} ${item.cardSurfaceClass ?? ''}`}
                >
                  <div
                    className={`pointer-events-none absolute right-8 top-6 font-heading text-[7rem] font-bold leading-none ${item.accentClassName}`}
                  >
                    “
                  </div>

                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-3xl ${item.badgeClassName}`}
                  >
                    <Icon size={24} />
                  </div>

                  {/* Fixed neutrals: cards use light surfaces; theme text tokens are light in dark mode */}
                  <div className="relative mt-10 flex min-h-0 flex-1 flex-col">
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-neutral-700">
                      {item.eyebrow}
                    </p>
                    <h3 className="mt-5 max-w-[12ch] font-heading text-[2rem] font-bold leading-tight text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="mt-auto max-w-[28ch] pt-6 font-sans text-base leading-8 text-neutral-700">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Painpoint;
