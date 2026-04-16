import React from 'react';
import { ArrowUpRight, CreditCard, Gamepad2, Zap } from 'lucide-react';
import { cardHoverShadow } from '../../cardHover';
import FadeReveal from '../FadeReveal';

/** Warm palette on first two cards; third matches testimonial white (`testimonial-3`). */
const exploreCardThemes = [
  {
    shell: 'bg-testimonial-1 shadow-elevation-2',
    badge: 'bg-white/90 text-primary-600',
    iconWrap: 'bg-white/55 text-primary-600',
    title: 'text-neutral-900',
    body: 'text-neutral-700',
    divider: 'border-neutral-900/10',
    link: 'text-primary-600',
  },
  {
    shell: 'bg-testimonial-2 shadow-elevation-2',
    badge: 'bg-white/75 text-primary-500',
    iconWrap: 'bg-white/55 text-primary-500',
    title: 'text-neutral-900',
    body: 'text-neutral-700',
    divider: 'border-neutral-900/10',
    link: 'text-primary-600',
  },
  {
    shell: 'bg-testimonial-3 shadow-elevation-2',
    badge: 'bg-primary-500/10 text-primary-500',
    iconWrap: 'bg-surface-raised text-primary-500',
    title: 'text-neutral-900',
    body: 'text-neutral-700',
    divider: 'border-border-subtle',
    link: 'text-primary-600',
  },
] as const;

const products = [
  {
    title: 'Xbox Game Pass',
    description: 'Unlock 100+ games with a single pass. Play on console, PC, and cloud.',
    tag: 'Popular',
    icon: Gamepad2,
  },
  {
    title: 'Call of Duty Mobile',
    description: 'Top up your CODM credits instantly. Get CP packs at the best rates.',
    tag: 'Hot',
    icon: Zap,
  },
  {
    title: 'Roblox Gift Cards',
    description: 'Gift Robux to yourself or friends. Redeem across all Roblox platforms.',
    tag: 'Gift Ready',
    icon: CreditCard,
  },
];

const ExploreShop: React.FC = () => {
  return (
    <section id="explore-shop" className="w-full min-w-0 bg-background py-20">
      <div className="mx-auto w-full min-w-0 max-w-[1440px] px-4 py-12 lg:px-20 lg:py-0">
        <div className="flex w-full min-w-0 flex-col gap-14 rounded-[32px] bg-surface p-8 shadow-elevation-2 transition-all duration-300 ease-out hover:shadow-elevation-3 md:p-12 lg:p-16">
          <FadeReveal className="w-full min-w-0">
            <div className="w-full min-w-0 max-w-4xl">
              <h2 className="w-full min-w-0 font-heading text-4xl font-bold leading-tight text-text-primary md:text-5xl">
                Play more. Less stress.
              </h2>
              <p className="mt-5 w-full min-w-0 max-w-3xl font-sans text-sm leading-8 text-text-muted md:text-base">
                Buy gift cards, credits, and game passes for your favorite platforms in
                one clean checkout powered by bank transfers, crypto, or gift cards.
              </p>
              <a
                href="#hero"
                className="mt-6 inline-flex items-center justify-center self-start whitespace-nowrap rounded-full border-2 border-primary-500 px-8 py-3 text-sm font-semibold text-text-primary transition-all hover:bg-primary-500/10"
              >
                Explore our shop
              </a>
            </div>
          </FadeReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {products.map((product, index) => {
              const Icon = product.icon;
              const theme = exploreCardThemes[index] ?? exploreCardThemes[0];

              return (
                <FadeReveal key={product.title} delay={index * 0.08}>
                  <div
                    className={`group relative flex cursor-pointer flex-col gap-6 rounded-[28px] p-6 md:p-8 ${theme.shell} ${cardHoverShadow}`}
                  >
                    <span
                      className={`self-start rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${theme.badge}`}
                    >
                      {product.tag}
                    </span>

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${theme.iconWrap}`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="flex flex-1 flex-col gap-2">
                      <h3 className={`font-heading text-lg font-bold ${theme.title}`}>
                        {product.title}
                      </h3>
                      <p className={`font-sans text-sm leading-relaxed ${theme.body}`}>
                        {product.description}
                      </p>
                    </div>

                    <div className={`flex items-center justify-end border-t pt-4 ${theme.divider}`}>
                      <span
                        className={`inline-flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2 ${theme.link}`}
                      >
                        Learn more <ArrowUpRight size={14} />
                      </span>
                    </div>
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

export default ExploreShop;
