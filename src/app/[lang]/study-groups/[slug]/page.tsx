import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { asLang, LANGS, t } from "@/lib/i18n";
import { getEvent, getEvents, getSiteSettings } from "@/lib/sanity";
import { buildMetadata } from "@/lib/seo";
import { UI } from "@/i18n/ui";
import { EventMeta } from "@/components/EventMeta";
import { LeafPill } from "@/components/LeafPill";
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

/** Figma 0:1148. */
export default async function StudyGroupPage({ params }: Props) {
  const { lang: rawLang, slug } = await params;
  const lang = asLang(rawLang);
  const event = await getEvent(slug);
  if (!event) notFound();

  const body = t(event.body, lang) as PortableTextBlock[] | undefined;

  return (
    <article className="mx-auto my-10 w-full max-w-[1143px] px-4">
      <div className="glass-panel flex flex-col gap-2 rounded-[20px] px-5 pt-5 pb-[13px]">
        <h1>
          <LeafPill>
            {UI.studyGroupPrefix[lang]} — {t(event.title, lang)}
          </LeafPill>
        </h1>
        <hr className="w-full border-t border-rule" />

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[100px]">
          <div className="flex w-full flex-col gap-4 lg:w-[776px]">
            <SanityImage
              image={event.heroImage ?? event.image}
              sizes="(min-width: 1280px) 776px, 100vw"
              priority
              className="h-[200px] w-full rounded-[20px] object-cover sm:h-[295px]"
            />
            <div className="text-[12px] leading-[16.748px] italic [&_p]:mb-4">
              {body ? <PortableText value={body} /> : <p>{t(event.excerpt, lang)}</p>}
            </div>
          </div>

          <aside className="flex w-full shrink-0 flex-col gap-[30px] lg:w-[187px]">
            <EventMeta event={event} lang={lang} showDeadline />
            {event.subscribeUrl && (
              <a
                href={event.subscribeUrl}
                target="_blank"
                rel="noreferrer"
                className="glass-panel flex w-full items-center justify-center rounded-[12px] px-5 py-3"
              >
                <LeafPill>{UI.subscribe[lang]}</LeafPill>
              </a>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
