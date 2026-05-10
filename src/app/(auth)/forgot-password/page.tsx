'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { checkEmail, resetPasswordApi } from '@/apis/auth'
import { EMAIL_REGEX } from '@/constants/regex'
import HelperText from '@/components/common/text/HelperText'
import Button from '@/components/common/button/Button'
import InputBox from '@/components/common/input/InputBox'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [mailSent, setMailSent] = useState(false)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)

  const [registeredError, setRegisteredError] = useState(false)

  const isValidEmail = EMAIL_REGEX.test(email)
  const showEmailError = touched && email.length > 0 && !isValidEmail

  const fieldError = showEmailError || registeredError

  const forgotPasswordMutation = useMutation({
    mutationFn: resetPasswordApi.forgotPassword,
    onSuccess: () => {
      setMailSent(true)
    },
    onError: (error) => {
      console.error('메일 전송 실패', error)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setTouched(true)
    setRegisteredError(false)

    if (
      !isValidEmail ||
      mailSent ||
      forgotPasswordMutation.isPending ||
      isCheckingEmail
    ) {
      return
    }

    setIsCheckingEmail(true)
    try {
      await checkEmail(email)
      setRegisteredError(true)
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 409) {
        forgotPasswordMutation.mutate({ email })
      } else {
        console.error('이메일 확인 실패', error)
      }
    } finally {
      setIsCheckingEmail(false)
    }
  }

  const isButtonDisabled =
    !isValidEmail ||
    mailSent ||
    forgotPasswordMutation.isPending ||
    isCheckingEmail

  return (
    <main className="min-h-screen py-12 flex flex-col justify-center">
      <div className="mx-auto flex w-full max-w-[410px] flex-col justify-center">
        <div className="pb-3.75 mb-13.5 border-b border-gray-4">
          <h1 className="h4">비밀번호 재설정</h1>
        </div>

        <div className="mb-5 p5">
          <p>기존 가입 이메일을 입력해주세요</p>
          <p>비밀번호 재설정 메일을 보내드립니다</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-45">
          <div className="flex flex-col gap-2">
            <InputBox
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setTouched(true)
                setRegisteredError(false)
              }}
              placeholder="이메일을 입력하세요"
              status={fieldError ? 'error' : 'default'}
              disabled={mailSent}
            />
            <HelperText status={fieldError ? 'error' : 'default'}>
              {showEmailError
                ? '올바른 이메일 주소를 입력해주세요.'
                : registeredError
                  ? '가입되지 않은 이메일입니다.'
                  : '\u00A0'}
            </HelperText>
          </div>

          <Button
            type="submit"
            variant={isButtonDisabled ? 'secondary' : 'primary'}
            disabled={isButtonDisabled}
            className="w-full"
          >
            {isCheckingEmail
              ? '확인 중...'
              : forgotPasswordMutation.isPending
                ? '전송 중...'
                : mailSent
                  ? '전송 완료'
                  : '메일 전송'}
          </Button>
        </form>
      </div>
    </main>
  )
}
