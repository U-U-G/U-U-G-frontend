export const emptyHomeMockData = {
  user: {
    name: '사용자',
    profileImageUrl: '',
    ranking: null,
    rankingChange: null,
  },
  heroGoal: null,
  todaySchedule: {
    selectedDate: '2026-04-20',
    weekDates: [
      { dayLabel: '일', date: 19, fullDate: '2026-04-19', isSelected: false },
      { dayLabel: '월', date: 20, fullDate: '2026-04-20', isSelected: true },
      { dayLabel: '화', date: 21, fullDate: '2026-04-21', isSelected: false },
      { dayLabel: '수', date: 22, fullDate: '2026-04-22', isSelected: false },
      { dayLabel: '목', date: 23, fullDate: '2026-04-23', isSelected: false },
      { dayLabel: '금', date: 24, fullDate: '2026-04-24', isSelected: false },
      { dayLabel: '토', date: 25, fullDate: '2026-04-25', isSelected: false },
    ],
    schedules: [],
  },
  interviewPlans: [],
} as const

export const homeMockData = {
  user: {
    name: '사용자',
    profileImageUrl: '',
    ranking: 32,
    rankingChange: -10,
  },

  heroGoal: {
    title: '랭킹이 10등이나 하락했어요!',
    description: '핵심 직무질문 5개 포함 15분 실전 모의면접에 바로 도전하세요',
    dDayLabel: 'D-4',
    ctaLabel: '지금 시작하기',
    imageUrl: '/images/home/home-bot.png',
  },

  todaySchedule: {
    selectedDate: '2026-04-20',
    weekDates: [
      { dayLabel: '일', date: 19, fullDate: '2026-04-19', isSelected: false },
      { dayLabel: '월', date: 20, fullDate: '2026-04-20', isSelected: true },
      { dayLabel: '화', date: 21, fullDate: '2026-04-21', isSelected: false },
      { dayLabel: '수', date: 22, fullDate: '2026-04-22', isSelected: false },
      { dayLabel: '목', date: 23, fullDate: '2026-04-23', isSelected: false },
      { dayLabel: '금', date: 24, fullDate: '2026-04-24', isSelected: false },
      { dayLabel: '토', date: 25, fullDate: '2026-04-25', isSelected: false },
    ],
    schedules: [
      {
        id: 1,
        label: '회사명1',
        title: '1차 모의면접',
        time: '10:00',
      },
      {
        id: 2,
        label: '회사명2',
        title: '습관에 줄이기',
        time: '13:00',
      },
      {
        id: 3,
        label: '회사명3',
        title: '1차 모의면접 재시도',
        time: '16:00',
      },
      {
        id: 4,
        label: '회사명4',
        title: '1차 모의면접 재시도',
        time: '18:00',
      },
    ],
  },

  interviewPlans: [
    {
      id: 1,
      dDay: 'D-day',
      companyName: '회사명1',
      title: '5차 면접',
      date: '04.24',
      isSelected: false,
      curriculum: [
        { id: 1, title: '1차 모의면접', date: '04.20' },
        { id: 2, title: '속도 고전 연습', date: '04.21' },
        { id: 3, title: '핵심 직무질문 5개 답하기', date: '04.22' },
        { id: 4, title: '2차 모의면접', date: '04.23' },
      ],
    },
    {
      id: 2,
      dDay: 'D-7',
      companyName: '회사명2',
      title: '3차 면접',
      date: '04.24',
      isSelected: false,
      curriculum: [
        { id: 1, title: '자기소개 보완', date: '04.21' },
        { id: 2, title: '기술 질문 대비', date: '04.22' },
        { id: 3, title: '실전 모의면접', date: '04.23' },
      ],
    },
    {
      id: 3,
      dDay: 'D-99+',
      companyName: '회사명3',
      title: '3차 면접',
      date: '04.24',
      isSelected: true,
      curriculum: [
        { id: 1, title: '1차 모의면접', date: '04.20' },
        { id: 2, title: '속도 고전 연습', date: '04.21' },
        { id: 3, title: '핵심 직무질문 5개 답하기', date: '04.22' },
        { id: 4, title: '2차 모의면접', date: '04.23' },
        { id: 5, title: '2차 모의면접', date: '04.23' },
        { id: 6, title: '2차 모의면접', date: '04.23' },
      ],
    },
    {
      id: 4,
      dDay: 'D-99+',
      companyName: '회사명3',
      title: '3차 면접',
      date: '04.28',
      isSelected: false,
      curriculum: [
        { id: 1, title: '자기소개 연습', date: '04.25' },
        { id: 2, title: '직무 질문 정리', date: '04.26' },
      ],
    },
    {
      id: 5,
      dDay: 'D-99+',
      companyName: '회사명3',
      title: '3차 면접',
      date: '04.28',
      isSelected: false,
      curriculum: [
        { id: 1, title: '기업 분석', date: '04.25' },
        { id: 2, title: '답변 다듬기', date: '04.26' },
      ],
    },
  ],
} as const
