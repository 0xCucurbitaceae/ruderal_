import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { asLang, t } from "@/lib/i18n";
import { getPage, getSiteSettings } from "@/lib/sanity";
import { buildMetadata } from "@/lib/seo";
import { UI } from "@/i18n/ui";
import { SanityImage } from "@/components/SanityImage";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = asLang(rawLang);
  const [page, settings] = await Promise.all([getPage("about"), getSiteSettings()]);
  return buildMetadata({
    seo: page?.seo,
    settings,
    lang,
    path: "/about",
    fallbackTitle: t(page?.title, lang) ?? UI.nav.about[lang],
  });
}

export default async function AboutPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = asLang(rawLang);
  const page = await getPage("about");
  const body = t(page?.body, lang) as PortableTextBlock[] | undefined;

  return (
    <article>
      <h1>{t(page?.title, lang) ?? UI.nav.about[lang]}</h1>
      <SanityImage image={page?.image} sizes="(min-width: 1280px) 1120px, 100vw" priority />
      {body && <PortableText value={body} />}
    </article>
  );
}
