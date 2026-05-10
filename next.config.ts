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
      { hostname: 'img1.kakaocdn.net' },
      { hostname: 'phinf.pstatic.net' },
      { hostname: 'ssl.pstatic.net' },
    ],
  },
}

export default nextConfig
