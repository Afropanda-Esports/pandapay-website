import { normalizeWhatsappNumber } from "./whatsappNumber";

const WHATSAPP_NUMBER = normalizeWhatsappNumber(
  import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined,
);

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message?.trim()) return base;
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}

export const WHATSAPP_URL = whatsappUrl();

/** Set to true when the WhatsApp bot is accepting live orders. */
export const WHATSAPP_BOT_LIVE = true;

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

export type PurchaseFlowStep = {
  label: string;
  title: string;
  note: string;
  tag: string;
  chat: ReadonlyArray<{ role: "user" | "bot"; text: string; highlight?: boolean }>;
};

export const PURCHASE_FLOW_STEPS: ReadonlyArray<PurchaseFlowStep> = [
  {
    label: "Step 01",
    title: "Start in WhatsApp",
    note: "Send PandaPay a message and use the guided shopping entry point in the reply.",
    tag: "Open the chat",
    chat: [
      { role: "user", text: "Hi PandaPay" },
      { role: "bot", text: "Welcome. Tap below to browse the catalog." },
    ],
  },
  {
    label: "Step 02",
    title: "Browse what is available",
    note: "Open the current catalog so you only choose from products that are available to order.",
    tag: "Current catalog",
    chat: [
      { role: "user", text: "Browse catalog" },
      { role: "bot", text: "Here is what is available today.", highlight: true },
    ],
  },
  {
    label: "Step 03",
    title: "Choose an item",
    note: "Use the structured controls to select an available product and its amount or option.",
    tag: "Select a product",
    chat: [
      { role: "user", text: "I have picked an item" },
      { role: "bot", text: "Select an available option to continue.", highlight: true },
    ],
  },
  {
    label: "Step 04",
    title: "Review your cart",
    note: "Check each item, quantity, and the total. Add, adjust, or remove items before checkout.",
    tag: "Check the cart",
    chat: [
      { role: "bot", text: "Your cart is ready for review." },
      { role: "user", text: "The items and quantities look right" },
    ],
  },
  {
    label: "Step 05",
    title: "Complete checkout",
    note: "Add a valid discount when available, optionally provide an email for your email receipt, and follow the exact bank-transfer instructions shown in chat.",
    tag: "Pay securely",
    chat: [
      { role: "bot", text: "Review the total and follow the payment instructions." },
      { role: "user", text: "Checkout details confirmed" },
    ],
  },
  {
    label: "Step 06",
    title: "Receive confirmation",
    note: "Payment and fulfillment updates stay in the conversation. Order fulfillment stays in WhatsApp; email is used only for receipts.",
    tag: "Track the order",
    chat: [
      { role: "bot", text: "We will post payment and order updates here." },
      { role: "bot", text: "Order status updated", highlight: true },
    ],
  },
] as const;

export const HOW_IT_WORKS_STEPS = PURCHASE_FLOW_STEPS.map((step) => step.title);

export const HOMEPAGE_FLOW = [
  {
    step: "Step 01",
    title: "Open the catalog",
    body: "Start in WhatsApp and browse what is currently available to order.",
  },
  {
    step: "Step 02",
    title: "Build your cart",
    body: "Choose an item, review quantities and totals, then continue when everything looks right.",
  },
  {
    step: "Step 03",
    title: "Checkout and track",
    body: "Follow the bank-transfer instructions and receive payment and fulfillment updates in the chat.",
  },
] as const;
