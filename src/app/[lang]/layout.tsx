import type { Metadata } from "next";
import "../globals.css";
import { asLang, LANGS } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/sanity";
import { UI } from "@/i18n/ui";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// All routes live under /[lang], so this is the app's root layout.
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata: Metadata = { title: "Ruderal" };

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = asLang(rawLang);
  const settings = await getSiteSettings();

  return (
    <html lang={lang}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only">
          {UI.skipToContent[lang]}
        </a>
        <main id="main">{children}</main>
        <Footer settings={settings} lang={lang} />
        <Nav lang={lang} />
      </body>
    </html>
  );
}
