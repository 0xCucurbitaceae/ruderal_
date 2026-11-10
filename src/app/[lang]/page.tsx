import type { Metadata } from "next";
import { asLang, t } from "@/lib/i18n";
import { getEvents, getPodcasts, getSiteSettings, type SectionIntro } from "@/lib/sanity";
import { buildMetadata } from "@/lib/seo";
import { UI } from "@/i18n/ui";
import { EventCard } from "@/components/EventCard";
import { HappeningCard } from "@/components/HappeningCard";
import { PodcastPlayer } from "@/components/PodcastPlayer";
import { SectionHeader } from "@/components/SectionHeader";
import { Hero } from "@/components/Hero";

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
  const header = (lines: readonly string[], intro?: SectionIntro) => (
    <SectionHeader
      lines={lines}
      lang={lang}
      eyebrow={t(intro?.eyebrow, lang)}
      intro={t(intro?.full, lang) ?? t(intro?.short, lang)}
    />
  );

  return (
    <div className="relative overflow-x-clip">
      <Hero siteName={settings?.siteName ?? "Ruderal"} />

      <section id="podcasts" className="relative z-10 flex flex-col items-center gap-[60px] pb-24">
        {header(UI.sections.podcasts[lang], settings?.podcastsIntro)}
        <PodcastPlayer podcasts={podcasts} lang={lang} />
      </section>

      <section id="study-groups" className="relative z-10 flex flex-col items-center gap-[60px] pb-24">
        {header(UI.sections.studyGroups[lang], settings?.studyGroupsIntro)}
        <ul className="mx-auto flex w-full max-w-[1120px] flex-col gap-10 px-6">
          {studyGroups.map((event) => (
            <li key={event._id}>
              <EventCard event={event} lang={lang} />
            </li>
          ))}
        </ul>
      </section>

      <section id="happenings" className="relative z-10 flex flex-col items-center gap-[60px] pb-16">
        {header(UI.sections.happenings[lang], settings?.happeningsIntro)}
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
