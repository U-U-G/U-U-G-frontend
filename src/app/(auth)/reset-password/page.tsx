'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import Button from '@/components/common/button/Button'
import ResetPasswordSection from '@/components/auth/resetPassword/ResetPasswordSection'
import { isAxiosError } from 'axios'
import { resetPasswordApi } from '@/apis/auth'
import type { ResetPasswordRequest } from '@/apis/auth/type'

type ResetPasswordForm = Omit<ResetPasswordRequest, 'token'>

function ExpiredLinkFallback() {
  return (
    <main className="min-h-screen py-12 flex flex-col justify-center">
      <div className="mx-auto flex w-full max-w-102.5 flex-col justify-center">
        <div className="pb-3.75 mb-13.5 border-b border-gray-4">
          <h1 className="h4">비밀번호 재설정</h1>
        </div>
        <div className="flex flex-col gap-6">
          <p className="p5 text-error">
            만료된 링크입니다. 비밀번호 재설정을 다시 요청해주세요.
          </p>
          <Link href="/forgot-password">
            <Button variant="primary" className="w-full">
              재설정 메일 다시 받기
            </Button>
          </Link>
        </div>
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const resetMutation = useMutation({
    mutationFn: resetPasswordApi.resetPassword,
    onSuccess: () => {
      router.replace('/login')
    },
    onError: (error) => {
      console.error('비밀번호 재설정 실패', error)
      const message =
        isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : '비밀번호 재설정에 실패했습니다.'
      setErrorMessage(message)
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

  if (!token) {
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
          {errorMessage && (
            <p className="p5 text-error">{errorMessage}</p>
          )}
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
