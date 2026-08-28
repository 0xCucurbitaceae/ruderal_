import Link from "next/link";
import { LANGS, type Lang } from "@/lib/i18n";

/** Sits opposite the wordmark in the header, and again in the footer. */
export function LanguageSwitch({ lang, className = "" }: { lang: Lang; className?: string }) {
  return (
    <ul aria-label="Language" className={`flex items-center gap-2 ${className}`}>
      {LANGS.map((code) => (
        <li key={code}>
          {code === lang ? (
            <span aria-current="true" className="text-[16px] font-bold italic tracking-[-0.32px] opacity-40">
              {code.toUpperCase()}
            </span>
          ) : (
            <Link
              href={`/${code}`}
              hrefLang={code}
              className="text-[16px] font-bold italic tracking-[-0.32px] underline"
            >
              {code.toUpperCase()}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
