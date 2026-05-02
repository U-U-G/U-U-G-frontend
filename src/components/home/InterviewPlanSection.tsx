'use client'

import { useCallback, useState } from 'react'
import { IconDotsVertical, IconPlus } from '@tabler/icons-react'
import InterviewScheduleRegisterPopup from '@/components/home/InterviewScheduleRegisterPopup'
import InterviewPlanActionsMenuPortal, {
  computeMenuPosition,
  type InterviewPlanMenuPosition,
} from '@/components/home/InterviewPlanActionsMenuPortal'

type CurriculumItem = {
  id: number
  title: string
  date: string
}

type InterviewPlanItem = {
  id: number
  dDay: string
  companyName: string
  title: string
  date: string
  isSelected: boolean
  curriculum: readonly CurriculumItem[]
}

type InterviewPlanSectionProps = {
  data: readonly InterviewPlanItem[]
}

function DotsMenuTrigger({
  menuKey,
  onToggleMenu,
}: {
  menuKey: string
  onToggleMenu: (key: string, el: HTMLElement) => void
}) {
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
        <div className="flex-1 flex flex-col min-h-0">
          <div className="mb-4 flex items-center gap-2">
            <h3 className="p2 text-text-primary">면접 일정</h3>
            <button
              type="button"
              className="text-primary"
              aria-label="면접 일정 추가"
              onClick={() => setIsSchedulePopupOpen(true)}
            >
              <IconPlus className="h-5 w-5" />
            </button>
          </div>

          {isEmpty ? (
            <div className="space-y-3.5">
              <div
                data-interview-plan-row
                className="flex h-16 items-center justify-between rounded-lg border border-gray-5 bg-white px-5 py-4 gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="h2 text-primary shrink-0">D-day</span>
                  <span className="p4 text-gray-3 truncate">
                    면접 일정을 등록해주세요
                  </span>
                </div>
                <DotsMenuTrigger
                  menuKey="empty-0"
                  onToggleMenu={toggleActionsMenu}
                />
              </div>
              <div
                data-interview-plan-row
                className="flex h-14 items-center justify-end rounded-lg border border-gray-5 bg-white px-5 py-3"
              >
                <DotsMenuTrigger
                  menuKey="empty-1"
                  onToggleMenu={toggleActionsMenu}
                />
              </div>
              <div
                data-interview-plan-row
                className="flex h-14 items-center justify-end rounded-lg border border-gray-5 bg-white px-5 py-3"
              >
                <DotsMenuTrigger
                  menuKey="empty-2"
                  onToggleMenu={toggleActionsMenu}
                />
              </div>
              <div
                data-interview-plan-row
                className="flex h-10 items-center justify-end rounded-t-lg border border-gray-5 bg-white px-5 py-3"
              >
                <DotsMenuTrigger
                  menuKey="empty-3"
                  onToggleMenu={toggleActionsMenu}
                />
              </div>
            </div>
          ) : (
            <div className="max-h-[248px] overflow-y-auto space-y-4 pr-2">
              {data.map((plan) => (
                <div
                  key={plan.id}
                  data-interview-plan-row
                  className={[
                    'flex h-14 items-center justify-between rounded-lg border bg-white px-5 py-3 gap-3',
                    plan.isSelected ? 'border-primary' : 'border-gray-5',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-4 overflow-hidden min-w-0 flex-1">
                    <span className="h4 text-primary shrink-0">{plan.dDay}</span>

                    <span className="shrink-0 p2 text-text-primary truncate">
                      {plan.companyName} {plan.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="p4 text-gray-3">{plan.date}</span>
                    <DotsMenuTrigger
                      menuKey={`plan-${plan.id}`}
                      onToggleMenu={toggleActionsMenu}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-[1.3] flex-col ">
          <h3 className="mb-4 p2 text-text-primary">면접 커리큘럼</h3>

          {isEmpty ? (
            <div className="flex-1 rounded-lg border border-primary bg-white px-6.5 py-6.5">
              <div className="flex items-start gap-4">
                <span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#977AFF]" />
                <span className="text-lg font-medium text-gray-3">
                  일정을 등록하면 나만을 위한 맞춤 커리큘럼을 생성해요
                </span>
              </div>
            </div>
          ) : (
            <div className="max-h-[248px] flex-1 rounded-lg border border-primary bg-white px-6.5 py-6.5">
              <div className="space-y-4">
                {selectedPlan?.curriculum.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#977AFF]" />
                    <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                      <span className="truncate p3 text-text-primary">
                        {item.title}
                      </span>
                      <span className="shrink-0 p4 text-gray-3">
                        {item.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
