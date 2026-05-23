'use client'

import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import type { ScheduleJobPosting } from '@/apis/schedules/type'
import InputBox from '@/components/common/input/InputBox'

type JobPostingSelectFieldProps = {
  isEditMode: boolean
  value: string
  isOpen: boolean
  jobPostings: ScheduleJobPosting[]
  isLoading: boolean
  dropdownRef: React.RefObject<HTMLDivElement | null>
  onToggle: () => void
  onSelect: (item: ScheduleJobPosting) => void
}

type JobPostingLabelSource = {
  companyName?: string
  position?: string
}

function formatJobPostingLabel({
  companyName,
  position,
}: JobPostingLabelSource) {
  return [companyName, position].filter(Boolean).join(' / ')
}

export default function JobPostingSelectField({
  isEditMode,
  value,
  isOpen,
  jobPostings,
  isLoading,
  dropdownRef,
  onToggle,
  onSelect,
}: JobPostingSelectFieldProps) {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="interview-company-role" className="p4 text-gray-2">
        회사 및 직무
      </label>

      {isEditMode ? (
        <InputBox
          id="interview-company-role"
          className="border-gray-5 text-gray-4"
          value={value}
          disabled
          status="default"
        />
      ) : (
        <div className="relative" ref={dropdownRef}>
          <div
            className={`rounded-lg border border-gray-4 bg-white ${
              isOpen ? 'rounded-b-none border-b-0' : ''
            }`}
          >
            <InputBox
              id="interview-company-role"
              className="cursor-pointer rounded-none border-0 hover:border-0 focus:border-0"
              value={value}
              readOnly
              onClick={onToggle}
              status="default"
              focusPrimary={false}
              placeholder="지원 회사와 직무를 선택해 주세요."
              rightElement={
                <button
                  type="button"
                  onClick={onToggle}
                  className="cursor-pointer text-gray-4 hover:text-text-primary"
                  aria-label="회사 및 직무 선택"
                  aria-expanded={isOpen}
                >
                  {isOpen ? (
                    <IconChevronUp size={24} aria-hidden />
                  ) : (
                    <IconChevronDown size={24} aria-hidden />
                  )}
                </button>
              }
            />
          </div>

          {isOpen && (
            <div className="absolute z-[60] w-full overflow-hidden rounded-b-lg border border-t-0 border-gray-4 bg-white">
              <div className="mx-4 border-t border-gray-5" />

              <div className="max-h-48 overflow-y-auto">
                {isLoading ? (
                  <p className="p4 px-4 py-3 text-gray-3">
                    목록을 불러오는 중입니다. 잠시만 기다려주세요.
                  </p>
                ) : jobPostings.length === 0 ? (
                  <p className="p4 px-4 py-3 text-gray-3">
                    등록된 채용공고가 없어요.
                  </p>
                ) : (
                  jobPostings.map((item) => (
                    <button
                      key={item.jobPostingUuid}
                      type="button"
                      onClick={() => onSelect(item)}
                      className="p4 w-full cursor-pointer px-4 py-3 text-left text-text-primary hover:bg-secondary"
                    >
                      {formatJobPostingLabel(item)}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
