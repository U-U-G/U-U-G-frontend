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
      {
        hostname: 'uug-profile-images.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
