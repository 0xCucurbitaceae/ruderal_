"use client";

import { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/i18n/ui";

/**
 * The heading block every section on the home page repeats
 * (Figma 0:219 Podcast, 0:34 Study groups, 0:256 Happenings).
 *
 * The title breaks across two lines mid-word, with each line after the first
 * indented. Lines are given explicitly rather than wrapped, since where a word
 * breaks is a decision per language, not something the layout should guess.
 *
 * The intro below it collapses: Figma 0:574 is the short state and 0:845 the
 * expanded one, toggled by "More".
 */
export function SectionHeader({
  lines,
  eyebrow,
  intro,
  lang,
}: {
  lines: readonly string[];
  eyebrow?: string;
  intro?: string;
  lang: Lang;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-panel flex w-full flex-col gap-6 rounded-r-[20px] px-6 pt-5 pb-[13px] lg:flex-row lg:items-center lg:gap-[60px] lg:px-20">
      <h2 className="flex w-full flex-col justify-center text-[52px] leading-[0.6875] font-bold italic tracking-[-1.92px] sm:text-[72px] lg:w-[390px] lg:shrink-0 lg:text-[96px]">
        {lines.map((line, i) => (
          // Each line after the first steps in, as the design staggers them.
          <span key={line} style={i > 0 ? { marginInlineStart: `${i * 1.25}em` } : undefined}>
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
        {intro && (
          <Collapsible.Root open={open} onOpenChange={setOpen}>
            {/* Closed, the paragraph is clipped to two lines rather than hidden,
                so the section still reads without expanding it. */}
            <p className={`text-[16px] leading-6 italic ${open ? "" : "line-clamp-2"}`}>{intro}</p>
            <Collapsible.Trigger className="cursor-pointer py-2 text-[16px] font-bold italic tracking-[-0.32px] underline">
              {open ? UI.less[lang] : UI.more[lang]}
            </Collapsible.Trigger>
          </Collapsible.Root>
        )}
      </div>
    </div>
  );
}
