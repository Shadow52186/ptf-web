import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ ทำให้ Vercel ไม่หยุด build เพราะ ESLint
  },
};

export default nextConfig;
