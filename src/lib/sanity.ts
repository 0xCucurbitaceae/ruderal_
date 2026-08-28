import { createClient, type QueryParams } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { Locale } from "./i18n";
import {
  placeholderEvents,
  placeholderPage,
  placeholderPodcasts,
  placeholderSettings,
} from "./placeholder";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

/**
 * Until a Sanity project exists, every query resolves empty so the site still
 * builds and renders its chrome. Set NEXT_PUBLIC_SANITY_PROJECT_ID to turn it on.
 */
export const isSanityConfigured = Boolean(projectId);

export const client = createClient({
  projectId: projectId ?? "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-10-01",
  // Read token, used only while building. It is deliberately not NEXT_PUBLIC_,
  // so it is never bundled into anything the browser downloads.
  token: process.env.SANITY_READ_TOKEN,
  // A token and the CDN cache do not mix; every read here happens at build time.
  useCdn: !process.env.SANITY_READ_TOKEN,
  // Reads happen during the build, where a slow connection should retry rather
  // than fail the whole deploy. The 10s default trips regularly.
  timeout: 30000,
  maxRetries: 5,
});

function fetchOr<T>(fallback: T, query: string, params: QueryParams = {}): Promise<T> {
  if (!isSanityConfigured) return Promise.resolve(fallback);
  return client.fetch<T>(query, params);
}

const builder = createImageUrlBuilder(client);
export const urlFor = (source: SanityImageRef) => builder.image(source);

export type SanityImageRef = { asset: { _ref: string }; alt?: string };
export type PortableText = unknown[];

export type Seo = {
  ogTitle?: Locale<string>;
  ogDescription?: Locale<string>;
  ogImage?: SanityImageRef;
};

export type EventKind = "study-group" | "happening";

export type RuderalEvent = {
  _id: string;
  kind: EventKind;
  title: Locale<string>;
  slug: string;
  image?: SanityImageRef;
  heroImage?: SanityImageRef;
  excerpt?: Locale<string>;
  body?: Locale<PortableText>;
  startDate: string;
  endDate?: string;
  subscriptionDeadline?: string;
  timeLabel?: Locale<string>;
  priceLabel?: Locale<string>;
  locationLabel?: Locale<string>;
  subscribeUrl?: string;
  seo?: Seo;
};

export type Podcast = {
  _id: string;
  title: Locale<string>;
  slug: string;
  image?: SanityImageRef;
  description?: Locale<string>;
  duration?: string;
  youtubeUrl?: string;
  publishedAt: string;
  seo?: Seo;
};

export type Page = {
  _id: string;
  title: Locale<string>;
  slug: string;
  image?: SanityImageRef;
  body?: Locale<PortableText>;
  seo?: Seo;
};

export type SectionIntro = {
  eyebrow?: Locale<string>;
  short?: Locale<string>;
  full?: Locale<string>;
};

export type SiteSettings = {
  siteName?: string;
  podcastsIntro?: SectionIntro;
  studyGroupsIntro?: SectionIntro;
  happeningsIntro?: SectionIntro;
  footerBlurb?: Locale<string>;
  email?: string;
  instagramUrl?: string;
  defaultSeo?: Seo;
};

const SEO = `seo{ogTitle, ogDescription, ogImage}`;
const EVENT_FIELDS = `_id, kind, title, "slug": slug.current, image, heroImage, excerpt, body,
  startDate, endDate, subscriptionDeadline, timeLabel, priceLabel, locationLabel, subscribeUrl, ${SEO}`;

/** Newest first — the design just lists cards, with no upcoming/past split. */
export const getEvents = (kind: EventKind) =>
  fetchOr<RuderalEvent[]>(
    placeholderEvents.filter((e) => e.kind === kind),
    `*[_type == "event" && kind == $kind] | order(startDate desc) { ${EVENT_FIELDS} }`,
    { kind },
  );

export const getEvent = (slug: string) =>
  fetchOr<RuderalEvent | null>(
    placeholderEvents.find((e) => e.slug === slug) ?? null,
    `*[_type == "event" && slug.current == $slug][0] { ${EVENT_FIELDS} }`,
    { slug },
  );

export const getPodcasts = () =>
  fetchOr<Podcast[]>(
    placeholderPodcasts,
    `*[_type == "podcast"] | order(publishedAt desc) {
      _id, title, "slug": slug.current, image, description, duration, youtubeUrl, publishedAt, ${SEO}
    }`,
  );

export const getPage = (slug: string) =>
  fetchOr<Page | null>(
    placeholderPage,
    `*[_type == "page" && slug.current == $slug][0] {
      _id, title, "slug": slug.current, image, body, ${SEO}
    }`,
    { slug },
  );

export const getSiteSettings = () =>
  fetchOr<SiteSettings | null>(
    placeholderSettings,
    `*[_type == "siteSettings"][0] {
      siteName, podcastsIntro, studyGroupsIntro, happeningsIntro,
      footerBlurb, email, instagramUrl, defaultSeo{ogTitle, ogDescription, ogImage}
    }`,
  );
