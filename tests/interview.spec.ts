// tests/interview.spec.ts
// 면접 연습 시작 페이지 (/interview)

import { test, expect } from '@playwright/test'
import { setupAuth } from './helpers/auth'

test.describe('면접 연습 페이지 (/interview)', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)
  })

  test('페이지 제목이 렌더링된다', async ({ page }) => {
    await page.goto('/interview')

    await expect(
      page.getByRole('heading', {
        name: '원하는 기업의 공고 링크로 면접을 연습하세요',
      }),
    ).toBeVisible()
  })

  test('면접 연습 시작 링크가 /interview/job-posting 을 가리킨다', async ({
    page,
  }) => {
    await page.goto('/interview')

    await expect(
      page.getByRole('link', { name: '면접 연습 시작' }),
    ).toHaveAttribute('href', '/interview/job-posting')
  })

  test('진행 단계 목록이 렌더링된다', async ({ page }) => {
    await page.goto('/interview')

    await expect(page.getByText('링크, 회사명, 면접 일정 입력')).toBeVisible()
    await expect(page.getByText('결과 분석')).toBeVisible()
  })
})
