// tests/not-found.spec.ts

import { test, expect } from '@playwright/test'

test.describe('404 페이지', () => {
  test('404 페이지 렌더링', async ({ page }) => {
    await page.goto('/없는페이지')

    await expect(page.getByText('페이지를 찾을 수 없습니다')).toBeVisible()
    await expect(
      page.getByText(
        '요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다',
      ),
    ).toBeVisible()
  })

  test('홈으로 버튼 클릭 시 /home으로 이동', async ({ page }) => {
    await page.goto('/없는페이지')

    await page.getByRole('link', { name: '홈으로' }).click()

    await expect(page).toHaveURL('/home')
  })

  test('이전 페이지 버튼이 존재함', async ({ page }) => {
    await page.goto('/없는페이지')

    await expect(
      page.getByRole('button', { name: '이전 페이지로 돌아가기' }),
    ).toBeVisible()
  })
})
