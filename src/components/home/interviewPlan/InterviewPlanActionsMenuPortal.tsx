'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export type InterviewPlanMenuPosition = {
  key: string
  bottom: number
  right: number
}

type InterviewPlanActionsMenuPortalProps = {
  menu: InterviewPlanMenuPosition | null
  onClose: () => void
  onEdit: (key: string) => void
  onDelete: (key: string) => void
}

const MENU_GAP_ABOVE_ROW_BOTTOM = 1

export function computeMenuPosition(buttonEl: HTMLElement, rowEl: HTMLElement) {
  const row = rowEl.getBoundingClientRect()
  const btn = buttonEl.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight
  return {
    bottom: vh - row.bottom + MENU_GAP_ABOVE_ROW_BOTTOM,
    right: vw - btn.right,
  }
}

export default function InterviewPlanActionsMenuPortal({
  menu,
  onClose,
  onEdit,
  onDelete,
}: InterviewPlanActionsMenuPortalProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menu) return
    const close = () => onClose()
    document.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    return () => {
      document.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
    }
  }, [menu, onClose])

  useEffect(() => {
    if (!menu) return
    function handlePointerDown(e: PointerEvent) {
      const el = menuRef.current
      if (!el || el.contains(e.target as Node)) return
      onClose()
    }
    document.addEventListener('pointerdown', handlePointerDown, true)
    return () =>
      document.removeEventListener('pointerdown', handlePointerDown, true)
  }, [menu, onClose])

  if (!menu || typeof document === 'undefined') return null

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      className="fixed z-[70] min-w-[110px] rounded-lg bg-white py-1 shadow-[0_0_16px_0_rgba(99,99,99,0.16)]"
      style={{
        bottom: menu.bottom,
        right: menu.right,
        top: 'auto',
        left: 'auto',
      }}
    >
      <button
        type="button"
        role="menuitem"
        className="p4 w-full px-2 py-2 text-center text-text-primary cursor-pointer"
        onClick={() => {
          onEdit(menu.key)
          onClose()
        }}
      >
        수정
      </button>
      <div className="mx-2 h-px bg-gray-5" role="separator" aria-hidden />
      <button
        type="button"
        role="menuitem"
        className="p4 w-full px-2 py-2 text-center text-text-primary cursor-pointer"
        onClick={() => {
          onDelete(menu.key)
          onClose()
        }}
      >
        삭제
      </button>
    </div>,
    document.body,
  )
}
