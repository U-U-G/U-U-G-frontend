import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'
import Providers from './providers'
import MobileBlockScreen from '@/components/common/mobile/MobileBlockScreen'

const pretendard = localFont({
  src: [
    {
      path: '../fonts/subset/Pretendard-Medium.subset.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/subset/Pretendard-SemiBold.subset.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/subset/Pretendard-Bold.subset.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/subset/Pretendard-ExtraBold.subset.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: {
    template: '%s | UUG',
    default: 'UUG',
  },
  description:
    'AI 기반 면접 연습 플랫폼 음어그. 실전처럼 연습하고 분석 받아보세요.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <MobileBlockScreen />
        <Providers>{children}</Providers>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){
              dataLayer.push(arguments);
            }
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
