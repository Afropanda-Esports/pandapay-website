export type Offering = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  priceLabel: string | null;
  whatsappPrefill: string;
  sortOrder: number;
};

export type OfferingsResponse = {
  items: Offering[];
  updatedAt: string;
};

const FALLBACK_OFFERINGS: Offering[] = [
  {
    id: 'game-gift-cards',
    slug: 'game-gift-cards',
    title: 'Game Gift Cards',
    subtitle: 'Xbox, Steam & PlayStation',
    priceLabel: 'Available in store',
    whatsappPrefill:
      'Hi PandaPay, I want to buy game gift cards (Xbox / Steam / PlayStation).',
    sortOrder: 1,
  },
  {
    id: 'roblox',
    slug: 'roblox',
    title: 'Roblox Gift Card',
    subtitle: '$10 & $25 denominations',
    priceLabel: 'Available in store',
    whatsappPrefill: 'Hi PandaPay, I want a Roblox gift card.',
    sortOrder: 2,
  },
  {
    id: 'cod-battle-pass',
    slug: 'cod-battle-pass',
    title: 'Warzone Battle Pass',
    subtitle: 'Season 03',
    priceLabel: 'Available in store',
    whatsappPrefill: 'Hi PandaPay, I want the Warzone S03 Battle Pass.',
    sortOrder: 3,
  },
  {
    id: 'playstation',
    slug: 'playstation',
    title: 'PlayStation Gift Cards',
    subtitle: 'PSN wallet top-ups',
    priceLabel: 'Available in store',
    whatsappPrefill: 'Hi PandaPay, I want PlayStation gift cards.',
    sortOrder: 4,
  },
];

function apiBaseUrl(): string {
  const configured = import.meta.env.VITE_API_URL as string | undefined;
  if (configured) return configured;
  if (import.meta.env.DEV) return '/api';
  return '';
}

export async function fetchOfferings(): Promise<Offering[]> {
  const base = apiBaseUrl();
  if (!base) {
    return FALLBACK_OFFERINGS;
  }

  try {
    const response = await fetch(`${base.replace(/\/$/, '')}/offerings`, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return FALLBACK_OFFERINGS;
    }

    const data = (await response.json()) as OfferingsResponse;
    if (!Array.isArray(data.items) || data.items.length === 0) {
      return FALLBACK_OFFERINGS;
    }

    return [...data.items].sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return FALLBACK_OFFERINGS;
  }
}
