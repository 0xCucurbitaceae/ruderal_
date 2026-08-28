import { defineField, defineType } from "sanity";

export const LANGUAGES = [
  { id: "en", title: "English" },
  { id: "fr", title: "Français" },
] as const;

/**
 * Field-level translation: one object per translatable field, with a sub-field
 * per language. Sanity's documented pattern for a two-language site, and it
 * keeps a single document per event/podcast/page.
 */
function localeType(name: string, title: string, of: "string" | "text" | "block") {
  return defineType({
    name,
    title,
    type: "object",
    fields: LANGUAGES.map(({ id, title: langTitle }) =>
      of === "block"
        ? defineField({ name: id, title: langTitle, type: "array", of: [{ type: "block" }] })
        : defineField({ name: id, title: langTitle, type: of, rows: of === "text" ? 4 : undefined }),
    ),
    options: { columns: 1 },
  });
}

export const localeString = localeType("localeString", "Text (translated)", "string");
export const localeText = localeType("localeText", "Paragraph (translated)", "text");
export const localeBlock = localeType("localeBlock", "Rich text (translated)", "block");

export const seo = defineType({
  name: "seo",
  title: "Social sharing (OpenGraph)",
  type: "object",
  options: { collapsible: true, collapsed: true },
  description:
    "Optional. Anything left empty falls back to Site settings, then to this item's own title and description.",
  fields: [
    defineField({ name: "ogTitle", title: "Share title", type: "localeString" }),
    defineField({ name: "ogDescription", title: "Share description", type: "localeText" }),
    defineField({
      name: "ogImage",
      title: "Share image",
      type: "image",
      description: "Shown when the page is linked on social media. Cropped to 1200×630.",
      options: { hotspot: true },
    }),
  ],
});
