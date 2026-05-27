// tests/setting.spec.ts

import { test, expect } from '@playwright/test'
import { setupAuth, MOCK_PROFILE } from './helpers/auth'

test.describe('환경설정 페이지 (/setting)', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)
  })

  test('환경설정 제목이 렌더링된다', async ({ page }) => {
    await page.goto('/setting')

    await expect(page.getByText('환경설정')).toBeVisible()
  })

  test('닉네임이 표시된다', async ({ page }) => {
    await page.goto('/setting')

    // header의 '테스트유저 님'과 프로필 섹션의 '테스트유저'를 구분하기 위해 exact 사용
    await expect(
      page.getByText(MOCK_PROFILE.nickname, { exact: true }),
    ).toBeVisible()
  })

  test('이메일이 표시된다', async ({ page }) => {
    await page.goto('/setting')

    // disabled 이메일 입력 필드의 value를 확인 (DOM 순서상 첫 번째 disabled input)
    await expect(page.locator('input[disabled]').first()).toHaveValue(
      MOCK_PROFILE.email,
    )
  })

  test('닉네임 변경 버튼이 있다', async ({ page }) => {
    await page.goto('/setting')

    // '프로필 사진 변경' 버튼과 구분하기 위해 exact 사용
    await expect(
      page.getByRole('button', { name: '변경', exact: true }),
    ).toBeVisible()
  })

  test('비밀번호 재설정 버튼이 있다', async ({ page }) => {
    await page.goto('/setting')

    await expect(page.getByRole('button', { name: '재설정' })).toBeVisible()
  })

  test('로그아웃 버튼이 있다', async ({ page }) => {
    await page.goto('/setting')

    await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible()
  })

  test('회원탈퇴 버튼이 있다', async ({ page }) => {
    await page.goto('/setting')

    await expect(page.getByRole('button', { name: '회원탈퇴' })).toBeVisible()
  })

  test('로그아웃 클릭 시 /login으로 이동한다', async ({ page }) => {
    await page.route('**/api/auth/logout', (route) =>
      route.fulfill({
        status: 200,
        json: { success: true, data: null, message: 'OK' },
      }),
    )

    await page.goto('/setting')
    await page.getByRole('button', { name: '로그아웃' }).click()

    await expect(page).toHaveURL('/login')
  })
})
