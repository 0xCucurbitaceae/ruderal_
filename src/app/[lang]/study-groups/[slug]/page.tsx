import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { asLang, formatEventDate, LANGS, t } from "@/lib/i18n";
import { getEvent, getEvents } from "@/lib/sanity";
import { getSiteSettings } from "@/lib/sanity";
import { buildMetadata } from "@/lib/seo";
import { UI } from "@/i18n/ui";
import { SanityImage } from "@/components/SanityImage";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const studyGroups = await getEvents("study-group");
  return LANGS.flatMap((lang) => studyGroups.map(({ slug }) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = asLang(rawLang);
  const [event, settings] = await Promise.all([getEvent(slug), getSiteSettings()]);
  return buildMetadata({
    seo: event?.seo,
    settings,
    lang,
    path: `/study-groups/${slug}`,
    fallbackTitle: t(event?.title, lang),
    fallbackDescription: t(event?.excerpt, lang),
  });
}

export default async function StudyGroupPage({ params }: Props) {
  const { lang: rawLang, slug } = await params;
  const lang = asLang(rawLang);
  const event = await getEvent(slug);
  if (!event) notFound();

  const body = t(event.body, lang) as PortableTextBlock[] | undefined;
  const meta = [
    [UI.date[lang], formatEventDate(event.startDate, event.endDate, lang)],
    [UI.time[lang], t(event.timeLabel, lang)],
    [UI.price[lang], t(event.priceLabel, lang)],
    [UI.where[lang], t(event.locationLabel, lang)],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  return (
    <article>
      <p>
        {UI.studyGroupPrefix[lang]} — {t(event.title, lang)}
      </p>
      <SanityImage image={event.image} sizes="(min-width: 1280px) 776px, 100vw" priority />
      {body ? <PortableText value={body} /> : <p>{t(event.excerpt, lang)}</p>}
      <aside>
        <dl>
          {meta.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        {event.subscribeUrl && (
          <a href={event.subscribeUrl} target="_blank" rel="noreferrer">
            {UI.subscribe[lang]}
          </a>
        )}
      </aside>
    </article>
  );
}
