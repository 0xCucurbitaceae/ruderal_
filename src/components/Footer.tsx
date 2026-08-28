import Link from "next/link";
import { t, type Lang } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/sanity";
import { UI } from "@/i18n/ui";

/** Figma node 0:281. */
export function Footer({ settings, lang }: { settings: SiteSettings | null; lang: Lang }) {
  const blurb = t(settings?.footerBlurb, lang);

  return (
    <footer className="mt-20 rounded-t-[20px] bg-glass px-6 pt-5 pb-[13px] backdrop-blur-[12px] sm:px-[60px]">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
        <div className="flex w-full max-w-[351px] flex-col gap-1 py-2">
          <p className="text-[32px] font-bold italic tracking-[-0.64px]">
            {settings?.siteName ?? "Ruderal"}
          </p>
          {blurb && <p className="text-[16px] italic leading-6">{blurb}</p>}
          <Link
            href={`/${lang}/about`}
            className="py-2 text-[16px] font-bold italic tracking-[-0.32px] underline"
          >
            {UI.nav.about[lang]}
          </Link>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 py-2 sm:h-[98.429px] sm:gap-0">
          {settings?.email && (
            <a
              href={`mailto:${settings.email}`}
              className="text-[22px] font-bold italic tracking-[-0.64px] break-all sm:text-[32px]"
            >
              {settings.email}
            </a>
          )}
          {settings?.instagramUrl && (
            <a href={settings.instagramUrl} rel="me noreferrer" target="_blank" aria-label="Instagram">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/design/instagram.svg" alt="" aria-hidden className="size-10" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
