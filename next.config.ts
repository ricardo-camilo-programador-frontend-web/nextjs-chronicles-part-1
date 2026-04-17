import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: [
      'd2seqvvyy3b8p2.cloudfront.net',
      'bs.plantnet.org'
    ],
  },
};

export default withNextIntl(nextConfig);
