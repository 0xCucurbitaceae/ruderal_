"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { LANGS, type Lang } from "@/lib/i18n";
import { UI } from "@/i18n/ui";

import navLeaf from "../../public/design/nav-leaf.png";
import navGrass from "../../public/design/nav-grass.png";

/** Order, labels and icons come from the Figma nav (node 0:290). */
const items = (lang: Lang) => [
  { href: `/${lang}#podcasts`, label: UI.nav.podcasts[lang], icon: navLeaf },
  { href: `/${lang}#study-groups`, label: UI.nav.studyGroups[lang], icon: navGrass },
  { href: `/${lang}#happenings`, label: UI.nav.happenings[lang], icon: navLeaf },
  { href: `/${lang}/about`, label: UI.nav.about[lang], icon: navLeaf },
];

const LABEL = "font-bold italic text-[16px] tracking-[-0.32px] text-ink whitespace-nowrap";

function Item({ href, label, icon, onClick }: ReturnType<typeof items>[number] & { onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="flex items-center gap-[3.429px] py-2">
      <Image src={icon} alt="" aria-hidden className="h-[25px] w-[39px] object-contain" unoptimized />
      <span className={LABEL}>{label}</span>
    </Link>
  );
}

export function Nav({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const links = items(lang);

  return (
    <nav aria-label="Main" className="sticky top-5 z-50 flex justify-center px-4">
      <div className="flex items-center gap-2 rounded-[12px] bg-glass px-5 py-3 backdrop-blur-[12px] drop-shadow-[-2px_-2px_3px_rgba(0,0,0,0.05)] drop-shadow-[2px_2px_3px_rgba(0,0,0,0.05)]">
        <ul className="hidden items-start gap-2 md:flex">
          {links.map((item) => (
            <li key={item.href}>
              <Item {...item} />
            </li>
          ))}
        </ul>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className={`${LABEL} px-2 py-2 md:hidden`}>{UI.openMenu[lang]}</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
            <Dialog.Content className="fixed inset-x-4 top-4 z-50 rounded-[12px] bg-page p-6 shadow-lg">
              <Dialog.Title className={LABEL}>Ruderal</Dialog.Title>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((item) => (
                  <li key={item.href}>
                    <Item {...item} onClick={() => setOpen(false)} />
                  </li>
                ))}
              </ul>
              <Dialog.Close className={`${LABEL} mt-4`}>{UI.closeMenu[lang]}</Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <LanguageSwitch lang={lang} />
      </div>
    </nav>
  );
}

function LanguageSwitch({ lang }: { lang: Lang }) {
  return (
    <ul aria-label="Language" className="flex items-center gap-1 border-l border-rule pl-3">
      {LANGS.map((code) => (
        <li key={code}>
          {code === lang ? (
            <span aria-current="true" className={`${LABEL} opacity-40`}>
              {code.toUpperCase()}
            </span>
          ) : (
            <Link href={`/${code}`} hrefLang={code} className={LABEL}>
              {code.toUpperCase()}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
