import { t, type Lang } from "@/lib/i18n";
import type { Podcast } from "@/lib/sanity";
import { SanityImage } from "./SanityImage";

/**
 * Figma 0:227: the first episode runs full height on the left, the rest stack
 * in a narrow column on the right at a smaller type size.
 */
export function PodcastItem({
  podcast,
  lang,
  featured = false,
}: {
  podcast: Podcast;
  lang: Lang;
  featured?: boolean;
}) {
  const title = t(podcast.title, lang);
  const heading = (
    <div
      className={`flex w-full items-start justify-between gap-4 font-bold italic ${
        featured ? "text-[16px]" : "text-[12px] leading-[16.748px]"
      }`}
    >
      <span>{title}</span>
      {podcast.duration && <span className="shrink-0">{podcast.duration}</span>}
    </div>
  );

  const body = (
    <>
      <SanityImage
        image={podcast.image}
        sizes={featured ? "(min-width: 1280px) 800px, 100vw" : "271px"}
        className={
          featured
            ? "h-[280px] w-full rounded-[20px] object-cover sm:h-[380px] lg:h-[500px]"
            : "h-[155px] w-full rounded-[12px] object-cover"
        }
      />
      {heading}
    </>
  );

  return (
    <article className={`flex w-full flex-col gap-1 ${featured ? "flex-1" : ""}`}>
      {podcast.embedUrl ? (
        <a href={podcast.embedUrl} target="_blank" rel="noreferrer" className="flex flex-col gap-1">
          {body}
        </a>
      ) : (
        body
      )}
    </article>
  );
}
