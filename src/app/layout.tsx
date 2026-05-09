import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Providers from './providers'

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
