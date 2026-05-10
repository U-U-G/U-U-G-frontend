'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import Button from '@/components/common/button/Button'
import ResetPasswordSection from '@/components/auth/resetPassword/ResetPasswordSection'
import { resetPasswordApi } from '@/apis/auth'
import type { ResetPasswordRequest } from '@/apis/auth/type'

type ResetPasswordForm = Omit<ResetPasswordRequest, 'token'>

function ExpiredLinkFallback() {
  return (
    <main className="min-h-screen py-12 flex flex-col justify-center">
      <div className="mx-auto flex w-full max-w-102.5 flex-col justify-center gap-6">
        <div className="pb-3.75 mb-13.5 border-b border-gray-4">
          <h1 className="h4">비밀번호 재설정</h1>
        </div>
        <p className="p5 text-error">
          만료된 링크입니다. 비밀번호 재설정을 다시 요청해주세요.
        </p>
        <Link href="/forgot-password">
          <Button variant="primary" className="w-full">
            재설정 메일 다시 받기
          </Button>
        </Link>
      </div>
    </main>
  )
}

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')?.trim() ?? ''

  const [newPasswordVerified, setNewPasswordVerified] = useState(false)
  const [passwordForm, setPasswordForm] = useState<ResetPasswordForm>({
    newPassword: '',
    confirmPassword: '',
  })
  const [isTokenExpired, setIsTokenExpired] = useState(false)

  const resetMutation = useMutation({
    mutationFn: resetPasswordApi.resetPassword,
    onSuccess: () => {
      router.replace('/login')
    },
    onError: () => {
      setIsTokenExpired(true)
    },
  })

  const canSubmit =
    Boolean(token) && newPasswordVerified && !resetMutation.isPending

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    resetMutation.mutate({
      token,
      ...passwordForm,
    })
  }

  if (!token || isTokenExpired) {
    return <ExpiredLinkFallback />
  }

  return (
    <main className="min-h-screen py-12 flex flex-col justify-center">
      <div className="mx-auto flex w-full max-w-102.5 flex-col justify-center">
        <div className="pb-3.75 mb-13.5 border-b border-gray-4">
          <h1 className="h4">비밀번호 재설정</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <ResetPasswordSection
            onPasswordValid={setNewPasswordVerified}
            onPasswordChange={setPasswordForm}
          />
          <Button
            type="submit"
            variant={canSubmit ? 'primary' : 'secondary'}
            disabled={!canSubmit}
            className="w-full"
          >
            {resetMutation.isPending ? '변경 중' : '변경 완료'}
          </Button>
        </form>
      </div>
    </main>
  )
}
