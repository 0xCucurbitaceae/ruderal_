import Image from "next/image";

import wordmark from "../../public/design/wordmark.png";

/**
 * Figma 0:32. Positions are percentages of the design's 1280×694 hero block,
 * measured off the full-resolution render, so the composition holds at any
 * width. The artwork deliberately runs past the block into the section below,
 * as it does in the design, so nothing here clips.
 *
 * The cracks and the plants are separate layers rather than one flat image, so
 * the cracks can draw themselves outward on load and each plant can then sprout
 * where its crack ends. Their placements were measured from the original flat
 * composite by locating each plant's coloured extent, so the reassembled
 * artwork lines up with the design exactly.
 */
const PLANTS = [
  { name: "podcasts", left: "48.04%", top: "40.01%", width: "29.86%" },
  { name: "happenings", left: "76.85%", top: "61.60%", width: "10.72%" },
  { name: "studygroup", left: "29.42%", top: "73.54%", width: "18.67%" },
  { name: "about", left: "84.77%", top: "12.85%", width: "15.02%" },
] as const;

export function Hero({ siteName }: { siteName: string }) {
  return (
    <header className="relative z-10 aspect-[1280/694] w-full">
      <h1 className="absolute top-[24.5%] left-[13.1%] w-[73.7%]">
        <Image src={wordmark} alt={siteName} priority className="w-full" />
      </h1>

      {/* The scroll-driven grow owns this wrapper's transform; the layers
          inside animate mask and opacity, so the two never collide. */}
      <div
        aria-hidden
        className="hero-art pointer-events-none absolute top-[10.4%] left-[43.75%] aspect-[1441/1425] w-[57.8%] origin-[61%_49%] select-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/design/hero-cracks.svg" alt="" className="hero-cracks absolute inset-0 size-full" />
        {PLANTS.map((plant, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={plant.name}
            src={`/design/hero-plant-${plant.name}.png`}
            alt=""
            className="hero-plant absolute"
            style={{ left: plant.left, top: plant.top, width: plant.width, "--i": i } as React.CSSProperties}
          />
        ))}
      </div>
    </header>
  );
}
