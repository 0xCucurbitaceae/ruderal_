import { Hero } from "@/components/Hero";
import { HeroLab } from "@/components/HeroLab";

export const metadata = { title: "Hero lab" };

/** The real hero, wrapped in the dial panel that overrides its timings. */
export default function HeroLabPage() {
  return (
    <HeroLab>
      <Hero siteName="Ruderal" />
    </HeroLab>
  );
}
