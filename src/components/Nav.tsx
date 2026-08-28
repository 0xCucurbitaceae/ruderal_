import Image from "next/image";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/i18n/ui";

import navLeaf from "../../public/design/nav-leaf.png";
import navGrass from "../../public/design/nav-grass.png";

/** Order, labels and icons come from the Figma nav (0:290 desktop, 15:207 mobile). */
const items = (lang: Lang) => [
  { href: `/${lang}#podcasts`, label: UI.nav.podcasts[lang], icon: navLeaf },
  { href: `/${lang}#study-groups`, label: UI.nav.studyGroups[lang], icon: navGrass },
  { href: `/${lang}#happenings`, label: UI.nav.happenings[lang], icon: navLeaf },
  { href: `/${lang}/about`, label: UI.nav.about[lang], icon: navLeaf },
];

/**
 * One nav at both sizes. The design stacks the icon above the label on mobile
 * and sets the label upright there, then puts them side by side in italic on
 * desktop — so this is a layout change, not a separate menu.
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
              <Image
                src={icon}
                alt=""
                aria-hidden
                className="h-[25px] w-[39px] shrink-0 object-contain"
                unoptimized
              />
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
