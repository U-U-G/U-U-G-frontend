import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // ignoreBuildErrors: true,
  },
  turbopack: {},
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'k.kakaocdn.net' },
      { hostname: 'phinf.pstatic.net' },
    ],
  },
}

export default nextConfig
