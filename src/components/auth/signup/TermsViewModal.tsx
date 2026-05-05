'use client'

import { useEffect } from 'react'
import PopupShell from '@/components/common/popup/PopupShell'

interface TermsViewModalProps {
  title: string
  content: string
  onClose: () => void
}

export default function TermsViewModal({
  title,
  content,
  onClose,
}: TermsViewModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <PopupShell
      onClose={onClose}
      className="w-150 max-h-[80vh] flex flex-col py-10 px-8"
    >
      <h2 className="h4 mb-6">{title}</h2>
      <div
        className="overflow-y-auto flex-1"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </PopupShell>
  )
}
