import type { Lang } from "@/lib/i18n";

/** Chrome that lives in the design, not in the CMS. */
export const UI = {
  nav: {
    podcasts: { en: "Podcasts", fr: "Podcasts" },
    studyGroups: { en: "Study group", fr: "Groupe d'étude" },
    happenings: { en: "Happenings", fr: "Happenings" },
    about: { en: "About", fr: "À propos" },
  },
  /**
   * The design breaks each section heading across two lines mid-word, so each
   * is stored as its own lines rather than wrapped — where a word breaks is a
   * decision per language.
   */
  sections: {
    podcasts: { en: ["Podcasts"], fr: ["Podcasts"] },
    studyGroups: { en: ["Study", "group"], fr: ["Groupe", "d'étude"] },
    // French uses the English word for these.
    happenings: { en: ["Happen", "nings"], fr: ["Happen", "nings"] },
  },
  more: { en: "More", fr: "Plus" },
  less: { en: "Less", fr: "Moins" },
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
