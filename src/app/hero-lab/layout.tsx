import { Instrument_Sans } from "next/font/google";
import "../globals.css";
import "dialkit/styles.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-instrument-sans",
});

/** The lab sits outside /[lang], which owns the site's root layout, so it needs its own. */
export default function HeroLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body>{children}</body>
    </html>
  );
}
