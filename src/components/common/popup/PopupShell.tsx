import { IconX } from '@tabler/icons-react'

interface PopupShellProps {
  popupRef?: React.RefObject<HTMLDivElement | null>
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export default function PopupShell({
  popupRef,
  onClose,
  children,
  className = '',
}: PopupShellProps) {
  return (
    <div className="fixed inset-0 bg-black/13 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className={`relative bg-white rounded-2xl shadow-[0_0_16px_0_rgba(99,99,99,0.16)] ${className}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-3 hover:text-gray-1 cursor-pointer"
          aria-label="닫기"
        >
          <IconX size={20} />
        </button>
        {children}
      </div>
    </div>
  )
}
