import { useMemo, useState } from 'react';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import ProductCatalogGrid from '../components/ProductCatalogGrid';
import SeoMeta from '../components/SeoMeta';
import {
  filterProductsByOfferings,
  mergeLivePrices,
  useOfferings,
} from '../hooks/useOfferings';
import {
  COMING_SOON_PRODUCTS,
  PRODUCTS,
  WHATSAPP_URL,
  type Product,
} from '../siteContent';

type Tab = 'all' | 'vtu' | 'playstation' | 'coming-soon';

const TABS: { label: string; value: Tab }[] = [
  { label: 'All', value: 'all' },
  { label: 'VTU', value: 'vtu' },
  { label: 'PlayStation', value: 'playstation' },
  { label: 'Coming Soon', value: 'coming-soon' },
];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [activeRegion, setActiveRegion] = useState<string>('all');
  const { offerings, loading: pricesLoading } = useOfferings();

  const regions = useMemo(
    () =>
      Array.from(
        new Map(
          offerings
            .filter((offering) => offering.regionCode && offering.regionName)
            .map((offering) => [
              offering.regionCode!,
              { code: offering.regionCode!, name: offering.regionName! },
            ]),
        ).values(),
      ),
    [offerings],
  );

  const regionalOfferings = useMemo(
    () =>
      activeRegion === 'all'
        ? offerings
        : offerings.filter((offering) => offering.regionCode === activeRegion),
    [activeRegion, offerings],
  );

  const catalog = useMemo(
    () => {
      const products =
        activeRegion === 'all'
          ? PRODUCTS
          : filterProductsByOfferings(PRODUCTS, regionalOfferings);
      return mergeLivePrices(products, regionalOfferings);
    },
    [activeRegion, regionalOfferings],
  );

  const filteredProducts = useMemo<Product[]>(() => {
    if (activeTab === 'vtu') {
      return catalog.filter((product) => product.category === 'VTU');
    }
    if (activeTab === 'playstation') {
      return catalog.filter((product) => product.category === 'PlayStation');
    }
    if (activeTab === 'coming-soon') {
      return COMING_SOON_PRODUCTS;
    }
    return catalog;
  }, [activeTab, catalog]);

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="Products — Panda Pay"
        description="Browse PandaPay's VTU, bills, and gaming catalog. Prices update live with the exchange rate."
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
              {regions.length > 1 ? (
                <div className="mr-3 flex flex-wrap gap-2 border-r border-border pr-4">
                  <button type="button" onClick={() => setActiveRegion('all')} className={`rounded-full px-4 py-2 text-sm font-semibold ${activeRegion === 'all' ? 'bg-primary-500 text-white' : 'border border-border text-text-primary'}`}>All regions</button>
                  {regions.map((region) => (
                    <button key={region.code} type="button" onClick={() => setActiveRegion(region.code)} className={`rounded-full px-4 py-2 text-sm font-semibold ${activeRegion === region.code ? 'bg-primary-500 text-white' : 'border border-border text-text-primary'}`}>{region.name}</button>
                  ))}
                </div>
              ) : null}
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

            {pricesLoading && activeTab !== 'coming-soon' ? (
              <p className="text-sm text-text-muted">Updating live prices…</p>
            ) : null}
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
