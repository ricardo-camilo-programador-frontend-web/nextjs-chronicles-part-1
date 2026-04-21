import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'd2seqvvyy3b8p2.cloudfront.net' },
      { protocol: 'https', hostname: 'bs.plantnet.org' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'lucide-react', 'sonner'],
  },
};

export default withNextIntl(nextConfig);
