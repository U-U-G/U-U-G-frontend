'use client'

import { useCallback, useState } from 'react'
import Button from '@/components/common/button/Button'
import EmailSection from './EmailSection'
import NicknameSection from './NicknameSection'
import PasswordSection from './PasswordSection'
import TermsSection from './TermsSection'

export default function SignUpForm() {
  const [emailVerified, setEmailVerified] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [nicknameChecked, setNicknameChecked] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handlePasswordValid = useCallback((valid: boolean) => setPasswordValid(valid), [])

  const canSubmit = emailVerified && passwordValid && nicknameChecked && termsAccepted

  return (
    <form className="flex flex-col gap-5.5">
      <EmailSection onEmailVerified={setEmailVerified} />
      <PasswordSection onPasswordValid={handlePasswordValid} />
      <NicknameSection onNicknameChecked={setNicknameChecked} />
      <TermsSection onAcceptChange={setTermsAccepted} />
      <Button
        type="submit"
        variant={canSubmit ? 'primary' : 'secondary'}
        disabled={!canSubmit}
        className="w-full"
      >
        회원가입
      </Button>
    </form>
  )
}
