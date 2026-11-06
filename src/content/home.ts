export type ServiceStatus = "live" | "soon";
export type HeroTone = "dark" | "light" | "orange";

export interface HeroSlide {
  id: string;
  /** Short name used on the card front and the progress pill. */
  service: string;
  status: ServiceStatus;
  title: string;
  subhead: string;
  cta: string;
  /** Prefilled WhatsApp message for this slide's button. */
  message: string;
  /** dark = light text + orange button; light / orange = dark text + black button. */
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

export interface FlowMedia {
  kind: "image" | "video";
  /** image: /images/flow/{step}.webp · video: /videos/flow/{step}.mp4 (muted, no audio needed) */
  src?: string;
  /** video only: first frame as an image, shown while the video loads */
  poster?: string;
  alt: string;
  /** What this slot shows (placeholder text until the real file lands). */
  stub: string;
  /** How much scroll this step holds for (1 ≈ half a screen). Videos need more. */
  scroll?: number;
}

export interface FlowStep {
  id: string;
  icon: FeatureIcon;
  /** The word in the left statement that lights up with this step. */
  word: string;
  title: string;
  you: string;
  we: string;
  media: FlowMedia;
}

export interface PlatformGame {
  id: string;
  title: string;
  /** Key art, landscape ≥1920×1080: /images/platforms/{platform}-{id}.webp */
  src?: string;
  alt: string;
}

export interface Platform {
  id: string;
  name: string;
  /** Platform logo (SVG, black version): /images/platforms/logos/{id}.svg */
  logo?: string;
  /** Button under the card (bottom right): full label, short label for small phones. */
  cta: string;
  ctaShort: string;
  /** Prefilled WhatsApp message for this platform. */
  message: string;
  games: PlatformGame[];
}

export interface Utility {
  id: string;
  name: string;
  /** One graphic per utility: /images/utilities/{id}.webp (1920×1056) */
  image: string;
  alt: string;
  /** Bottom-right line on the card. */
  more: string;
  cta: string;
  ctaShort: string;
  message: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  /** Optional bullet points shown under the answer. */
  points?: { lead: string; text: string }[];
}

export const home = {
  hero: {
    /** Brand tagline from the brief. Stays the page's h1 while the slides rotate. */
    tagline: "Tell it what you want. It handles the rest.",
    secondaryCta: "See how it works",
    /** Shown under the hero buttons on every slide. */
    trust: "No app. No dollar card. A real person reviews anything flagged.",
    intervalSeconds: 7,
    slides: [
      {
        id: "intro",
        service: "Panda Pay Africa",
        status: "live",
        title: "Tell it what you want. It handles the rest.",
        subhead:
          "Ask in plain English or Pidgin. Panda Pay Africa finds your gift card, prices it in Naira, confirms your transfer and delivers it in the same chat.",
        cta: "Start shopping on WhatsApp",
        message: "Hi!",
        tone: "orange",
        image: {
          src: "/images/hero/hero-intro-4k.webp",
          card: "/images/hero/hero-intro-640w.webp",
          width: 2560,
          height: 1440,
          focal: "75% 50%",
          focalMobile: "74% 50%",
          cardFocal: "74% 50%",
        },
      },
      {
        id: "playstation-store",
        service: "PlayStation Store",
        status: "live",
        title: "Top up your PlayStation wallet in one chat.",
        subhead:
          "Region-matched PlayStation Store gift cards, paid by Naira bank transfer. Your code lands in the same WhatsApp thread.",
        cta: "Get a PSN card",
        message: "Hi! I'd like a PlayStation Store gift card.",
        tone: "dark",
        image: {
          src: "/images/hero/hero-playstation-store-4k.webp",
          card: "/images/hero/hero-playstation-store-640w.webp",
          width: 1280,
          height: 720,
          focal: "70% 50%",
          focalMobile: "74% 50%",
          cardFocal: "72% 60%",
        },
      },
      {
        id: "airtime-bills",
        service: "Airtime & Bills",
        status: "live",
        title: "Airtime, data and bills, in the chat.",
        subhead: "Top-ups for every network, electricity tokens and TV renewals, all in one chat.",
        cta: "Notify me",
        message: "Hi! Let me know when airtime, data and bills are live.",
        tone: "light",
        image: {
          src: "/images/hero/hero-airtime-data-4k.webp",
          card: "/images/hero/hero-airtime-data-640w.webp",
          width: 1280,
          height: 720,
          focal: "62% 50%",
          focalMobile: "60% 50%",
          cardFocal: "60% 50%",
        },
      },
      {
        id: "lifestyle",
        service: "Lifestyle",
        status: "live",
        title: "Gift cards for the things you love.",
        subhead: "Apple, Amazon, Nike and more, paid by Naira bank transfer and delivered in the chat.",
        cta: "Enquire lifestyle gift cards",
        message: "Hi! What entertainment and lifestyle gift cards do you have in stock?",
        tone: "light",
        image: {
          src: "/images/hero/hero-lifestyle-4k.webp",
          card: "/images/hero/hero-lifestyle-640w.webp",
          width: 1280,
          height: 720,
          focal: "68% 50%",
          focalMobile: "68% 50%",
          cardFocal: "68% 50%",
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
        theme: "Understands you",
        surface: "paper",
        transition: "rise",
        duration: 6,
        features: [
          {
            id: "onboarding",
            icon: "wave",
            title: "Say hi. You're in.",
            line: "No app to download, no sign-up form. Your first message opens the store.",
            media: { kind: "video", alt: "A single 'Hi' bubble opens into the Panda Pay Africa store", src: "/videos/features/hi_shop_popup.mp4", stub: "A single 'Hi' bubble opens into the Panda Pay Africa store", size: "1600×1000 · 5s loop" },
          },
          {
            id: "discovery",
            icon: "discover",
            title: "Ask the way you'd ask a friend.",
            line: "Tell it what you're after, in English or Pidgin, and it shows what matches.",
            media: { kind: "image", alt: "A question bubble with matching product chips fanning out", src: "/images/features/gift_cards_search.webp", stub: "A question bubble with matching product chips fanning out", size: "1600×1000" },
          },
          {
            id: "typos",
            icon: "typo",
            title: "Typos welcome.",
            line: "It turns spelling slips, Nigerian English and everyday Pidgin into a clear request.",
            media: { kind: "video", alt: "", src: "/videos/features/giftcard_tray.mp4", stub: "Misspelled words settle into the right product name", size: "1600×1000 · 5s loop" },
          },
        ],
      },
      {
        id: "finding",
        theme: "Finds what's available",
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
            line: "It checks live stock and your region first, so nothing sold out slips into your choices.",
            media: { kind: "video", alt: "", src: "/videos/features/giftcard_shelf.mp4", stub: "A sold-out card dims and slides off the shelf; the rest close the gap", size: "1200×900 · 5s loop" },
          },
        ],
      },
      {
        id: "store",
        theme: "Builds your order",
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
            line: "It builds your cart and creates your order on the spot, with its own order number.",
            media: { kind: "image", alt: "", src: "/images/features/chat_receipt_orange.webp", stub: "A neat order slip with an order number, rising out of a chat bubble", size: "1200×900" },
          },
        ],
      },
      {
        id: "paying",
        theme: "Handles payment",
        surface: "paper",
        transition: "wipe-y",
        duration: 6,
        features: [
          {
            id: "transfer",
            icon: "naira",
            title: "Pay the way you already pay.",
            line: "Send Naira from any Nigerian bank. Each order gets its own payment details. No dollar card needed.",
            media: { kind: "image", alt: "", src: "/images/features/naira_transfer_slip.webp", stub: "A Naira bank-transfer slip in brand colours", size: "900×1200" },
          },
          {
            id: "review",
            icon: "review",
            title: "Confirmed automatically.",
            line: "Your transfer is matched and confirmed on its own. If something looks off, a real person reviews it and keeps you posted.",
            media: { kind: "image", alt: "", src: "/images/features/checked_transfer_slip.webp", stub: "A hand-stamped 'Checked' mark on a transfer slip", size: "900×1200" },
          },
        ],
      },
      {
        id: "after",
        theme: "Delivers and follows up",
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
            line: "Need a hand? It passes you to our support team in the same chat.",
            media: { kind: "image", alt: "", src: "/images/features/support_chat_bubble.webp", stub: "A support bubble with a small headset badge", size: "1200×900" },
          },
        ],
      },
    ] satisfies FeatureTile[] as FeatureTile[],
  },

  flow: {
    heading: "How it works",
    cta: { label: "Start shopping on WhatsApp", message: "Hi! I'd like to shop on Panda Pay Africa." },
    steps: [
      {
        id: "say-hi",
        icon: "wave",
        word: "Hi.",
        title: "Say hi",
        you: "Send a message to Panda Pay Africa on WhatsApp.",
        we: "Welcome you and open the catalogue.",
        media: {
          kind: "image",
          src: "/images/flow/say-hi.webp",
          alt: "WhatsApp chat with Pandapay Africa: the customer says Hi, shares a first name and email, and is offered the catalogue.",
          stub: "Chat: 'Hi', first name, email, then Browse catalog",
          scroll: 1.4,
        },
      },
      {
        id: "find-it",
        icon: "discover",
        word: "Tap.",
        title: "Find it",
        you: "Tap through category, region, brand and product.",
        we: "Show only what's in stock for your region.",
        media: {
          kind: "video",
          src: "/videos/flow/find-it.mp4",
          poster: "/videos/flow/find-it.webp",
          alt: "Browsing the catalogue: category, region, brand, product line, then product.",
          stub: "Video: category → region → brand → product line → product",
          scroll: 3,
        },
      },
      {
        id: "pay",
        icon: "naira",
        word: "Pay.",
        title: "Pay in Naira",
        you: "Add it to your cart, check out and send a bank transfer.",
        we: "Confirm your payment and create your order.",
        media: {
          kind: "video",
          src: "/videos/flow/pay.mp4",
          poster: "/videos/flow/pay.webp",
          alt: "Cart, checkout and order summary, then the bank transfer details to pay in Naira.",
          stub: "Video: cart → checkout → order summary → bank transfer details",
          scroll: 3.5,
        },
      },
      {
        id: "get-it",
        icon: "gift",
        word: "Done.",
        title: "Get it in the chat",
        you: "Nothing. Just wait for it.",
        we: "Send your voucher or service confirmation, trackable any time.",
        media: {
          kind: "video",
          src: "/videos/flow/get-it.mp4",
          poster: "/videos/flow/get-it.webp",
          alt: "Payment received, order delivered, and the voucher code arriving in the chat.",
          stub: "Video: payment received → delivered → voucher code in the chat",
          scroll: 3,
        },
      },
    ] satisfies FlowStep[],
  },

  platforms: {
    heading: "Gift cards for every platform.",
    tabs: { giftCards: "Gift cards", lifestyle: "Lifestyle", utilities: "Utilities" },
    more: "+ more games",
    /** Seconds each game holds inside the active card (5 games → one platform). */
    gameSeconds: 3,
    items: [
      {
        id: "xbox",
        name: "Xbox",
        cta: "Buy Xbox gift cards",
        ctaShort: "Buy Xbox cards",
        message: "Hi! What Xbox gift cards do you have in stock?",
        games: [
          { id: "forza-horizon-5", title: "Forza Horizon 5", src: "/images/platforms/xbox-forza-horizon-5.webp", alt: "Forza Horizon 5 key art" },
          { id: "halo-infinite", title: "Halo Infinite", src: "https://content.halocdn.com/media/Default/community/blogs/fullres_halo_infinite_courage_keyart_horiz_notitle_1120-5249e58b6fcd4f42b772a5cffe881b22.jpg", alt: "Halo Infinite key art" },
          { id: "black-ops-7", title: "Call of Duty: Black Ops 7", src: "https://4kwallpapers.com/images/wallpapers/call-of-duty-black-2560x1080-22670.jpg", alt: "Call of Duty: Black Ops 7 key art" },
          { id: "starfield", title: "Starfield", src: "/images/platforms/xbox-starfield.webp", alt: "Starfield key art" },
          { id: "minecraft", title: "Minecraft", src: "/images/platforms/xbox-minecraft.webp", alt: "Minecraft key art" },
        ],
      },
      {
        id: "playstation",
        name: "PlayStation",
        cta: "Buy PlayStation gift cards",
        ctaShort: "Buy PlayStation cards",
        message: "Hi! What PlayStation gift cards do you have in stock?",
        games: [
          { id: "ea-fc-26", title: "EA Sports FC 26", src: "/images/platforms/playstation-ea-fc-26.webp", alt: "EA Sports FC 26 key art" },
          { id: "spider-man-2", title: "Marvel's Spider-Man 2", src: "https://4kwallpapers.com/images/wallpapers/marvels-spider-man-3840x2160-11609.jpeg", alt: "Marvel's Spider-Man 2 key art" },
          { id: "god-of-war-ragnarok", title: "God of War Ragnarök", src: "/images/platforms/playstation-god-of-war-ragnarok.webp", alt: "God of War Ragnarök key art" },
          { id: "ghost-of-yotei", title: "Ghost of Yōtei", src: "https://cdn.wccftech.com/wp-content/uploads/2025/09/Ghost-of-Yotei-Day-One-Patch.png", alt: "Ghost of Yōtei key art" },
          { id: "gran-turismo-7", title: "Gran Turismo 7", src: "/images/platforms/playstation-gran-turismo-7.webp", alt: "Gran Turismo 7 key art" },
        ],
      },
      {
        id: "nintendo",
        name: "Nintendo",
        cta: "Buy Nintendo gift cards",
        ctaShort: "Buy Nintendo cards",
        message: "Hi! What Nintendo gift cards do you have in stock?",
        games: [
          { id: "mario-kart-world", title: "Mario Kart World", src: "/images/platforms/nintendo-mario-kart-world.webp", alt: "Mario Kart World key art" },
          { id: "zelda-totk", title: "The Legend of Zelda: Tears of the Kingdom", src: "/images/platforms/nintendo-zelda-totk.webp", alt: "The Legend of Zelda: Tears of the Kingdom key art" },
          { id: "donkey-kong-bananza", title: "Donkey Kong Bananza", src: "/images/platforms/nintendo-donkey-kong-bananza.webp", alt: "Donkey Kong Bananza key art" },
          { id: "pokemon-legends-za", title: "Pokémon Legends: Z-A", src: "/images/platforms/nintendo-pokemon-legends-za.webp", alt: "Pokémon Legends: Z-A key art" },
          { id: "smash-ultimate", title: "Super Smash Bros. Ultimate", src: "/images/platforms/nintendo-smash-ultimate.webp", alt: "Super Smash Bros. Ultimate key art" },
        ],
      },
      {
        id: "steam",
        name: "Steam",
        cta: "Buy Steam gift cards",
        ctaShort: "Buy Steam cards",
        message: "Hi! What Steam gift cards do you have in stock?",
        games: [
          { id: "counter-strike-2", title: "Counter-Strike 2", src: "/images/platforms/steam-counter-strike-2.webp", alt: "Counter-Strike 2 key art" },
          { id: "dota-2", title: "Dota 2", src: "/images/platforms/steam-dota-2.webp", alt: "Dota 2 key art" },
          { id: "elden-ring", title: "Elden Ring", src: "https://cdn.wccftech.com/wp-content/uploads/2021/06/ER_KEY-ART-scaled.jpg", alt: "Elden Ring key art" },
          { id: "baldurs-gate-3", title: "Baldur's Gate 3", src: "/images/platforms/steam-baldurs-gate-3.webp", alt: "Baldur's Gate 3 key art" },
          { id: "cyberpunk-2077", title: "Cyberpunk 2077", src: "/images/platforms/steam-cyberpunk-2077.webp", alt: "Cyberpunk 2077 key art" },
        ],
      },
    ] satisfies Platform[] as Platform[],
    lifestyle: {
      heading: "Gift cards for the things you love.",
      /** Seconds each category card holds before the row moves on. */
      seconds: 5,
      /** One graphic per category: /images/lifestyle/{id}.webp (~1690×930) */
      items: [
        {
          id: "movies-tv",
          name: "Movies & TV",
          image: "/images/lifestyle/movies-tv.webp",
          alt: "A glowing screen with a play button, a clapperboard, a cinema ticket and popcorn",
          more: "Netflix · Prime Video · Apple TV",
          cta: "Enquire movies & TV gift cards",
          ctaShort: "Enquire",
          message: "Hi! What movies and TV gift cards do you have in stock?",
        },
        {
          id: "music",
          name: "Music",
          image: "/images/lifestyle/music.webp",
          alt: "White headphones around a vinyl record, with music notes and equaliser bars",
          more: "Spotify · Apple Music · YouTube Music",
          cta: "Enquire music gift cards",
          ctaShort: "Enquire",
          message: "Hi! What music gift cards do you have in stock?",
        },
        {
          id: "sportswear",
          name: "Sportswear",
          image: "/images/lifestyle/sportswear.webp",
          alt: "A football jersey, a ball, a water bottle and a sneaker",
          more: "Nike · Adidas · Puma",
          cta: "Enquire sportswear gift cards",
          ctaShort: "Enquire",
          message: "Hi! What sportswear gift cards do you have in stock?",
        },
        {
          id: "fashion",
          name: "Fashion",
          image: "/images/lifestyle/fashion.webp",
          alt: "Orange, white and black shopping bags with a hanger, a sweater and a price tag",
          more: "Zara · H&M · ASOS",
          cta: "Enquire fashion gift cards",
          ctaShort: "Enquire",
          message: "Hi! What fashion gift cards do you have in stock?",
        },
        {
          id: "shopping-apps",
          name: "Shopping & apps",
          image: "/images/lifestyle/shopping-apps.webp",
          alt: "A grid of app tiles, a gift card and a parcel",
          more: "Amazon · Apple · Google Play",
          cta: "Enquire shopping & apps gift cards",
          ctaShort: "Enquire",
          message: "Hi! What shopping and app store gift cards do you have in stock?",
        },
      ] satisfies Utility[],
    },
    utilities: {
      heading: "Airtime, data and bills, sorted.",
      /** Seconds each utility card holds before the row moves on. */
      seconds: 5,
      items: [
        {
          id: "airtime",
          name: "Airtime",
          image: "/images/utilities/airtime.webp",
          alt: "A phone with a Naira top-up and signal bars",
          more: "MTN · Airtel · Glo · 9mobile",
          cta: "Notify me when airtime is live",
          ctaShort: "Notify me",
          message: "Hi! Let me know when airtime is live.",
        },
        {
          id: "data",
          name: "Data",
          image: "/images/utilities/data.webp",
          alt: "Signal waves with data bundles",
          more: "MTN · Airtel · Glo · 9mobile",
          cta: "Notify me when data is live",
          ctaShort: "Notify me",
          message: "Hi! Let me know when data is live.",
        },
        {
          id: "electricity",
          name: "Electricity",
          image: "/images/utilities/electricity.webp",
          alt: "A prepaid meter with a lightning bolt and a token slip",
          more: "Prepaid & postpaid meters",
          cta: "Notify me when electricity is live",
          ctaShort: "Notify me",
          message: "Hi! Let me know when electricity bills are live.",
        },
        {
          id: "cable-tv",
          name: "Cable TV",
          image: "/images/utilities/cable-tv.webp",
          alt: "A TV with a remote and a satellite dish",
          more: "DStv · GOtv · StarTimes",
          cta: "Notify me when cable TV is live",
          ctaShort: "Notify me",
          message: "Hi! Let me know when cable TV is live.",
        },
      ] satisfies Utility[],
    },
  },

  faq: {
    heading: "Questions, answered.",
    intro: "Short answers to what people ask before their first order.",
    cta: { label: "Still asking? Chat with us", message: "Hi! I have a question before I order." },
    /** Shown under each open answer; opens WhatsApp with that question prefilled. */
    askLabel: "Ask this on WhatsApp",
    items: [
      {
        id: "what",
        question: "What can I buy on Panda Pay Africa?",
        answer:
          "Gift cards for PlayStation, Xbox, Nintendo and Steam, entertainment and lifestyle gift cards like Apple, Amazon and Nike. New products are added as the catalogue grows. Airtime, data, electricity bills and cable TV subscriptions are on offer too.",
      },
      {
        id: "delivery",
        question: "How long does delivery take?",
        answer:
          "Once your payment is confirmed, your code or confirmation usually lands in the chat within seconds. If a transfer needs a manual check, we'll keep you posted in the same chat until it's done.",
      },
      {
        id: "payment",
        question: "How do I pay?",
        answer:
          "By bank transfer in Naira, from any Nigerian bank. Each order gets its own account details in the chat. Send the exact amount within the payment window, and Panda Pay Africa confirms it automatically.",
      },
      {
        id: "assistant",
        question: "Who am I chatting with?",
        answer:
          "An AI agent that understands what you're asking for, in plain English or Pidgin, checks what's in stock, builds your order and confirms your payment. Our team watches over it and steps in on anything flagged or unusual, so a person is always behind it.",
      },
      {
        id: "safe",
        question: "Is it safe?",
        answer: "Yes, and here\u2019s how we protect every order.",
        points: [
          { lead: "A registered Nigerian business.", text: "Panda Pay Africa is run by Afropanda Gaming Ltd (RC 7087337)." },
          { lead: "Payments go through Paystack.", text: "Each order gets its own one-time account number, never a personal account." },
          { lead: "Code doesn\u2019t work? We fix it.", text: "We\u2019ll replace it or refund you in full within 24 hours." },
          {
            lead: "Only our official number.",
            text: "We\u2019ll only message you from +234 704 386 4368. If anyone else claims to be Panda Pay Africa, it isn\u2019t us. We\u2019ll never ask for your bank PIN, password or OTP.",
          },
        ],
      },
      {
        id: "support",
        question: "When is support available?",
        answer: "Around the clock, 24/7. Message us in the same chat any time and our support team will pick it up.",
      },
    ] satisfies FaqItem[],
  },
};
