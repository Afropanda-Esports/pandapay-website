export const site = {
  name: "Panda Pay",
  title:
    "Panda Pay — PlayStation Gift Cards, Airtime & Data on WhatsApp | Nigeria",
  description:
    "Buy PlayStation gift cards, PlayStation Plus, airtime and data on WhatsApp. Pay by Naira bank transfer and get your code or top-up in the same chat.",
  url: "https://www.pandapay.africa/",
  image: "https://www.pandapay.africa/og.png",
  imageAlt: "Panda Pay brand mark on a clean white field",
  whatsapp: "2347043864368",
  email: "info@pandapay.africa",
  phone: "+234 704 386 4368",
  phoneTel: "+2347043864368",
  address: "12 Olu Adebayo Street, Isolo, Lagos, Nigeria",
  parent: "AfroPanda Esports (Afro Panda Gaming Ltd)",
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
