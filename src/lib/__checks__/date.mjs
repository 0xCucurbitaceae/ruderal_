// Runnable self-check: node src/lib/__checks__/date.mjs
import assert from "node:assert/strict";

const INTL_LOCALE = { en: "en-GB", fr: "fr-CH" };
const DATE_PARTS = { day: "numeric", month: "long", year: "numeric" };
const parseDate = (v) => { const [y, m, d] = v.split("-").map(Number); return new Date(y, m - 1, d); };
const formatEventDate = (startDate, endDate, lang) => {
  const f = new Intl.DateTimeFormat(INTL_LOCALE[lang], DATE_PARTS);
  const start = parseDate(startDate);
  if (!endDate || endDate === startDate) return f.format(start);
  return f.formatRange(start, parseDate(endDate));
};

// Single date keeps the calendar day regardless of host timezone.
assert.equal(formatEventDate("2026-09-08", null, "en"), "8 September 2026");
assert.equal(formatEventDate("2026-09-08", "2026-09-08", "en"), "8 September 2026");
assert.match(formatEventDate("2026-09-08", null, "fr"), /^8 septembre 2026$/);

// Range within one year collapses the year. Intl uses narrow no-break spaces
// around the dash, so compare on normalized whitespace.
const norm = (s) => s.replace(/\s+/gu, " ");
assert.equal(norm(formatEventDate("2026-09-08", "2026-10-15", "en")), "8 September - 15 October 2026".replace("-", "\u2013"));

// Range across a year boundary keeps both years.
const crossYear = formatEventDate("2026-12-20", "2027-01-10", "en");
assert.ok(crossYear.includes("2026") && crossYear.includes("2027"), crossYear);

console.log("date checks passed");
