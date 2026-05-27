// tests/history-detail.spec.ts
// 면접 이력 상세 페이지 (/history/[uuid])

import { test, expect } from '@playwright/test'
import { setupAuth } from './helpers/auth'

const MOCK_UUID = 'test-session-uuid'
const BASE_URL = `/history/${MOCK_UUID}`

const MOCK_REPORT = {
  sessionUuid: MOCK_UUID,
  companyName: '테스트기업',
  position: '프론트엔드 개발자',
  interviewDate: '2024-06-01',
  startedAt: '2024-06-01T10:00:00Z',
  endedAt: '2024-06-01T10:30:00Z',
  totalScore: 85,
  silenceScore: 80,
  fillerScore: 75,
  logicScore: 90,
  aiSummary: '전반적으로 답변이 명확했습니다.',
  analyses: [
    {
      uuid: 'analysis-uuid-1',
      sequenceOrder: 1,
      questionContent: '자기소개를 해주세요.',
      answerTranscript: '안녕하세요.',
      aiReview: '간결하게 잘 답변했습니다.',
      totalScore: 85,
      silenceScore: 80,
      fillerScore: 75,
      logicScore: 90,
      totalSilenceDuration: 2000,
      silenceCount: 1,
      fillerWords: { 음: 0, 어: 1, 그: 0 },
    },
  ],
}

test.describe('면접 이력 상세 페이지 (/history/[uuid])', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)
  })

  test('리포트 로드 완료 시 제목이 표시된다', async ({ page }) => {
    await page.route(`**/api/interview-reports/${MOCK_UUID}`, (route) =>
      route.fulfill({
        status: 200,
        json: { success: true, data: MOCK_REPORT, message: 'OK' },
      }),
    )

    await page.goto(BASE_URL)

    await expect(page.getByText('면접 리포트를 확인해보세요')).toBeVisible()
  })

  test('분석 중(202)이면 분석 중 안내가 표시된다', async ({ page }) => {
    await page.route(`**/api/interview-reports/${MOCK_UUID}`, (route) =>
      route.fulfill({
        status: 202,
        json: { success: false, data: null, message: 'Accepted' },
      }),
    )

    await page.goto(BASE_URL)

    await expect(page.getByText('분석 중이에요')).toBeVisible()
    await expect(
      page.getByRole('link', { name: '연습 이력으로 돌아가기' }),
    ).toBeVisible()
  })

  test('API 오류 시 에러 메시지가 표시된다', async ({ page }) => {
    test.setTimeout(30000)

    await page.route(`**/api/interview-reports/${MOCK_UUID}`, (route) =>
      route.fulfill({
        status: 500,
        json: {
          success: false,
          data: null,
          message: 'Internal Server Error',
        },
      }),
    )

    await page.goto(BASE_URL)

    await expect(
      page.getByText(
        '리포트를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
      ),
    ).toBeVisible({ timeout: 20000 })
  })

  test('리포트에 총점이 표시된다', async ({ page }) => {
    await page.route(`**/api/interview-reports/${MOCK_UUID}`, (route) =>
      route.fulfill({
        status: 200,
        json: { success: true, data: MOCK_REPORT, message: 'OK' },
      }),
    )

    await page.goto(BASE_URL)

    // MOCK_REPORT.aiSummary — 리포트에만 표시되는 고유 텍스트
    await expect(
      page.getByText('전반적으로 답변이 명확했습니다.'),
    ).toBeVisible()
  })
})
