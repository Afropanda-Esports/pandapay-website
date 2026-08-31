import { useEffect, useState } from 'react';
import { fetchOfferings, type Offering } from '../api/offerings';
import type { Product } from '../siteContent';

/** Static site product id → /offerings slug from the API. */
const PRODUCT_TO_OFFERING_SLUG: Record<string, string> = {};

export function useOfferings(): {
  offerings: Offering[];
  loading: boolean;
  updatedAt: string | null;
} {
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchOfferings()
      .then((items) => {
        if (!cancelled) {
          setOfferings(items);
          setUpdatedAt(new Date().toISOString());
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { offerings, loading, updatedAt };
}

/** Apply live NGN price labels from /offerings onto static catalog products. */
export function mergeLivePrices(
  products: Product[],
  offerings: Offering[],
): Product[] {
  const bySlug = new Map(offerings.map((o) => [o.slug, o]));
  return products.map((product) => {
    const slug = PRODUCT_TO_OFFERING_SLUG[product.id] ?? product.id;
    const live = bySlug.get(slug);
    if (!live?.priceLabel) return product;
    return { ...product, price: live.priceLabel };
  });
}
