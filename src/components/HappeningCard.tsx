import { t, type Lang } from "@/lib/i18n";
import type { RuderalEvent } from "@/lib/sanity";
import { EventMeta } from "./EventMeta";
import { SanityImage } from "./SanityImage";

/** A happening, drawn as the wide card in Figma 0:266. */
export function HappeningCard({ event, lang }: { event: RuderalEvent; lang: Lang }) {
  const title = t(event.title, lang);
  const excerpt = t(event.excerpt, lang);

  return (
    <article className="glass-panel flex w-full flex-col items-start gap-2 rounded-[20px] p-2">
      <SanityImage
        image={event.image}
        sizes="(min-width: 1280px) 1104px, 100vw"
        className="h-[240px] w-full rounded-[20px] object-cover sm:h-[360px] lg:h-[511px]"
      />
      <div className="flex w-full flex-col gap-2 px-2 pb-2">
        <h3 className="text-[12px] leading-[16.748px] font-bold italic">{title}</h3>
        {excerpt && <p className="text-[12px] leading-[16.748px] italic">{excerpt}</p>}
        <EventMeta event={event} lang={lang} />
      </div>
    </article>
  );
}
