// tests/history.spec.ts

import { test, expect } from '@playwright/test'
import { setupAuth } from './helpers/auth'

test.describe('연습 이력 페이지 (/history)', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)
  })

  test('페이지 제목이 렌더링된다', async ({ page }) => {
    await page.goto('/history')

    await expect(
      page.getByRole('heading', { name: '연습 이력을 확인해보세요' }),
    ).toBeVisible()
  })

  test('이력이 없을 때 빈 상태 메시지가 표시된다', async ({ page }) => {
    // setupAuth에서 interview-reports = [] 로 이미 모킹됨
    await page.goto('/history')

    await expect(page.getByText('이력이 없습니다')).toBeVisible()
  })

  test('이력이 있을 때 회사명이 표시된다', async ({ page }) => {
    await page.route('**/api/interview-reports', (route) =>
      route.fulfill({
        status: 200,
        json: {
          success: true,
          data: [
            {
              sessionUuid: 'uuid-1',
              companyName: '테스트기업',
              position: '프론트엔드 개발자',
              interviewDate: '2024-06-01',
              startedAt: '2024-06-01T10:00:00Z',
              endedAt: '2024-06-01T10:30:00Z',
              questionCount: 5,
              analysisComplete: true,
              silenceScore: 80,
              fillerScore: 75,
              logicScore: 85,
              totalScore: 80,
            },
          ],
          message: 'OK',
        },
      }),
    )

    await page.goto('/history')

    await expect(page.getByText('테스트기업')).toBeVisible()
  })

  test('API 오류 시 에러 메시지가 표시된다', async ({ page }) => {
    // React Query 기본 retry 3회 (최대 ~7초) 완료 후 isError=true
    test.setTimeout(30000)

    await page.route('**/api/interview-reports', (route) =>
      route.fulfill({
        status: 500,
        json: { success: false, data: null, message: 'Internal Server Error' },
      }),
    )

    await page.goto('/history')

    await expect(
      page.getByText('이력을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.'),
    ).toBeVisible({ timeout: 20000 })
  })
})
