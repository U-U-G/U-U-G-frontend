export const interviewMockData = {
  session: {
    company: '회사명',
    job: '직무명',
    round: 1,
  },
  questions: [
    {
      number: 1,
      text: 'iOS와 Android의 주요 차이점을 설명해주세요.',
    },
    {
      number: 2,
      text: '두번째 질문이 옵니다.',
    },
    {
      number: 3,
      text: '세번째 질문이 옵니다.',
    },
    {
      number: 4,
      text: '네번째 질문이 옵니다.',
    },
    {
      number: 5,
      text: '다섯번째 질문이 옵니다.',
    },
  ],
  totalQuestions: 5,
  currentQuestion: 1,
} as const
