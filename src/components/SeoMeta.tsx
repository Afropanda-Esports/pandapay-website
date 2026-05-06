import { useEffect } from "react";

type Props = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

const SITE_URL = "https://pandapay.afropanda.app";

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

export default function SeoMeta({ title, description, path, image = "/og-image.png" }: Props) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:url", url);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:site", "@afropandaesport");
    upsertCanonical(url);
  }, [description, image, path, title]);

  return null;
}
