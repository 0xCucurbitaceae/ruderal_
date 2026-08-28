import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "../globals.css";
import { asLang, LANGS } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/sanity";
import { UI } from "@/i18n/ui";
import { Nav } from "@/components/Nav";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Footer } from "@/components/Footer";

// All routes live under /[lang], so this is the app's root layout.
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-instrument-sans",
});

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
    <html lang={lang} className={instrumentSans.variable}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only">
          {UI.skipToContent[lang]}
        </a>
        {/*
          This wrapper spans the whole page so the sticky nav has something to
          stick within — a wrapper only as tall as the nav would let it scroll
          straight off. The switch is absolutely placed on the nav's row and
          stays in the flow, so it scrolls away while the pill stays pinned.
          Its padding mirrors the pill's own box, which lines the two up.
        */}
        <div className="relative pt-5">
          <LanguageSwitch lang={lang} className="absolute top-5 right-6 z-40 py-3 [&>li]:py-2" />
          <Nav lang={lang} />
          <main id="main">{children}</main>
          <Footer settings={settings} lang={lang} />
        </div>
      </body>
    </html>
  );
}
