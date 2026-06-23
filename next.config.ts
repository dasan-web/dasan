import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  allowedDevOrigins: [
    'procreate-elk-nibble.ngrok-free.dev',
    '*.ngrok-free.dev',
    'localhost:3000',
    'localhost:3001'
  ]
};

export default nextConfig;
