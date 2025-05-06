import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";

// Create your next-intl plugin instance
const withNextIntl = createNextIntlPlugin();

// Configure the bundle analyzer plugin – typically enabling it conditionally
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.spark-dev-studio.com", 
        pathname: "/storage/**",
      },
    ],
  },
  reactStrictMode: true,
  trailingSlash: true,
  // ...other options
};

// Compose the plugins by wrapping your config
export default bundleAnalyzer(withNextIntl(nextConfig));
