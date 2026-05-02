'use client'

import { IconDotsVertical } from '@tabler/icons-react'

type InterviewPlanDotsTriggerProps = {
  menuKey: string
  onToggleMenu: (key: string, el: HTMLElement) => void
}

export default function InterviewPlanDotsTrigger({
  menuKey,
  onToggleMenu,
}: InterviewPlanDotsTriggerProps) {
  return (
    <button
      type="button"
      className="shrink-0 cursor-pointer rounded p-0.5 text-primary"
      aria-label="일정 메뉴"
      aria-haspopup="menu"
      onClick={(e) => {
        e.stopPropagation()
        onToggleMenu(menuKey, e.currentTarget)
      }}
    >
      <IconDotsVertical size={22} aria-hidden />
    </button>
  )
}
