'use client'

import { useState } from 'react'
import Image from 'next/image'
import CheckedboxIcon from '@/assets/icon/checkedbox-icon.svg'
import NotcheckedboxIcon from '@/assets/icon/notcheckedbox-icon.svg'
import DoneIcon from '@/assets/icon/done-icon.svg'
import NotdoneIcon from '@/assets/icon/notdone-icon.svg'

interface TermsSectionProps {
  onAcceptChange?: (accepted: boolean) => void
}

export default function TermsSection({ onAcceptChange }: TermsSectionProps) {
  const [checked, setChecked] = useState({ terms: false, privacy: false })

  const allChecked = checked.terms && checked.privacy

  function handleAllChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked
    const next = { terms: isChecked, privacy: isChecked }
    setChecked(next)
    onAcceptChange?.(isChecked)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked: isChecked } = e.target
    const next = { ...checked, [name]: isChecked }
    setChecked(next)
    onAcceptChange?.(next.terms && next.privacy)
  }

  return (
    <fieldset>
      <div className="h-10 border-b border-secondary text-xl font-bold mt-8 mb-9.5 flex">
        <legend>약관 동의</legend>
      </div>

      <label
        className="flex items-center gap-3.5 mb-4.5 cursor-pointer"
        htmlFor="all"
      >
        <input
          type="checkbox"
          id="all"
          className="sr-only"
          checked={allChecked}
          onChange={handleAllChange}
        />
        <Image
          src={allChecked ? CheckedboxIcon : NotcheckedboxIcon}
          alt={allChecked ? '전체 선택됨' : '전체 미선택'}
          width={17}
          height={17}
        />
        <span>모두 동의</span>
      </label>

      <label
        className="flex items-center gap-2 mb-2.5 cursor-pointer"
        htmlFor="terms"
      >
        <input
          type="checkbox"
          id="terms"
          name="terms"
          className="sr-only"
          checked={checked.terms}
          onChange={handleChange}
        />
        <Image
          src={checked.terms ? DoneIcon : NotdoneIcon}
          alt={checked.terms ? '동의함' : '미동의'}
          width={20}
          height={20}
          className="ml-0.75"
        />
        <span>[필수] 서비스 이용약관 동의</span>
      </label>

      <label
        className="flex items-center gap-2 cursor-pointer"
        htmlFor="privacy"
      >
        <input
          type="checkbox"
          id="privacy"
          name="privacy"
          className="sr-only"
          checked={checked.privacy}
          onChange={handleChange}
        />
        <Image
          src={checked.privacy ? DoneIcon : NotdoneIcon}
          alt={checked.privacy ? '동의함' : '미동의'}
          width={20}
          height={20}
          className="ml-0.75"
        />
        <span>[필수] 개인정보 처리방침 동의</span>
      </label>
    </fieldset>
  )
}
