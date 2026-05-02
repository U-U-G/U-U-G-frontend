'use client'

import PopupShell from '@/components/common/popup/PopupShell'

const POPUP_SHELL_CLASS = 'w-[720px] py-24 px-32'

const submitButtonClass = (enabled: boolean) =>
  `mt-6 w-full py-3 rounded-lg p2 transition-colors ${
    enabled
      ? 'bg-primary text-white cursor-pointer'
      : 'bg-gray-5 text-text-primary cursor-not-allowed'
  }`

export interface FormPopupLayoutProps {
  title: string
  onClose: () => void
  popupRef?: React.RefObject<HTMLDivElement | null>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  submitLabel: string
  canSubmit: boolean
  children: React.ReactNode
}

export default function FormPopupLayout({
  title,
  onClose,
  popupRef,
  onSubmit,
  submitLabel,
  canSubmit,
  children,
}: FormPopupLayoutProps) {
  return (
    <PopupShell popupRef={popupRef} onClose={onClose} className={POPUP_SHELL_CLASS}>
      <div className="mb-16 pb-4 border-b border-gray-4">
        <p className="p2 text-text-primary">{title}</p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-12">
        {children}
        <button
          type="submit"
          disabled={!canSubmit}
          className={submitButtonClass(canSubmit)}
        >
          {submitLabel}
        </button>
      </form>
    </PopupShell>
  )
}
