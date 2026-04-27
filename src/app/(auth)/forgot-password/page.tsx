'use client'

import { useState } from 'react'
import HelperText from '@/components/common/text/HelperText'
import Button from '@/components/common/button/Button'
import InputBox from '@/components/common/input/InputBox'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)

  const isValidEmail = /\S+@\S+\.\S+/.test(email)
  const showEmailError = touched && email.length > 0 && !isValidEmail

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)

    if (!isValidEmail) return
    // await authApi.requestPasswordReset({ email })
  }

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
              }}
              placeholder="이메일을 입력하세요"
              status="default"
            />

            <HelperText status={showEmailError ? 'error' : 'empty'}>
              {showEmailError ? '올바른 이메일 주소를 입력해주세요.' : '\u00A0'}
            </HelperText>
          </div>

          <Button
            type="submit"
            variant={isValidEmail ? 'primary' : 'secondary'}
            disabled={!isValidEmail}
            className="w-full"
          >
            메일 전송
          </Button>
        </form>
      </div>
    </main>
  )
}
