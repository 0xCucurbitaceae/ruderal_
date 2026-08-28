/**
 * The four plant thumbnails in the nav — one per destination (Figma 0:290:
 * 0:292, 0:295, 15:221, 16:231).
 *
 * Figma's node export bakes the page colour in behind the plant, so these use
 * the transparent source photographs and reproduce each node's crop with the
 * percentages Figma reports. Every crop differs, hence the table.
 */
const PLANTS = {
  podcasts: {
    src: "/design/plant-fern.png",
    box: "h-[25.26px] w-[39.469px]",
    wrapper: "-scale-x-100",
    img: "top-[-190.32%] left-[-43.67%] h-[395.56%] w-[190.18%]",
  },
  studyGroups: {
    src: "/design/plant-dandelion.png",
    box: "h-[42px] w-[24px]",
    wrapper: "-rotate-90",
    img: "top-[-4.86%] left-[-5%] h-[107.1%] w-[139.9%]",
  },
  happenings: {
    src: "/design/plant-lavender.png",
    box: "h-[24px] w-[42px]",
    wrapper: "",
    img: "top-[-24.48%] left-[-14.44%] h-[269.06%] w-[123.12%]",
  },
  about: {
    src: "/design/plant-sage.png",
    box: "h-[42px] w-[24px]",
    wrapper: "-scale-y-100 rotate-90",
    img: "top-[-31.29%] left-[-28.57%] h-[144.71%] w-[166.73%]",
  },
} as const;

export type PlantName = keyof typeof PLANTS;

export function PlantIcon({ name }: { name: PlantName }) {
  const plant = PLANTS[name];
  return (
    // Every icon occupies the same 42x24 slot; the inner box is what rotates.
    <span aria-hidden className="flex h-[24px] w-[42px] shrink-0 items-center justify-center">
      <span className={`relative block overflow-hidden ${plant.box} ${plant.wrapper}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={plant.src} alt="" className={`absolute max-w-none ${plant.img}`} />
      </span>
    </span>
  );
}
