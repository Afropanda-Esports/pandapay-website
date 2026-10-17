export type ServiceStatus = "live" | "soon";
export type HeroTone = "dark" | "light";

export interface HeroSlide {
  id: string;
  /** Short name used on the card front and the progress pill. */
  service: string;
  status: ServiceStatus;
  eyebrow: string;
  title: string;
  subhead: string;
  cta: string;
  /** Prefilled WhatsApp message for this slide's button. */
  message: string;
  /** dark = light text + orange button; light = dark text + black button. */
  tone: HeroTone;
  image: {
    src: string;
    card: string;
    width: number;
    height: number;
    /** object-position for the full-bleed background (desktop / mobile). */
    focal: string;
    focalMobile: string;
    /** object-position for the card front. */
    cardFocal: string;
  };
}

export type FeatureIcon =
  | "wave" | "discover" | "typo" | "shelves" | "stock" | "cart" | "tag"
  | "receipt" | "naira" | "review" | "gift" | "track" | "support";

export interface FeatureMedia {
  kind: "image" | "video";
  /** Leave empty to render a stub. Images: .webp. Videos: .mp4 (+ poster). */
  src?: string;
  poster?: string;
  alt: string;
  /** What the stub says until the real asset lands (see docs/feature-assets.md). */
  stub: string;
  size: string;
}

export interface Feature {
  id: string;
  icon: FeatureIcon;
  title: string;
  line: string;
  media: FeatureMedia;
}

export type TileSurface = "paper" | "house" | "signal";
export type TileTransition = "rise" | "wipe-x" | "stack" | "wipe-y" | "zoom";

export interface FeatureTile {
  id: string;
  theme: string;
  surface: TileSurface;
  /** How this tile's media changes; each tile moves differently. */
  transition: TileTransition;
  /** Seconds each feature stays before the tile moves on. */
  duration: number;
  features: Feature[];
}

