import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  basePath: "/nhom09_glowicbeauty",       // ⚠️ sửa lại đúng tên repo
  assetPrefix: "/nhom09_glowicbeauty/",   // ⚠️ thêm dòng này
};

export default nextConfig;