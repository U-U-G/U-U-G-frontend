'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import VisibleIcon from '@/assets/icon/visible-icon.svg'
import InvisibleIcon from '@/assets/icon/invisible-icon.svg'
import InputBox from '@/components/common/input/InputBox'

const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
import HelperText from '@/components/common/text/HelperText'

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
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

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
      <div className="flex flex-col gap-2">
        <label className="font-medium mb-1.75" htmlFor="password">
          비밀번호
        </label>
        <InputBox
          id="password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요."
          status={passwordStatus}
          aria-describedby="password-desc"
          rightElement={
            <button
              type="button"
              aria-label="비밀번호 보기 토글"
              onClick={() => setShowPassword((v) => !v)}
            >
              <Image
                src={showPassword ? VisibleIcon : InvisibleIcon}
                alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                width={24}
                height={24}
              />
            </button>
          }
        />
        <HelperText
          id="password-desc"
          status={
            !password
              ? 'default'
              : isValidPassword(password)
                ? 'success'
                : 'error'
          }
        >
          - 영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.
        </HelperText>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium mb-1.75" htmlFor="passwordConfirm">
          비밀번호 확인
        </label>
        <InputBox
          id="passwordConfirm"
          type={showConfirm ? 'text' : 'password'}
          name="passwordConfirm"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="비밀번호를 입력해주세요."
          status={confirmStatus}
          aria-describedby="passwordConfirm-desc"
          rightElement={
            <button
              type="button"
              aria-label="비밀번호 확인 보기 토글"
              onClick={() => setShowConfirm((v) => !v)}
            >
              <Image
                src={showConfirm ? VisibleIcon : InvisibleIcon}
                alt={showConfirm ? '비밀번호 숨기기' : '비밀번호 보기'}
                width={24}
                height={24}
              />
            </button>
          }
        />
        <HelperText
          id="passwordConfirm-desc"
          status={confirm ? confirmStatus : 'empty'}
        >
          {confirm
            ? confirm === password
              ? '비밀번호가 일치합니다.'
              : '비밀번호가 일치하지 않습니다.'
            : '\u00A0'}
        </HelperText>
      </div>
    </div>
  )
}
