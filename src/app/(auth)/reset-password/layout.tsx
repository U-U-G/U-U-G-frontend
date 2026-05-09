import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '비밀번호 재설정',
  description: '새로운 비밀번호를 설정하여 계정 보안을 강화하세요.',
}

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
