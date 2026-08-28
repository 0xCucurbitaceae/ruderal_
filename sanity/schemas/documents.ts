import { defineField, defineType } from "sanity";

const image = (name = "image", title = "Image", description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
        description: "Describe the image for screen readers and when it fails to load.",
      }),
    ],
  });

/**
 * Study groups and happenings have identical fields in the design, so they are
 * one type with a `kind` discriminator rather than two near-duplicates.
 */
export const event = defineType({
  name: "event",
  title: "Study group / Happening",
  type: "document",
  fields: [
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: {
        list: [
          { value: "study-group", title: "Study group" },
          { value: "happening", title: "Happening" },
        ],
        layout: "radio",
      },
      initialValue: "study-group",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", type: "localeString", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      description: "The web address for this item, e.g. communities-and-nature.",
      options: { source: (doc: Record<string, unknown>) => (doc.title as { en?: string })?.en ?? "" },
      validation: (rule) => rule.required(),
    }),
    image("image", "Poster"),
    image("heroImage", "Detail page image", "Wide photo shown at the top of the detail page. Falls back to the poster."),
    defineField({
      name: "excerpt",
      title: "Short description",
      type: "localeText",
      description: "Shown on the card on the home page.",
    }),
    defineField({ name: "body", title: "Full description", type: "localeBlock" }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "date",
      description: "Leave empty for a single-day event.",
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const startDate = (context.document as { startDate?: string } | undefined)?.startDate;
          if (!endDate || !startDate || endDate >= startDate) return true;
          return "End date must not be before the start date.";
        }),
    }),
    defineField({
      name: "subscriptionDeadline",
      title: "Subscription deadline",
      type: "date",
      description: "Last day to sign up. Shown only on the detail page.",
    }),
    defineField({
      name: "timeLabel",
      title: "Time",
      type: "localeString",
      description: 'Free text, e.g. "17:30 to 18:30".',
    }),
    defineField({
      name: "priceLabel",
      title: "Price",
      type: "localeString",
      description: 'Free text, e.g. "Free".',
    }),
    defineField({
      name: "locationLabel",
      title: "Where",
      type: "localeString",
      description: 'Free text, e.g. "Chemin de la Garance 4" or "Online".',
    }),
    defineField({
      name: "subscribeUrl",
      title: "Subscribe link",
      type: "url",
      description: "External sign-up page. The Subscribe button is hidden when this is empty.",
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [
    { name: "startDateDesc", title: "Newest first", by: [{ field: "startDate", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title.en", kind: "kind", startDate: "startDate", media: "image" },
    prepare: ({ title, kind, startDate, media }) => ({
      title: title ?? "(untitled)",
      subtitle: [kind === "happening" ? "Happening" : "Study group", startDate].filter(Boolean).join(" · "),
      media,
    }),
  },
});

export const podcast = defineType({
  name: "podcast",
  title: "Podcast episode",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: (doc: Record<string, unknown>) => (doc.title as { en?: string })?.en ?? "" },
      validation: (rule) => rule.required(),
    }),
    image(),
    defineField({ name: "description", type: "localeText" }),
    defineField({
      name: "duration",
      type: "string",
      description: 'As shown on the card, e.g. "40min".',
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description:
        "Link to the episode on YouTube, e.g. https://www.youtube.com/watch?v=… The video is not stored here.",
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ["https"] })
          .custom((value) =>
            !value || /(?:youtube\.com|youtu\.be)/.test(value)
              ? true
              : "Must be a youtube.com or youtu.be link.",
          ),
    }),
    defineField({
      name: "publishedAt",
      title: "Publication date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [
    { name: "publishedAtDesc", title: "Newest first", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title.en", publishedAt: "publishedAt", media: "image" },
    prepare: ({ title, publishedAt, media }) => ({ title: title ?? "(untitled)", subtitle: publishedAt, media }),
  },
});

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: (doc: Record<string, unknown>) => (doc.title as { en?: string })?.en ?? "" },
      validation: (rule) => rule.required(),
    }),
    image(),
    defineField({ name: "body", type: "localeBlock" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { select: { title: "title.en", subtitle: "slug.current", media: "image" } },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", type: "string", initialValue: "Ruderal" }),
    // Each home section carries its own tagline and intro in the design.
    defineField({ name: "podcastsIntro", title: "Podcasts intro", type: "sectionIntro" }),
    defineField({ name: "studyGroupsIntro", title: "Study groups intro", type: "sectionIntro" }),
    defineField({ name: "happeningsIntro", title: "Happenings intro", type: "sectionIntro" }),
    defineField({ name: "footerBlurb", title: "Footer text", type: "localeText" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "defaultSeo", title: "Default social sharing", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const documents = [event, podcast, page, siteSettings];
