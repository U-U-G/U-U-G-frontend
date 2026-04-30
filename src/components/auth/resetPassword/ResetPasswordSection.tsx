import { useState, useEffect } from 'react'
import { PASSWORD_REGEX } from '@/constants/regex'
import PasswordField from '@/components/common/input/PasswordField'

function isValidNewPassword(pw: string) {
  return PASSWORD_REGEX.test(pw)
}

interface ResetPasswordSectionProps {
  onPasswordValid?: (valid: boolean) => void
  onPasswordChange?: (value: {
    newPassword: string
    confirmPassword: string
  }) => void
}

export default function ResetPasswordSection({
  onPasswordValid,
  onPasswordChange,
}: ResetPasswordSectionProps) {
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  useEffect(() => {
    onPasswordValid?.(
      isValidNewPassword(newPassword) && newPassword === confirm,
    )
    onPasswordChange?.({
      newPassword,
      confirmPassword: confirm,
    })
  }, [newPassword, confirm, onPasswordValid, onPasswordChange])

  const newPasswordStatus = !newPassword
    ? 'default'
    : isValidNewPassword(newPassword)
      ? 'success'
      : 'error'

  const confirmStatus = !confirm
    ? 'default'
    : confirm === newPassword
      ? 'success'
      : 'error'

  return (
    <div className="flex flex-col gap-5.5">
      <PasswordField
        label="새 비밀번호"
        name="newPassword"
        value={newPassword}
        placeholder="새 비밀번호를 입력해주세요."
        status={newPasswordStatus}
        helperText="영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요."
        onChange={setNewPassword}
        showDash
      />

      <PasswordField
        label="새 비밀번호 확인"
        name="newPasswordConfirm"
        value={confirm}
        onChange={setConfirm}
        placeholder="비밀번호를 입력해주세요."
        status={confirmStatus}
        helperText={
          confirm
            ? confirm === newPassword
              ? '비밀번호가 일치합니다.'
              : '비밀번호가 일치하지 않습니다.'
            : '\u00A0'
        }
      />
    </div>
  )
}
