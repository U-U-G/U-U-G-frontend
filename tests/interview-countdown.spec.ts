// tests/interview-countdown.spec.ts
// 면접 카운트다운 페이지 (/interview/job-posting/[uuid]/countdown?q=N)

import { test, expect } from '@playwright/test'
import { setupAuth } from './helpers/auth'

const MOCK_UUID = 'test-session-uuid'
const BASE_URL = `/interview/job-posting/${MOCK_UUID}/countdown`

test.describe('카운트다운 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)

    // 세션 시작 API
    await page.route(`**/api/interview-sessions/${MOCK_UUID}/start`, (route) =>
      route.fulfill({
        status: 200,
        json: { success: true, data: { uuid: MOCK_UUID }, message: 'OK' },
      }),
    )

    // 질문 조회 API
    await page.route(
      `**/api/interview-sessions/${MOCK_UUID}/questions*`,
      (route) =>
        route.fulfill({
          status: 200,
          json: {
            success: true,
            data: [
              {
                uuid: 'q-uuid-1',
                sequenceOrder: 1,
                content: '자기소개를 해주세요.',
              },
            ],
            message: 'OK',
          },
        }),
    )
  })

  test('?q 파라미터 없이 접근하면 404 페이지로 이동한다', async ({ page }) => {
    await page.goto(BASE_URL)

    await expect(page.getByText('페이지를 찾을 수 없습니다')).toBeVisible()
  })

  test('질문 내용과 카운트다운이 렌더링된다', async ({ page }) => {
    await page.goto(`${BASE_URL}?q=1`)

    // sr-only 요소와 겹치므로 exact 사용
    await expect(
      page.getByText('자기소개를 해주세요.', { exact: true }),
    ).toBeVisible()
    // 카운트다운: aria-label에 "초 후 질문 시작" 포함
    await expect(page.locator('[aria-label*="초 후 질문 시작"]')).toBeVisible()
  })

  test('세션 시작 실패 시 에러 안내가 표시된다', async ({ page }) => {
    // start API 를 실패로 덮어씀
    await page.route(`**/api/interview-sessions/${MOCK_UUID}/start`, (route) =>
      route.fulfill({
        status: 500,
        json: {
          success: false,
          data: null,
          message: 'Internal Server Error',
        },
      }),
    )

    await page.goto(`${BASE_URL}?q=1`)

    await expect(page.getByText('면접 시작에 실패했어요')).toBeVisible()
    await expect(page.getByRole('button', { name: '돌아가기' })).toBeVisible()
  })
})
