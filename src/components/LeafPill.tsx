import { PlantIcon } from "./PlantIcon";

/**
 * The small plant-and-label pill the design reuses for the breadcrumb and the
 * Subscribe button (Figma 0:1151 and 0:1175).
 */
export function LeafPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-[3.429px] py-2">
      <PlantIcon name="studyGroups" />
      <span className="text-[14px] font-bold italic tracking-[-0.28px]">{children}</span>
    </span>
  );
}
