import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @param {string} phase @returns {import('next').NextConfig} */
export default function nextConfig(phase) {
  const development = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    // Production stays a static export. Dev needs explicit directory-index routes
    // for standalone public pages that the production web server serves directly.
    ...(development ? {} : { output: "export" }),
    distDir: development ? ".next-dev" : ".next",
    trailingSlash: true,
    images: { unoptimized: true },
    ...(development
      ? {
          async rewrites() {
            return [
              {
                source: "/research/cash-timing/",
                destination: "/research/cash-timing/index.html",
              },
            ];
          },
        }
      : {}),
  };
}
