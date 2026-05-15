'use client'

import { useState } from 'react'
import Image from 'next/image'
import bangImg from '@/assets/image/bang-img.png'
import PopupShell from './PopupShell'
import InputBox from '@/components/common/input/InputBox'
import Button from '@/components/common/button/Button'

export default function CompanyNamePopup({
  popupRef,
  onClose,
  onSubmit,
}: {
  popupRef: React.RefObject<HTMLDivElement | null>
  onClose: () => void
  onSubmit: (companyName: string) => void
}) {
  const [companyName, setCompanyName] = useState('')
  const canSubmit = companyName.trim().length > 0

  return (
    <PopupShell
      popupRef={popupRef}
      onClose={onClose}
      className="h-140.75 flex flex-col items-center justify-center w-194.5"
    >
      <Image
        src={bangImg}
        alt="경고"
        width={39}
        height={85}
        className="object-contain mb-10"
      />
      <p className="h1 text-primary mb-7.5">회사명을 직접 입력해주세요</p>
      <div className="w-86.5">
        <InputBox
          className="bg-white"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="지원 회사명"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && canSubmit) onSubmit(companyName.trim())
          }}
        />
      </div>
      <Button
        variant="outlined"
        className="p4 w-70 rounded-full! py-3 cursor-pointer mt-12 disabled:bg-gray-4 disabled:text-gray-3 disabled:border-gray-4"
        disabled={!canSubmit}
        onClick={() => onSubmit(companyName.trim())}
      >
        <span className="h3">입력 완료</span>
      </Button>
    </PopupShell>
  )
}
