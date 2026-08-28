import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: no server, deployable to any free static host.
  output: "export",
  // Export has no image optimizer; Sanity's CDN does the resizing instead.
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
