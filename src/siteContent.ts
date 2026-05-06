export const WHATSAPP_URL = "https://wa.me/234XXXXXXXXXX";
export const TWITTER_URL = "https://x.com/afropandaesport";
export const INSTAGRAM_URL = "https://www.instagram.com/afropandaesports";
export const DISCORD_URL = "https://discord.gg/2vW7vp7eDu";
export const CNGN_URL = "https://cngn.co";

export type ProductCategory = "PlayStation" | "Coming Soon";
export type ProductStatus = "available" | "coming-soon";

export type Product = {
  id: string;
  name: string;
  price: string;
  category: ProductCategory;
  status: ProductStatus;
  description: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "ps-plus-essential-1m",
    name: "PS Plus Essential — 1 Month",
    price: "₦8,000",
    category: "PlayStation",
    status: "available",
    description: "Monthly online access and entry-level PlayStation subscription access.",
  },
  {
    id: "ps-plus-essential-3m",
    name: "PS Plus Essential — 3 Months",
    price: "₦22,000",
    category: "PlayStation",
    status: "available",
    description: "Quarterly PS Plus Essential top-up for steady multiplayer access.",
  },
  {
    id: "ps-plus-extra-1m",
    name: "PS Plus Extra — 1 Month",
    price: "₦12,000",
    category: "PlayStation",
    status: "available",
    description: "Access a deeper PlayStation games catalog with a monthly Extra plan.",
  },
  {
    id: "ps-plus-extra-3m",
    name: "PS Plus Extra — 3 Months",
    price: "₦34,500",
    category: "PlayStation",
    status: "available",
    description: "Quarterly PS Plus Extra subscription for players who want more choice.",
  },
  {
    id: "ps-plus-premium-1m",
    name: "PS Plus Premium — 1 Month",
    price: "₦15,500",
    category: "PlayStation",
    status: "available",
    description: "Premium-tier PlayStation subscription access, delivered through WhatsApp.",
  },
  {
    id: "psn-gift-card-10",
    name: "PSN Gift Card — $10",
    price: "₦16,000",
    category: "PlayStation",
    status: "available",
    description: "Top up your PlayStation wallet with a smaller PSN card denomination.",
  },
  {
    id: "psn-gift-card-25",
    name: "PSN Gift Card — $25",
    price: "₦40,000",
    category: "PlayStation",
    status: "available",
    description: "Mid-size PSN balance top-up for games, add-ons, and subscriptions.",
  },
  {
    id: "psn-gift-card-50",
    name: "PSN Gift Card — $50",
    price: "₦80,000",
    category: "PlayStation",
    status: "available",
    description: "A larger PlayStation wallet top-up for bigger purchases and bundles.",
  },
  {
    id: "psn-gift-card-100",
    name: "PSN Gift Card — $100",
    price: "₦160,000",
    category: "PlayStation",
    status: "available",
    description: "High-value PSN card for players who want one larger checkout.",
  },
  {
    id: "xbox-game-pass",
    name: "Xbox Game Pass",
    price: "Coming soon",
    category: "Coming Soon",
    status: "coming-soon",
    description: "Xbox subscriptions are next in line as the catalog expands.",
  },
  {
    id: "fortnite-v-bucks",
    name: "Fortnite V-Bucks",
    price: "Coming soon",
    category: "Coming Soon",
    status: "coming-soon",
    description: "Battle pass and V-Bucks top-ups are on the roadmap.",
  },
  {
    id: "fifa-coins",
    name: "FIFA Coins",
    price: "Coming soon",
    category: "Coming Soon",
    status: "coming-soon",
    description: "Football gamers will be able to top up faster with local rails.",
  },
  {
    id: "steam-wallet",
    name: "Steam Wallet",
    price: "Coming soon",
    category: "Coming Soon",
    status: "coming-soon",
    description: "Steam wallet codes are part of PandaPay's broader gaming wallet vision.",
  },
];

export const AVAILABLE_PRODUCTS = PRODUCTS.filter((product) => product.status === "available");
export const COMING_SOON_PRODUCTS = PRODUCTS.filter((product) => product.status === "coming-soon");

export const PAYMENT_METHODS = [
  {
    title: "Naira Bank Transfer",
    body: "Transfer from any Nigerian bank. Send your screenshot and our AI confirms your payment in seconds.",
  },
  {
    title: "USDC / Crypto",
    body: "Pay with USDC across multiple chains. Confirmed automatically on-chain — no manual verification needed.",
  },
  {
    title: "cNGN Stablecoin",
    body: "Pay in cNGN, the naira-pegged stablecoin. Combine crypto speed with naira stability.",
  },
] as const;

export const WHY_PANDAPAY = [
  {
    title: "No App Needed",
    body: "Everything happens in WhatsApp. No downloads, no accounts, no friction.",
  },
  {
    title: "AI-Verified Payments",
    body: "Our AI reads your bank screenshot and confirms payments in under 2 seconds.",
  },
  {
    title: "Crypto-Native",
    body: "Pay in USDC or stablecoins across multiple chains. Web3-ready from day one.",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  "Message PandaPay on WhatsApp",
  "Tell the AI what you want — in plain English or Pidgin",
  "Get a live price in Naira or USDC",
  "Choose your payment method",
  "Naira: transfer and upload your screenshot. AI confirms in under 2 seconds.",
  "Crypto: send USDC to the wallet address. Confirmed automatically on-chain.",
  "Your gaming code is delivered to WhatsApp instantly.",
] as const;

export const HOMEPAGE_FLOW = [
  {
    step: "Step 01",
    title: "Chat naturally",
    body: "Tell PandaPay what you want in plain English or Pidgin and get guided instantly.",
  },
  {
    step: "Step 02",
    title: "See your live price",
    body: "Get a current Naira or USDC quote before you commit to checkout.",
  },
  {
    step: "Step 03",
    title: "Pay and receive",
    body: "Complete payment and receive your code on WhatsApp without leaving the conversation.",
  },
] as const;
