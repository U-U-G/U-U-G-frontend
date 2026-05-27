// tests/oauth2-callback.spec.ts
// 소셜 로그인 콜백 처리

import { test, expect } from '@playwright/test'
import { mockPrivateApis } from './helpers/auth'

test.describe('소셜 로그인 콜백 (/oauth2/callback)', () => {
  test('로딩 메시지가 렌더링된다', async ({ page }) => {
    await page.goto('/oauth2/callback')

    await expect(page.getByText('로그인 처리 중입니다')).toBeVisible()
  })

  test('error 파라미터가 있으면 /login?error=... 으로 이동한다', async ({
    page,
  }) => {
    await page.goto('/oauth2/callback?error=access_denied')

    await expect(page).toHaveURL('/login?error=access_denied')
  })

  test('token 없이 접근하면 /home 으로 이동한다', async ({ page }) => {
    // 콜백 후 /home 로드 시 호출되는 private API 모킹 (없으면 401 → /login 재리다이렉트)
    await mockPrivateApis(page)

    await page.goto('/oauth2/callback')

    await expect(page).toHaveURL('/home')
  })
})
