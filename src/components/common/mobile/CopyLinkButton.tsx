'use client'

import Button from '@/components/common/button/Button'

export default function CopyLinkButton() {
  return (
    <Button
      onClick={() => navigator.clipboard.writeText(window.location.href)}
      className="rounded-xl mt-12.5 w-86 text-xl font-bold"
    >
      링크 복사
    </Button>
  )
}
