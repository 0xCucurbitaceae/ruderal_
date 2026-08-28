"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { LANGS, type Lang } from "@/lib/i18n";
import { UI } from "@/i18n/ui";

/** Order and labels come from the Figma nav (node 0:290). */
const items = (lang: Lang) => [
  { href: `/${lang}#podcasts`, label: UI.nav.podcasts[lang] },
  { href: `/${lang}#study-groups`, label: UI.nav.studyGroups[lang] },
  { href: `/${lang}#happenings`, label: UI.nav.happenings[lang] },
  { href: `/${lang}/about`, label: UI.nav.about[lang] },
];

export function Nav({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const links = items(lang);

  return (
    <nav aria-label="Main">
      {/* Desktop: the floating pill from the design. */}
      <ul className="hidden lg:flex">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>

      {/* Mobile: the same links inside a sheet. */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger className="lg:hidden">{UI.openMenu[lang]}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content aria-label={UI.nav.about[lang]}>
            <Dialog.Title className="sr-only">Ruderal</Dialog.Title>
            <ul>
              {links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Dialog.Close>{UI.closeMenu[lang]}</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <LanguageSwitch lang={lang} />
    </nav>
  );
}

function LanguageSwitch({ lang }: { lang: Lang }) {
  return (
    <ul aria-label="Language">
      {LANGS.map((code) => (
        <li key={code}>
          {code === lang ? (
            <span aria-current="true">{code.toUpperCase()}</span>
          ) : (
            <Link href={`/${code}`} hrefLang={code}>
              {code.toUpperCase()}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
