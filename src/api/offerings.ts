export type Offering = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  priceLabel: string | null;
  whatsappPrefill: string;
  sortOrder: number;
  regionCode?: string;
  regionName?: string;
};

export type OfferingsResponse = {
  items: Offering[];
  updatedAt: string;
};

const FALLBACK_OFFERINGS: Offering[] = [
  {
    id: 'vtu-airtime',
    slug: 'vtu-airtime',
    title: 'Airtime',
    subtitle: 'MTN, Airtel, Glo, 9mobile',
    priceLabel: null,
    whatsappPrefill: 'Hi PandaPay, I want to buy airtime.',
    sortOrder: 1,
  },
  {
    id: 'vtu-data',
    slug: 'vtu-data',
    title: 'Data',
    subtitle: 'MTN, Airtel, Glo, 9mobile',
    priceLabel: 'From ₦500',
    whatsappPrefill: 'Hi PandaPay, I want to buy a data bundle.',
    sortOrder: 2,
  },
  {
    id: 'vtu-electricity',
    slug: 'vtu-electricity',
    title: 'Electricity',
    subtitle: 'Ikeja, Eko & other DisCos',
    priceLabel: null,
    whatsappPrefill: 'Hi PandaPay, I want to pay an electricity bill.',
    sortOrder: 3,
  },
  {
    id: 'vtu-cable',
    slug: 'vtu-cable',
    title: 'Cable TV',
    subtitle: 'DStv, GOtv, StarTimes',
    priceLabel: 'From ₦1,900',
    whatsappPrefill: 'Hi PandaPay, I want to renew a cable TV subscription.',
    sortOrder: 4,
  },
  {
    id: 'vtu-betting',
    slug: 'vtu-betting',
    title: 'Betting Wallet',
    subtitle: 'Bet9ja, SportyBet, 1xBet',
    priceLabel: null,
    whatsappPrefill: 'Hi PandaPay, I want to fund my betting wallet.',
    sortOrder: 5,
  },
  {
    id: 'ps-plus',
    slug: 'ps-plus-essential-1m',
    title: 'PS Plus',
    subtitle: 'Essential, Extra & Premium tiers',
    priceLabel: 'From ₦8,000',
    whatsappPrefill: 'Hi PandaPay, I want a PS Plus subscription.',
    sortOrder: 6,
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
