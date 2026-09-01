import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    // Default (bottom-left) sits right on top of "Home" in the mobile
    // bottom nav, blocking taps. Dev-only, doesn't affect production.
    position: "top-right",
  },
};

export default nextConfig;
