import type { ReactNode } from "react";

/**
 * The heading block every section on the home page repeats
 * (Figma 0:219 Podcast, 0:34 Study groups, 0:256 Happenings): an oversized
 * italic title on the left, an intro column on the right.
 *
 * The design breaks the title across two lines mid-word and, for Happenings,
 * pushes the second line to the right edge of the heading column. Lines are
 * given explicitly rather than wrapped, since where a word breaks is a
 * decision per language, not something the layout should guess.
 */
export function SectionHeader({
  lines,
  eyebrow,
  intro,
  alignLastLineRight = false,
}: {
  lines: readonly string[];
  eyebrow?: string;
  intro?: ReactNode;
  alignLastLineRight?: boolean;
}) {
  return (
    <div className="glass-panel flex w-full flex-col gap-6 rounded-r-[20px] px-6 pt-5 pb-[13px] lg:flex-row lg:items-center lg:gap-[60px] lg:px-20">
      <h2 className="flex w-full flex-col justify-center text-[52px] leading-[0.6875] font-bold italic tracking-[-1.92px] sm:text-[72px] lg:w-[390px] lg:shrink-0 lg:text-[96px]">
        {lines.map((line, i) => (
          <span
            key={line}
            className={alignLastLineRight && i === lines.length - 1 ? "text-right" : undefined}
          >
            {line}
          </span>
        ))}
      </h2>
      <div className="flex min-w-0 flex-1 flex-col">
        {eyebrow && (
          <p className="max-w-[650px] py-2 text-[20px] leading-tight font-bold italic tracking-[-0.4px]">
            {eyebrow}
          </p>
        )}
        {intro}
      </div>
    </div>
  );
}
