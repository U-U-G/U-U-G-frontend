'use client'

import { useState } from 'react'
import Image from 'next/image'
import VisibleIcon from '@/assets/icon/visible-icon.svg'
import InvisibleIcon from '@/assets/icon/invisible-icon.svg'
import InputBox from '@/components/common/input/InputBox'
import HelperText from '@/components/common/text/HelperText'

type FieldStatus = 'default' | 'success' | 'error' | 'empty'

interface PasswordFieldProps {
  label: string
  name: string
  value: string
  placeholder: string
  status: FieldStatus
  helperText: string
  onChange: (value: string) => void
}

export default function PasswordField({
  label,
  name,
  value,
  placeholder,
  status,
  helperText,
  onChange,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium mb-1.75" htmlFor={name}>
        {label}
      </label>
      <InputBox
        id={name}
        type={show ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        status={status === 'empty' ? 'default' : status}
        aria-describedby={`${name}-desc`}
        rightElement={
          <button
            type="button"
            aria-label={show ? '비밀번호 숨기기' : '비밀번호 보기'}
            onClick={() => setShow((v) => !v)}
          >
            <Image
              src={show ? VisibleIcon : InvisibleIcon}
              alt=""
              width={24}
              height={24}
            />
          </button>
        }
      />
      <HelperText id={`${name}-desc`} status={status}>
        {helperText}
      </HelperText>
    </div>
  )
}
