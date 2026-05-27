'use client'

import { useState, useEffect, useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createInterviewSchedule,
  getScheduleJobPostings,
  updateInterviewSchedule,
} from '@/apis/schedules'
import type { ScheduleJobPosting } from '@/apis/schedules/type'
import { getHttpStatus } from '@/apis/common/httpError'

import FormPopupLayout from '@/components/common/popup/FormPopupLayout'
import JobPostingSelectField, {
  formatJobPostingLabel,
} from '@/components/home/interviewPlan/JobPostingSelectField'
import InterviewDateField from '@/components/home/interviewPlan/InterviewDateField'

import { useDatePicker } from '@/hooks/useDatePicker'
import { useModal } from '@/hooks/useModal'
import { formatFullDate, formatDateKo, parseKoreanDate } from '@/utils/date'

export type InterviewSchedulePopupMode = 'create' | 'edit'

interface InterviewScheduleRegisterPopupProps {
  onClose: () => void
  mode?: InterviewSchedulePopupMode
  scheduleUuid?: string
  initialSchedule?: {
    companyName: string
    interviewDate: string
  }
}

export default function InterviewScheduleRegisterPopup({
  onClose,
  mode = 'create',
  scheduleUuid,
  initialSchedule,
}: InterviewScheduleRegisterPopupProps) {
  const isEditMode = mode === 'edit'

  const { ref: popupRef } = useModal(true, onClose)
  const companyDropdownRef = useRef<HTMLDivElement>(null)
  const [selectedJobPostingLabel, setSelectedJobPostingLabel] = useState('')
  const [selectedJobPostingUuid, setSelectedJobPostingUuid] = useState<
    string | null
  >(null)
  const [showCompanyListDropdown, setShowCompanyListDropdown] = useState(false)

  const [helperTextMessage, setHelperTextMessage] = useState('')

  const datePicker = useDatePicker()
  const { selectedDate, handleDateInputChange } = datePicker

  const canSubmit =
    (isEditMode ? true : !!selectedJobPostingUuid) && selectedDate !== null

  const queryClient = useQueryClient()

  const { data: jobPostings = [], isLoading: isJobPostingsLoading } = useQuery({
    queryKey: ['schedules', 'job-postings'],
    queryFn: getScheduleJobPostings,
    enabled: !isEditMode && showCompanyListDropdown,
  })

  const scheduleMutation = useMutation({
    mutationFn: async () => {
      const interviewDate = formatFullDate(selectedDate!)

      if (isEditMode && scheduleUuid) {
        return updateInterviewSchedule(scheduleUuid, {
          interviewDate,
        })
      }

      if (!selectedJobPostingUuid) return

      return createInterviewSchedule({
        jobPostingUuid: selectedJobPostingUuid,
        interviewDate,
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] })
      onClose()
    },

    onError: handleScheduleError,
  })

  function getScheduleErrorMessage(status?: number) {
    switch (status) {
      case 400:
        return '면접 일정은 면접일 하루 전 날짜까지만 등록할 수 있어요.'
      case 409:
        return '해당 채용 공고에 대한 면접 일정이 이미 등록되어 있습니다.'
      default:
        return '면접 일정을 저장하지 못했어요.'
    }
  }

  function handleScheduleError(error: unknown) {
    setHelperTextMessage(getScheduleErrorMessage(getHttpStatus(error)))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedDate) return

    setHelperTextMessage('')
    scheduleMutation.mutate()
  }

  const title = isEditMode ? '면접 일정 수정' : '새로운 면접 일정 등록'
  const submitLabel = isEditMode ? '수정하기' : '일정등록'

  useEffect(() => {
    if (!isEditMode || !initialSchedule) return

    setSelectedJobPostingLabel(formatJobPostingLabel(initialSchedule))

    handleDateInputChange(
      formatDateKo(parseKoreanDate(initialSchedule.interviewDate)),
    )
  }, [isEditMode, initialSchedule?.companyName, initialSchedule?.interviewDate])

  useEffect(() => {
    if (!showCompanyListDropdown) return

    function handleClickOutside(e: MouseEvent) {
      if (companyDropdownRef.current?.contains(e.target as Node)) return
      setShowCompanyListDropdown(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showCompanyListDropdown])

  const handleSelectJobPosting = (item: ScheduleJobPosting) => {
    setSelectedJobPostingLabel(formatJobPostingLabel(item))
    setSelectedJobPostingUuid(item.jobPostingUuid)
    setShowCompanyListDropdown(false)
  }

  const handleToggleCompanyDropdown = () => {
    setShowCompanyListDropdown((prev) => !prev)
  }

  return (
    <FormPopupLayout
      title={title}
      onClose={onClose}
      popupRef={popupRef}
      onSubmit={handleSubmit}
      submitLabel={submitLabel}
      canSubmit={canSubmit}
    >
      <JobPostingSelectField
        isEditMode={isEditMode}
        value={selectedJobPostingLabel}
        isOpen={showCompanyListDropdown}
        jobPostings={jobPostings}
        isLoading={isJobPostingsLoading}
        dropdownRef={companyDropdownRef}
        onToggle={handleToggleCompanyDropdown}
        onSelect={handleSelectJobPosting}
      />

      <InterviewDateField
        datePicker={datePicker}
        helperTextMessage={helperTextMessage}
      />
    </FormPopupLayout>
  )
}
