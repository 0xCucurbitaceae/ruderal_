"use client";

import { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/i18n/ui";

/**
 * The home intro has a short and a full variant in the design
 * (frames 0:574 and 0:845), toggled by the "More" control.
 */
export function ExpandableIntro({
  short,
  full,
  lang,
}: {
  short?: string;
  full?: string;
  lang: Lang;
}) {
  const [open, setOpen] = useState(false);
  if (!short) return null;
  if (!full || full === short) return <p>{short}</p>;

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <p>{open ? full : short}</p>
      <Collapsible.Trigger>{UI.more[lang]}</Collapsible.Trigger>
      {/* Keeps the full text in the DOM for search engines and screen readers. */}
      <Collapsible.Content className="sr-only">{full}</Collapsible.Content>
    </Collapsible.Root>
  );
}
