import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '비밀번호 찾기',
  description: '가입한 이메일로 비밀번호를 재설정하세요.',
}

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
