/**
 * The plant thumbnails in the nav (Figma 0:292 and 0:295).
 *
 * Figma's own node export bakes the page colour in behind the plant, so these
 * use the transparent source photographs and reproduce Figma's crop with the
 * same percentages it reports.
 */
export function PlantIcon({ variant }: { variant: "fern" | "dandelion" }) {
  if (variant === "dandelion") {
    return (
      <span aria-hidden className="flex h-[24px] w-[42px] shrink-0 items-center justify-center">
        <span className="relative block h-[42px] w-[24px] -rotate-90 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/design/plant-dandelion.png"
            alt=""
            className="absolute top-[-4.86%] left-[-5%] h-[107.1%] w-[139.9%] max-w-none"
          />
        </span>
      </span>
    );
  }

  return (
    <span aria-hidden className="relative block h-[25.26px] w-[39.469px] shrink-0 -scale-x-100 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/design/plant-fern.png"
        alt=""
        className="absolute top-[-190.32%] left-[-43.67%] h-[395.56%] w-[190.18%] max-w-none"
      />
    </span>
  );
}
