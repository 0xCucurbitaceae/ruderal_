import Link from "next/link";
import { t, type Lang } from "@/lib/i18n";
import type { RuderalEvent } from "@/lib/sanity";
import { EventMeta } from "./EventMeta";
import { SanityImage } from "./SanityImage";

/** A study group, drawn as a wide card like a happening (HappeningCard). */
export function EventCard({ event, lang }: { event: RuderalEvent; lang: Lang }) {
  const title = t(event.title, lang);
  const excerpt = t(event.excerpt, lang);
  const href = `/${lang}/study-groups/${event.slug}`;

  return (
    <article className="glass-panel flex w-full flex-col items-start gap-2 rounded-[20px] p-2">
      <Link href={href} className="block w-full">
        <SanityImage
          image={event.image}
          sizes="(min-width: 1280px) 1104px, 100vw"
          className="h-[240px] w-full rounded-[20px] object-cover sm:h-[360px] lg:h-[511px]"
        />
      </Link>

      <div className="flex w-full flex-col gap-2 px-2 pb-2">
        <h3 className="text-[14px] leading-[16.748px] font-bold">
          <Link href={href} className="hover:underline">
            {title}
          </Link>
        </h3>
        {excerpt && <p className="text-[14px] leading-[16.748px]">{excerpt}</p>}
        <EventMeta event={event} lang={lang} />
      </div>
    </article>
  );
}
