const WHATSAPP_NUMBER =
  (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.replace(/\D/g, "") ||
  "234XXXXXXXXXX";

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message?.trim()) return base;
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}

export const WHATSAPP_URL = whatsappUrl();

/** Set to true when the WhatsApp bot is accepting live orders. */
export const WHATSAPP_BOT_LIVE = false;

export const botStatusShort = WHATSAPP_BOT_LIVE ? "online" : "offline";
export const botStatusNav = WHATSAPP_BOT_LIVE ? "AI online" : "AI offline";
export const botStatusDetail = WHATSAPP_BOT_LIVE
  ? "AI assistant · online now"
  : "AI assistant · offline for now";
export const botStatusHero = WHATSAPP_BOT_LIVE ? "Online — AI active" : "Offline — back soon";

export const TWITTER_URL = "https://x.com/afropandaesport";
export const INSTAGRAM_URL = "https://www.instagram.com/afropandaesports";
export const DISCORD_URL = "https://discord.gg/2vW7vp7eDu";

export type ProductCategory = "VTU";
export type ProductStatus = "available";

export type Product = {
  id: string;
  name: string;
  price: string;
  category: ProductCategory;
  status: ProductStatus;
  description: string;
};

/**
 * PandaPay is onboarding as a VTU merchant. The catalog is Nigeria-local VTU only —
 * airtime, data, electricity, and cable TV — paid for by Naira bank transfer.
 */
export const VTU_PRODUCTS: Product[] = [
  {
    id: "vtu-airtime",
    name: "Airtime Top-Up",
    price: "Live rates",
    category: "VTU",
    status: "available",
    description: "Instant airtime recharge for MTN, Airtel, Glo, and 9mobile — any amount.",
  },
  {
    id: "vtu-data",
    name: "Data Bundles",
    price: "From ₦500",
    category: "VTU",
    status: "available",
    description: "MTN, Airtel, Glo, and 9mobile data plans, delivered straight to your line.",
  },
  {
    id: "vtu-electricity",
    name: "Electricity Bill Payment",
    price: "Live rates",
    category: "VTU",
    status: "available",
    description: "Prepaid and postpaid tokens for Ikeja Electric, Eko Electric, and other DisCos.",
  },
  {
    id: "vtu-cable",
    name: "Cable TV Subscription",
    price: "From ₦1,900",
    category: "VTU",
    status: "available",
    description: "DStv, GOtv, and StarTimes subscriptions renewed instantly, no decoder trip needed.",
  },
];

export const PRODUCTS: Product[] = [...VTU_PRODUCTS];

export const AVAILABLE_PRODUCTS = PRODUCTS.filter((product) => product.status === "available");

export const PAYMENT_METHODS = [
  {
    title: "Naira Bank Transfer",
    body: "Transfer from any Nigerian bank. Send your screenshot and our AI confirms your payment in seconds.",
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
    title: "Instant Delivery",
    body: "Airtime, data, tokens, and subscription renewals land in the chat within minutes.",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  "Message PandaPay on WhatsApp",
  "Tell the AI what you want — in plain English or Pidgin",
  "Get a live price in Naira",
  "Transfer from any Nigerian bank and upload your screenshot",
  "The AI confirms your payment in under 2 seconds",
  "Your airtime, data, token, or subscription lands in WhatsApp instantly.",
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
    body: "Get a current Naira quote before you commit to checkout.",
  },
  {
    step: "Step 03",
    title: "Pay and receive",
    body: "Complete payment and receive your top-up on WhatsApp without leaving the conversation.",
  },
] as const;
