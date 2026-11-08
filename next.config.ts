import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: '/projects/**', search: '' }],
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
      ],
    }];
  },
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/experience', destination: '/#experience', permanent: true },
      { source: '/projects', destination: '/#projects', permanent: true },
      { source: '/articles', destination: '/#articles', permanent: true },
      { source: '/blog', destination: '/#articles', permanent: true },
    ];
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
