import { MetadataRoute } from 'next'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://u-u-g-frontend.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/login',
        '/sign-up',
        '/forgot-password',
        '/reset-password',
        '/oauth2',
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
