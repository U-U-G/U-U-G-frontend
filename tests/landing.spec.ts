// tests/landing.spec.ts

import { test, expect } from '@playwright/test'

test.describe('랜딩 페이지 (/)', () => {
  test('주요 텍스트가 렌더링된다', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByText('공고 링크 하나면', { exact: true }),
    ).toBeVisible()
    await expect(
      page.getByText('면접 준비는 끝났습니다', { exact: true }),
    ).toBeVisible()
  })

  test('비로그인 상태에서 헤더에 로그인 버튼이 표시된다', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('link', { name: '로그인' })).toBeVisible()
  })

  test('바로 시작하기 링크들이 /home을 가리킨다', async ({ page }) => {
    await page.goto('/')

    const startLinks = page.getByRole('link', { name: '바로 시작하기' })
    const count = await startLinks.count()
    expect(count).toBeGreaterThanOrEqual(1)

    for (let i = 0; i < count; i++) {
      await expect(startLinks.nth(i)).toHaveAttribute('href', '/home')
    }
  })

  test('푸터에 서비스 소개 문구가 있다', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByText('면접의 차이는 객관적인 피드백에서 나옵니다.'),
    ).toBeVisible()
  })
})
