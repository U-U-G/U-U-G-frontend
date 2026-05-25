'use client'

import { useCallback, useState } from 'react'
import {
  computeMenuPosition,
  type KebabMenuPosition,
} from '@/components/common/kebabMenu/KebabMenu'

const KEBAB_ROW_SELECTOR = '[data-kebab-row]'

export function useKebabMenu() {
  const [menu, setMenu] = useState<KebabMenuPosition | null>(null)

  const toggleMenu = useCallback((key: string, el: HTMLElement) => {
    const row = el.closest(KEBAB_ROW_SELECTOR)

    if (!(row instanceof HTMLElement)) return

    setMenu((prev) => {
      const isSameMenu = prev?.key === key

      if (isSameMenu) {
        return null
      }

      return {
        key,
        ...computeMenuPosition(el, row),
      }
    })
  }, [])

  const closeMenu = () => {
    setMenu(null)
  }

  return {
    menu,
    toggleMenu,
    closeMenu,
  }
}
