import Link from "next/link";
import { formatEventDate, t, type Lang } from "@/lib/i18n";
import type { RuderalEvent } from "@/lib/sanity";
import { UI } from "@/i18n/ui";
import { SanityImage } from "./SanityImage";

export function EventCard({ event, lang }: { event: RuderalEvent; lang: Lang }) {
  const title = t(event.title, lang);
  const excerpt = t(event.excerpt, lang);
  const meta = [
    [UI.date[lang], formatEventDate(event.startDate, event.endDate, lang)],
    [UI.time[lang], t(event.timeLabel, lang)],
    [UI.price[lang], t(event.priceLabel, lang)],
    [UI.where[lang], t(event.locationLabel, lang)],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  // Only study groups have a detail page in the design.
  const href = event.kind === "study-group" ? `/${lang}/study-groups/${event.slug}` : undefined;
  const heading = href ? <Link href={href}>{title}</Link> : title;

  return (
    <article>
      <SanityImage image={event.image} sizes="(min-width: 1280px) 312px, 100vw" />
      <h3>{heading}</h3>
      {excerpt && <p>{excerpt}</p>}
      <dl>
        {meta.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
