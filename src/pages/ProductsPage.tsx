import { useMemo } from 'react';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import ProductCatalogGrid from '../components/ProductCatalogGrid';
import SeoMeta from '../components/SeoMeta';
import { mergeLivePrices, useOfferings } from '../hooks/useOfferings';
import { PRODUCTS, WHATSAPP_URL } from '../siteContent';

export default function ProductsPage() {
  const { offerings, loading: pricesLoading } = useOfferings();

  const catalog = useMemo(
    () => mergeLivePrices(PRODUCTS, offerings),
    [offerings],
  );

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="Products — Panda Pay"
        description="Browse PandaPay's VTU catalog — airtime, data, electricity, and cable TV. Prices update live with the exchange rate."
        path="/products"
      />
      <PageHero
        title="The Catalog."
        body="Airtime, data, electricity, and cable TV. Prices update live with the exchange rate."
      >
        <a
          href={WHATSAPP_URL}
          className="inline-flex self-start rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
        >
          Start on WhatsApp
        </a>
      </PageHero>

      <main className="pb-20">
        <section className="w-full min-w-0 py-12 shadow-[var(--shadow-section-separate)] lg:py-20">
          <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-8 px-6 md:px-12 lg:px-20">
            {pricesLoading ? (
              <p className="text-sm text-text-muted">Updating live prices…</p>
            ) : null}
            <ProductCatalogGrid products={catalog} />

            <p className="text-sm text-text-muted">
              Prices update automatically with exchange rates. Final price confirmed at
              checkout via WhatsApp.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
