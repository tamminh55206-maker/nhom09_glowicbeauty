import type { NextConfig } from 'next';

const repoName = 'nhom09_glowicbeauty';   // ← THAY BẰNG TÊN REPO THẬT CỦA BẠN (chữ thường)

const nextConfig: NextConfig = {
  output: 'export',                    // Bắt buộc để xuất file tĩnh
  images: {
    unoptimized: true,                 // Bắt buộc khi dùng next/image với GitHub Pages
  },
  basePath: `/${repoName}`,            // Rất quan trọng
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,                 // Khuyến khích
};

export default nextConfig;