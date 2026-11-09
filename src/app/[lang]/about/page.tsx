import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { asLang, t } from "@/lib/i18n";
import { getPage, getSiteSettings } from "@/lib/sanity";
import { buildMetadata } from "@/lib/seo";
import { UI } from "@/i18n/ui";

const TEAM = [
  { name: "Alessandra Mattana", role: { en: "Director", fr: "Directrice" } },
  {
    name: "Aline van Boetzelaer",
    role: { en: "Production and Communication", fr: "Production et communication" },
  },
] as const;

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
  const eyebrow = t(settings?.podcastsIntro?.eyebrow, lang);

  return (
    <article className="relative mx-auto my-10 w-full max-w-[1151px] px-4">
      <div className="glass-panel relative overflow-hidden rounded-l-[12px] px-5 pt-5 pb-[13px]">

        <div className="relative flex flex-col gap-[29px]">
          <h1 className="text-[20px] leading-7 font-bold">
            {eyebrow ?? t(page?.title, lang) ?? UI.nav.about[lang]}
          </h1>
          {body && (
            <div
              className="text-[20px] leading-7 text-[#141414] lg:columns-2 lg:gap-[109px] [&_p]:mb-7 [&_strong]:font-bold"
            >
              <PortableText value={body} />
            </div>
          )}
          <section className="text-[20px] leading-7 text-[#141414]">
            <h2 className="font-bold">{UI.team[lang]}</h2>
            <ul>
              {TEAM.map((member) => (
                <li key={member.name}>
                  {member.name} — {member.role[lang]}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
