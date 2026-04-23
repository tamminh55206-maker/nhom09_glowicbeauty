import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // ← fix hết tất cả lỗi domain 1 lần
  },
  basePath: '/nhom09_glowicbeauty',
};

export default nextConfig;
