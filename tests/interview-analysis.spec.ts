// tests/interview-analysis.spec.ts
// 면접 분석 중 페이지 (/interview/job-posting/[uuid]/analysis)
//
// SSE 스트림이 실패하면 폴링으로 폴백됨.
// SSE 엔드포인트를 500으로 응답 → 폴링 폴백 상태 유지 → 분석 중 UI 확인.

import { test, expect } from '@playwright/test'
import { setupAuth } from './helpers/auth'

const MOCK_UUID = 'test-session-uuid'
const BASE_URL = `/interview/job-posting/${MOCK_UUID}/analysis`

test.describe('면접 분석 중 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)

    // SSE 실패 → 폴링 폴백
    await page.route(`**/interview-sessions/${MOCK_UUID}/stream`, (route) =>
      route.fulfill({ status: 500 }),
    )

    // 폴링: 202 → 분석 진행 중 상태 유지
    await page.route(`**/api/interview-reports/${MOCK_UUID}`, (route) =>
      route.fulfill({
        status: 202,
        json: { success: false, data: null, message: 'Accepted' },
      }),
    )
  })

  test('분석 중 안내 문구가 렌더링된다', async ({ page }) => {
    await page.goto(BASE_URL)

    await expect(page.getByText('면접 보느라 수고하셨어요!')).toBeVisible()
  })

  test('다른 면접 진행하기 버튼이 있다', async ({ page }) => {
    await page.goto(BASE_URL)

    await expect(
      page.getByRole('button', { name: '다른 면접 진행하기' }),
    ).toBeVisible()
  })

  test('분석 완료 시 완료 UI가 표시된다', async ({ page }) => {
    // SSE 성공 이벤트 대신, 폴링에서 200 반환 → 완료 처리
    await page.route(`**/api/interview-reports/${MOCK_UUID}`, (route) =>
      route.fulfill({
        status: 200,
        json: {
          success: true,
          data: {
            sessionUuid: MOCK_UUID,
            companyName: '테스트기업',
            position: '프론트엔드',
            interviewDate: '2024-06-01',
            startedAt: '2024-06-01T10:00:00Z',
            endedAt: '2024-06-01T10:30:00Z',
            totalScore: 85,
            silenceScore: 80,
            fillerScore: 75,
            logicScore: 90,
            aiSummary: '잘 하셨습니다.',
            analyses: [],
          },
          message: 'OK',
        },
      }),
    )

    await page.goto(BASE_URL)

    await expect(page.getByText('면접 분석이 완료되었어요!')).toBeVisible({
      timeout: 15000,
    })
    await expect(
      page.getByRole('button', { name: '리포트 보러가기' }),
    ).toBeVisible()
  })
})
