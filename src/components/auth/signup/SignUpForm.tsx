'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
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
  const [agreedTerms, setAgreedTerms] = useState<string[]>([])

  const handleTermsChange = useCallback(
    (uuids: string[], allRequiredAgreed: boolean) => {
      setAgreedTerms(uuids)
      setTermsAccepted(allRequiredAgreed)
    },
    [],
  )
  const [submitError, setSubmitError] = useState('')
  const [emailError, setEmailError] = useState('')

  const handlePasswordValid = useCallback(
    (valid: boolean) => setPasswordValid(valid),
    [],
  )

  const canSubmit =
    emailVerified && passwordValid && nicknameChecked && termsAccepted

  const signupMutation = useMutation({
    mutationFn: signupApi.signup,
    onSuccess: () => {
      router.push('/login')
    },
    onError: (err) => {
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
    },
  })

  const handleSubmit = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault()
    if (!canSubmit) return

    const formData = new FormData(e.currentTarget)
    setSubmitError('')
    setEmailError('')
    signupMutation.mutate({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('passwordConfirm') as string,
      nickname: formData.get('nickname') as string,
      agreedTerms,
    })
  }

  return (
    <form className="flex flex-col gap-5.5" onSubmit={handleSubmit}>
      <EmailSection
        onEmailVerified={setEmailVerified}
        serverError={emailError}
        onClearServerError={() => setEmailError('')}
      />
      <PasswordSection onPasswordValid={handlePasswordValid} />
      <NicknameSection onNicknameChecked={setNicknameChecked} />
      <TermsSection onChange={handleTermsChange} />
      {submitError && <HelperText status="error">{submitError}</HelperText>}
      <Button
        type="submit"
        variant={canSubmit ? 'primary' : 'secondary'}
        disabled={!canSubmit || signupMutation.isPending}
        className="w-full"
      >
        <span className="h4">회원가입</span>
      </Button>
    </form>
  )
}
