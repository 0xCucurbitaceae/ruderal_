import type { Lang } from "@/lib/i18n";

/** Chrome that lives in the design, not in the CMS. */
export const UI = {
  nav: {
    podcasts: { en: "Podcasts", fr: "Podcasts" },
    studyGroups: { en: "Study group", fr: "Groupe d'étude" },
    happenings: { en: "Happenings", fr: "Événements" },
    about: { en: "About", fr: "À propos" },
  },
  more: { en: "More", fr: "Plus" },
  subscribe: { en: "Subscribe", fr: "S'inscrire" },
  studyGroupPrefix: { en: "Study group", fr: "Groupe d'étude" },
  date: { en: "Date", fr: "Date" },
  time: { en: "Time", fr: "Horaire" },
  price: { en: "Price", fr: "Prix" },
  where: { en: "Where", fr: "Lieu" },
  deadline: { en: "Subscription date", fr: "Date d'inscription" },
  skipToContent: { en: "Skip to content", fr: "Aller au contenu" },
} as const satisfies Record<string, unknown>;

type Leaf = Record<Lang, string>;

export const ui = (entry: Leaf, lang: Lang) => entry[lang];
