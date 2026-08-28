"use client";

import { useState } from "react";
import ReactPlayer from "react-player";
import { t, type Lang } from "@/lib/i18n";
import { urlFor, type Podcast } from "@/lib/sanity";
import { SanityImage } from "./SanityImage";

/**
 * Figma 0:227, behaving like a video site: the chosen episode plays on the
 * left, every episode is listed on the right, and picking one swaps the
 * player. Defaults to the most recent, which is the first item since the
 * query orders by publication date.
 */
export function PodcastPlayer({ podcasts, lang }: { podcasts: Podcast[]; lang: Lang }) {
  const [selectedId, setSelectedId] = useState(podcasts[0]?._id);
  const [autoplay, setAutoplay] = useState(false);

  const selected = podcasts.find((p) => p._id === selectedId) ?? podcasts[0];
  if (!selected) return null;

  const select = (id: string) => {
    setSelectedId(id);
    // Only play on an explicit choice — never on first load.
    setAutoplay(true);
  };

  return (
    <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-10 px-6 lg:flex-row lg:items-start">
      <div className="flex w-full flex-col gap-1 lg:flex-1">
        <div className="aspect-video w-full overflow-hidden rounded-[20px] bg-black">
          <ReactPlayer
            key={selected._id}
            src={selected.youtubeUrl}
            playing={autoplay}
            controls
            width="100%"
            height="100%"
            /*
             * On first load, show the episode's artwork rather than pulling in
             * a YouTube player nobody has asked for yet. Once a visitor picks
             * an episode they have already expressed intent, so the real player
             * mounts straight away instead of asking for a second click.
             */
            light={autoplay ? false : selected.image ? urlFor(selected.image).width(1200).url() : true}
          />
        </div>
        <div className="flex w-full items-start justify-between gap-4 text-[16px] font-bold italic">
          <span>{t(selected.title, lang)}</span>
          {selected.duration && <span className="shrink-0">{selected.duration}</span>}
        </div>
      </div>

      <ul className="flex w-full shrink-0 flex-col gap-[15.178px] lg:h-[529px] lg:w-[271px] lg:overflow-y-auto lg:pr-1">
        {podcasts.map((podcast) => {
          const isSelected = podcast._id === selected._id;
          return (
            <li key={podcast._id}>
              <button
                type="button"
                onClick={() => select(podcast._id)}
                aria-current={isSelected ? "true" : undefined}
                className={`flex w-full cursor-pointer flex-col gap-1 rounded-[12px] text-left transition-opacity ${
                  isSelected ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
              >
                <SanityImage
                  image={podcast.image}
                  sizes="271px"
                  className={`h-[155px] w-full rounded-[12px] object-cover ${
                    isSelected ? "ring-2 ring-ink" : ""
                  }`}
                />
                <span className="flex w-full items-start justify-between gap-4 text-[12px] leading-[16.748px] font-bold italic">
                  <span>{t(podcast.title, lang)}</span>
                  {podcast.duration && <span className="shrink-0">{podcast.duration}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
