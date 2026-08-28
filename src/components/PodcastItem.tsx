import { t, type Lang } from "@/lib/i18n";
import type { Podcast } from "@/lib/sanity";
import { SanityImage } from "./SanityImage";

export function PodcastItem({ podcast, lang }: { podcast: Podcast; lang: Lang }) {
  const title = t(podcast.title, lang);
  return (
    <article>
      <SanityImage image={podcast.image} sizes="(min-width: 1280px) 312px, 100vw" />
      <h3>
        {podcast.embedUrl ? (
          <a href={podcast.embedUrl} target="_blank" rel="noreferrer">
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      {podcast.duration && <p>{podcast.duration}</p>}
    </article>
  );
}
