import { ArrowUpRight } from "lucide-react";
import FadeReveal from "./FadeReveal";
import type { Product } from "../siteContent";
import { WHATSAPP_URL } from "../siteContent";

type Props = {
  products: Product[];
  muted?: boolean;
  variantByStatus?: boolean;
};

export default function ProductCatalogGrid({
  products,
  muted = false,
  variantByStatus = false,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product, index) => {
        const isMuted = muted || (variantByStatus && product.status === 'coming-soon');

        return (
          <FadeReveal key={product.id} delay={index * 0.04}>
            <article
              className={`flex h-full flex-col rounded-3xl p-6 shadow-elevation-2 ${
                isMuted
                  ? 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800/60'
                  : 'bg-[var(--color-card-soft)]'
              }`}
            >
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">
                {product.category}
              </p>
              <h3 className="mt-3 font-heading text-2xl font-bold text-text-primary">
                {product.name}
              </h3>
              <p className="mt-3 flex-1 font-sans text-sm leading-7 text-text-muted">
                {product.description}
              </p>
              <p className="mt-5 font-heading text-3xl font-bold text-primary-500">
                {product.price}
              </p>
              {product.status === 'coming-soon' ? (
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-text-muted">
                  Coming soon <ArrowUpRight size={14} />
                </span>
              ) : (
                <a
                  href={WHATSAPP_URL}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-text-primary"
                  aria-label={`Buy ${product.name} on WhatsApp`}
                >
                  Buy on WhatsApp <ArrowUpRight size={14} />
                </a>
              )}
            </article>
          </FadeReveal>
        );
      })}
    </div>
  );
}
