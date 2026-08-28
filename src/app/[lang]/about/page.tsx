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

/** Figma 0:1116. */
export default async function AboutPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = asLang(rawLang);
  const [page, settings] = await Promise.all([getPage("about"), getSiteSettings()]);
  const body = t(page?.body, lang) as PortableTextBlock[] | undefined;
  const eyebrow = t(settings?.sectionEyebrow, lang);

  return (
    <article className="relative mx-auto my-10 w-full max-w-[1151px] px-4">
      <div className="glass-panel relative overflow-hidden rounded-l-[12px] px-5 pt-5 pb-[13px]">
        {/* Artwork sitting behind the text (Figma 0:1119). */}
        <SanityImage
          image={page?.image}
          sizes="800px"
          className="pointer-events-none absolute top-[-164px] left-[93px] -z-10 hidden w-[788px] max-w-none rotate-[0.65deg] select-none lg:block"
        />

        <div className="relative flex flex-col gap-[29px]">
          <h1 className="text-[20px] leading-7 font-bold italic">
            {eyebrow ?? t(page?.title, lang) ?? UI.nav.about[lang]}
          </h1>
          {body && (
            <div
              className="text-[20px] leading-7 text-[#141414] italic lg:columns-2 lg:gap-[109px] [&_p]:mb-7 [&_strong]:font-bold"
            >
              <PortableText value={body} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
