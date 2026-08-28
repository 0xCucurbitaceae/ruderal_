import { formatEventDate, t, type Lang } from "@/lib/i18n";
import type { RuderalEvent } from "@/lib/sanity";
import { UI } from "@/i18n/ui";

/**
 * The labelled rows under every card, separated by hairlines
 * (Figma 0:58 on a study group, 0:270 on a happening — identical markup).
 */
export function EventMeta({ event, lang }: { event: RuderalEvent; lang: Lang }) {
  const rows: [string, string | undefined][] = [
    [UI.date[lang], formatEventDate(event.startDate, event.endDate, lang)],
    [UI.time[lang], t(event.timeLabel, lang)],
    [UI.price[lang], t(event.priceLabel, lang)],
    [UI.where[lang], t(event.locationLabel, lang)],
  ];

  return (
    <dl className="w-full text-[12px] leading-[16.748px] italic">
      {rows
        .filter(([, value]) => Boolean(value))
        .map(([label, value]) => (
          <div key={label} className="flex gap-1 border-t border-rule py-2 first:border-t-0 first:pt-0">
            <dt className="font-semibold">{label}:</dt>
            <dd>{value}</dd>
          </div>
        ))}
    </dl>
  );
}
