// tests/interview-complete.spec.ts
// 단일 질문 완료 페이지 (/interview/job-posting/[uuid]/complete?q=N)

import { test, expect } from '@playwright/test'
import { setupAuth } from './helpers/auth'

const MOCK_UUID = 'test-session-uuid'
const BASE_URL = `/interview/job-posting/${MOCK_UUID}/complete`

test.describe('면접 완료 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)

    // 다음 질문으로 이동 후 countdown 페이지가 로드될 때 호출되는 API 기본 모킹
    // (미모킹 상태면 401 → /login 리다이렉트 발생)
    await page.route(`**/api/interview-sessions/${MOCK_UUID}/start`, (route) =>
      route.fulfill({
        status: 200,
        json: { success: true, data: { uuid: MOCK_UUID }, message: 'OK' },
      }),
    )
    await page.route(
      `**/api/interview-sessions/${MOCK_UUID}/questions*`,
      (route) =>
        route.fulfill({
          status: 200,
          json: {
            success: true,
            data: [
              { uuid: 'q-1', sequenceOrder: 2, content: '다음 질문입니다.' },
            ],
            message: 'OK',
          },
        }),
    )
  })

  test('공통 안내 문구가 렌더링된다', async ({ page }) => {
    await page.goto(`${BASE_URL}?q=1`)

    await expect(page.getByText('수고하셨습니다')).toBeVisible()
  })

  test('마지막 질문이 아니면 다음 질문 버튼이 표시된다', async ({ page }) => {
    await page.goto(`${BASE_URL}?q=1`)

    await expect(page.getByRole('button', { name: /다음 질문/ })).toBeVisible()
  })

  test('마지막 질문이면 결과 보기 버튼이 표시된다', async ({ page }) => {
    // TOTAL_QUESTIONS = 5
    await page.goto(`${BASE_URL}?q=5`)

    await expect(page.getByRole('button', { name: '결과 보기' })).toBeVisible()
  })

  test('마지막 질문이 아닐 때 다음 질문으로 이동 시 countdown 페이지로 이동한다', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}?q=1`)
    await page.getByRole('button', { name: /다음 질문/ }).click()

    await expect(page).toHaveURL(
      `/interview/job-posting/${MOCK_UUID}/countdown?q=2`,
    )
  })
})
