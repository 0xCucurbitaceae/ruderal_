import { t, type Lang } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/sanity";

export function Footer({ settings, lang }: { settings: SiteSettings | null; lang: Lang }) {
  const blurb = t(settings?.footerBlurb, lang);
  return (
    <footer>
      <h2>{settings?.siteName ?? "Ruderal"}</h2>
      {blurb && <p>{blurb}</p>}
      {settings?.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
      {settings?.instagramUrl && (
        <a href={settings.instagramUrl} rel="me noreferrer" target="_blank">
          Instagram
        </a>
      )}
    </footer>
  );
}
