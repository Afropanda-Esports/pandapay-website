import { useMemo, useState } from 'react';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import ProductCatalogGrid from '../components/ProductCatalogGrid';
import SeoMeta from '../components/SeoMeta';
import {
  AVAILABLE_PRODUCTS,
  COMING_SOON_PRODUCTS,
  PRODUCTS,
  WHATSAPP_URL,
  type Product,
} from '../siteContent';

type Tab = 'all' | 'playstation' | 'coming-soon';

const TABS: { label: string; value: Tab }[] = [
  { label: 'All', value: 'all' },
  { label: 'PlayStation', value: 'playstation' },
  { label: 'Coming Soon', value: 'coming-soon' },
];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const filteredProducts = useMemo<Product[]>(() => {
    if (activeTab === 'playstation') {
      return AVAILABLE_PRODUCTS;
    }
    if (activeTab === 'coming-soon') {
      return COMING_SOON_PRODUCTS;
    }
    return PRODUCTS;
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="Products — Panda Pay"
        description="Browse PandaPay's gaming catalog. Prices update live with the exchange rate."
        path="/products"
      />
      <PageHero
        title="The Catalog."
        body="Every gaming product we sell. Prices update live with the exchange rate."
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
            <div className="flex flex-wrap gap-3">
              {TABS.map((tab) => {
                const isActive = tab.value === activeTab;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveTab(tab.value)}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary-500 text-white'
                        : 'border border-border text-text-primary hover:bg-primary-500/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <ProductCatalogGrid
              products={filteredProducts}
              muted={activeTab === 'coming-soon'}
              variantByStatus={activeTab === 'all'}
            />

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
