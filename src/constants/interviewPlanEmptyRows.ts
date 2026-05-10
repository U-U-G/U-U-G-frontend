export type EmptyInterviewPlanRowConfig = {
  menuKey: string
  className: string
  leading: 'prompt' | null
}

export const EMPTY_INTERVIEW_PLAN_ROWS: readonly EmptyInterviewPlanRowConfig[] =
  [
    {
      menuKey: 'empty-0',
      className:
        'flex h-14 items-center justify-between rounded-lg border border-primary bg-white px-5 py-4 gap-3',
      leading: 'prompt',
    },
    {
      menuKey: 'empty-1',
      className:
        'flex h-14 items-center justify-end rounded-lg bg-white px-5 py-3',
      leading: null,
    },
    {
      menuKey: 'empty-2',
      className:
        'flex h-14 items-center justify-end rounded-lg bg-white px-5 py-3',
      leading: null,
    },
    {
      menuKey: 'empty-3',
      className:
        'flex h-9 items-center justify-end rounded-t-lg bg-white px-5 py-3',
      leading: null,
    },
  ]