export const home = {
  hero: {
    /** Brand tagline from the brief. Stays the page's h1 while the slides rotate. */
    tagline: "Your gaming and digital services store. On WhatsApp.",
    secondaryCta: "See how it works",
    intervalSeconds: 7,
    slides: [
      {
        id: "playstation-store",
        service: "PlayStation Store",
        status: "live",
        eyebrow: "PlayStation gift cards · Available now",
        title: "Top up your PlayStation wallet in one chat.",
        subhead:
          "Region-matched PlayStation Store gift cards, paid by Naira bank transfer. Your code lands in the same WhatsApp thread.",
        cta: "Buy a gift card",
        message: "Hi! I'd like to buy a PlayStation Store gift card.",
        tone: "dark",
        image: {
          src: "/images/hero/hero-playstation-store-1280x720.webp",
          card: "/images/hero/hero-playstation-store-640w.webp",
          width: 1280,
          height: 720,
          focal: "70% 50%",
          focalMobile: "74% 50%",
          cardFocal: "72% 60%",
        },
      },
      {
        id: "airtime-data",
        service: "Airtime & Data",
        status: "soon",
        eyebrow: "Airtime & data · Coming soon",
        title: "Airtime and data for every network.",
        subhead:
          "MTN, Airtel, Glo and 9mobile top-ups are coming to the same chat you already use.",
        cta: "Ask on WhatsApp",
        message: "Hi! When will airtime and data be available on Panda Pay?",
        tone: "light",
        image: {
          src: "/images/hero/hero-airtime-data-1280x720.webp",
          card: "/images/hero/hero-airtime-data-640w.webp",
          width: 1280,
          height: 720,
          focal: "62% 50%",
          focalMobile: "60% 50%",
          cardFocal: "60% 50%",
        },
      },
      {
        id: "playstation-plus",
        service: "PlayStation Plus",
        status: "live",
        eyebrow: "PlayStation Plus · Available now",
        title: "Keep your PlayStation Plus running.",
        subhead:
          "Essential, Extra and Premium memberships, paid in Naira and delivered in the chat.",
        cta: "Get PlayStation Plus",
        message: "Hi! I'd like to buy PlayStation Plus.",
        tone: "dark",
        image: {
          src: "/images/hero/hero-playstation-plus-1280x720.webp",
          card: "/images/hero/hero-playstation-plus-640w.webp",
          width: 1280,
          height: 720,
          focal: "68% 50%",
          focalMobile: "70% 50%",
          cardFocal: "68% 62%",
        },
      },
      {
        id: "bills",
        service: "Bills",
        status: "soon",
        eyebrow: "Electricity & TV · Coming soon",
        title: "Light and TV bills, sorted in chat.",
        subhead:
          "Electricity tokens and DStv, GOtv and StarTimes renewals are on the way.",
        cta: "Ask on WhatsApp",
        message: "Hi! When will bill payments be available on Panda Pay?",
        tone: "light",
        image: {
          src: "/images/hero/hero-bills-1600x900.webp",
          card: "/images/hero/hero-bills-640w.webp",
          width: 1600,
          height: 900,
          focal: "70% 50%",
          focalMobile: "66% 50%",
          cardFocal: "66% 50%",
        },
      },
    ] satisfies HeroSlide[],
  },

  features: {
    heading: "Built around how you already shop.",
    intro: "No new app, no new habits. Everything happens in the chat you already use.",
    tiles: [
      {
        id: "texting",
        theme: "Feels like texting",
        surface: "paper",
        transition: "rise",
        duration: 6,
        features: [
          {
            id: "onboarding",
            icon: "wave",
            title: "Say hi. You're in.",
            line: "No app to download, no sign-up form. Your first message opens the store.",
            media: { kind: "video", alt: "A single 'Hi' bubble opens into the Panda Pay store", src: "/videos/features/hi_shop_popup.mp4", stub: "A single 'Hi' bubble opens into the Panda Pay store", size: "1600×1000 · 5s loop" },
          },
          {
            id: "discovery",
            icon: "discover",
            title: "Ask the way you'd ask a friend.",
            line: "Tell us what you're after and we'll show you what matches.",
            media: { kind: "image", alt: "A question bubble with matching product chips fanning out", src: "/images/features/gift_cards_search.webp", stub: "A question bubble with matching product chips fanning out", size: "1600×1000" },
          },
          {
            id: "typos",
            icon: "typo",
            title: "Typos welcome.",
            line: "Spelling slips, Nigerian English and everyday Pidgin are understood just fine.",
            media: { kind: "video", alt: "", src: "/videos/features/giftcard_tray.mp4", stub: "Misspelled words settle into the right product name", size: "1600×1000 · 5s loop" },
          },
        ],
      },
      {
        id: "finding",
        theme: "Finds the right thing",
        surface: "house",
        transition: "wipe-x",
        duration: 6.5,
        features: [
          {
            id: "catalogue",
            icon: "shelves",
            title: "Neatly shelved.",
            line: "Browse by category, brand and region, so the right card is a few taps away.",
            media: { kind: "image", alt: "",src: "/images/features/three_tier_gift_card_shelf.webp", stub: "Gift cards sorted on lit shelves by category, brand and region", size: "1200×900" },
          },
          {
            id: "inventory",
            icon: "stock",
            title: "If you see it, you can buy it.",
            line: "Only what's in stock shows up. Nothing sold out slips into your choices.",
            media: { kind: "video", alt: "", src: "/videos/features/giftcard_shelf.mp4", stub: "A sold-out card dims and slides off the shelf; the rest close the gap", size: "1200×900 · 5s loop" },
          },
        ],
      },
      {
        id: "store",
        theme: "Shops like a proper store",
        surface: "signal",
        transition: "stack",
        duration: 5.5,
        features: [
          {
            id: "cart",
            icon: "cart",
            title: "Get it all in one go.",
            line: "Add one for you and one for a friend. Change or remove anything before you pay.",
            media: { kind: "video", alt: "", src: "/videos/features/giftcard_drop.mp4", stub: "Two cards drop into a cart tray; the count ticks to 2", size: "1200×900 · 5s loop" },
          },
          {
            id: "discount",
            icon: "tag",
            title: "Got a code? Use it.",
            line: "Apply a discount at checkout whenever a promo is running.",
            media: { kind: "image", alt: "", src: "/images/features/discount_card_tag.webp", stub: "A discount tag hooked onto a price card", size: "1200×900" },
          },
          {
            id: "checkout",
            icon: "receipt",
            title: "Checkout, right in the chat.",
            line: "Confirm your cart and your order is created on the spot, with its own order number.",
            media: { kind: "image", alt: "", src: "/images/features/chat_receipt_orange.webp", stub: "A neat order slip with an order number, rising out of a chat bubble", size: "1200×900" },
          },
        ],
      },
      {
        id: "paying",
        theme: "Pays the local way",
        surface: "paper",
        transition: "wipe-y",
        duration: 6,
        features: [
          {
            id: "transfer",
            icon: "naira",
            title: "Pay the way you already pay.",
            line: "Send Naira from any Nigerian bank. No dollar card needed.",
            media: { kind: "image", alt: "", src: "/images/features/naira_transfer_slip.webp", stub: "A Naira bank-transfer slip in brand colours", size: "900×1200" },
          },
          {
            id: "review",
            icon: "review",
            title: "A real person double-checks.",
            line: "If a transfer needs a closer look, our team reviews it and keeps you posted.",
            media: { kind: "image", alt: "", src: "/images/features/checked_transfer_slip.webp", stub: "A hand-stamped 'Checked' mark on a transfer slip", size: "900×1200" },
          },
        ],
      },
      {
        id: "after",
        theme: "Stays with you after",
        surface: "house",
        transition: "zoom",
        duration: 5.5,
        features: [
          {
            id: "voucher",
            icon: "gift",
            title: "Your code comes to you.",
            line: "Gift card codes land straight in your WhatsApp thread.",
            media: { kind: "video", alt: "", src: "/videos/features/giftcard_into_bubble.mp4", stub: "A masked code card glides into a chat bubble", size: "1200×900 · 5s loop" },
          },
          {
            id: "tracking",
            icon: "track",
            title: "Know where every order is.",
            line: "Check an order's status or look back at past purchases any time.",
            media: { kind: "image", alt: "", src: "/images/features/order_slips_dark.webp", stub: "A stack of past order slips with one status chip glowing", size: "1200×900" },
          },
          {
            id: "support",
            icon: "support",
            title: "Help is one message away.",
            line: "Need a hand? Our support team picks it up in the same chat.",
            media: { kind: "image", alt: "", src: "/images/features/support_chat_bubble.webp", stub: "A support bubble with a small headset badge", size: "1200×900" },
          },
        ],
      },
    ] satisfies FeatureTile[],
  },
};
