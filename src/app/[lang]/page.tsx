import type { Metadata } from "next";
import Image from "next/image";
import { asLang, t } from "@/lib/i18n";
import { getEvents, getPodcasts, getSiteSettings, type SectionIntro } from "@/lib/sanity";
import { buildMetadata } from "@/lib/seo";
import { UI } from "@/i18n/ui";
import { EventCard } from "@/components/EventCard";
import { HappeningCard } from "@/components/HappeningCard";
import { PodcastPlayer } from "@/components/PodcastPlayer";
import { SectionHeader } from "@/components/SectionHeader";
import { ExpandableIntro } from "@/components/ExpandableIntro";
import { Hero } from "@/components/Hero";

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

  /** Each section has its own tagline and intro in the design. */
  const header = (lines: readonly string[], intro?: SectionIntro, alignLastLineRight = false) => (
    <SectionHeader
      lines={lines}
      alignLastLineRight={alignLastLineRight}
      eyebrow={t(intro?.eyebrow, lang)}
      intro={<ExpandableIntro short={t(intro?.short, lang)} full={t(intro?.full, lang)} lang={lang} />}
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

      <Hero siteName={settings?.siteName ?? "Ruderal"} />

      <section id="podcasts" className="relative z-10 flex flex-col items-center gap-[60px] pb-24">
        {header(UI.sections.podcasts[lang], settings?.podcastsIntro)}
        <PodcastPlayer podcasts={podcasts} lang={lang} />
      </section>

      <section id="study-groups" className="relative z-10 flex flex-col items-center gap-[60px] pb-24">
        {header(UI.sections.studyGroups[lang], settings?.studyGroupsIntro)}
        {/* The posters run off the right edge as a scrolling row. */}
        <ul className="flex w-full snap-x scroll-px-6 gap-[42px] overflow-x-auto px-6 pb-4 lg:scroll-px-[80px] lg:px-[80px]">
          {studyGroups.map((event) => (
            <li key={event._id} className="w-[85vw] max-w-[311.75px] shrink-0 snap-start sm:w-[311.75px]">
              <EventCard event={event} lang={lang} />
            </li>
          ))}
        </ul>
      </section>

      <section id="happenings" className="relative z-10 flex flex-col items-center gap-[60px] pb-16">
        {header(UI.sections.happenings[lang], settings?.happeningsIntro, true)}
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
