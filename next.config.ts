import type { NextConfig } from "next";

// The normal build keeps the server API. GitHub Pages uses a static demo build.
const staticExport = process.env.NEXT_EXPORT === "true";
const repositoryBasePath = "/NEXUS-AI";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(staticExport
    ? {
        output: "export",
        basePath: repositoryBasePath,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
