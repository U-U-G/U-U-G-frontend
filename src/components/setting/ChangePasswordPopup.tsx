'use client'

import { useState } from 'react'
import PasswordField from '@/components/common/input/PasswordField'
import FormPopupLayout from '@/components/common/popup/FormPopupLayout'
import { PASSWORD_REGEX } from '@/constants/regex'

interface ChangePasswordPopupProps {
  onClose: () => void
}

export default function ChangePasswordPopup({
  onClose,
}: ChangePasswordPopupProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const isNewPasswordValid = PASSWORD_REGEX.test(newPassword)
  const isConfirmValid = confirm === newPassword && confirm.length > 0

  const currentPasswordStatus = 'default'

  const newPasswordStatus = !newPassword
    ? 'default'
    : isNewPasswordValid
      ? 'success'
      : 'error'

  const confirmStatus = !confirm
    ? 'default'
    : isConfirmValid
      ? 'success'
      : 'error'

  const canSubmit =
    currentPassword.length > 0 && isNewPasswordValid && isConfirmValid

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!canSubmit) return
    // TODO: 비밀번호 변경 API 연동
  }

  return (
    <FormPopupLayout
      title="비밀번호 재설정"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitLabel="변경 완료"
      canSubmit={canSubmit}
    >
      <PasswordField
        label="현재 비밀번호"
        name="currentPassword"
        value={currentPassword}
        placeholder="현재 비밀번호를 입력해주세요."
        status={currentPasswordStatus}
        helperText=" "
        onChange={setCurrentPassword}
      />

      <PasswordField
        label="변경 비밀번호"
        name="newPassword"
        value={newPassword}
        placeholder="새 비밀번호를 입력해주세요."
        status={newPasswordStatus}
        helperText="영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요."
        onChange={setNewPassword}
        showDash
      />

      <PasswordField
        label="비밀번호 확인"
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
    </FormPopupLayout>
  )
}
