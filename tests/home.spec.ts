// tests/home.spec.ts

import { test, expect } from '@playwright/test'
import { setupAuth, MOCK_PROFILE } from './helpers/auth'

test.describe('홈 페이지 (/home)', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)
  })

  test('인사 메시지가 렌더링된다 (공고 없음 → 만나서 반가워요)', async ({
    page,
  }) => {
    // setupAuth에서 job-postings를 빈 배열로 모킹 → '만나서 반가워요' 분기
    await page.goto('/home')

    await expect(
      page.getByRole('heading', {
        name: `${MOCK_PROFILE.nickname}님, 만나서 반가워요`,
      }),
    ).toBeVisible()
  })

  test('공고가 있을 때 다른 인사 메시지가 표시된다', async ({ page }) => {
    // job-postings를 하나 있는 상태로 덮어씀
    await page.route('**/api/job-postings', (route) =>
      route.fulfill({
        status: 200,
        json: {
          success: true,
          data: [
            {
              id: 1,
              companyName: '테스트기업',
              position: '프론트엔드',
              url: 'https://example.com',
            },
          ],
          message: 'OK',
        },
      }),
    )

    await page.goto('/home')

    await expect(
      page.getByRole('heading', {
        name: `${MOCK_PROFILE.nickname}님, 오늘도 연습해볼까요?`,
      }),
    ).toBeVisible()
  })

  test('오늘의 스케줄 섹션이 렌더링된다', async ({ page }) => {
    await page.goto('/home')

    // TodayScheduleSection 제목 (h3) - getByText는 '일정에 맞게 오늘의 스케줄을...' 도 매칭되므로 role 사용
    await expect(
      page.getByRole('heading', { name: '오늘의 스케줄' }),
    ).toBeVisible()
    // 주 전환 버튼 (초기 상태: 다음 주 보기)
    await expect(
      page.getByRole('button', { name: '다음 주 보기' }),
    ).toBeVisible()
  })
})
