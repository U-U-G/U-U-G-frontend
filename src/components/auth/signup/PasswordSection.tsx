'use client'

import { useEffect, useState } from 'react'
import PasswordField from '@/components/common/input/PasswordField'

const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

function isValidPassword(pw: string) {
  return PASSWORD_REGEX.test(pw)
}

interface PasswordSectionProps {
  onPasswordValid?: (valid: boolean) => void
}

export default function PasswordSection({
  onPasswordValid,
}: PasswordSectionProps) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  useEffect(() => {
    onPasswordValid?.(
      isValidPassword(password) && password === confirm && confirm !== '',
    )
  }, [password, confirm, onPasswordValid])

  const passwordStatus = !password
    ? 'default'
    : isValidPassword(password)
      ? 'success'
      : 'error'
  const confirmStatus = !confirm
    ? 'default'
    : confirm === password
      ? 'success'
      : 'error'

  return (
    <div className="flex flex-col gap-5.5">
      <PasswordField
        label="비밀번호"
        name="password"
        value={password}
        onChange={setPassword}
        placeholder="비밀번호를 입력해주세요."
        status={passwordStatus}
        helperText="영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요."
      />

      <PasswordField
        label="비밀번호 확인"
        name="passwordConfirm"
        value={confirm}
        onChange={setConfirm}
        placeholder="비밀번호를 입력해주세요."
        status={confirmStatus}
        helperText={
          confirm
            ? confirm === password
              ? '비밀번호가 일치합니다.'
              : '비밀번호가 일치하지 않습니다.'
            : '\u00A0'
        }
      />
    </div>
  )
}
