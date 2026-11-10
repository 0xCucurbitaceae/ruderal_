import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/i18n/ui";
import { PlantIcon, type PlantName } from "./PlantIcon";

/** Order, labels and icons come from the Figma nav (0:290 desktop, 15:207 mobile). */
const items = (lang: Lang) =>
  [
    { href: `/${lang}#podcasts`, label: UI.nav.podcasts[lang], icon: "podcasts" },
    { href: `/${lang}#study-groups`, label: UI.nav.studyGroups[lang], icon: "studyGroups" },
    { href: `/${lang}#happenings`, label: UI.nav.happenings[lang], icon: "happenings" },
    { href: `/${lang}/about`, label: UI.nav.about[lang], icon: "about" },
  ] as const satisfies readonly { href: string; label: string; icon: PlantName }[];

/**
 * One nav at both sizes. The design stacks the icon above the label on mobile
 * and puts them side by side on
 * desktop — a layout change at the breakpoint, not a second component.
 *
 * The bar spans the full width so the pill can centre in it, but only the pill
 * itself is there to be clicked — otherwise the invisible half of the bar
 * swallows clicks meant for whatever shares its row, the language switch first
 * of all.
 *
 * The "Ruderal" home button rides in the same sticky bar so it stays pinned
 * too. From lg up it sits at the left edge of the pill's row, mirroring the
 * language switch on the right; narrower, the centred pill would overlap it, so
 * the button takes its own row above the pill, opposite the language switch.
 */
export function Nav({ lang }: { lang: Lang }) {
  return (
    <nav
      aria-label="Main"
      className="pointer-events-none sticky top-5 z-50 flex flex-col items-start gap-2 px-4 lg:flex-row lg:justify-center"
    >
      <Link
        href={`/${lang}`}
        className="glass-panel pointer-events-auto rounded-[12px] px-5 py-3 lg:absolute lg:top-0 lg:left-6"
      >
        <span className="block py-2 text-[16px] leading-6 font-bold tracking-[-0.32px]">Ruderal</span>
      </Link>
      <ul className="glass-panel pointer-events-auto flex w-full self-center max-w-[430px] items-start justify-between rounded-[12px] px-2 py-3 md:w-auto md:max-w-none md:gap-2 md:px-5">
        {items(lang).map(({ href, label, icon }) => (
          <li key={href} className="min-w-0 flex-1 md:w-auto md:flex-none">
            <Link
              href={href}
              className="flex flex-col items-center justify-center gap-[3.429px] py-2 md:flex-row md:items-center"
            >
              <PlantIcon name={icon} />
              <span className="text-[14px] font-bold tracking-[-0.32px] whitespace-nowrap sm:text-[16px]">
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
