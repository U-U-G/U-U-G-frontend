'use client'

import { useState } from 'react'
import Button from '@/components/common/button/Button'
import EmailSection from '@/components/auth/signup/EmailSection'
import ResetPasswordSection from '@/components/auth/resetPassword/ResetPasswordSection'

export default function ResetPasswordPage() {
  const [emailVerified, setEmailVerified] = useState(false)
  const [newPasswordVerified, setNewPasswordVerified] = useState(false)

  const canSubmit = emailVerified && newPasswordVerified

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!canSubmit) return

    console.log('비밀번호 재설정 완료') //TODO: 비밀번호 재설정 API 연동
  }

  return (
    <main className="min-h-screen py-12 flex flex-col justify-center">
      <div className="mx-auto flex w-full max-w-[410px] flex-col justify-center">
        <div className="pb-3.75 mb-13.5 border-b border-gray5">
          <h1 className="text-xl font-bold">비밀번호 재설정</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <EmailSection onEmailVerified={setEmailVerified} />
          <ResetPasswordSection onPasswordValid={setNewPasswordVerified} />
          <Button
            type="submit"
            variant={canSubmit ? 'primary' : 'secondary'}
            disabled={!canSubmit}
            className="w-full"
          >
            변경 완료
          </Button>
        </form>
      </div>
    </main>
  )
}
