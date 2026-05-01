'use client'

import { useState } from 'react'
import PopupShell from '@/components/common/popup/PopupShell'
import PasswordField from '@/components/common/input/PasswordField'
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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    // TODO: 비밀번호 변경 API 연동
  }

  return (
    <PopupShell onClose={onClose} className="w-[720px] py-18 px-40">
      <div className="mb-10 pb-4 border-b border-gray-4">
        <p className="p2 text-text-primary">비밀번호 재설정</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
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

        <button
          type="submit"
          disabled={!canSubmit}
          className={`mt-2 w-full py-3 rounded-lg p2 transition-colors ${
            canSubmit
              ? 'bg-primary text-white cursor-pointer'
              : 'bg-gray-5 text-text-primary cursor-not-allowed'
          }`}
        >
          변경 완료
        </button>
      </form>
    </PopupShell>
  )
}
