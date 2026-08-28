export const LANGS = ["en", "fr"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

/** A field-level translated value as stored in Sanity. */
export type Locale<T> = Partial<Record<Lang, T>>;

/** Read a localized field, falling back to the default language. */
export function t<T>(field: Locale<T> | null | undefined, lang: Lang): T | undefined {
  return field?.[lang] ?? field?.[DEFAULT_LANG];
}

/** Swiss formats: day-before-month in both languages. */
const INTL_LOCALE: Record<Lang, string> = { en: "en-GB", fr: "fr-CH" };

/**
 * Sanity `date` fields are plain "YYYY-MM-DD" strings. Parsing them with
 * `new Date(s)` treats them as UTC midnight, which renders as the previous day
 * in negative-offset zones, so build the date in local time instead.
 */
function parseDate(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const DATE_PARTS: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

/**
 * "8 September 2026" for a single date, "8 September – 15 October 2026" for a
 * range. `formatRange` collapses the shared month and year on its own.
 */
export function formatEventDate(
  startDate: string,
  endDate: string | null | undefined,
  lang: Lang,
): string {
  const format = new Intl.DateTimeFormat(INTL_LOCALE[lang], DATE_PARTS);
  const start = parseDate(startDate);
  if (!endDate || endDate === startDate) return format.format(start);
  return format.formatRange(start, parseDate(endDate));
}

/** Route params arrive as plain strings; narrow them at the boundary. */
export function asLang(value: string): Lang {
  return (LANGS as readonly string[]).includes(value) ? (value as Lang) : DEFAULT_LANG;
}
