import { AlertCircle, Globe2, WalletCards, type LucideIcon } from 'lucide-react';
import { cardHoverSolid, lightCardSurface } from '../../cardHover';
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
    <section id="painpoint" className="border-b border-border px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-12">
        <FadeReveal className="w-full min-w-0 max-w-3xl">
          <div className="flex w-full min-w-0 flex-col gap-4">
            <p className="w-full min-w-0 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
              The problem
            </p>
            <h2 className="w-full min-w-0 font-heading text-4xl font-bold leading-tight text-text-primary md:text-5xl">
              Paying for games should not feel this messy.
            </h2>
            <p className="w-full min-w-0 max-w-2xl font-sans text-base leading-8 text-text-muted">
              Before PandaPay, the experience was fragmented, regional, and often
              frustrating. The goal here is clarity, not cleverness.
            </p>
          </div>
        </FadeReveal>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3 lg:grid-rows-1">
          {painPoints.map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeReveal key={item.title} className="h-full w-full" delay={index * 0.08}>
                <div
                  className={`relative flex h-full min-h-[360px] w-full flex-col overflow-hidden rounded-[36px] p-8 md:p-10 ${cardHoverSolid} ${item.cardClassName} ${item.cardSurfaceClass ?? ''}`}
                >
                  <div className={`pointer-events-none absolute right-8 top-6 font-heading text-[7rem] font-bold leading-none ${item.accentClassName}`}>
                    “
                  </div>

                  <div className={`relative flex h-14 w-14 items-center justify-center rounded-3xl ${item.badgeClassName}`}>
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
