export const PRACTICE_CARDS = [
  {
    id: 'job-posting',
    title: '공고 맞춤 연습',
    badge: 'Best',
    description:
      '채용공고 URL을 입력하면 해당 공고에 특화된\n 질문을 AI가 생성합니다.',
    steps: [
      '링크 입력',
      '마이크 점검',
      '연습 시작',
      '맞춤형 면접 연습',
      '연습 종료',
      '결과 피드백',
    ],
    href: '/interview/job-posting',
  },
  {
    id: 'by-role',
    title: '직무별 연습',
    badge: undefined,
    description:
      'IT 직무 카테고리를 선택해 해당 분야의\n 대표 면접 질문을 연습합니다.',
    steps: [
      '직무 선택',
      '마이크 점검',
      '연습 시작',
      '면접 연습',
      '연습 종료',
      '결과 피드백',
    ],
    href: '/interview/by-role',
  },
] as const
