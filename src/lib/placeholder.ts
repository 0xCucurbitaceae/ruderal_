import type { Page, Podcast, RuderalEvent, SiteSettings } from "./sanity";

/**
 * The copy shown in the Figma, used only until a Sanity project is connected.
 * It keeps the site buildable and gives the layout realistic content to sit on.
 * Once NEXT_PUBLIC_SANITY_PROJECT_ID is set, none of this is read.
 */

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const event = (
  slug: string,
  en: string,
  kind: RuderalEvent["kind"],
  startDate: string,
  endDate?: string,
): RuderalEvent => ({
  _id: `placeholder-${slug}`,
  kind,
  slug,
  title: { en, fr: en },
  excerpt: { en: LOREM, fr: LOREM },
  startDate,
  endDate,
  timeLabel: { en: "17:30 to 18:30", fr: "17h30 à 18h30" },
  priceLabel: { en: "Free", fr: "Gratuit" },
  locationLabel: { en: "Chemin de la Garance 4", fr: "Chemin de la Garance 4" },
});

export const placeholderEvents: RuderalEvent[] = [
  event("communities-and-nature", "Communities and Nature", "study-group", "2026-09-08", "2026-10-15"),
  event("astrology-politique", "Astrology Politique", "study-group", "2026-09-15", "2026-11-14"),
  event("some-thing", "Some Thing", "study-group", "2026-09-15", "2026-11-14"),
  event("baby-teeth", "Baby teeth — Catol Teixeira", "happening", "2026-09-08", "2026-10-15"),
];

export const placeholderPodcasts: Podcast[] = [
  {
    _id: "placeholder-baby-teeth",
    slug: "baby-teeth",
    title: { en: "Baby teeth — Catol Teixeira", fr: "Baby teeth — Catol Teixeira" },
    description: { en: LOREM, fr: LOREM },
    duration: "40min",
    embedUrl: "https://example.org/episode",
    publishedAt: "2026-09-08",
  },
];

export const placeholderPage: Page = {
  _id: "placeholder-about",
  slug: "about",
  title: { en: "About", fr: "À propos" },
};

const BLURB =
  "Ruderal is an association in Geneva focused on bringing diverse, participatory learning across cultures.";
const INTRO =
  "Ruderal produces and shares editorial and audio content emerging through multidisciplinary artistic practices in conversation with other fields of knowledge.";

export const placeholderSettings: SiteSettings = {
  siteName: "Ruderal",
  podcastsIntro: {
    eyebrow: {
      en: "Documenting Artistic Practices and Circulating Knowledge",
      fr: "Documenter les pratiques artistiques et faire circuler les savoirs",
    },
    short: { en: INTRO, fr: INTRO },
  },
  footerBlurb: { en: BLURB, fr: BLURB },
  email: "hi.ruderal@gmail.com",
  instagramUrl: "https://instagram.com/",
};
