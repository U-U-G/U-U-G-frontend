'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import Button from '@/components/common/button/Button'
import ResetPasswordSection from '@/components/auth/resetPassword/ResetPasswordSection'
import { resetPasswordApi } from '@/apis/auth'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')?.trim() ?? ''

  const [newPasswordVerified, setNewPasswordVerified] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: '',
  })

  const resetMutation = useMutation({
    mutationFn: resetPasswordApi.resetPassword,
    onSuccess: () => {
      router.replace('/login')
    },
    onError: (error) => {
      console.error('비밀번호 재설정 실패', error)
    },
  })

  const canSubmit =
    Boolean(token) && newPasswordVerified && !resetMutation.isPending

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    resetMutation.mutate({
      token,
      newPassword: passwordForm.newPassword,
      confirmPassword: passwordForm.confirmPassword,
    })
  }

  if (!token) {
    return (
      <main className="p-6">유효하지 않은 링크입니다. 다시 요청해주세요.</main>
    )
  }

  return (
    <main className="min-h-screen py-12 flex flex-col justify-center">
      <div className="mx-auto flex w-full max-w-[410px] flex-col justify-center">
        <div className="pb-3.75 mb-13.5 border-b border-gray-4">
          <h1 className="h4">비밀번호 재설정</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <ResetPasswordSection onPasswordValid={setNewPasswordVerified} />
          <Button
            type="submit"
            variant={canSubmit ? 'primary' : 'secondary'}
            disabled={!canSubmit}
            className="w-full"
          >
            {resetMutation.isPending ? '변경 중...' : '변경 완료'}
          </Button>
        </form>
      </div>
    </main>
  )
}
