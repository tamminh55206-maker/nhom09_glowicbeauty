import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/nhom09_glowicbeauty" : "",
  assetPrefix: isProd ? "/nhom09_glowicbeauty" : "",
  // Ensure Turbopack resolves the correct nested project root in this workspace.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
