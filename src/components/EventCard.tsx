import Link from "next/link";
import { t, type Lang } from "@/lib/i18n";
import type { RuderalEvent } from "@/lib/sanity";
import { EventMeta } from "./EventMeta";
import { SanityImage } from "./SanityImage";

/**
 * A study group, drawn as the poster card in Figma 0:45. The poster itself is
 * artwork uploaded per study group — the colour, the oversized split title and
 * the vertical labels are all part of that image, not composed here.
 */
export function EventCard({ event, lang }: { event: RuderalEvent; lang: Lang }) {
  const title = t(event.title, lang);
  const excerpt = t(event.excerpt, lang);
  const href = `/${lang}/study-groups/${event.slug}`;

  return (
    <article className="glass-panel flex w-full flex-col gap-3 rounded-[20px] pb-5">
      <Link href={href} className="block">
        <SanityImage
          image={event.image}
          sizes="(min-width: 1280px) 312px, (min-width: 768px) 45vw, 85vw"
          className="aspect-[311/392] w-full rounded-t-[20px] object-cover"
        />
      </Link>

      <div className="flex flex-col gap-2 px-5">
        <h3 className="text-[12px] leading-[16.748px] font-bold italic">
          <Link href={href} className="hover:underline">
            {title}
          </Link>
        </h3>
        {excerpt && <p className="text-[12px] leading-[16.748px] italic">{excerpt}</p>}
        <EventMeta event={event} lang={lang} />
      </div>
    </article>
  );
}
