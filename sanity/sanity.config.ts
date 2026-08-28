import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "ruderal",
  title: "Ruderal",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: one settings document, not a list editors can add to.
            S.listItem()
              .title("Site settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            S.documentTypeListItem("event").title("Study groups & happenings"),
            S.documentTypeListItem("podcast").title("Podcast episodes"),
            S.documentTypeListItem("page").title("Pages"),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    // Hide the singleton from the "create new" menu.
    templates: (prev) => prev.filter((t) => t.schemaType !== "siteSettings"),
  },
});
