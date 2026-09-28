import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  compress: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*\\.(?:png|jpg|jpeg|webp|avif|mp4|webm|svg|ico|woff2))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  allowedDevOrigins: [
    'procreate-elk-nibble.ngrok-free.dev',
    '*.ngrok-free.dev',
    'localhost:3000',
    'localhost:3001',
    'localhost',
    '127.0.0.1',
    '127.0.0.1:3000',
    '192.168.20.48',
    '192.168.20.48:3000',
    '192.168.20.48:3001',
    '192.168.20.17:3000',
    '192.168.20.17:3001',
    '192.168.20.17'
  ],
  async rewrites() {
    return [
      {
        source: '/20260818.html',
        destination: '/',
      },
      {
        source: '/20260818.htm',
        destination: '/',
      },
      {
        source: '/2026-08-18.html',
        destination: '/',
      },
      {
        source: '/2026-08-18.htm',
        destination: '/',
      },
    ];
  },
};

export default nextConfig;
