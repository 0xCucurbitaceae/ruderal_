import Image from "next/image";
import navLeaf from "../../public/design/nav-leaf.png";

/**
 * The small leaf-and-label pill the design reuses for the breadcrumb and the
 * Subscribe button (Figma 0:1151 and 0:1175).
 */
export function LeafPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-[3.429px] py-2">
      <Image src={navLeaf} alt="" aria-hidden className="h-[25px] w-[39px] object-contain" unoptimized />
      <span className="text-[14px] font-bold italic tracking-[-0.28px]">{children}</span>
    </span>
  );
}
