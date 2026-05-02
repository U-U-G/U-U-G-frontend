'use client'

import { useState } from 'react'
import Image from 'next/image'
import character3 from '@/assets/image/uug-character3-img.png'
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
      className="pt-21.75 pb-25 flex flex-col items-center w-194.5"
    >
      <Image
        src={character3}
        alt="캐릭터"
        width={163}
        height={163}
        className="object-contain mb-5.5"
      />
      <p className="h1 text-primary mb-1.75">회사명을 입력해주세요!</p>
      <div className="w-70">
        <InputBox
          className="bg-white"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="회사명을 입력하여주세요."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && canSubmit) onSubmit(companyName.trim())
          }}
        />
      </div>
      <Button
        className="w-70 rounded-full! py-3 cursor-pointer mt-12 disabled:bg-gray-4 disabled:opacity-100"
        disabled={!canSubmit}
        onClick={() => onSubmit(companyName.trim())}
      >
        <span className="h3">시작 하기</span>
      </Button>
    </PopupShell>
  )
}
