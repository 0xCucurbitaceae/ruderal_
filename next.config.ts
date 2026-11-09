import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: no server, deployable to any free static host.
  output: "export",
  // Export has no image optimizer; Sanity's CDN does the resizing instead.
  images: { unoptimized: true },
  trailingSlash: true,
  // Static export ignores redirects; in production vercel.json sends / to /en.
  // `next dev` doesn't read vercel.json, so mirror that redirect here for local.
  ...(process.env.NODE_ENV === "development" && {
    redirects: async () => [
      { source: "/", destination: "/en", permanent: false },
    ],
  }),
};

export default nextConfig;
