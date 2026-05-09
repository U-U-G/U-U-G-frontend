import type { Metadata } from 'next'
import SignUpForm from '@/components/auth/signup/SignUpForm'

export const metadata: Metadata = {
  title: '회원가입',
  description: '음어그 회원가입 후 AI 면접 연습을 시작하세요.',
}

export default function SignUpPage() {
  return (
    <main className="min-w-102.5 mx-auto py-12">
      <div className="pb-3.75 mb-13.5 border-b border-gray5">
        <h1 className="h4">회원가입</h1>
      </div>
      <SignUpForm />
    </main>
  )
}
