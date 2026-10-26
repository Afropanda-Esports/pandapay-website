export const site = {
  name: "Panda Pay Africa",
  title:
    "Panda Pay Africa — Gaming & Lifestyle Gift Cards on WhatsApp | Nigeria",
  description:
    "Buy PlayStation, gaming and lifestyle gift cards on WhatsApp. Pay by Naira bank transfer and get your code in the same chat. Airtime, data and bills coming soon.",
  url: "https://www.pandapay.africa/",
  image: "https://www.pandapay.africa/og.png",
  imageAlt: "Panda Pay Africa brand mark on a clean white field",
  whatsapp: "2347043864368",
  email: "info@pandapay.africa",
  /** Support (24/7): its own WhatsApp line and inbox. */
  supportWhatsapp: "2349135714518",
  supportPhone: "+234 913 571 4518",
  supportEmail: "support@pandapay.africa",
  phone: "+234 704 386 4368",
  phoneTel: "+2347043864368",
  address: "12 Olu Adebayo Street, Isolo, Lagos, Nigeria",
  parent: "AfroPanda Esports (Afro Panda Gaming Ltd)",
};

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/** WhatsApp link to the support line. */
export const supportLink = (text?: string) =>
  `https://wa.me/${site.supportWhatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: site.description,
  image: site.image,
};
