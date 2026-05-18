'use client'

import { useCallback, useState, useRef, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteInterviewSchedule,
  getInterviewSchedule,
  getInterviewScheduleList,
} from '@/apis/schedules'
import KebabMenu from '@/components/common/kebabMenu/KebabMenu'
import { useKebabMenu } from '@/hooks/useKebabMenu'
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
  const [editingScheduleUuid, setEditingScheduleUuid] = useState<string | null>(
    null,
  )

  const queryClient = useQueryClient()

  const {
    menu: actionsMenu,
    toggleMenu: toggleActionsMenu,
    closeMenu: closeActionsMenu,
  } = useKebabMenu()

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
      closeActionsMenu()
    },
  })

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
    <section className="min-h-[clamp(320px,36vh,400px)] rounded-2xl bg-secondary p-[clamp(14px,1.6vw,26px)]">
      <div className="flex h-full min-h-0 gap-5">
        <InterviewPlanScheduleColumn
          selectedScheduleUuid={selectedScheduleUuid}
          onToggleMenu={toggleActionsMenu}
          onSelectSchedule={setSelectedScheduleUuid}
        />
        <InterviewPlanCurriculumColumn
          selectedScheduleDetail={selectedScheduleDetail}
          isLoading={isScheduleDetailLoading}
          hasSelectedSchedule={!!selectedScheduleUuid}
        />
      </div>

      <KebabMenu
        menu={actionsMenu}
        onClose={closeActionsMenu}
        items={[
          { label: '수정', onClick: handleEdit },
          { label: '삭제', onClick: handleDelete },
        ]}
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
