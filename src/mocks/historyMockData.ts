type AnalyzingSession = {
  id: number
  attempt: number
  job: string
  date: string
  questionCount: number
  duration: string
  status: 'analyzing'
  analysisProgress: number
}

type CompletedSession = {
  id: number
  attempt: number
  job: string
  date: string
  questionCount: number
  duration: string
  status: 'completed'
  silenceSec: number
  fillerCount: number
  logicScore: number
  totalScore: number
}

export type PracticeSession = AnalyzingSession | CompletedSession

export type HistoryCompany = {
  id: number
  name: string
  sessions: readonly PracticeSession[]
}

export const historyMockData: readonly HistoryCompany[] = [
  {
    id: 1,
    name: '카카오',
    sessions: [
      {
        id: 5,
        attempt: 5,
        job: '서비스 기획자',
        date: '04월 29일',
        questionCount: 5,
        duration: '6분 50초',
        status: 'analyzing',
        analysisProgress: 45,
      },
      {
        id: 4,
        attempt: 4,
        job: '서비스 기획자',
        date: '04월 25일',
        questionCount: 5,
        duration: '7분 12초',
        status: 'completed',
        silenceSec: 42,
        fillerCount: 31,
        logicScore: 78,
        totalScore: 82,
      },
      {
        id: 3,
        attempt: 3,
        job: '서비스 기획자',
        date: '04월 20일',
        questionCount: 5,
        duration: '6분 30초',
        status: 'completed',
        silenceSec: 55,
        fillerCount: 48,
        logicScore: 71,
        totalScore: 74,
      },
      {
        id: 2,
        attempt: 2,
        job: '서비스 기획자',
        date: '04월 15일',
        questionCount: 5,
        duration: '8분 05초',
        status: 'completed',
        silenceSec: 70,
        fillerCount: 62,
        logicScore: 65,
        totalScore: 68,
      },
      {
        id: 1,
        attempt: 1,
        job: '서비스 기획자',
        date: '04월 10일',
        questionCount: 5,
        duration: '9분 22초',
        status: 'completed',
        silenceSec: 91,
        fillerCount: 80,
        logicScore: 58,
        totalScore: 61,
      },
    ],
  },
  {
    id: 2,
    name: '네이버',
    sessions: [
      {
        id: 3,
        attempt: 3,
        job: '프론트엔드 개발자',
        date: '04월 28일',
        questionCount: 7,
        duration: '11분 40초',
        status: 'analyzing',
        analysisProgress: 80,
      },
      {
        id: 2,
        attempt: 2,
        job: '프론트엔드 개발자',
        date: '04월 21일',
        questionCount: 7,
        duration: '10분 15초',
        status: 'completed',
        silenceSec: 38,
        fillerCount: 27,
        logicScore: 84,
        totalScore: 88,
      },
      {
        id: 1,
        attempt: 1,
        job: '프론트엔드 개발자',
        date: '04월 14일',
        questionCount: 7,
        duration: '12분 03초',
        status: 'completed',
        silenceSec: 63,
        fillerCount: 55,
        logicScore: 72,
        totalScore: 75,
      },
    ],
  },
  {
    id: 3,
    name: '토스',
    sessions: [
      {
        id: 2,
        attempt: 2,
        job: 'UX 디자이너',
        date: '04월 27일',
        questionCount: 6,
        duration: '9분 10초',
        status: 'completed',
        silenceSec: 29,
        fillerCount: 18,
        logicScore: 91,
        totalScore: 93,
      },
      {
        id: 1,
        attempt: 1,
        job: 'UX 디자이너',
        date: '04월 19일',
        questionCount: 6,
        duration: '10분 45초',
        status: 'completed',
        silenceSec: 47,
        fillerCount: 36,
        logicScore: 80,
        totalScore: 83,
      },
    ],
  },
  {
    id: 4,
    name: '라인플러스',
    sessions: [
      {
        id: 1,
        attempt: 1,
        job: '백엔드 개발자',
        date: '04월 26일',
        questionCount: 5,
        duration: '7분 55초',
        status: 'completed',
        silenceSec: 52,
        fillerCount: 44,
        logicScore: 76,
        totalScore: 79,
      },
    ],
  },
  {
    id: 5,
    name: '쿠팡',
    sessions: [
      {
        id: 2,
        attempt: 2,
        job: '데이터 분석가',
        date: '04월 24일',
        questionCount: 5,
        duration: '8분 30초',
        status: 'completed',
        silenceSec: 61,
        fillerCount: 50,
        logicScore: 69,
        totalScore: 72,
      },
      {
        id: 1,
        attempt: 1,
        job: '데이터 분석가',
        date: '04월 17일',
        questionCount: 5,
        duration: '9분 48초',
        status: 'completed',
        silenceSec: 83,
        fillerCount: 71,
        logicScore: 60,
        totalScore: 63,
      },
    ],
  },
  {
    id: 6,
    name: '당근마켓',
    sessions: [
      {
        id: 3,
        attempt: 3,
        job: 'iOS 개발자',
        date: '04월 23일',
        questionCount: 6,
        duration: '10분 20초',
        status: 'completed',
        silenceSec: 33,
        fillerCount: 22,
        logicScore: 88,
        totalScore: 90,
      },
      {
        id: 2,
        attempt: 2,
        job: 'iOS 개발자',
        date: '04월 16일',
        questionCount: 6,
        duration: '11분 05초',
        status: 'completed',
        silenceSec: 58,
        fillerCount: 46,
        logicScore: 75,
        totalScore: 77,
      },
      {
        id: 1,
        attempt: 1,
        job: 'iOS 개발자',
        date: '04월 09일',
        questionCount: 6,
        duration: '12분 38초',
        status: 'completed',
        silenceSec: 79,
        fillerCount: 68,
        logicScore: 63,
        totalScore: 66,
      },
    ],
  },
  { id: 7, name: '배달의민족', sessions: [] },
  { id: 8, name: '왓챠', sessions: [] },
  { id: 9, name: '직방', sessions: [] },
  { id: 10, name: '뱅크샐러드', sessions: [] },
  { id: 11, name: '리디', sessions: [] },
  { id: 12, name: '야놀자', sessions: [] },
]
