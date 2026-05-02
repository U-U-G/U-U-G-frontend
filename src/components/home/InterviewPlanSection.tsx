'use client'

import { useCallback, useState } from 'react'
import InterviewPlanActionsMenuPortal, {
  computeMenuPosition,
  type InterviewPlanMenuPosition,
} from '@/components/home/InterviewPlanActionsMenuPortal'
import InterviewPlanCurriculumColumn from '@/components/home/InterviewPlanCurriculumColumn'
import InterviewPlanScheduleColumn from '@/components/home/InterviewPlanScheduleColumn'
import InterviewScheduleRegisterPopup from '@/components/home/InterviewScheduleRegisterPopup'
import type { InterviewPlanItem } from '@/types/interviewPlan'

type InterviewPlanSectionProps = {
  data: readonly InterviewPlanItem[]
}

export default function InterviewPlanSection({
  data,
}: InterviewPlanSectionProps) {
  const [isSchedulePopupOpen, setIsSchedulePopupOpen] = useState(false)
  const [actionsMenu, setActionsMenu] =
    useState<InterviewPlanMenuPosition | null>(null)
  const isEmpty = data.length === 0

  const selectedPlan = data.find((plan) => plan.isSelected) ?? data[0] ?? null

  const toggleActionsMenu = useCallback((key: string, el: HTMLElement) => {
    setActionsMenu((prev) => {
      if (prev?.key === key) return null
      const row = el.closest('[data-interview-plan-row]')
      if (!(row instanceof HTMLElement)) return null
      return { key, ...computeMenuPosition(el, row) }
    })
  }, [])

  const handleEdit = useCallback((_key: string) => {
    setIsSchedulePopupOpen(true)
  }, [])

  const handleDelete = useCallback((_key: string) => {
    // TODO: 삭제 확인 및 API 연동
  }, [])

  return (
    <section className="min-h-[clamp(320px,36vh,420px)] rounded-2xl bg-secondary p-[clamp(16px,2vw,28px)]">
      <div className="flex h-full min-h-0 gap-5">
        <InterviewPlanScheduleColumn
          data={data}
          isEmpty={isEmpty}
          onToggleMenu={toggleActionsMenu}
          onOpenAddSchedule={() => setIsSchedulePopupOpen(true)}
        />
        <InterviewPlanCurriculumColumn
          isEmpty={isEmpty}
          selectedPlan={selectedPlan}
        />
      </div>

      <InterviewPlanActionsMenuPortal
        menu={actionsMenu}
        onClose={() => setActionsMenu(null)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isSchedulePopupOpen && (
        <InterviewScheduleRegisterPopup
          onClose={() => setIsSchedulePopupOpen(false)}
        />
      )}
    </section>
  )
}
