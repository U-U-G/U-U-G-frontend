// tests/error.spec.ts

import { test, expect, type Page } from '@playwright/test'

const TRIGGER_URL = '/test-trigger-error'

const getErrorAlert = (page: Page) =>
  page.getByRole('alert').filter({ hasText: '오류가 발생했습니다' })

test.describe('에러 페이지', () => {
  test('에러 발생 시 에러 페이지가 렌더링된다', async ({ page }) => {
    await page.goto(TRIGGER_URL)

    await expect(getErrorAlert(page)).toBeVisible()
    await expect(page.getByText('오류가 발생했습니다')).toBeVisible()
    await expect(page.getByText('잠시 후 다시 시도해주세요')).toBeVisible()
  })

  test('홈으로 링크의 href가 /home이다', async ({ page }) => {
    await page.goto(TRIGGER_URL)

    const homeLink = page.getByRole('link', { name: '홈으로' })
    await expect(homeLink).toBeVisible()
    await expect(homeLink).toHaveAttribute('href', '/home')
  })

  test('다시 시도 버튼이 존재한다', async ({ page }) => {
    await page.goto(TRIGGER_URL)

    await expect(
      page.getByRole('button', { name: '페이지 복구 시도하기' }),
    ).toBeVisible()
  })

  test('다시 시도 버튼 클릭 후 에러 페이지가 다시 표시된다', async ({
    page,
  }) => {
    await page.goto(TRIGGER_URL)

    // 에러 바운더리 리셋 → 동일 페이지가 다시 throw하므로 에러 페이지가 재표시됨
    await page.getByRole('button', { name: '페이지 복구 시도하기' }).click()

    await expect(getErrorAlert(page)).toBeVisible()
    await expect(page.getByText('오류가 발생했습니다')).toBeVisible()
  })
})
