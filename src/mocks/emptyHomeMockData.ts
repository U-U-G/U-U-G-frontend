export const emptyHomeMockData = {
  user: {
    name: '아무개',
    profileImageUrl: '',
    ranking: null,
    rankingChange: null,
  },
  heroGoal: null,
  todaySchedule: {
    selectedDate: '2026-04-20',
    weekDates: [],
    schedules: [],
  },
  interviewPlans: [],
} as const
