import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/i18n/ui";
import { PlantIcon } from "./PlantIcon";

/** Order, labels and icons come from the Figma nav (0:290 desktop, 15:207 mobile). */
const items = (lang: Lang) =>
  [
    { href: `/${lang}#podcasts`, label: UI.nav.podcasts[lang], icon: "fern" },
    { href: `/${lang}#study-groups`, label: UI.nav.studyGroups[lang], icon: "dandelion" },
    { href: `/${lang}#happenings`, label: UI.nav.happenings[lang], icon: "fern" },
    { href: `/${lang}/about`, label: UI.nav.about[lang], icon: "fern" },
  ] as const;

/**
 * One nav at both sizes. The design stacks the icon above the label on mobile
 * and sets the label upright there, then puts them side by side in italic on
 * desktop — a layout change at the breakpoint, not a second component.
 */
export function Nav({ lang }: { lang: Lang }) {
  return (
    <nav aria-label="Main" className="sticky top-5 z-50 flex justify-center px-4">
      <ul className="glass-panel flex w-full max-w-[430px] items-start justify-between rounded-[12px] px-2 py-3 md:w-auto md:max-w-none md:gap-2 md:px-5">
        {items(lang).map(({ href, label, icon }) => (
          <li key={href} className="min-w-0 flex-1 md:w-auto md:flex-none">
            <Link
              href={href}
              className="flex flex-col items-center justify-center gap-[3.429px] py-2 md:flex-row md:items-center"
            >
              <PlantIcon variant={icon} />
              <span className="text-[14px] font-bold tracking-[-0.32px] whitespace-nowrap sm:text-[16px] md:italic">
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
