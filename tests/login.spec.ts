// tests/login.spec.ts

import { test, expect } from '@playwright/test'
import { mockPrivateApis } from './helpers/auth'

test.describe('로그인 페이지 (/login)', () => {
  test('로그인 폼이 렌더링된다', async ({ page }) => {
    await page.goto('/login')

    await expect(page.getByPlaceholder('이메일')).toBeVisible()
    await expect(page.getByPlaceholder('비밀번호')).toBeVisible()
    await expect(
      page.getByRole('button', { name: '로그인', exact: true }),
    ).toBeVisible()
  })

  test('소셜 로그인 버튼 3개가 있다', async ({ page }) => {
    await page.goto('/login')

    await expect(
      page.getByRole('button', { name: '카카오 로그인' }),
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: '구글 로그인' }),
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: '네이버 로그인' }),
    ).toBeVisible()
  })

  test('비밀번호 찾기·회원가입 링크가 있다', async ({ page }) => {
    await page.goto('/login')

    await expect(
      page.getByRole('link', { name: '비밀번호 찾기' }),
    ).toBeVisible()
    await expect(page.getByRole('link', { name: '회원가입' })).toBeVisible()
  })

  test('잘못된 자격증명으로 로그인 시 에러 메시지가 표시된다', async ({
    page,
  }) => {
    await page.route('**/api/auth/login', (route) =>
      route.fulfill({
        status: 401,
        json: { success: false, data: null, message: '인증 실패' },
      }),
    )

    await page.goto('/login')
    await page.getByPlaceholder('이메일').fill('wrong@example.com')
    await page.getByPlaceholder('비밀번호').fill('wrongpassword')
    await page.getByRole('button', { name: '로그인', exact: true }).click()

    await expect(
      page.getByText('아이디 또는 비밀번호가 틀렸습니다.'),
    ).toBeVisible()
  })

  test('로그인 성공 시 /home으로 이동한다', async ({ page }) => {
    test.slow() // /home 로드 API 모킹 지연 대비
    await page.route('**/api/auth/login', (route) =>
      route.fulfill({
        status: 200,
        json: {
          success: true,
          data: { accessToken: 'fake-access', refreshToken: 'fake-refresh' },
          message: 'OK',
        },
      }),
    )

    // /home 로드 시 호출되는 private API 모킹 (미모킹 시 401 → /login 리다이렉트)
    await mockPrivateApis(page)

    await page.goto('/login')
    await page.getByPlaceholder('이메일').fill('test@example.com')
    await page.getByPlaceholder('비밀번호').fill('Password1!')
    await page.getByRole('button', { name: '로그인', exact: true }).click()

    await expect(page).toHaveURL('/home')
  })
})
