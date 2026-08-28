import Image from "next/image";

import wordmark from "../../public/design/wordmark.png";
import heroGrowth from "../../public/design/hero-growth.png";

/**
 * Figma 0:32. Positions are percentages of the design's 1280×694 hero block,
 * measured off the full-resolution render, so the composition holds at any
 * width. The artwork deliberately runs past the block into the section below,
 * as it does in the design, so nothing here clips.
 */
export function Hero({ siteName }: { siteName: string }) {
  return (
    <header className="relative z-10 aspect-[1280/694] w-full">
      <h1 className="absolute top-[24.5%] left-[13.1%] w-[73.7%]">
        <Image src={wordmark} alt={siteName} priority className="w-full" />
      </h1>

      <Image
        src={heroGrowth}
        alt=""
        aria-hidden
        priority
        className="hero-grow pointer-events-none absolute top-[10.4%] left-[43.75%] w-[57.8%] max-w-none origin-[61%_49%] select-none"
      />
    </header>
  );
}
