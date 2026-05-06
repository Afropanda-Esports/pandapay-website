import React from 'react';
import { ArrowUpRight, CreditCard, Gamepad2, Zap } from 'lucide-react';
import { cardFooterInsetRule, cardHoverShadow, primaryOutlinePill } from '../../cardHover';
import FadeReveal from '../FadeReveal';
import { DISCORD_URL, WHATSAPP_URL } from '../../siteContent';

/** Warm palette on first two cards; third matches testimonial white (`testimonial-3`). */
const exploreCardThemes = [
  {
    shell: 'bg-testimonial-1 shadow-elevation-2',
    badge: 'bg-white/90 text-primary-600',
    iconWrap: 'bg-white/55 text-primary-600',
    title: 'text-neutral-900',
    body: 'text-neutral-700',
    link: 'text-primary-600',
  },
  {
    shell: 'bg-testimonial-2 shadow-elevation-2',
    badge: 'bg-white/75 text-primary-500',
    iconWrap: 'bg-white/55 text-primary-500',
    title: 'text-neutral-900',
    body: 'text-neutral-700',
    link: 'text-primary-600',
  },
  {
    shell: 'bg-testimonial-3 shadow-elevation-2',
    badge: 'bg-primary-500/10 text-primary-500',
    iconWrap: 'bg-surface-raised text-primary-500',
    title: 'text-neutral-900',
    body: 'text-neutral-700',
    link: 'text-primary-600',
  },
] as const;

const products = [
  {
    title: 'Xbox Game Pass',
    description: 'Coming soon for console and PC subscriptions.',
    tag: 'Coming soon',
    icon: Gamepad2,
  },
  {
    title: 'Fortnite V-Bucks',
    description: 'Wallet top-ups and bundles are on the roadmap.',
    tag: 'Coming soon',
    icon: Zap,
  },
  {
    title: 'FIFA Coins Marketplace',
    description: 'In-game currency and more African payment options are coming.',
    tag: 'Coming soon',
    icon: CreditCard,
  },
];

const ExploreShop: React.FC = () => {
  return (
    <section id="explore-shop" className="w-full min-w-0 bg-background py-20">
      <div className="mx-auto w-full min-w-0 max-w-[1440px] px-4 py-12 lg:px-20 lg:py-0">
        <div className="flex w-full min-w-0 flex-col gap-14 rounded-[32px] bg-surface p-8 shadow-elevation-2 transition-all duration-300 ease-out hover:shadow-elevation-3 md:p-12 lg:p-16">
          {/* Intro is not wrapped in FadeReveal: Framer motion + nested flex was resolving this column to
              min-content width in the card flex context. Block layout + max-width is stable. */}
          <div className="mx-auto w-full min-w-0 max-w-4xl text-center">
            <h2 className="font-heading text-4xl font-bold leading-tight text-text-primary md:text-5xl">
              More is coming
            </h2>
            <p className="mx-auto mt-5 max-w-3xl font-sans text-sm leading-8 text-text-muted md:text-base">
              The catalog is growing. Xbox Game Pass, Fortnite V-Bucks, FIFA Coins, and more — plus
              new African payment rails. PandaPay is built to be your one-stop gaming wallet.
            </p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className={`mx-auto mt-6 inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 py-3 text-sm font-semibold text-text-primary transition-all hover:bg-primary-500/10 ${primaryOutlinePill}`}
              aria-label="Join our Discord to be first to know"
            >
              Join our Discord to be first to know
            </a>
          </div>

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

                    <div
                      className={`flex items-center justify-end pt-4 ${cardFooterInsetRule}`}
                    >
                      <span
                        className={`inline-flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2 ${theme.link}`}
                      >
                        Coming soon <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </FadeReveal>
              );
            })}
          </div>
          <div className="rounded-3xl bg-[var(--color-card-soft)] p-8 text-center">
            <h3 className="font-heading text-3xl font-bold text-text-primary">Ready to play without limits?</h3>
            <p className="mt-3 text-sm text-text-muted">
              Message Panda Pay on WhatsApp and get your gaming code in minutes.
            </p>
            <a href={WHATSAPP_URL} className="mt-6 inline-flex rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white" aria-label="Start on WhatsApp">
              Start on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreShop;
