// tests/not-found.spec.ts

import { test, expect } from '@playwright/test'

test('404 페이지 렌더링', async ({ page }) => {
  await page.goto('/없는페이지')

  await expect(page.getByText('페이지를 찾을 수 없습니다.')).toBeVisible()
})

test('홈으로 돌아가기', async ({ page }) => {
  await page.goto('/없는페이지')

  await page.getByRole('link', { name: '홈으로 돌아가기' }).click()

  await expect(page).toHaveURL('/')
})
