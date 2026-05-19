import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { fetchOfferings, type Offering } from '../../api/offerings';
import {
  getInventoryImage,
  INVENTORY_IMAGE_HEIGHT,
  INVENTORY_IMAGE_WIDTH,
} from '../../inventoryImages';
import { whatsappUrl } from '../../siteContent';
import { cardFooterInsetRule } from '../../cardHover';
import { sectionTitle } from '../../typography';
import FadeReveal from '../FadeReveal';

/** Promo assets are 1080×1350 (4∶5). Cards match this ratio so images fill without stretch. */
const IMAGE_ASPECT = 'aspect-[4/5]';
const CARD_MAX_WIDTH = 'max-w-[min(100%,280px)]';

function InventoryCard({ offering, index }: { offering: Offering; index: number }) {
  const imageSrc = getInventoryImage(offering.slug);
  const href = whatsappUrl(offering.whatsappPrefill);

  return (
    <FadeReveal delay={index * 0.05} className={`w-full ${CARD_MAX_WIDTH}`}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group flex w-full flex-col overflow-hidden rounded-2xl bg-surface shadow-elevation-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevation-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        aria-label={`Buy ${offering.title} on WhatsApp`}
      >
        <div
          className={`relative w-full overflow-hidden bg-neutral-50 dark:bg-neutral-900 ${IMAGE_ASPECT}`}
        >
          <img
            src={imageSrc}
            alt={offering.title}
            width={INVENTORY_IMAGE_WIDTH}
            height={INVENTORY_IMAGE_HEIGHT}
            className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'low'}
            decoding="async"
            sizes="(max-width: 640px) 46vw, 280px"
          />
        </div>
        <div
          className={`flex items-center justify-between gap-2 bg-[var(--color-card-soft)] px-3.5 py-3 ${cardFooterInsetRule}`}
        >
          <div className="min-w-0">
            <p className="truncate font-heading text-sm font-bold text-text-primary">
              {offering.title}
            </p>
            {offering.priceLabel ? (
              <p className="mt-0.5 truncate font-sans text-xs font-semibold text-primary-500">
                {offering.priceLabel}
              </p>
            ) : (
              <p className="mt-0.5 truncate font-sans text-xs text-text-muted">{offering.subtitle}</p>
            )}
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary-500 px-3 py-2 text-xs font-semibold text-white">
            Buy
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </div>
      </a>
    </FadeReveal>
  );
}

function InventoryCardSkeleton() {
  return (
    <div className={`w-full overflow-hidden rounded-2xl bg-surface shadow-elevation-2 ${CARD_MAX_WIDTH}`}>
      <div className={`${IMAGE_ASPECT} w-full animate-pulse bg-neutral-100 dark:bg-neutral-800`} />
      <div className={`h-14 animate-pulse bg-neutral-50 dark:bg-neutral-900 ${cardFooterInsetRule}`} />
    </div>
  );
}

export default function Inventory() {
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    void fetchOfferings().then((items) => {
      if (!cancelled) {
        setOfferings(items);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="inventory"
      className="w-full min-w-0 bg-background py-12 shadow-[var(--shadow-section-separate)] lg:py-16"
    >
      <div className="mx-auto w-full min-w-0 max-w-[1440px] px-4 lg:px-20">
        <FadeReveal className="mb-10 max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
            In stock now
          </p>
          <h2 className={`mt-4 ${sectionTitle}`}>
            Pick what you want. Checkout on WhatsApp.
          </h2>
        </FadeReveal>

        <div className="mx-auto grid max-w-[1200px] grid-cols-2 place-items-center gap-4 sm:gap-5 md:grid-cols-4 md:gap-6">
          {loading
            ? [0, 1, 2, 3].map((i) => <InventoryCardSkeleton key={i} />)
            : offerings.map((offering, index) => (
                <InventoryCard key={offering.id} offering={offering} index={index} />
              ))}
        </div>
      </div>
    </section>
  );
}
