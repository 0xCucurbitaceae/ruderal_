import type { Metadata } from "next";
import { asLang, t } from "@/lib/i18n";
import { getEvents, getPodcasts, getSiteSettings } from "@/lib/sanity";
import { buildMetadata } from "@/lib/seo";
import { UI } from "@/i18n/ui";
import { EventCard } from "@/components/EventCard";
import { PodcastItem } from "@/components/PodcastItem";
import { ExpandableIntro } from "@/components/ExpandableIntro";

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

  return (
    <>
      <section id="study-groups">
        <h1>{t(settings?.heroHeading, lang) ?? UI.nav.studyGroups[lang]}</h1>
        <ExpandableIntro
          short={t(settings?.heroIntroShort, lang)}
          full={t(settings?.heroIntroFull, lang)}
          lang={lang}
        />
        <ul>
          {studyGroups.map((event) => (
            <li key={event._id}>
              <EventCard event={event} lang={lang} />
            </li>
          ))}
        </ul>
      </section>

      <section id="podcasts">
        <h2>{UI.nav.podcasts[lang]}</h2>
        <ul>
          {podcasts.map((podcast) => (
            <li key={podcast._id}>
              <PodcastItem podcast={podcast} lang={lang} />
            </li>
          ))}
        </ul>
      </section>

      <section id="happenings">
        <h2>{UI.nav.happenings[lang]}</h2>
        <ul>
          {happenings.map((event) => (
            <li key={event._id}>
              <EventCard event={event} lang={lang} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
