// tests/reset-password.spec.ts
// ?token 없음 → 만료된 링크 fallback
// ?token 있음 → 비밀번호 재설정 폼

import { test, expect } from '@playwright/test'

test.describe('비밀번호 재설정 페이지 (/reset-password)', () => {
  test('token 없이 접근하면 만료된 링크 안내가 표시된다', async ({ page }) => {
    await page.goto('/reset-password')

    await expect(page.getByText('만료된 링크입니다.')).toBeVisible()
    await expect(
      page.getByRole('link', { name: '재설정 메일 다시 받기' }),
    ).toBeVisible()
  })

  test('만료된 링크의 버튼이 /forgot-password 로 이동한다', async ({
    page,
  }) => {
    await page.goto('/reset-password')

    const link = page.getByRole('link', { name: '재설정 메일 다시 받기' })
    await expect(link).toHaveAttribute('href', '/forgot-password')
  })

  test('유효한 token이 있으면 비밀번호 재설정 폼이 표시된다', async ({
    page,
  }) => {
    await page.goto('/reset-password?token=valid-test-token')

    await expect(
      page.getByRole('heading', { name: '비밀번호 재설정' }),
    ).toBeVisible()
    await expect(
      page.getByPlaceholder('새 비밀번호를 입력해주세요.'),
    ).toBeVisible()
    await expect(page.getByRole('button', { name: '변경 완료' })).toBeVisible()
  })

  test('변경 완료 버튼은 초기에 비활성 상태이다', async ({ page }) => {
    await page.goto('/reset-password?token=valid-test-token')

    await expect(page.getByRole('button', { name: '변경 완료' })).toBeDisabled()
  })

  test('비밀번호 재설정 성공 시 /login 으로 이동한다', async ({ page }) => {
    await page.route('**/api/auth/reset-password', (route) =>
      route.fulfill({
        status: 200,
        json: { success: true, data: null, message: 'OK' },
      }),
    )

    await page.goto('/reset-password?token=valid-test-token')

    await page
      .getByPlaceholder('새 비밀번호를 입력해주세요.')
      .fill('NewPassword1!')
    await page
      .getByPlaceholder('비밀번호를 입력해주세요.', { exact: true })
      .fill('NewPassword1!')
    await page.getByRole('button', { name: '변경 완료' }).click()

    await expect(page).toHaveURL('/login')
  })
})
