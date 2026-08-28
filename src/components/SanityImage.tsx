import { urlFor, type SanityImageRef } from "@/lib/sanity";

const WIDTHS = [400, 640, 828, 1200, 1600];

/**
 * Static export has no image optimizer, so responsive sources come straight
 * from Sanity's CDN rather than from next/image.
 */
export function SanityImage({
  image,
  sizes = "100vw",
  className,
  priority = false,
}: {
  image?: SanityImageRef | null;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  if (!image?.asset) return null;
  return (
    // Static export has no image optimizer; Sanity's CDN builds the srcSet.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={urlFor(image).width(1200).url()}
      srcSet={WIDTHS.map((w) => `${urlFor(image).width(w).url()} ${w}w`).join(", ")}
      sizes={sizes}
      alt={image.alt ?? ""}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
