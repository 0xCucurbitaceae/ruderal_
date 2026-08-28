import type { Metadata } from "next";
import Image from "next/image";
import { asLang, t } from "@/lib/i18n";
import { getEvents, getPodcasts, getSiteSettings } from "@/lib/sanity";
import { buildMetadata } from "@/lib/seo";
import { UI } from "@/i18n/ui";
import { EventCard } from "@/components/EventCard";
import { HappeningCard } from "@/components/HappeningCard";
import { PodcastItem } from "@/components/PodcastItem";
import { SectionHeader } from "@/components/SectionHeader";
import { ExpandableIntro } from "@/components/ExpandableIntro";

import wordmark from "../../../public/design/wordmark.png";
import vine from "../../../public/design/vine.png";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = asLang(rawLang);
  const settings = await getSiteSettings();
  return buildMetadata({ settings, lang, path: "", fallbackTitle: settings?.siteName ?? "Ruderal" });
}

export default async function HomePage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = asLang(rawLang);
  const [settings, studyGroups, happenings, podcasts] = await Promise.all([
    getSiteSettings(),
    getEvents("study-group"),
    getEvents("happening"),
    getPodcasts(),
  ]);

  const [featured, ...rest] = podcasts;
  const eyebrow = t(settings?.sectionEyebrow, lang);
  const intro = (
    <ExpandableIntro
      short={t(settings?.sectionIntroShort, lang)}
      full={t(settings?.sectionIntroFull, lang)}
      lang={lang}
    />
  );

  return (
    <div className="relative overflow-x-clip">
      {/* Decorative vine running down the right edge (Figma 0:131). */}
      <Image
        src={vine}
        alt=""
        aria-hidden
        priority={false}
        className="pointer-events-none absolute top-[520px] right-[-40px] z-0 hidden w-[300px] max-w-none select-none lg:block"
      />

      <header className="relative z-10 mx-auto max-w-[1120px] px-6 pt-10 pb-16 lg:pt-16 lg:pb-24">
        <h1>
          <Image src={wordmark} alt={settings?.siteName ?? "Ruderal"} priority className="w-full" />
        </h1>
      </header>

      <section id="podcasts" className="relative z-10 flex flex-col items-center gap-[60px] pb-24">
        <SectionHeader title={UI.nav.podcasts[lang]} eyebrow={eyebrow} intro={intro} />
        {featured && (
          <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-10 px-6 lg:flex-row lg:items-start">
            <PodcastItem podcast={featured} lang={lang} featured />
            {rest.length > 0 && (
              <ul className="flex w-full shrink-0 flex-col gap-[15px] lg:w-[271px]">
                {rest.map((podcast) => (
                  <li key={podcast._id}>
                    <PodcastItem podcast={podcast} lang={lang} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      <section id="study-groups" className="relative z-10 flex flex-col items-center gap-[60px] pb-24">
        <SectionHeader
          title={UI.nav.studyGroups[lang]}
          eyebrow={eyebrow}
          intro={intro}
        />
        {/* The design runs the posters off the right edge as a scrolling row. */}
        <ul className="flex w-full snap-x gap-[42px] overflow-x-auto px-6 pb-4 lg:px-[80px]">
          {studyGroups.map((event) => (
            <li key={event._id} className="w-[85vw] max-w-[311.75px] shrink-0 snap-start sm:w-[311.75px]">
              <EventCard event={event} lang={lang} />
            </li>
          ))}
        </ul>
      </section>

      <section id="happenings" className="relative z-10 flex flex-col items-center gap-[60px] pb-16">
        <SectionHeader
          title={UI.nav.happenings[lang]}
          eyebrow={eyebrow}
          intro={intro}
        />
        <ul className="mx-auto flex w-full max-w-[1120px] flex-col gap-10 px-6">
          {happenings.map((event) => (
            <li key={event._id}>
              <HappeningCard event={event} lang={lang} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
