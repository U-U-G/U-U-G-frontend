'use client'

import { useState } from 'react'
import EmailSection from '@/components/auth/signup/EmailSection'
import PasswordField from '@/components/common/input/PasswordField'

const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

function isValidNewPassword(pw: string) {
  return PASSWORD_REGEX.test(pw)
}

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')

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
    <main className="min-w-102.5 mx-auto py-12">
      <div className="pb-3.75 mb-13.5 border-b border-gray5">
        <h1 className="text-xl font-bold">비밀번호 재설정</h1>
      </div>

      <EmailSection />

      <div className="flex flex-col gap-5.5">
        <PasswordField
          label="새 비밀번호"
          name="newPassword"
          value={newPassword}
          placeholder="새 비밀번호를 입력해주세요."
          status={newPasswordStatus}
          helperText="영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요."
          onChange={setNewPassword}
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
    </main>
  )
}
