'use client'

import { useCallback, useState, useRef, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteInterviewSchedule,
  getInterviewSchedule,
  getInterviewScheduleList,
} from '@/apis/schedules'
import InterviewPlanActionsMenuPortal, {
  computeMenuPosition,
  type InterviewPlanMenuPosition,
} from '@/components/home/interviewPlan/InterviewPlanActionsMenuPortal'
import InterviewPlanCurriculumColumn from '@/components/home/interviewPlan/InterviewPlanCurriculumColumn'
import InterviewPlanScheduleColumn from '@/components/home/interviewPlan/InterviewPlanScheduleColumn'
import InterviewScheduleRegisterPopup, {
  type InterviewSchedulePopupMode,
} from '@/components/home/interviewPlan/InterviewScheduleRegisterPopup'

export default function InterviewPlanSection() {
  const [selectedScheduleUuid, setSelectedScheduleUuid] = useState<
    string | null
  >(null)
  const [isSchedulePopupOpen, setIsSchedulePopupOpen] = useState(false)
  const [schedulePopupMode, setSchedulePopupMode] =
    useState<InterviewSchedulePopupMode>('create')
  const [actionsMenu, setActionsMenu] =
    useState<InterviewPlanMenuPosition | null>(null)
  const [editingScheduleUuid, setEditingScheduleUuid] = useState<string | null>(
    null,
  )

  const queryClient = useQueryClient()

  const { data: selectedScheduleDetail, isLoading: isScheduleDetailLoading } =
    useQuery({
      queryKey: ['schedule', selectedScheduleUuid],
      queryFn: () => getInterviewSchedule(selectedScheduleUuid!),
      enabled: !!selectedScheduleUuid,
    })

  const { data: schedules, isSuccess: isSchedulesSuccess } = useQuery({
    queryKey: ['schedules'],
    queryFn: getInterviewScheduleList,
  })

  const deleteInterviewScheduleMutation = useMutation({
    mutationFn: deleteInterviewSchedule,

    onSuccess: (_, deletedUuid) => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] })
      if (selectedScheduleUuid === deletedUuid) {
        setSelectedScheduleUuid(null)
      }
      setActionsMenu(null)
    },

    onError: (error) => {
      console.error('삭제 실패', error)
    },
  })

  const toggleActionsMenu = useCallback((key: string, el: HTMLElement) => {
    setActionsMenu((prev) => {
      if (prev?.key === key) return null
      const row = el.closest('[data-interview-plan-row]')
      if (!(row instanceof HTMLElement)) return null
      return { key, ...computeMenuPosition(el, row) }
    })
  }, [])

  const handleEdit = useCallback((scheduleUuid: string) => {
    setEditingScheduleUuid(scheduleUuid)
    setSchedulePopupMode('edit')
    setIsSchedulePopupOpen(true)
  }, [])

  const handleDelete = useCallback(
    (scheduleUuid: string) => {
      deleteInterviewScheduleMutation.mutate(scheduleUuid)
    },
    [deleteInterviewScheduleMutation],
  )

  const closeActionsMenu = useCallback(() => {
    setActionsMenu(null)
  }, [])

  const openCreateSchedulePopup = useCallback(() => {
    setEditingScheduleUuid(null)
    setSchedulePopupMode('create')
    setIsSchedulePopupOpen(true)
  }, [])

  const closeSchedulePopup = useCallback(() => {
    setIsSchedulePopupOpen(false)
  }, [])

  const hasAutoSelectedRef = useRef(false)

  useEffect(() => {
    if (!isSchedulesSuccess || !schedules?.length) return
    if (hasAutoSelectedRef.current) return
    if (selectedScheduleUuid !== null) return

    const sorted = [...schedules].sort((a, b) =>
      a.interviewDate.localeCompare(b.interviewDate),
    )
    setSelectedScheduleUuid(sorted[0].scheduleUuid)
    hasAutoSelectedRef.current = true
  }, [isSchedulesSuccess, schedules, selectedScheduleUuid])

  return (
    <section className="min-h-[clamp(320px,36vh,420px)] rounded-2xl bg-secondary p-[clamp(16px,2vw,28px)]">
      <div className="flex h-full min-h-0 gap-5">
        <InterviewPlanScheduleColumn
          selectedScheduleUuid={selectedScheduleUuid}
          onToggleMenu={toggleActionsMenu}
          onOpenAddSchedule={openCreateSchedulePopup}
          onSelectSchedule={setSelectedScheduleUuid}
        />
        <InterviewPlanCurriculumColumn
          selectedScheduleDetail={selectedScheduleDetail}
          isLoading={isScheduleDetailLoading}
          hasSelectedSchedule={!!selectedScheduleUuid}
        />
      </div>

      <InterviewPlanActionsMenuPortal
        menu={actionsMenu}
        onClose={closeActionsMenu}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isSchedulePopupOpen && (
        <InterviewScheduleRegisterPopup
          mode={schedulePopupMode}
          scheduleUuid={editingScheduleUuid ?? undefined}
          onClose={closeSchedulePopup}
        />
      )}
    </section>
  )
}
