export type ProductStatus = "live" | "soon";

export const home = {
  hero: {
    headline: "Your gaming and digital services store. On WhatsApp.",
    headlineShort: "Your store. On WhatsApp.",
    subhead:
      "Buy PlayStation gift cards and subscriptions in one WhatsApp chat. Pay by Naira bank transfer and get your code in the same thread.",
    primaryCta: "Start on WhatsApp",
    secondaryCta: "See how it works",
    primaryMessage: "Hi! I'd like to shop on Panda Pay.",
    proof: [
      {
        icon: "icon-no-app",
        label: "No app to install",
      },
      {
        icon: "icon-bank",
        label: "Pay from any Nigerian bank",
      },
      {
        icon: "icon-track",
        label: "Track every order in chat",
      },
    ],
  },

  catalogue: {
    heading: "Everything you top up, in one chat.",
    intro:
      "Pick a category and we'll open it on WhatsApp. You only see what's in stock.",
    footnote:
      "Prices are in Naira and can change with stock and supplier rates. The final price is confirmed in chat before you pay.",
    products: [
      {
        slug: "playstation-gift-cards",
        name: "PlayStation gift cards",
        line: "Wallet top-ups for PlayStation Store, matched to your account region.",
        status: "live" as ProductStatus,
        message: "Hi! I'd like to buy PlayStation gift cards.",
        art: "/illustrations/panda-pay-playstation-600x800.webp" as const,
      },
      {
        slug: "playstation-plus",
        name: "PlayStation Plus",
        line: "Essential, Extra and Premium memberships.",
        status: "live" as ProductStatus,
        message: "Hi! I'd like to buy PlayStation Plus.",
        art: "/illustrations/panda-pay-playstation-plus-600x800.webp" as const,
        stubId: "product-ps-plus",
        stubLabel: "PlayStation Plus illustration",
      },
      {
        slug: "more-gaming",
        name: "More gaming",
        line: "Other gaming cards and vouchers as we add them.",
        status: "soon" as ProductStatus,
      },
      {
        slug: "airtime",
        name: "Airtime",
        line: "MTN, Airtel, Glo and 9mobile.",
        status: "soon" as ProductStatus,
      },
      {
        slug: "mobile-data",
        name: "Mobile data",
        line: "Data bundles for every major network.",
        status: "soon" as ProductStatus,
      },
      {
        slug: "electricity",
        name: "Electricity",
        line: "Prepaid and postpaid meters across supported DisCos.",
        status: "soon" as ProductStatus,
      },
      {
        slug: "cable-tv",
        name: "Cable TV",
        line: "DStv, GOtv and Startimes renewals.",
        status: "soon" as ProductStatus,
      },
    ],
    buyLabel: "Buy on WhatsApp",
    comingSoonLabel: "Coming soon",
  },

  flow: {
    heading: 'From "hi" to delivered, in one conversation.',
    intro:
      "No forms, no new account, no foreign card. Here's a full order, start to finish.",
    closing: "One chat. No app. Every order on record.",
    cta: "Try it on WhatsApp",
    ctaMessage: "Hi! Show me how an order works.",
    services: [
      {
        id: "playstation",
        label: "PlayStation",
        soon: false,
        example: "PlayStation gift card",
      },
      {
        id: "airtime",
        label: "Airtime",
        soon: true,
        example: "MTN airtime",
      },
      {
        id: "data",
        label: "Data",
        soon: true,
        example: "Mobile data bundle",
      },
      {
        id: "electricity",
        label: "Electricity",
        soon: true,
        example: "Ikeja Electric token",
      },
      {
        id: "cable",
        label: "Cable TV",
        soon: true,
        example: "DStv renewal",
      },
    ],
    steps: [
      {
        title: "Say hi.",
        line: "Open Panda Pay on WhatsApp. We reply with the catalogue.",
      },
      {
        title: "Pick a category.",
        line: "Gaming, airtime, data or bills.",
      },
      {
        title: "Choose the brand or network.",
        line: "PlayStation, MTN, Ikeja Electric and more.",
      },
      {
        title: "Match your region.",
        line: "We only show cards that work on your account.",
      },
      {
        title: "Pick your product.",
        line: "Choose the amount, plan or bundle.",
      },
      {
        title: "Check your cart.",
        line: "Add more, change quantities or remove items before you pay.",
      },
      {
        title: "Pay by bank transfer.",
        line: "Send Naira from any Nigerian bank using the exact details in chat.",
      },
      {
        title: "Payment confirmed.",
        line: "We confirm your transfer and create your order.",
      },
      {
        title: "Delivered.",
        line: "Your code, token or top-up arrives in the same chat, with your order history kept there too.",
      },
    ],
  },

  why: {
    heading: "Built for how you already pay.",
    items: [
      {
        slug: "no-app",
        title: "No new app",
        line: "You already use WhatsApp. Shopping, payment and delivery all happen there.",
      },
      {
        slug: "naira",
        title: "Pay in Naira",
        line: "Bank transfer from any Nigerian bank. No dollar card, no foreign checkout.",
      },
      {
        slug: "region",
        title: "The right card for your region",
        line: "The catalogue is sorted by brand, region and product, so you don't buy a code that won't redeem.",
      },
      {
        slug: "stock",
        title: "Only what's in stock",
        line: "If it's in the catalogue, it's available to order right now.",
      },
      {
        slug: "talk",
        title: "Talk like you normally do",
        line: "Type the way you text, typos and Pidgin included, and we'll understand what you need.",
      },
      {
        slug: "record",
        title: "Every order on record",
        line: "Your cart, receipts, order status and history stay in the chat.",
      },
    ],
  },

  trust: {
    heading: "Your money and your code, accounted for.",
    items: [
      {
        slug: "genuine",
        title: "Genuine codes, never resold",
        body: "Every code comes from our suppliers and is delivered once, to you only.",
      },
      {
        slug: "payment",
        title: "You'll know when we have your money",
        body: "We confirm your transfer in chat. If a payment needs a manual check, our team reviews it and tells you.",
      },
      {
        slug: "delivery",
        title: "Delivery you can track",
        body: "Your order status updates in the chat from payment to delivery.",
      },
      {
        slug: "refund",
        title: "If it fails, you're covered",
        body: "If we can't deliver, we refund you.",
        linkLabel: "See the refund and delivery policy.",
        linkHref: "/refunds",
      },
      {
        slug: "privacy",
        title: "We keep only what we need",
        body: "We use your number and order details to fulfil orders and support you.",
        linkLabel: "See the privacy policy.",
        linkHref: "/privacy",
      },
      {
        slug: "customers",
        title: "Real customers, real orders",
        body: "",
        testimonials: true,
      },
    ],
    support:
      "Stuck on an order? Message us in the same chat and a person will pick it up.",
    supportCta: "Message support",
    supportMessage: "Hi! I need help with an order.",
  },

  faq: {
    heading: "Questions, answered.",
    aside: "Still stuck?",
    asideCta: "Message us on WhatsApp",
    asideMessage: "Hi! I have a question about Panda Pay.",
    items: [
      {
        slug: "what-can-i-buy",
        question: "What can I buy on Panda Pay?",
        answer:
          "PlayStation gift cards and PlayStation Plus memberships. Airtime, data, electricity and cable TV are coming soon.",
      },
      {
        slug: "need-app",
        question: "Do I need to download an app?",
        answer:
          "No. Everything happens in WhatsApp: browsing, paying, tracking and receiving your order.",
      },
      {
        slug: "how-pay",
        question: "How do I pay?",
        answer:
          "By Naira bank transfer from any Nigerian bank. The exact account details and amount are shown in the chat at checkout.",
      },
      {
        slug: "delivery-time",
        question: "How long until I get my code?",
        answer:
          "You'll see your order status update in the chat as soon as payment is confirmed.",
      },
      {
        slug: "region-lock",
        question: "Will a gift card work on my account?",
        answer:
          "Gift cards are region-locked. You pick your account's region before choosing a card, and we only show cards for that region. Check your PlayStation account region before you buy.",
      },
      {
        slug: "fails",
        question: "What if my payment or order fails?",
        answer:
          "Message us in the same chat with your order number. If we can't deliver, you'll get a refund under our refund and delivery policy.",
        linkLabel: "refund and delivery policy",
        linkHref: "/refunds",
      },
      {
        slug: "discount",
        question: "Can I use a discount code?",
        answer:
          "Yes, when a promotion is running. You'll be asked for it at checkout.",
      },
      {
        slug: "typing",
        question: "Can I type normally, or do I need commands?",
        answer:
          "Type the way you normally text. The bot understands everyday English, common typos and some Pidgin, and buttons are there when you want them.",
      },
      {
        slug: "safe",
        question: "Is my information safe?",
        answer:
          "We use your phone number and order details only to process and support your orders. Read the privacy policy for the full details.",
        linkLabel: "privacy policy",
        linkHref: "/privacy",
      },
    ],
  },

  finalCta: {
    heading: "Your next top-up is one message away.",
    subhead: "Say hi to Panda Pay on WhatsApp and we'll take it from there.",
    primaryCta: "Start on WhatsApp",
    secondaryCta: "Read the FAQ",
    message: "Hi! I'd like to start shopping on Panda Pay.",
  },

  footer: {
    tagline: "Your gaming and digital services store. On WhatsApp.",
    columns: [
      {
        heading: "Shop",
        links: [
          { label: "Products", href: "/#products" },
          { label: "How it works", href: "/#how-it-works" },
          { label: "Start on WhatsApp", href: "whatsapp", external: true },
        ],
      },
      {
        heading: "Help",
        links: [
          { label: "FAQ", href: "/#faq" },
          { label: "Support", href: "whatsapp-support", external: true },
          { label: "Articles and how-tos", href: "/articles" },
        ],
      },
      {
        heading: "Company",
        links: [{ label: "About Panda Pay", href: "/about" }],
      },
      {
        heading: "Legal",
        links: [
          { label: "Privacy policy", href: "/privacy" },
          { label: "Terms of service", href: "/terms" },
          { label: "Refund and delivery policy", href: "/refunds" },
        ],
      },
    ],
    smallPrint: [
      "Prices and availability can change with stock and supplier conditions. The price confirmed in chat is the price you pay. Gift cards and subscriptions are region-specific; check that a product matches your account region before you buy. Payments are made by Naira bank transfer, and codes and confirmations are delivered on WhatsApp under our refund and delivery policy.",
      "PlayStation is a trademark of Sony Interactive Entertainment. Panda Pay is not affiliated with or endorsed by Sony.",
    ],
    copyright: "Panda Pay is a product of AfroPanda Esports (Afro Panda Gaming Ltd). © 2026 Panda Pay.",
  },

  header: {
    nav: [
      { label: "Products", href: "#products", section: "products" },
      { label: "How it works", href: "#how-it-works", section: "how-it-works" },
      { label: "FAQ", href: "#faq", section: "faq" },
      { label: "Support", href: "whatsapp-support", external: true },
    ],
    cta: "Start on WhatsApp",
    ctaShort: "Start",
    ctaMessage: "Hi! I'd like to shop on Panda Pay.",
  },
} as const;
