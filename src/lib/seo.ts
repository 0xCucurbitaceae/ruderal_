import type { Metadata } from "next";
import { LANGS, t, type Lang } from "./i18n";
import { urlFor, type Seo, type SiteSettings } from "./sanity";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const OG_LOCALE: Record<Lang, string> = { en: "en_GB", fr: "fr_CH" };

type Args = {
  /** The document's own `seo` object, if it has one. */
  seo?: Seo;
  settings: SiteSettings | null;
  lang: Lang;
  /** Route path after the language segment, e.g. "" or "/about". */
  path: string;
  /** Used when the document leaves `seo.ogTitle` / `ogDescription` empty. */
  fallbackTitle?: string;
  fallbackDescription?: string;
};

/**
 * Per-document OpenGraph, falling back to siteSettings.defaultSeo and then to
 * the document's own title/excerpt.
 */
export function buildMetadata({
  seo,
  settings,
  lang,
  path,
  fallbackTitle,
  fallbackDescription,
}: Args): Metadata {
  const fallback = settings?.defaultSeo;
  const title = t(seo?.ogTitle, lang) ?? fallbackTitle ?? t(fallback?.ogTitle, lang);
  const description =
    t(seo?.ogDescription, lang) ?? fallbackDescription ?? t(fallback?.ogDescription, lang);
  const image = seo?.ogImage ?? fallback?.ogImage;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: `/${lang}${path}`,
      languages: Object.fromEntries(LANGS.map((l) => [l, `/${l}${path}`])),
    },
    openGraph: {
      type: "website",
      siteName: settings?.siteName ?? "Ruderal",
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      url: `/${lang}${path}`,
      title,
      description,
      images: image ? [urlFor(image).width(1200).height(630).fit("crop").url()] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
    },
  };
}
