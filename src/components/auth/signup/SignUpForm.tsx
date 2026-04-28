'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAxiosError } from 'axios'
import { signupApi } from '@/apis/auth'
import HelperText from '@/components/common/text/HelperText'
import Button from '@/components/common/button/Button'
import EmailSection from './EmailSection'
import NicknameSection from './NicknameSection'
import PasswordSection from './PasswordSection'
import TermsSection from './TermsSection'

export default function SignUpForm() {
  const router = useRouter()
  const [emailVerified, setEmailVerified] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [nicknameChecked, setNicknameChecked] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [emailError, setEmailError] = useState('')

  const handlePasswordValid = useCallback(
    (valid: boolean) => setPasswordValid(valid),
    [],
  )

  const canSubmit =
    emailVerified && passwordValid && nicknameChecked && termsAccepted

  return (
    <form
      className="flex flex-col gap-5.5"
      onSubmit={async (e) => {
        e.preventDefault()
        if (!canSubmit) return

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirmPassword = formData.get('passwordConfirm') as string
        const nickname = formData.get('nickname') as string

        setSubmitError('')
        setEmailError('')
        setIsSubmitting(true)
        try {
          await signupApi.signup({ email, password, confirmPassword, nickname })
          router.push('/login')
        } catch (err) {
          const message =
            isAxiosError(err) && err.response?.data?.message
              ? err.response.data.message
              : '회원가입에 실패했습니다. 다시 시도해주세요.'
          if (message.includes('이메일')) {
            setEmailError(message)
            setEmailVerified(false)
          } else {
            setSubmitError(message)
          }
        } finally {
          setIsSubmitting(false)
        }
      }}
    >
      <EmailSection
        onEmailVerified={setEmailVerified}
        serverError={emailError}
        onClearServerError={() => setEmailError('')}
      />
      <PasswordSection onPasswordValid={handlePasswordValid} />
      <NicknameSection onNicknameChecked={setNicknameChecked} />
      <TermsSection onAcceptChange={setTermsAccepted} />
      {submitError && <HelperText status="error">{submitError}</HelperText>}
      <Button
        type="submit"
        variant={canSubmit ? 'primary' : 'secondary'}
        disabled={!canSubmit || isSubmitting}
        className="w-full"
      >
        <span className="h4">회원가입</span>
      </Button>
    </form>
  )
}
