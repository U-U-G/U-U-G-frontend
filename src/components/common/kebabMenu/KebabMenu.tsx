'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export type KebabMenuPosition = {
  key: string
  bottom: number
  right: number
}

export type KebabMenuItem = {
  label: string
  onClick: (key: string) => void
}

type KebabMenuPortalProps = {
  menu: KebabMenuPosition | null
  onClose: () => void
  items: KebabMenuItem[]
}

const MENU_GAP_ABOVE_ROW_BOTTOM = 1

export function computeMenuPosition(buttonEl: HTMLElement, rowEl: HTMLElement) {
  const row = rowEl.getBoundingClientRect()
  const btn = buttonEl.getBoundingClientRect()

  return {
    bottom: window.innerHeight - row.bottom + MENU_GAP_ABOVE_ROW_BOTTOM,
    right: window.innerWidth - btn.right,
  }
}

export default function KebabMenu({
  menu,
  onClose,
  items,
}: KebabMenuPortalProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menu) return

    function handlePointerDown(e: PointerEvent) {
      if (menuRef.current?.contains(e.target as Node)) return
      onClose()
    }

    document.addEventListener('scroll', onClose, true)
    document.addEventListener('pointerdown', handlePointerDown, true)
    window.addEventListener('resize', onClose)

    return () => {
      document.removeEventListener('scroll', onClose, true)
      document.removeEventListener('pointerdown', handlePointerDown, true)
      window.removeEventListener('resize', onClose)
    }
  }, [menu, onClose])

  if (!menu) return null

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      className="fixed z-[70] min-w-[110px] rounded-lg bg-white py-1 shadow-[0_0_16px_0_rgba(99,99,99,0.16)]"
      style={{
        bottom: menu.bottom,
        right: menu.right,
      }}
    >
      {items.map((item, index) => (
        <div key={item.label}>
          {index > 0 && (
            <div className="mx-2 h-px bg-gray-5" role="separator" aria-hidden />
          )}

          <button
            type="button"
            role="menuitem"
            className="p4 w-full px-2 py-2 text-center text-text-primary cursor-pointer"
            onClick={() => {
              item.onClick(menu.key)
              onClose()
            }}
          >
            {item.label}
          </button>
        </div>
      ))}
    </div>,
    document.body,
  )
}
