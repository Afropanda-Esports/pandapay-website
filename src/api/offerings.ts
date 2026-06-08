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
    id: 'psn-10',
    slug: 'psn-10',
    title: 'PSN $10',
    subtitle: 'PlayStation wallet credit',
    priceLabel: 'From ₦16,000',
    whatsappPrefill: 'Hi PandaPay, I want to buy PSN Gift Card — $10.',
    sortOrder: 1,
  },
  {
    id: 'psn-25',
    slug: 'psn-25',
    title: 'PSN $25',
    subtitle: 'PlayStation wallet credit',
    priceLabel: 'From ₦40,000',
    whatsappPrefill: 'Hi PandaPay, I want to buy PSN Gift Card — $25.',
    sortOrder: 2,
  },
  {
    id: 'psn-50',
    slug: 'psn-50',
    title: 'PSN $50',
    subtitle: 'PlayStation wallet credit',
    priceLabel: 'From ₦80,000',
    whatsappPrefill: 'Hi PandaPay, I want to buy PSN Gift Card — $50.',
    sortOrder: 3,
  },
  {
    id: 'psn-100',
    slug: 'psn-100',
    title: 'PSN $100',
    subtitle: 'PlayStation wallet credit',
    priceLabel: 'From ₦160,000',
    whatsappPrefill: 'Hi PandaPay, I want to buy PSN Gift Card — $100.',
    sortOrder: 4,
  },
  {
    id: 'ps-plus',
    slug: 'ps-plus-essential-1m',
    title: 'PS Plus',
    subtitle: 'Essential, Extra & Premium tiers',
    priceLabel: 'From ₦8,000',
    whatsappPrefill: 'Hi PandaPay, I want a PS Plus subscription.',
    sortOrder: 5,
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
