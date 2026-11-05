export const site = {
  name: "Panda Pay Africa",
  title:
    "Panda Pay Africa — Gaming & Lifestyle Gift Cards on WhatsApp | Nigeria",
  description:
    "Panda Pay Africa is an AI payment agent on WhatsApp. Ask for gift cards in plain English or Pidgin, pay by Naira bank transfer and get it delivered in the same chat. Airtime, data and bills too.",
  url: "https://www.pandapay.africa/",
  image: "https://www.pandapay.africa/og.png",
  imageAlt: "Panda Pay Africa brand mark on a clean white field",
  whatsapp: "2347043864368",
  email: "info@pandapay.africa",
  /** Support has an inbox, but no separate phone line: WhatsApp above is the only number. */
  supportEmail: "support@pandapay.africa",
  phone: "+234 704 386 4368",
  phoneTel: "+2347043864368",
  address: "12 Olu Adebayo Street, Isolo, Lagos, Nigeria",
  parent: "Afro Panda Gaming Ltd",
  socials: [
    {
      name: "instagram",
      href: "https://www.instagram.com/pandapay_afric",
      label: "Panda Pay Africa on Instagram",
    },
    {
      name: "x",
      href: "https://x.com/PandapayAfrica",
      label: "Panda Pay Africa on X",
    },
    {
      name: "linkedin",
      href: "https://www.linkedin.com/company/afropandaesports/",
      label: "Afro Panda Gaming on LinkedIn",
    },
  ],
};

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: site.description,
  image: site.image,
};
