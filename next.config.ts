import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "carslan.vn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "product.hstatic.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.hstatic.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "down-vn.img.susercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mint07.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.beautyfulls.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.lorealparis.com.vn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.maybelline.vn",
        pathname: "/**",
      },
    ],
  },
  basePath: isProd ? "/nhom09_glowicbeauty" : "",
  assetPrefix: isProd ? "/nhom09_glowicbeauty" : "",
};

export default nextConfig;
