import type { NextConfig } from "next";

const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://webapp-643m.onrender.com"
    : "http://localhost:8000";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [new URL("https://upload.wikimedia.org/wikipedia/**")],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
